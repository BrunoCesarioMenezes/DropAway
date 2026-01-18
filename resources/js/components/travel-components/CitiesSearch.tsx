import { useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { City } from './City';

export default function CitiesSearch({ onSelectCity }: { onSelectCity: (cityData: City) => void }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: { types: ['(cities)'] },
        debounce: 300,
    });

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSelect = async (description: string) => {
        if (!startDate || !endDate) return alert("Selecione o período!");
        
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffDays = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        if (diffDays <= 0) return alert("Data inválida!");

        setValue(description, false);
        clearSuggestions();

        const results = await getGeocode({ address: description });
        const { lat, lng } = await getLatLng(results[0]);

        onSelectCity({
            name: description,
            lat, lng, days: diffDays,
            day_array: Array.from({ length: diffDays }, () => ({ activities: [] })),
            start_date: startDate,
            end_date: endDate,
        });

        setValue('');
        setStartDate('');
        setEndDate('');
    };

    return (
        <div className="relative w-full z-30">
            {/* Container principal mais compacto e escuro para combinar com o tema */}
            <div className="flex flex-row items-center bg-slate-800 rounded-xl border border-slate-700 p-1 shadow-inner">
                
                {/* Input da Cidade */}
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    className="flex-[2] bg-transparent p-3 text-sm text-white outline-none placeholder-slate-500"
                    placeholder="Para onde você vai?"
                />

                {/* Divisor */}
                <div className="w-px h-8 bg-slate-700 mx-1" />

                {/* Seção de Datas */}
                <div className="flex flex-[1.5] items-center gap-1 px-2">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-transparent text-[11px] text-blue-400 font-bold outline-none w-full appearance-none uppercase"
                    />
                    <span className="text-slate-600 text-xs">→</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-transparent text-[11px] text-blue-400 font-bold outline-none w-full appearance-none uppercase"
                    />
                </div>
            </div>

            {/* Lista de sugestões corrigida */}
            {status === 'OK' && (
                <ul className="absolute z-50 mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg shadow-2xl overflow-hidden">
                    {data.map(({ place_id, description }) => (
                        <li
                            key={place_id}
                            onClick={() => handleSelect(description)}
                            className="p-3 text-sm text-slate-300 hover:bg-slate-700 cursor-pointer border-b border-slate-700 last:border-none transition-colors"
                        >
                            <span className="font-bold text-white">{description.split(',')[0]}</span>
                            <span className="text-xs text-slate-500 ml-2">{description.split(',').slice(1).join(',')}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}