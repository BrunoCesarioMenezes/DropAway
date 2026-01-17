<?php

namespace Database\Factories;

use App\Models\City;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
{
    public function definition(): array
    {
        return [
            // catchPhrase ou company costumam parecer nomes de lugares/atrações
            'name' => fake()->company(), 
            'description' => fake()->paragraph(),
            'rating' => fake()->randomFloat(1, 1, 5), // Ex: 4.5
            // Gera um valor aleatório e converte para string
            'cost' => (string) fake()->randomFloat(2, 0, 500), 
            // Cria uma City automaticamente se não for passada
            'city_id' => City::factory(),
        ];
    }
}
