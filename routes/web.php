<?php

use App\Http\Controllers\ExpressionController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home');
});



Route::get('/choose-game-mode', function () {
    return Inertia::render('ChooseGameMode');
});

Route::get('/game', function () {
    return Inertia::render('Game');
});

Route::get('/random-expressions', [ExpressionController::class, 'getRandomExpressions']);


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth', 'verified')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/request-new-expression', [ExpressionController::class, 'create'])->name('expressions.create');
    Route::post('/expressions', [ExpressionController::class, 'store'])->name('expressions.store');
});

require __DIR__ . '/auth.php';
