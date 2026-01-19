<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Trip;
use App\Models\City;
use App\Http\Requests\StoreTripRequest;
use App\Http\Requests\UpdateTripRequest;
use App\Models\Activity;
use Carbon\Carbon;

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
        $trip->name = $request->input('tripName');
        $trip->start_date = $request->input('start_date');
        $trip->end_date = $request->input('end_date');
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
                'start_day' => $cityData['start_date'],
                'end_day' => $cityData['end_date'],
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
                        'lat' => $activityData['lat'],
                        'lng' => $activityData['lng'],
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
        $user = current_user();
        // O with('cities.activities') faz todo o trabalho de queryTrip e queryCities de uma vez
        $trip = Trip::where('id', $trip->id)
                ->where('user_id', $user->id)
                ->firstOrFail();

        $json = [
            'tripName' => $trip->name,
            'start_date' => $trip->start_date,
            'end_date' => $trip->end_date,
            'selectedCities' => []
        ];

        $cities = City::where('trip_id', $trip->id)->get();

        foreach ($cities as $city) {
            $startDate = Carbon::parse($city->start_day);
            $endDate = Carbon::parse($city->end_day);
            $cityData = [
                'name' => $city->name,
                'lat' => $city->lat,
                'lng' => $city->lng,
                'days' => $startDate->diffInDays($endDate) + 1,
                'day_array' => [],
                'start_date' => $city->start_day,
                'end_date' => $city->end_day,
            ];

            $activities = Activity::where('city_id', $city->id)
                            ->get();

            // Agrupe as atividades por dia_index
            $activitiesByDay = [];
            foreach ($activities as $activity) {
                $activitiesByDay[$activity->day_index][] = [
                    'place_id' => $activity->place_id,
                    'name' => $activity->name,
                    'rating' => $activity->rating,
                    'cost' => $activity->cost,
                    'priceLevel' => $activity->priceLevel,
                    'address' => $activity->address,
                    'lat' => $activity->lat,
                    'lng' => $activity->lng,
                ];
            }

            // Construa o day_array
            foreach ($activitiesByDay as $dayIndex => $activitiesForDay) {
                $cityData['day_array'][] = [
                    'activities' => $activitiesForDay
                ];
            }

            $json['selectedCities'][] = $cityData;
        }

        return response()->json($json);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTripRequest $request, Trip $trip)
    {
        $user = current_user();

        $newTrip = new Trip();
        $newTrip->user_id = $user->id;
        $newTrip->name = $request->input('tripName');
        $newTrip->start_date = $request->input('start_date');
        $newTrip->end_date = $request->input('end_date');
        $days = 0;

        $cities = $request->input('selectedCities', []);

        foreach ($cities as $cityData => $city) {
            $day_array = $city['day_array'];
            $days += count($day_array);
        }

        $newTrip->days = $days;
        $newTrip->save();

        foreach ($cities as $cityData) {
            $city = $newTrip->cities()->create([
                'name' => $cityData['name'],
                'lat' => $cityData['lat'],
                'lng' => $cityData['lng'],
                'start_day' => $cityData['start_date'],
                'end_day' => $cityData['end_date'],
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
                        'lat' => $activityData['lat'],
                        'lng' => $activityData['lng'],
                    ]);
                }
            }
        }

        Trip::destroy($trip->id);

        return redirect()->route('travels.index');
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
