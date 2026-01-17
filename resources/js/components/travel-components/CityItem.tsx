import usePlacesAutocomplete from "use-places-autocomplete";
import { useEffect, useState } from "react";
import { City } from "./City";
import { Activity } from "./Activity";

interface CityItemProps {
    city: City;
    // Atualizado para receber o índice do dia
    onAddActivity: (dayIndex: number, activity: Activity) => void;
    onRemoveActivity: (dayIndex: number, activityIndex: number) => void;
    onRemoveCity: () => void;
}

const Prices = {
    0: ["Grátis", { min: 0, max: 0 }],
    1: ["R$20-50", { min: 20, max: 50 }],
    2: ["R$60-100", { min: 60, max: 100 }],
    3: ["R$110-200", { min: 110, max: 200 }],
    4: ["R$200+", { min: 200, max: 1000 }],
    "unknown": ["Preço não informado", { min: 0, max: 0 }] // Chave de segurança
} as const;

export default function CityItem({ city, onAddActivity, onRemoveActivity, onRemoveCity }: CityItemProps) {
    // Estado para controlar qual dia (aba) está selecionado. Começa no dia 0 (Dia 1)
    const [activeDay, setActiveDay] = useState(0);

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

    useEffect(() => {
        // Quando a cidade mudar ou o componente montar, limpa resíduos de buscas anteriores
        setValue("");
        clearSuggestions();
    }, [city.name, city.lat, city.lng, setValue, clearSuggestions]);

    // Dentro do CityItem.tsx, antes do return
    const handlePlaceSelect = (placeId: string) => {
        if (!window.google) return;

        const service = new google.maps.places.PlacesService(document.createElement('div'));

        service.getDetails(
            {
                placeId: placeId,
                fields: ['name', 'rating', 'price_level', 'formatted_address', 'place_id']
            },
            (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && place) {

                    // 1. Validar se o price_level existe e se está mapeado no seu objeto Prices
                    // O Google retorna 0-4, mas locais sem dados retornam undefined.
                    const googlePrice = place.price_level;

                    // Verificamos se googlePrice é um número e se existe como chave em Prices
                    const hasValidPrice = typeof googlePrice === 'number' && googlePrice in Prices;

                    // Se não for válido, usamos a chave 0 (Grátis/Desconhecido) como fallback
                    const safePriceKey = hasValidPrice ? (googlePrice as keyof typeof Prices) : 0;

                    const newActivity: Activity = {
                        place_id: place.place_id || "",
                        name: place.name || "",
                        rating: place.rating,
                        priceLevel: googlePrice, // Mantemos o valor original (pode ser undefined)
                        // 2. Agora o acesso ao índice [1] é seguro, pois safePriceKey sempre existe
                        cost: Prices[safePriceKey][1],
                        address: place.formatted_address,
                    };

                    onAddActivity(activeDay, newActivity);
                    setValue("");
                    clearSuggestions();
                }
            }
        );
    };

    return (
        <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-blue-500 shadow-md transition-all">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-bold text-lg">{city.name}</h3>
                    <span className="text-xs text-slate-400">
                        {city.days} dias de viagem
                    </span>
                </div>
                <button
                    onClick={onRemoveCity}
                    className="text-slate-500 hover:text-red-500 transition-colors"
                >
                    ✕
                </button>
            </div>

            {/* --- ÁREA DAS ABAS (DIAS) --- */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-thin scrollbar-thumb-slate-600 flex-wrap">
                {/* Adicionado o '?' antes do .map */}
                {city.day_array?.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveDay(index)}
                        className={`
                            px-3 py-1 text-xs rounded-full whitespace-nowrap font-medium transition-colors
                            ${activeDay === index
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-slate-700 text-slate-400 hover:bg-slate-600"}
                        `}
                    >
                        Dia {index + 1}
                    </button>
                ))}
            </div>

            {/* --- INPUT DE BUSCA --- */}
            <div className="relative mt-2">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    // Feedback visual de qual dia está sendo editado
                    placeholder={`Adicionar ao Dia ${activeDay + 1}...`}
                    className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-sm focus:outline-none focus:border-blue-400 placeholder-slate-500"
                />

                {status === "OK" && (
                    <ul className="absolute z-20 w-full bg-slate-700 border border-slate-600 mt-1 rounded shadow-xl max-h-40 overflow-y-auto">
                        {data.map(({ place_id, description }) => (
                            <li
                                key={place_id}
                                onClick={() => {
                                    // CORREÇÃO: Chama a função que busca detalhes em vez de onAddActivity direto
                                    handlePlaceSelect(place_id);
                                }}
                                className="p-2 text-xs hover:bg-slate-600 cursor-pointer border-b border-slate-600 last:border-none"
                            >
                                <span className="font-bold block">{description.split(',')[0]}</span>
                                <span className="text-gray-400">{description.split(',').slice(1).join(',')}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* --- LISTA DE ATIVIDADES DO DIA SELECIONADO --- */}
            <div className="mt-4">
                <p className="text-[10px] uppercase text-slate-500 font-bold mb-2">
                    Roteiro - Dia {activeDay + 1}
                </p>

                <div className="flex flex-col gap-2">
                    {/* --- Dentro da LISTA DE ATIVIDADES --- */}
                {city.day_array?.[activeDay]?.activities.map((act, idx) => (
                    <div
                        key={idx}
                        className="bg-slate-900 text-slate-300 p-3 rounded border border-slate-700 flex flex-col gap-1 group"
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-blue-400 truncate pr-2">
                                {act.name}
                            </span>
                            <button
                                onClick={() => onRemoveActivity(activeDay, idx)}
                                className="text-slate-500 hover:text-red-500 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Exibição de Rating e Preço */}
                        <div className="flex gap-3 text-[10px]">
                            {act.rating && (
                                <span className="text-yellow-500 flex items-center gap-0.5">
                                    ★ {act.rating}
                                </span>
                            )}
                            {act.priceLevel !== undefined && (
                                <span className="text-green-500">
                                    {"$".repeat(act.priceLevel || 1)}
                                </span>
                            )}
                        </div>

                        {act.address && (
                            <span className="text-[10px] text-slate-500 truncate">
                                {act.address}
                            </span>
                        )}
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}
