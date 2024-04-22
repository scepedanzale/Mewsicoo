<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSavedPostRequest;
use App\Http\Requests\UpdateSavedPostRequest;
use App\Models\SavedPost;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class SavedPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $saved_post = SavedPost::create([
            'user_id' => Auth::user()->id,
            'post_id' => $request->post_id,
            'created_at' => Carbon::now()
        ]);
        
        return response()->json(['message' => 'Saved successfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(SavedPost $savedPost)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SavedPost $savedPost)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSavedPostRequest $request, SavedPost $savedPost)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SavedPost $savedPost)
    {
        //
    }

    public function removeSavedPost(Request $request)
    {
        $saved_post = SavedPost::where('user_id', Auth::user()->id)
                    ->where('post_id', $request->post_id)
                    ->first();

        if ($saved_post) {
            $saved_post->delete();
            return response()->json(['message' => 'Saved post removed successfully'], 200);
        } else {
            return response()->json(['message' => 'Saved post not found'], 404);
        }
    }
}
