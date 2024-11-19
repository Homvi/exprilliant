<?php

use App\Http\Controllers\ChooseGameModeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpressionController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ToplistController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\InjectLocaleData;
use Illuminate\Support\Facades\Route;

/* Web Routes */

// Public Routes
Route::middleware([InjectLocaleData::class])->group(function () {
    Route::get('/', HomeController::class)->name('home');
    Route::get('/expressions', [ExpressionController::class, 'index'])->name('expressions.index');
    Route::get('/game', GameController::class)->name('game');
    Route::get('/choose-game-mode', ChooseGameModeController::class)->name('choose-game-mode');
    Route::get('/random-expressions', [ExpressionController::class, 'getRandomExpressions'])->name('expressions.random');
});

// Registered User Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });

    Route::post('/update-experience', [UserController::class, 'updateExperience']);

    Route::get('/toplist', [ToplistController::class, 'index'])->name('toplist');

    Route::get('/request-new-expression', [ExpressionController::class, 'create'])->name('expressions.create');
    Route::post('/expressions', [ExpressionController::class, 'store'])->name('expressions.store');

    Route::get('/dashboard', DashboardController::class)->name('dashboard');
});

// Admin Routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/unvalidated-expressions', [ExpressionController::class, 'adminIndex'])->name('expressions.index');
    Route::post('/expressions/{expression}/validate', [ExpressionController::class, 'validateExpression'])->name('expressions.validate');
    Route::delete('/expressions/{expression}', [ExpressionController::class, 'destroy'])->name('expressions.destroy');
});

// Authentication Routes
require __DIR__ . '/auth.php';
