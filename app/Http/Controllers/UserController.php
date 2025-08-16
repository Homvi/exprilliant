<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Ensure the User model is imported

class UserController extends Controller
{
    public function updateExperience(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user(); // Get the currently authenticated user
        $experienceToAdd = $request->input('experienceToAdd');

        // Add experienceToAdd to the user's existing experience
        $user->experience += $experienceToAdd;
        $user->save();

        return response()->json(['message' => 'Experience updated successfully.']);
    }
}
