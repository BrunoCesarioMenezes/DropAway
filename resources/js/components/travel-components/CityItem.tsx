import usePlacesAutocomplete from "use-places-autocomplete";
import { useEffect, useState } from "react";
import { City } from "./City";
import { Activity } from "./Activity";

interface CityItemProps {
    city: City;
    onAddActivity: (dayIndex: number, activity: Activity) => void;
    onRemoveActivity: (dayIndex: number, activityIndex: number) => void;
    onRemoveCity: () => void;
}

const Prices = {
    0: ["Grátis", { min: 0, max: 0 }],
    1: ["Econômico", { min: 20, max: 50 }],
    2: ["Médio", { min: 60, max: 100 }],
    3: ["Caro", { min: 110, max: 200 }],
    4: ["Luxo", { min: 200, max: 1000 }],
} as const;

export default function CityItem({ city, onAddActivity, onRemoveActivity, onRemoveCity }: CityItemProps) {
    const [activeDay, setActiveDay] = useState(0);

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
        init
    } = usePlacesAutocomplete({
        requestOptions: {
            types: ['establishment'],
            location: new google.maps.LatLng(city.lat, city.lng),
            radius: 20000,
        },
        debounce: 300,
        cacheKey: city.name
    });
    const handlePlaceSelect = (placeId: string) => {
        if (!window.google) return;
        const service = new google.maps.places.PlacesService(document.createElement('div'));

        service.getDetails({
            placeId,
            fields: ['name', 'rating', 'price_level', 'formatted_address', 'place_id']
        }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                const googlePrice = place.price_level;
                const safePriceKey = (typeof googlePrice === 'number' && googlePrice in Prices) ? (googlePrice as keyof typeof Prices) : 0;

                const newActivity: Activity = {
                    place_id: place.place_id || "",
                    name: place.name || "",
                    rating: place.rating,
                    priceLevel: googlePrice,
                    cost: Prices[safePriceKey][1],
                    address: place.formatted_address,
                };

                onAddActivity(activeDay, newActivity);
                setValue("");
                clearSuggestions();
            }
        });
    };

    return (
        <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-blue-500 shadow-lg transition-all">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-bold text-lg text-white">{city.name.split(',')[0]}</h3>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                        {city.days} dias de estadia
                    </span>
                </div>
                <button onClick={onRemoveCity} className="text-slate-500 hover:text-red-500 transition-colors">✕</button>
            </div>

            {/* Abas */}
            <div className="flex gap-1 overflow-x-auto pb-2 mb-3 no-scrollbar flex-nowrap">
                {city.day_array?.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveDay(index)}
                        className={`px-3 py-1 text-[10px] rounded-md font-bold transition-all whitespace-nowrap
                            ${activeDay === index ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-400 hover:bg-slate-600"}`}
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
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-blue-400 outline-none"
                />
                {status === "OK" && (
                    <ul className="absolute z-30 w-full bg-slate-700 border border-slate-600 mt-1 rounded-lg shadow-2xl max-h-40 overflow-y-auto">
                        {data.map(({ place_id, description }) => (
                            <li key={place_id} onClick={() => handlePlaceSelect(place_id)} className="p-2 text-[10px] hover:bg-slate-600 cursor-pointer border-b border-slate-600 last:border-none">
                                <span className="font-bold block text-white">{description.split(',')[0]}</span>
                                <span className="text-slate-400">{description.split(',').slice(1).join(',')}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Lista de Atividades do Dia */}
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                {city.day_array?.[activeDay]?.activities.map((act, idx) => (
                    <div key={idx} className="bg-slate-900/50 p-2 rounded-lg border border-slate-700 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-blue-300 text-[11px] truncate">{act.name}</span>
                            <button onClick={() => onRemoveActivity(activeDay, idx)} className="text-slate-600 hover:text-red-400 text-xs">✕</button>
                        </div>
                        <div className="flex gap-2 text-[9px] font-medium">
                            {act.rating && <span className="text-yellow-500">★ {act.rating}</span>}
                            {act.priceLevel !== undefined && <span className="text-green-500">{"$".repeat(act.priceLevel || 1)}</span>}
                        </div>
                    </div>
                ))}
                {city.day_array?.[activeDay]?.activities.length === 0 && (
                    <p className="text-[10px] text-slate-500 italic text-center py-2">Nenhuma atividade no Dia {activeDay + 1}</p>
                )}
            </div>
        </div>
    );
}
