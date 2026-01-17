<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trip>
 */
class TripFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(3), // Ex: "Férias de Verão 2024"
            'days' => fake()->numberBetween(3, 20),
            // Cria um usuário novo se não for passado um id
            'user_id' => User::factory(), 
        ];
    }
}