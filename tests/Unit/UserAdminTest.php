<?php

use App\Models\User;

it('denies non-admin by default', function () {
    $user = new User(['email' => '  John@Example.com  ']);

    expect($user->isAdmin())->toBeFalse();
    expect($user->email)->toBe('john@example.com');
});

it('honors explicit admin flag', function () {
    $user = new User([
        'email' => 'admin@example.com',
        'is_admin' => true,
    ]);

    expect($user->isAdmin())->toBeTrue();
});

it('can be promoted to admin', function () {
    $user = new User(['email' => 'user@example.com']);
    expect($user->isAdmin())->toBeFalse();

    $user->is_admin = true;
    expect($user->isAdmin())->toBeTrue();
});
