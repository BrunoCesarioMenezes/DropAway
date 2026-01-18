import { useEffect, useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { City } from './City';
import { start } from 'repl';
import Alert from '@/components/Alert';

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

    const [alert, setAlert] = useState<{
        message: string;
        type: 'success' | 'error' | 'warning';
    } | null>(null);

    const handleSelect = async (description: string) => {
        if (!startDate || !endDate) return setAlert({
            message: 'Selecione o Período',
            type: 'success',
        })

        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffDays = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        if (diffDays <= 0) return setAlert({
            message: 'Data Inválida',
            type: 'success',
        })

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
            // Limpa tudo
        setValue('');
        setStartDate('');
        setEndDate('');
    };

    // colors: 1:bg-[#362312] 2: bg-[#f5c47a]

    return (
        <div className="relative w-full z-30">

            {/* ALERT */}
            {alert && (
                <Alert
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}

            {/* Container principal mais compacto e escuro para combinar com o tema */}
            <div className="flex flex-row items-center bg-[#ffe2b6] rounded-xl border border-black p-1 shadow-inner">

                {/* Input da Cidade */}
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    className="flex-[2] bg-transparent p-3 text-sm text-black outline-none placeholder-[#000000c3]"
                    placeholder="Para onde você vai?"
                />

                {/* Divisor */}
                <div className="w-px h-8 bg-[#5c2f00] mx-1" />
                {/* Seção de Datas */}
                <div className="flex flex-[1.5] items-center gap-1 px-2">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="date-input bg-transparent text-xs text-[#5c2f00] font-bold outline-none w-full appearance-none uppercase"
                    />
                    {/* Divisor */}
                    <div className="w-px h-8 bg-[#5c2f00] mx-1" />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="date-input bg-transparent text-xs text-[#5c2f00] font-bold outline-none w-full appearance-none uppercase"
                    />
                </div>
            </div>

            {/* Lista de sugestões corrigida */}
            {status === 'OK' && (
                <ul className="absolute z-50 mt-1 w-full bg-[#261701] border border-[#ffe8c55d] rounded-lg shadow-2xl overflow-hidden">
                    {data.map(({ place_id, description }) => (
                        <li
                            key={place_id}
                            onClick={() => handleSelect(description)}
                            className="p-3 text-sm text-slate-300 hover:bg-[#ffe2b625] cursor-pointer border-b border-[#ffe8c55d] last:border-none transition-colors"
                        >
                            <span className="font-bold text-white">{description.split(',')[0]}</span>
                            <span className="text-xs text-[#ffffffb4] ml-2">{description.split(',').slice(1).join(',')}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
