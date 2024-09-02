<?php

use function Pest\Laravel\get;

it('"/" returns status 200', function () {
    $response = get('/');
    $response->assertStatus(200, "Expected '/' to return status 200, got {$response->status()}.");
});

it('"/choose-game-mode" returns status 200', function () {
    $response = get('/choose-game-mode');
    $response->assertStatus(200, "Expected '/choose-game-mode' to return status 200, got {$response->status()}.");
});

it('"/game" returns 2status 00', function () {
    $response = get('/game');
    $response->assertStatus(200, "Expected '/game' to return status 200, got {$response->status()}.");
});

it('"/login" returns status 200', function () {
    $response = get('/login');
    $response->assertStatus(200, "Expected '/login' to return status 200, got {$response->status()}.");
});

it('"/register" returns status 200', function () {
    $response = get('/register');
    $response->assertStatus(200, "Expected '/register' to return status 200, got {$response->status()}.");
});
