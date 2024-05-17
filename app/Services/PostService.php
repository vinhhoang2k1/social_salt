<?php

namespace App\Services;

use App\Models\BookmarkPost;
use App\Models\Follow;
use App\Models\Comment;
use App\Models\Post;
use App\Models\PostMedia;
use App\Models\ReactComment;
use App\Models\ReactPost;
use Illuminate\Support\Facades\Auth;
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
        $userId = Auth::user()->id;
        $posts = Post::withCount('comments')
            ->where('st_public', 1)
            ->get();
        // $posts->getCommentsCount;
        foreach ($posts as &$post) {
            $post->load('medias', 'createBy');
            $post->comments_count;
            $post['reacted'] = $post->reacted($userId);
            $post['bookmarked'] = $post->bookmarked($userId);
            $post['count_react'] = $post->total_reacts;
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
        $userId = Auth::user()->id;
        $post = Post::with([
            'comments' => function ($query) use ($userId) {
                $query->where('comment_parent', null);
            },
            'comments.user', 'comments.child', 'comments.child.user',
        ])->find($postId);
        foreach ($post->comments as &$comment) {
            $comment['reacted'] = $comment->userReacted($userId);
            $comment['count_react'] = $comment->total_reacts;
        }
        $post->load('medias', 'createBy');
        $post['reacted'] = $post->reacted($userId);
        $post['count_react'] = $post->total_reacts;


        return $post;
    }

    public function addCommentForPost($data)
    {
        $newComment = new Comment($data);
        $newComment->save();
        return $newComment;
    }

    public function addReactForPost($data)
    {
        $newReact = new ReactPost($data);
        $newReact->save();
        return $newReact;
    }

    public function addReactForComment($data)
    {
        $newReact = new ReactComment($data);
        $newReact->save();
        return $newReact;
    }
    public function addBookmark($data)
    {
        $newBookmark = new BookmarkPost($data);
        $newBookmark->save();
        return $newBookmark;
    }
    public function getListPostBookmark() {
        $userId = Auth::user()->id;
        $bookmarkedPosts = BookmarkPost::with('post')->where('user_id', $userId)->get();
        foreach ($bookmarkedPosts as &$bookmark) {
            $post = $bookmark->post;
            $post['count_react'] = $post->total_reacts;
            $post['count_comment'] = $post->comments_count;
            $post->medias;
        }
        return $bookmarkedPosts;
    }
}
