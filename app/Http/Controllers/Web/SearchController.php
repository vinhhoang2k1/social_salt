<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    private $userService;
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    public function index() {
        return Inertia::render('Authenticated/Search/SearchUser');
    }
    public function searchUser($userName) {
        // return $userName;
        $result = $this->userService->findUserByName($userName);
        return Inertia::render('Authenticated/Search/SearchUser',["response" => $result]);
    }
}
