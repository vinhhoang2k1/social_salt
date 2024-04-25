<?php

use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\Web\UploadController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::middleware(['auth'])->group(function () {
    Route::get('/', function() {
        return Inertia::render('Authenticated/Home/Home');
    })->name('home');
    Route::group(['prefix' => '/profile'], function() {
        Route::get('/', [ProfileController::class, 'getUserProfile'])->name('profile');
        Route::post('/change-avatar', [ProfileController::class, 'updateAvatar']);
    });

    Route::prefix('post')->group(function() {
        Route::get('create', [PostController::class, 'create']);
    });


    Route::post('/upload', [UploadController::class, 'upload']);
    Route::post('/upload-multiple', [UploadController::class, 'uploadMultiple']);
});




require __DIR__ . '/auth.php';
