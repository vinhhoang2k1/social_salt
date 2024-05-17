<?php

namespace App\Http\Controllers;

use App\Helps\ResponseData;
use App\Http\Requests\Web\CreateComment;
use App\Http\Requests\Web\CreateCommentRequest;
use App\Http\Requests\Web\CreateReactPostRequest;
use App\Http\Requests\Web\Post\CreatePostRequest;
use App\Models\ReactComment;
use App\Models\ReactPost;
use App\Services\PostService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    private $postService;
    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }
    public function create()
    {
        return Inertia::render('Authenticated/Post/Create');
    }
    public function store(CreatePostRequest $createPostRequest)
    {
        $user_id = Auth::user()->id;
        $createPostRequest['user_id'] = $user_id;
        try {
            $post = $createPostRequest->all();
            $postId = (string) $this->postService->savePost($post);
            $postMedia = $post['media'];
            foreach ($postMedia as &$media) {
                $newpath = $this->postService->saveRealPostMedia('post', $media['path']);
                $media['media_path'] = $newpath;
            }
            $this->postService->savePostMedia($postId, $postMedia);
            return redirect('profile')->with('success', 'Create post success !');
        } catch (\Throwable $th) {
            throw 'Error';
        }
    }
    public function view($postId)
    {
        $data = $this->postService->findPostById($postId);
        return Inertia::render('Authenticated/Post/ViewPost', [
            'response' => $data,
        ]);
    }
    public function addComment(CreateCommentRequest $request)
    {
        try {
            $data = $request->validated();
            $userId = Auth::user()->id;
            $data['user_id'] = $userId;
            $this->postService->addCommentForPost($data);
            return redirect()->back();
        } catch (\Exception $e) {
            //throw $th;

            return false;
        }
    }
    public function addReact(CreateReactPostRequest $request)
    {
        try {
            $data = $request->validated();
            $userId = Auth::user()->id;
            $data['user_id'] = $userId;
            $result = [];
            if ($data['type'] == 'POST') {
                $result = $this->postService->addReactForPost($data);
            }
            if ($data['type'] == 'COMMENT') {
                $result = $this->postService->addReactForComment($data);
            }
            return (new ResponseData())->setStatus(true)
                ->setMessage("React success")
                ->setData($result->toArray())
                ->getBodyResponse();
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function destroyReact(Request $request)
    {
        try {
            $request = $request->all();
            if ($request['type'] == 'POST') {
                ReactPost::destroy($request['react_id']);
            }
            if ($request['type'] == 'COMMENT') {
                ReactComment::destroy($request['react_id']);
            }
        } catch (\Exception $e) {
            throw $e;
        }
        return (new ResponseData())->setStatus(true)
            ->setMessage("Delete react success")
            ->setData([])
            ->getBodyResponse();
    }
}
