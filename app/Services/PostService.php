<?php

namespace App\Services;

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
}
