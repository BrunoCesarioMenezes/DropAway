<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\User;
use App\Models\Trip;
use App\Models\City;
use App\Models\Activity;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Usuário fixo de teste
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'photo' => 'users/default.png',
            ]
        );

        // Admin fixo
        Admin::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Test Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // 20 usuários fake (apenas usuários comuns)
        User::factory()->count(20)->create();
        Trip::factory(5)
        ->create()
        ->each(function ($trip) {
            // Para cada viagem, cria 3 cidades
            City::factory(3)
                ->create(['trip_id' => $trip->id])
                ->each(function ($city) {
                    // Para cada cidade, cria 4 atividades
                    Activity::factory(4)->create(['city_id' => $city->id]);
                });
        });
    }
}
