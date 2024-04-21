<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLikeRequest;
use App\Http\Requests\UpdateLikeRequest;
use Illuminate\Http\Request;
use App\Models\Like;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
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
         $like = Like::create([
            'user_id' => Auth::user()->id,
            'post_id' => $request->post_id,
            'created_at' => Carbon::now()
        ]);
        
        return response()->json(['message' => 'Like added successfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Like $like)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Like $like)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLikeRequest $request, Like $like)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        //
    }

    public function removeLike(Request $request)
    {
        $like = Like::where('user_id', Auth::user()->id)
                    ->where('post_id', $request->post_id)
                    ->first();

        if ($like) {
            $like->delete();
            return response()->json(['message' => 'Like removed successfully'], 200);
        } else {
            return response()->json(['message' => 'Like not found'], 404);
        }
    }
}
