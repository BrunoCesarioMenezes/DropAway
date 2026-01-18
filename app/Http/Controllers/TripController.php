<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Trip;
use App\Models\City;
use App\Http\Requests\StoreTripRequest;
use App\Http\Requests\UpdateTripRequest;

class TripController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = current_user();
        $trips = Trip::where('user_id', $user->id)
                ->with('cities')
                ->orderBy('created_at', 'desc')
                ->get();

        return Inertia::render('User/Travels', [
            'trips' => $trips
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTripRequest $request)
    {
        $user = current_user();

        $trip = new Trip();
        $trip->user_id = $user->id;
        $trip->name = 'Nova Viagem';
        $days = 0;

        $cities = $request->input('selectedCities', []);

        foreach ($cities as $cityData => $city) {
            $day_array = $city['day_array'];
            $days += count($day_array);
        }

        $trip->days = $days;
        $trip->save();

        foreach ($cities as $cityData ) {
            $city = $trip->cities()->create([
                'name' => $cityData['name'],
                'lat' => $cityData['lat'],
                'lng' => $cityData['lng'],
                'start_day' => now(),
                'end_day' => now(),
            ]);

            $day_array = $cityData['day_array'];

            foreach ($day_array as $index => $day) {
                foreach ($day['activities'] as $activityData) {
                    $city->activities()->create([
                        'place_id' => $activityData['place_id'],
                        'day_index' => $index,
                        'name' => $activityData['name'],
                        'rating' => $activityData['rating'],
                        'cost' => $activityData['cost'],
                        'priceLevel' => $activityData['priceLevel'] ?? null,
                        'address' => $activityData['address'],
                    ]);
                }
            }
        }

        return redirect()->route('travels.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Trip $trip)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Trip $trip)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTripRequest $request, Trip $trip)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Encontra a viagem do usuário logado ou falha
        $user = current_user();
        $trip = Trip::where('id', $id)
                ->where('user_id', $user->id)
                ->firstOrFail();

        $trip->delete();

        return redirect()->route('travels.index');
    }
}
