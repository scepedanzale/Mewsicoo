<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response
    {/* 
        $request->validate([
            'name' => ['string', 'max:255', 'nullable'],
            'username' => ['required', 'string', 'lowercase', 'max:50', 'unique:'.User::class],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'birth_day' => ['nullable', 'date'],
            'biography' => ['nullable', 'string'],
            'profile_img' => ['nullable', 'image', 'max:2048'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'birth_day' => $request->birth_day,
            'biography' => $request->biography,
            'is_admin' => false,
            'profile_img' => $request->profile_img
        ]); 

        event(new Registered($user));

        Auth::login($user); */

        return response(['message' => 'utente registrato'], Response::HTTP_OK);
    }
}
