<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Post;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function user_auth()
    {
        return Auth::user()->load(['followers', 'followings', 'posts.likes', 'posts.comments' => function ($query) {
            $query->with('user')->orderBy('created_at', 'desc');
        }, 'likesUser', 'savedPosts.user']);
    }

    public function getFollowingPosts(Request $request){
        $authenticatedUser = Auth::user();

        // Ottieni gli ID degli utenti seguiti dall'utente loggato
        $followingIds = $authenticatedUser->followings()->pluck('users.id');

        // Aggiungi l'ID dell'utente loggato per ottenere anche i propri post
        $followingIds[] = $authenticatedUser->id;

        // Ottieni i post dei seguiti e del proprio utente
        $posts = Post::whereIn('user_id', $followingIds)
                    ->with('user', 'likes', 'comments.user')
                    ->orderBy('created_at', 'desc')
                    ->offset($request->input('offset', 0))
                    ->limit($request->input('limit', 10))
                    ->get();

        return $posts;
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
                ->with('posts.likes')
                ->with(['posts.comments' => function ($query) {
                    // Ordina i commenti per data decrescente, se necessario
                    $query->with('user')->orderBy('created_at', 'desc');
                }])
                ->with('followings')
                ->with('savedPosts')
                ->where(function ($query) use ($request) {
                    $query->where("username", "like", "%" . $request->input('query') . "%")
                        ->orWhere("name", "like", "%" . $request->input('query') . "%")
                        ->orWhere("id", $request->input('id'));
                });


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
    public function show(string $id)
    {
        $users = User::with('followers')
        ->with('posts.likes')
        ->with(['posts.comments' => function ($query) {
            // Ordina i commenti per data decrescente, se necessario
            $query->with('user')->orderBy('created_at', 'desc');
        }])
        ->with('followings')
        ->with('savedPosts')
        ->where("id", "=", $id)
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
