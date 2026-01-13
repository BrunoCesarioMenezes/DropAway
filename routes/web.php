<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\AnyRoleMiddleware;
use App\Http\Middleware\UserMiddleware;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;


Route::middleware(AnyRoleMiddleware::class)->group(function () {

});

Route::middleware(UserMiddleware::class)->group(function () {
    Route::get('/travels', function () {
        return Inertia::render('User/Travels');
    })->name('travels');
});

Route::middleware(AdminMiddleware::class)->prefix('admin')->name('admin.')
->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');

        Route::get('/users', [UserController::class, 'index'])
            ->name('users.index');

        Route::get('/users/{id}/edit', [UserController::class, 'edit'])
            ->name('users.edit');

        Route::put('/users/{id}', [UserController::class, 'update'])
            ->name('users.update');

        Route::delete('/users/{id}', [UserController::class, 'destroy'])
            ->name('users.destroy');

        Route::post('/users', [UserController::class, 'store'])
            ->name('users.store');

    });

Route::get('/error', function () {
    return Inertia::render('error/ErrorPage');
})->name('error');

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

require __DIR__.'/auth.php';
Route::get('/teste', function () {
    return Inertia::render('teste');
})->name('teste');

require __DIR__.'/settings.php';
