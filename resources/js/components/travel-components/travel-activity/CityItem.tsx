import usePlacesAutocomplete from "use-places-autocomplete";
import { useEffect, useState } from "react";
import { City } from "./City";
import { Activity } from "./Activity";

interface CityItemProps {
    city: City;
    onAddActivity: (dayIndex: number, activity: Activity) => void;
    onRemoveActivity: (dayIndex: number, activityIndex: number) => void;
    onRemoveCity: () => void;
    onSetCenter: (center: { lat: number; lng: number }) => void;
    onSetZoom: (zoom: number) => void;
}

const Prices = {
    0: ['Grátis', { min: 0, max: 0 }],
    1: ['Econômico', { min: 20, max: 50 }],
    2: ['Médio', { min: 60, max: 100 }],
    3: ['Caro', { min: 110, max: 200 }],
    4: ['Luxo', { min: 200, max: 1000 }],
} as const;

export default function CityItem({ city, onAddActivity, onRemoveActivity, onRemoveCity, onSetCenter, onSetZoom }: CityItemProps) {
    const [activeDay, setActiveDay] = useState(0);

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Date(
            date.getTime() + date.getTimezoneOffset() * 60000,
        ).toLocaleDateString('pt-BR');
    };

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            types: ['establishment'],
            location: new google.maps.LatLng(city.lat, city.lng),
            radius: 10000,
        },
        debounce: 300,
        cache: 0,
    });

    const filteredData = data.filter(suggestion => {
        const descLower = suggestion;
        return descLower;
    });

    const handlePlaceSelect = (placeId: string) => {
        if (!window.google) return;
        const service = new google.maps.places.PlacesService(
            document.createElement('div'),
        );

        service.getDetails({
            placeId,
            fields: ['name', 'rating', 'price_level', 'formatted_address', 'place_id', 'geometry']
        }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                const googlePrice = place.price_level;
                const safePriceKey = (typeof googlePrice === 'number' && googlePrice in Prices) ? (googlePrice as keyof typeof Prices) : 0;

                let finalLat = 0;
                let finalLng = 0;

                if (place.geometry?.location) {
                    // Forma padrão: chamando as funções
                    finalLat = place.geometry.location.lat();
                    finalLng = place.geometry.location.lng();
                } else if (place.geometry?.viewport) {
                    // Fallback: Centro do Viewport
                    const ne = place.geometry.viewport.getNorthEast();
                    const sw = place.geometry.viewport.getSouthWest();
                    finalLat = (ne.lat() + sw.lat()) / 2;
                    finalLng = (ne.lng() + sw.lng()) / 2;
                }

                const newActivity: Activity = {
                    place_id: place.place_id || "",
                    name: place.name || "",
                    lat: finalLat,
                    lng: finalLng,
                    rating: place.rating,
                    priceLevel: googlePrice,
                    cost: Prices[safePriceKey][1],
                    address: place.formatted_address,
                };

                    onAddActivity(activeDay, newActivity);
                    setValue('');
                    clearSuggestions();
                }
            },
        );
    };

    const handleActivityCenter = (activity: Activity) => {
        if (activity.lat && activity.lng) {
            onSetCenter({ lat: activity.lat, lng: activity.lng });
            onSetZoom(20);
        }
    };

    return (
        // CARD
        <div className="rounded-xl border-l-4 border-[#ffe2b6] bg-[#2f180382] border-1 p-4 shadow-lg transition-all">
            <div className="mb-3 flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-white">
                        {city.name.split(',')[0]}
                    </h3>
                    <span className="text-[10px] font-semibold text-[#ffffffd0] uppercase">
                        {city.days} dias de estadia
                    </span>
                    {/* Container de Datas Estilizado */}
                    <div className="mt-1 flex items-center gap-3">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold tracking-tighter text-[#ffffffad] uppercase">
                                Início
                            </span>
                            <span className="rounded border border-[#ffe8c55d] bg-[#261701] px-2 py-0.5 font-mono text-xs text-slate-300">
                                {formatDate(city.start_date)}
                            </span>
                        </div>

                        <div className="mt-3 text-[#ffe8c5b6]">→</div>

                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold tracking-tighter text-[#ffffffad] uppercase">
                                Término
                            </span>
                            <span className="rounded border border-[#ffe8c55d] bg-[#261701] px-2 py-0.5 font-mono text-xs text-slate-300">
                                {formatDate(city.end_date)}
                            </span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onRemoveCity}
                    className="text-white transition-colors hover:text-red-500"
                >
                    ✕
                </button>
            </div>

            {/* Abas de DIAS */}
            <div className="no-scrollbar mb-3 flex flex-nowrap gap-1 overflow-x-auto pb-2">
                {city.day_array?.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveDay(index)}
                        className={`rounded-md px-3 py-1 text-[10px] font-bold whitespace-nowrap transition-all ${activeDay === index ? 'bg-[#ffe8c5e7] text-black' : 'bg-[#ffe8c52b] text-[#ffe8c5c5] hover:bg-[#ffe8c55d]'}`}
                    >
                        Dia {index + 1}
                    </button>
                ))}
            </div>

            {/* Busca de Atividades */}
            <div className="relative mb-3">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    placeholder={`Adicionar ao Dia ${activeDay + 1}...`}
                    className="w-full rounded-lg border border-[#ffe8c55d] bg-[#261701] p-2 text-xs text-white outline-none focus:border-[#ffe8c5]"
                />
                {status === "OK" && (
                    <ul className="absolute z-30 w-full bg-[#261701] border border-[#ffe8c55d] mt-1 rounded-lg shadow-2xl max-h-40 overflow-y-auto">
                        {filteredData.map(({ place_id, description }) => (
                            <li key={place_id} onClick={() => handlePlaceSelect(place_id)} className="p-2 text-[10px] hover:bg-[#ffe2b625] cursor-pointer border-b border-[#ffe8c55d] last:border-none">
                                <span className="font-bold block text-white">{description.split(',')[0]}</span>
                                <span className="text-[#ffffffb4]">{description.split(',').slice(1).join(',')}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Lista de Atividades do Dia */}
            <div className="space-y-2 pr-1">
                {city.day_array?.[activeDay]?.activities.map((act, idx) => (
                    <div key={idx} className="bg-[#261701] p-2 rounded-lg border border-[#ffe8c55d] flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <span onClick={() => {handleActivityCenter(act)}} className="font-bold text-[#ffe8c5] text-[11px] truncate hover:underline hover:cursor-pointer">{act.name}</span>
                            <button onClick={() => onRemoveActivity(activeDay, idx)} className="text-[#ffffffb8] hover:text-red-400 text-xs">✕</button>
                        </div>
                        <div className="flex gap-2 text-[9px] font-medium">
                            {act.rating && (
                                <span className="text-yellow-500">
                                    ★ {act.rating}
                                </span>
                            )}
                            {act.priceLevel !== undefined && (
                                <span className="text-green-500">
                                    {'$'.repeat(act.priceLevel || 1)}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
                {city.day_array?.[activeDay]?.activities.length === 0 && (
                    <p className="py-2 text-center text-[10px] text-[#ffffffb8] italic">
                        Nenhuma atividade no Dia {activeDay + 1}
                    </p>
                )}
            </div>
        </div>
    );
}
