<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UpdateAvatarRequest;
use App\Models\Follow;
use App\Models\Post;
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
        if ($id) {
            $userId = $id;
        }
        $profileData = User::with('posts', 'followers', 'following')->find($userId);
        return Inertia::render('Authenticated/Profile/Profile', [
            'profileData' => $profileData,
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
