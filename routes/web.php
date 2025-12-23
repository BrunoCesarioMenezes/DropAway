<?php

use App\Http\Controllers\LoginController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\AnyRoleMiddleware;
use App\Http\Middleware\UserMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::middleware(AnyRoleMiddleware::class)->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(UserMiddleware::class)->group(function () {

});

Route::middleware(AdminMiddleware::class)->prefix('admin')->group(function () {

});



Route::get('/error', function () {
    return Inertia::render('error/ErrorPage');
})->name('error');

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
