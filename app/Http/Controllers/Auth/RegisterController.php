<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    /**
     * Display the register view.
     */
    public function create(): Response
    {
        return Inertia::render('Authenticating/Register/index');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterRequest $request)
    {
        $registerInfo = $request->validated();
        $user = new User($registerInfo);
        DB::transaction(function () use ($registerInfo, $request, &$user) {
            if (
                isset($request->email)
            ) {
                $user->fullname = $request->fullname;
                $user->email = $request->email;
                $user->password = Hash::make($request->password); 
            }
            $user->save();
        });

        // Auth::login($user);

        return redirect(route('login'));
    }
}
