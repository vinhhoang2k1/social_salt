<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CreateUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    private $userService;
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    public function ViewListUserAdmin(Request $request)
    {
        $page = $request->input('page');
        $user = (string) $request->input('user');
        $condition = [
            'fullname' => $user,
            'role' => 'ADMIN',
        ];
        $data = $this->userService->findUserByCondition($condition);
        return Inertia::render('Admin/User/Admin', ['response' => [
            'users' => $data
        ]]);
    }
    public function ViewListUser(Request $request)
    {
        $user = (string) $request->input('user');
        $condition = [
            'fullname' => $user,
            'role' => 'GUEST',
        ];
        $data = $this->userService->findUserByCondition($condition);
        return Inertia::render('Admin/User/Guest', ['response' => [
            'users' => $data
        ]]);
    }
    public function saveNewUser(CreateUserRequest $createUserRequest)
    {
        $createUserRequest->validated();
        $user = new User($createUserRequest->all());
        $user->password = Hash::make($user->password);
        $user->save();
        return redirect()->back()->with('success', 'Create user success !');
    }
    public function saveUpdateUser(UpdateUserRequest $updateUserRequest)
    {
        try {
            $updateUserRequest->validated();
            $data = $updateUserRequest->all();
            $user = User::find($data['id']);
            if (isset($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            }
            // return $user;
            $user->update($data);
            return redirect()->back()->with('success', 'Update user success !');
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function destroyUser($userId)
    {
        try {
            User::destroy($userId);
            return redirect()->back()->with('success', 'Delete user success !');
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
