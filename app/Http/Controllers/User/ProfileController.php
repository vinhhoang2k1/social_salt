<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UpdateAvatarRequest;
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
    public function getUserProfile(Request $request)
    {
        $id_param = $request->query('id');
        $user_id = Auth::user()->id;
        if ($id_param) {
            $user_id = $id_param;
        }

        // handle get user with posts (group by post_type) by user id
        $user_info = User::with('posts')->find($user_id);

        return Inertia::render('Authenticated/Profile/Profile', [
            'userInfo' => $user_info
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
