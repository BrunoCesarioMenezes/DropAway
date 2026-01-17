import usePlacesAutocomplete from "use-places-autocomplete";
import { City } from "./City";

interface CityItemProps {
    city: City;
    onAddActivity: (activity: string) => void;
    onRemoveCity: () => void;
}

export default function CityItem({ city, onAddActivity, onRemoveCity }: CityItemProps) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            types: ['establishment'],
            locationRestriction: {
                east: city.lng + 0.05,
                west: city.lng - 0.05,
                north: city.lat + 0.05,
                south: city.lat - 0.05,
            },
        },
        debounce: 300,
    });

    return (
        <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-blue-500 shadow-md">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-bold text-lg">{city.name}</h3>
                    <span className="text-xs bg-blue-900 text-blue-200 px-2 py-0.5 rounded">
                        {city.days} dias
                    </span>
                </div>
                <button 
                    onClick={onRemoveCity}
                    className="text-slate-500 hover:text-red-500 transition-colors"
                >
                    ✕
                </button>
            </div>

            <div className="relative mt-2">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    placeholder="Buscar atrações/restaurantes..."
                    className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-sm focus:outline-none focus:border-blue-400"
                />

                {status === "OK" && (
                    <ul className="absolute z-20 w-full bg-slate-700 border border-slate-600 mt-1 rounded shadow-xl max-h-40 overflow-y-auto">
                        {data.map(({ place_id, description }) => (
                            <li
                                key={place_id}
                                onClick={() => {
                                    onAddActivity(description);
                                    setValue("");
                                    clearSuggestions();
                                }}
                                className="p-2 text-xs hover:bg-slate-600 cursor-pointer border-b border-slate-600 last:border-none"
                            >
                                {description}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
                {city.activities.map((act, idx) => (
                    <div 
                        key={idx}
                        className="bg-slate-900 text-slate-300 text-[10px] px-2 py-1 rounded border border-slate-700 flex items-center gap-1"
                    >
                        <span className="truncate max-w-[150px]">{act.split(',')[0]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}