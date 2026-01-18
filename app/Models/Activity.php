<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    /** @use HasFactory<\Database\Factories\ActivityFactory> */
    use HasFactory;

    protected $fillable = [
        'place_id',
        'day_index',
        'name',
        'rating',
        'cost',
        'priceLevel',
        'address',
        'lat',
        'lng'
    ];

    protected $casts = [
        'cost' => 'array', // Converte o Array do PHP para JSON ao salvar e vice-versa
    ];
}
