<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Trip;
use App\Http\Requests\StoreTripRequest;
use App\Http\Requests\UpdateTripRequest;

class TripController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Busca os dados (isso já está funcionando)
        $trips = auth()->user()->trips()
            ->with('cities')
            ->orderBy('created_at', 'desc')
            ->get();

        // ERRO ATUAL: return response()->json($trips);

        // CORREÇÃO: Renderizar o componente React
        // Nota: Baseado no seu web.php anterior, seu componente parece estar em 'User/Travels'
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
        //
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
        $trip = auth()->user()->trips()->findOrFail($id);

        $trip->delete();

        return redirect()->route('travels.index');
    }
}
