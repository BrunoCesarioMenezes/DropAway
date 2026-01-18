import { useState } from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { Activity } from './Activity';
import { City } from './City';

interface CityItemProps {
    city: City;
    onAddActivity: (dayIndex: number, activity: Activity) => void;
    onRemoveActivity: (dayIndex: number, activityIndex: number) => void;
    onRemoveCity: () => void;
}

const Prices = {
    0: ['Grátis', { min: 0, max: 0 }],
    1: ['Econômico', { min: 20, max: 50 }],
    2: ['Médio', { min: 60, max: 100 }],
    3: ['Caro', { min: 110, max: 200 }],
    4: ['Luxo', { min: 200, max: 1000 }],
} as const;

export default function CityItem({
    city,
    onAddActivity,
    onRemoveActivity,
    onRemoveCity,
}: CityItemProps) {
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
        init,
    } = usePlacesAutocomplete({
        requestOptions: {
            types: ['establishment'],
            location: new google.maps.LatLng(city.lat, city.lng),
            radius: 20000,
        },
        debounce: 300,
        cacheKey: city.name,
    });
    const handlePlaceSelect = (placeId: string) => {
        if (!window.google) return;
        const service = new google.maps.places.PlacesService(
            document.createElement('div'),
        );

        service.getDetails(
            {
                placeId,
                fields: [
                    'name',
                    'rating',
                    'price_level',
                    'formatted_address',
                    'place_id',
                ],
            },
            (place, status) => {
                if (
                    status === google.maps.places.PlacesServiceStatus.OK &&
                    place
                ) {
                    const googlePrice = place.price_level;
                    const safePriceKey =
                        typeof googlePrice === 'number' && googlePrice in Prices
                            ? (googlePrice as keyof typeof Prices)
                            : 0;

                    const newActivity: Activity = {
                        place_id: place.place_id || '',
                        name: place.name || '',
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

    return (
        <div className="rounded-xl border-l-4 border-blue-500 bg-slate-800 p-4 shadow-lg transition-all">
            <div className="mb-3 flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-white">
                        {city.name.split(',')[0]}
                    </h3>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">
                        {city.days} dias de estadia
                    </span>
                    {/* Container de Datas Estilizado */}
                    <div className="mt-1 flex items-center gap-3">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold tracking-tighter text-slate-500 uppercase">
                                Início
                            </span>
                            <span className="rounded border border-slate-700 bg-slate-900/50 px-2 py-0.5 font-mono text-xs text-slate-300">
                                {formatDate(city.start_date)}
                            </span>
                        </div>

                        <div className="mt-3 text-slate-600">→</div>

                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold tracking-tighter text-slate-500 uppercase">
                                Término
                            </span>
                            <span className="rounded border border-slate-700 bg-slate-900/50 px-2 py-0.5 font-mono text-xs text-slate-300">
                                {formatDate(city.end_date)}
                            </span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onRemoveCity}
                    className="text-slate-500 transition-colors hover:text-red-500"
                >
                    ✕
                </button>
            </div>

            {/* Abas */}
            <div className="no-scrollbar mb-3 flex flex-nowrap gap-1 overflow-x-auto pb-2">
                {city.day_array?.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveDay(index)}
                        className={`rounded-md px-3 py-1 text-[10px] font-bold whitespace-nowrap transition-all ${activeDay === index ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
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
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-xs text-white outline-none focus:border-blue-400"
                />
                {status === 'OK' && (
                    <ul className="absolute z-30 mt-1 max-h-40 w-full overflow-y-auto rounded-lg border border-slate-600 bg-slate-700 shadow-2xl">
                        {data.map(({ place_id, description }) => (
                            <li
                                key={place_id}
                                onClick={() => handlePlaceSelect(place_id)}
                                className="cursor-pointer border-b border-slate-600 p-2 text-[10px] last:border-none hover:bg-slate-600"
                            >
                                <span className="block font-bold text-white">
                                    {description.split(',')[0]}
                                </span>
                                <span className="text-slate-400">
                                    {description.split(',').slice(1).join(',')}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Lista de Atividades do Dia */}
            <div className="custom-scrollbar max-h-40 space-y-2 overflow-y-auto pr-1">
                {city.day_array?.[activeDay]?.activities.map((act, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col gap-1 rounded-lg border border-slate-700 bg-slate-900/50 p-2"
                    >
                        <div className="flex items-center justify-between">
                            <span className="truncate text-[11px] font-bold text-blue-300">
                                {act.name}
                            </span>
                            <button
                                onClick={() => onRemoveActivity(activeDay, idx)}
                                className="text-xs text-slate-600 hover:text-red-400"
                            >
                                ✕
                            </button>
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
                    <p className="py-2 text-center text-[10px] text-slate-500 italic">
                        Nenhuma atividade no Dia {activeDay + 1}
                    </p>
                )}
            </div>
        </div>
    );
}
