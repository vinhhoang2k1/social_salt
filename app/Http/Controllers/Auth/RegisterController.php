<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class RegisterController extends Controller
{
    /**
     * Display the register view.
     */
    public function create(): Response
    {
        return Inertia::render('Authenticating/Register/index');
    }
}
