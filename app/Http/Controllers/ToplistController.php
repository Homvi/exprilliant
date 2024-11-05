<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ToplistController extends Controller
{
    // Render the toplist view at /toplist
    public function index(Request $request)
    {
        $users = User::where('experience', '>', 0)
            ->orderBy('experience', 'desc')
            ->get(['name', 'experience', 'id']); // Fetch only the necessary fields

        return Inertia::render('Toplist', [
            'users' => $users,
        ]);
    }

    // Provide the toplist data as JSON
    public function getToplistData(Request $request)
    {
        $users = User::where('experience', '>', 0)
            ->orderBy('experience', 'desc')
            ->get(['name', 'experience', 'id']);

        return response()->json($users);
    }
}
