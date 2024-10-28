<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GameController extends Controller
{

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        // Get users with experience > 0, sorted by experience in descending order
        $users = User::where('experience', '>', 0)
            ->orderBy('experience', 'desc')
            ->get(['name', 'experience']);  // Fetch only the name and experience fields


        return Inertia::render('Game', [
            'users' => $users, // Pass the users to the Toplist component
        ]);
    }
}
