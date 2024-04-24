<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function getUserProfile(Request $request) {
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
}
