<?php

namespace Database\Factories;

use App\Models\Trip;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\City>
 */
class CityFactory extends Factory
{
    public function definition(): array
    {
        // Define uma data de início aleatória num futuro próximo
        $startDate = fake()->dateTimeBetween('now', '+1 year');
        
        // Clona a data para definir o fim, garantindo que seja depois do início
        $endDate = (clone $startDate)->modify('+' . fake()->numberBetween(1, 5) . ' days');

        return [
            'name' => fake()->city(),
            'lat' => (string) fake()->latitude(), // Cast para string conforme sua migration
            'lng' => (string) fake()->longitude(),
            'start_day' => $startDate,
            'end_day' => $endDate,
            // Cria uma Trip automaticamente se não for passada
            'trip_id' => Trip::factory(), 
        ];
    }
}
