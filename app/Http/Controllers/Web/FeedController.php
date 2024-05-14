<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\PostService;
use App\Services\UserService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FeedController extends Controller
{
    private $postService;
    private $userService;
    public function __construct(PostService $postService, UserService $userService)
    {
        $this->postService = $postService;
        $this->userService = $userService;
    }
    public function index() {
        $authorId = Auth::user()->id;
        $posts = $this->postService->getAll($authorId);
        $following = $this->userService->getFollowing($authorId);
        return Inertia::render('Authenticated/Home/Home', [
            'posts' => $posts,
            'following' => $following,
        ]);
    }
}
