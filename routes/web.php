<?php

use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\Web\SearchController;
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


Route::middleware(['auth', 'check_permission_guest'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Authenticated/Home/Home');
    })->name('home');
    Route::group(['prefix' => '/profile'], function () {
        Route::get('/', [ProfileController::class, 'getUserProfile'])->name('profile');
        Route::post('/change-avatar', [ProfileController::class, 'updateAvatar']);
    });

    Route::prefix('post')->group(function () {
        Route::get('create', [PostController::class, 'create']);
        Route::get('/view/{postId}', [PostController::class, 'view']);

        Route::get('/test', function () {
            return 'this is data';
        });
        Route::post('/create', [PostController::class, 'store']);
    });
    Route::prefix('search')->group(function () {
        Route::get('/', [SearchController::class, 'index']);
        Route::get('/{name}', [SearchController::class, 'searchUser']);
    });

    Route::post('/upload', [UploadController::class, 'upload']);
    Route::post('/upload-multiple', [UploadController::class, 'uploadMultiple']);
});

Route::middleware(['auth', 'check_permission_admin'])->group(function () {
    Route::group(['prefix' => '/admin'], function () {
        Route::get('/home', [HomeController::class, 'create'] )->name('admin');
        Route::get('/user-admin', [UserController::class, 'ViewListUserAdmin'] );
        Route::get('/user', [UserController::class, 'ViewListUser'] );
        
        Route::post('/user-create', [UserController::class, 'saveNewUser']);
        Route::post('/user-update', [UserController::class, 'saveUpdateUser']);
        Route::post('/user-destroy/{userId}', [UserController::class, 'destroyUser']);
    });
});




require __DIR__ . '/auth.php';
