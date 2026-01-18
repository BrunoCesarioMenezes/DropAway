<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    /** @use HasFactory<\Database\Factories\CityFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'lat',
        'lng',
        'start_day',
        'end_day',
        'trip_id',
    ];

    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }
}
