<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function user_auth()
    {
        return Auth::user()->load('followers', 'followings', 'posts');
    }

    public function index(Request $request)
    {
        $query = User::with('followers')
                ->with('posts')
                ->with('followings');

        if ($request->has('username')) {
            $query->where("username", "=", $request->input('username'));
        }

        $users = $query->get();
        $authenticatedUser = Auth::user();
        $users->each(function ($user) use ($authenticatedUser) {
            $user->is_following = $authenticatedUser->isFollowing($user->id);
        });

        return $users;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $username)
    {
        $users = User::with('followers')
        ->with('posts')
        ->with('followings')
        ->where("username", "=", $username)
        ->get();

        $authenticatedUser = Auth::user();
        $users->each(function ($user) use ($authenticatedUser) {
            $user->is_following = $authenticatedUser->isFollowing($user->id);
        });

        return $users;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    // check follow
    public function isFollowing($followerId)
    {
        $user = Auth::user();
        $isFollowing = $user->followings()->where('user_id', $followerId)->exists();
        return response()->json(['is_following' => $isFollowing]);
    }

    // follow a user
    public function follow($userId)
    {
        $user = Auth::user();
        $user->followings()->attach($userId);
        return response()->json(['message' => 'Successfully followed user']);
    }

    // unfollow a user
    public function unfollow($userId)
    {
        $user = Auth::user();
        $user->followings()->detach($userId);
        return response()->json(['message' => 'Successfully unfollowed user']);
    }
}
