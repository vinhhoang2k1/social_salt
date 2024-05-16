<?php

namespace App\Services;

use App\Models\Follow;
use App\Models\Comment;
use App\Models\Post;
use App\Models\PostMedia;
use Illuminate\Support\Facades\DB;

class PostService
{
    private $uploadService;
    public function __construct(UploadService $uploadService)
    {
        $this->uploadService = $uploadService;
    }

    public function getAll(string $authorId)
    {
        $following = Follow::where('following_user_id', $authorId)->pluck('followed_user_id');
        $following->push($authorId);
        // $posts = Post::with('medias')->whereIn('user_id', $following)->with('createBy')->with('getCommentsCount')->get();
        $posts = Post::withCount('comments')->get();
        // $posts->getCommentsCount;
        foreach ($posts as &$post) {
            $post->medias;
            $post->createBy;
            $post->comments_count;
        }


        return $posts;
    }
    public function savePost($data)
    {
        $newPostId = null;
        try {
            DB::transaction(function () use ($data, &$newPostId) {
                $newPost = new Post($data);
                $newPost->save();
                $newPostId = $newPost->id;
            });
            return $newPostId;
        } catch (\Throwable $th) {
            throw 'Inser post error !';
        }
    }
    public function saveRealPostMedia($folder, $path)
    {
        $newpath = $this->uploadService->realUpload($folder, $path);
        $this->uploadService->deleleFile($path);
        return $newpath;
    }
    public function savePostMedia(string $postId, array $postMedias)
    {
        try {
            DB::transaction(function () use ($postId, $postMedias) {
                foreach ($postMedias as $media) {
                    $media['post_id'] = $postId;
                    $newMedia = new PostMedia($media);
                    $newMedia->save();
                };
            });
        } catch (\Throwable $th) {
            throw 'Inser post media error !';
        }
    }

    public function findPostById(string $postId)
    {
        $data = Post::with(['comments' => function ($query) {
            $query->where('comment_parent', null);
        }, 'comments.user', 'comments.child', 'comments.child.user'])->find($postId);
        $data->medias;
        $data->createBy;
        return $data;
    }

    public function addCommentForPost($data)
    {
        $newComment = new Comment($data);
        $newComment->save();
        return $newComment;
    }
}
