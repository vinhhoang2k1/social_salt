<?php

namespace App\Http\Controllers\User;

use App\Helps\ResponseData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UpdateAvatarRequest;
use App\Models\Follow;
use App\Models\Post;
use App\Models\User;
use App\Services\PostService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    private $userService;
    private $postService;

    public function __construct(UserService $userService, PostService $postService)
    {
        $this->userService = $userService;
        $this->postService = $postService;
    }
    public function getUserProfile(Request $request, $id = null)
    {
        $userId = Auth::user()->id;
        $isFollowing = false;
        if ($id) {
            $userId = $id;
            $isFollowing = $this->userService->checkFollowing(Auth::user()->id, $userId);
        }
        $profileData = User::with('followers', 'following')->find($userId);
        $posts = Post::withCount('comments')
            ->where('user_id', $userId)
            ->latest()
            ->get();
        foreach ($posts as &$post) {
            $post->load('medias');
            $post->comments_count;
            $post['count_react'] = $post->total_reacts;
        }
        $bookmarks = $this->postService->getListPostBookmark();
        return Inertia::render('Authenticated/Profile/Profile', [
            'profileData' => $profileData,
            'isFollowing' => $isFollowing,
            'posts' => $posts,
            'bookmarked' => $bookmarks,
        ]);
    }

    public function getFollowing($id = null)
    {
        $userId = Auth::user()->id;
        if ($id) {
            $userId = $id;
        }
        $following = $this->userService->getFollowing($userId);
        return response()->json([
            'success' => true,
            'message' => 'Get following suceess',
            'follows' => $following,
        ]);
    }

    public function getFollowers($id)
    {
        $userId = Auth::user()->id;
        if ($id) {
            $userId = $id;
        }
        $followers = $this->userService->getFollowers($userId);
        return response()->json([
            'success' => true,
            'message' => 'Get followers suceess',
            'follows' => $followers,
        ]);
    }

    public function addFollow($id)
    {
        $authorId = Auth::user()->id;
        $newFollow = $this->userService->follow($id, $authorId);
        // if (isset($newFollow)) {
        //     return  redirect()->back()->with([
        //         'success' => true,
        //         'message' => 'Follow successfully',
        //     ]);
        // }
        return redirect()->back();
    }

    public function updateAvatar(UpdateAvatarRequest $updateAvatarRequest)
    {
        if (Auth::user()->avatar) {
            $this->userService->deleteOldAvatar(Auth::user()->avatar);
        }
        $path = $this->userService->saveAvatarFile($updateAvatarRequest->file('file'));
        if ($path) {
            $updateAvatarRequest->user()->avatar = $path;
            $updateAvatarRequest->user()->save();
            return redirect()->back()
                ->with('success', 'Successfully updated');
        }
    }
    // public function getBookmarks()
    // {
    //     $result = $this->postService->getListPostBookmark();
    //     return (new ResponseData())->setStatus(true)
    //         ->setMessage("Add bookmark success")
    //         ->setData($result->toArray())
    //         ->getBodyResponse();
    // }
}
