<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');
    Route::get('/register', [RegisterController::class, 'create'])
        ->name('register');

    Route::post('/register', [RegisterController::class, 'store']);
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);

    Route::group(['prefix' => '/admin'], function() {
        Route::get('/login', [AuthenticatedSessionController::class, 'adminCreate'] );
        Route::post('/login', [AuthenticatedSessionController::class, 'adminStore']);
    });
});


Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
