import usePlacesAutocomplete from "use-places-autocomplete";
import { useState } from "react";
import { City } from "./City";

interface CityItemProps {
    city: City;
    // Atualizado para receber o índice do dia
    onAddActivity: (dayIndex: number, activity: string) => void;
    onRemoveCity: () => void;
}

export default function CityItem({ city, onAddActivity, onRemoveCity }: CityItemProps) {
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
                {city.activities.map((_, index) => (
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
                                    // Adiciona a atividade no dia ATIVO
                                    onAddActivity(activeDay, description);
                                    setValue("");
                                    clearSuggestions();
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
                    {/* Verificamos se existem atividades para o dia ativo antes de mapear */}
                    {city.activities[activeDay] && city.activities[activeDay].length > 0 ? (
                        city.activities[activeDay].map((act, idx) => (
                            <div
                                key={idx}
                                className="bg-slate-900 text-slate-300 text-xs px-3 py-2 rounded border border-slate-700 flex items-center justify-between group"
                            >
                                <span className="truncate pr-2">{act.split(',')[0]}</span>
                                {/* Botão de remover atividade específica (opcional para o futuro) */}
                                {/* <button className="opacity-0 group-hover:opacity-100 text-red-400">×</button> */}
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-slate-600 italic text-center py-2">
                            Nenhuma atividade neste dia.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
