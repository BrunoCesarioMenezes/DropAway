<?php

if (!function_exists('is_admin')) {
    /**
     * Check if the currently authenticated user is an admin.
     *
     * @return bool
     */
    function is_admin(): bool
    {
        return auth()->guard('admin')->check();
    }
}

if (!function_exists('is_user')) {
    /**
     * Check if the currently authenticated user is a regular user.
     *
     * @return bool
     */
    function is_user(): bool
    {
        return auth()->guard('web')->check();
    }
}

if (!function_exists('current_user')) {
    /**
     * Get the currently authenticated user, regardless of guard.
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    function current_user()
    {
        if (auth()->guard('admin')->check()) {
            return auth()->guard('admin')->user();
        }

        if (auth()->guard('web')->check()) {
            return auth()->guard('web')->user();
        }

        return null;
    }
}

if(!function_exists('current_role')) {
    /**
     * Get the guard of the currently authenticated user.
     *
     * @return string|null
     */
    function current_role(): ?string
    {
        if (auth()->guard('admin')->check()) {
            return 'admin';
        }

        if (auth()->guard('web')->check()) {
            return 'user';
        }

        return null;
    }
}
