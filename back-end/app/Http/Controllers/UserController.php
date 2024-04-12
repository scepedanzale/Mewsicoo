<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function user_auth()
    {
        return Auth::user()->load('followers', 'followings', 'posts');
    }

    public function change_password(Request $request)
    {
        $user = Auth::user();
        $oldPassword = $request->input('old_password');
        $newPassword = $request->input('password');
        $newPasswordConfirmation = $request->input('password_confirmation');

        if($newPassword === $oldPassword && $newPasswordConfirmation === $oldPassword){
            return response()->json(['error' => 'Non puoi impostare la nuova password uguale a quella vecchia.'], 422);
        }

        if (!Hash::check($oldPassword, $user->password)) {
            return response()->json(['error' => 'La vecchia password non è corretta'], 422);
        }

        if ($newPassword !== $newPasswordConfirmation) {
            return response()->json(['error' => 'La nuova password e la conferma della nuova password non corrispondono'], 422);
        }

        $user->password = bcrypt($newPassword);
        $user->save();

        return response()->json(['message' => 'Password cambiata con successo']);
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
    public function update(Request $request, User $user)
    {
        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('username')) {
            $user->username = $request->username;
        }
        if ($request->has('birth_day')) {
            $user->birth_day = $request->birth_day;
        }
        if ($request->has('biography')) {
            $user->biography = $request->biography;
        }
        if ($request->has('profile_img')) {
            $user->profile_img = $request->profile_img;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('password')) {
            $user->password = bcrypt($request->password);
        }
        if ($request->has('password_confirmation')) {
            // Verifica se la password di conferma corrisponde
            if ($request->password === $request->password_confirmation) {
                $user->password = bcrypt($request->password);
            } else {
                // Se la password di conferma non corrisponde, gestisci l'errore qui
                return response()->json(['error' => 'Le password non corrispondono'], 422);
            }
        }
    
        $user->update();

        return $user;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
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
