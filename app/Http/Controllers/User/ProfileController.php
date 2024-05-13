<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UpdateAvatarRequest;
use App\Models\Follow;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    private $userService;
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    public function getUserProfile(Request $request, $id = null)
    {
        $userId = Auth::user()->id; 
        $isFollowing = false;
        if ($id) {
            $userId = $id;
            $isFollowing = $this->userService->checkFollowing($id, $userId);
        }
        $profileData = User::with('posts', 'followers', 'following')->find($userId);
        return Inertia::render('Authenticated/Profile/Profile', [
            'profileData' => $profileData,
            'isFollowing' => $isFollowing,
        ]);
    }

    public function getFollowing($id = null) {
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

    public function getFollowers($id) {
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

    public function addFollow($id) {
        $authorId = Auth::user()->id;
        $newFollow = $this->userService->follow($id, $authorId);
        if ($newFollow) {
            return  redirect()->back()->with([
                'success' => true,
                'message' => 'Follow successfully',
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'Follow failure',
        ]);
    }

    public function updateAvatar(UpdateAvatarRequest $updateAvatarRequest)
    {   
        if(Auth::user()->avatar) {
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
}
