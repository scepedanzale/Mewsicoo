<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\SavedPostController;


Route::resource('/user', UserController::class);
Route::get('/user-auth', [UserController::class, 'user_auth']);
Route::post('/change-password', [UserController::class, 'change_password']);

Route::middleware(['auth'])->group(function () {
    /* follows */
    Route::get('/user/follow/{userId}', [UserController::class, 'follow']);
    Route::get('/user/unfollow/{userId}', [UserController::class, 'unfollow']);
    Route::get('/user/is_following/{followerId}', [UserController::class, 'isFollowing']);
    Route::get('/following-posts', [UserController::class, 'getFollowingPosts']);

    /* post */
    Route::resource('/post', PostController::class);

    /* likes */
    Route::resource('/like', LikeController::class);
    Route::post('/like/delete', [LikeController::class, 'removeLike']);

    /* commenti */
    Route::resource('/comment', CommentController::class);

    /* salvataggio post */
    Route::resource('/saved_post', SavedPostController::class);
    Route::post('/saved_post/delete', [SavedPostController::class, 'removeSavedPost']);
});