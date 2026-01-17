import { useState } from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';
import { City } from './City';

export default function CitiesSearch({
    onSelectCity,
}: {
    onSelectCity: (cityData: City) => void;
}) {
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

    // Estados para as datas
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSelect = async (description: string) => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            // Cálculo da diferença de dias
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir o dia de chegada

            if (diffDays <= 0) {
                alert("A data de volta deve ser após a data de ida!");
                return;
            }

            setValue(description, false);
            clearSuggestions();

            const results = await getGeocode({ address: description });
            const { lat, lng } = await getLatLng(results[0]);

            const emptyActivitiesByDay = Array.from({ length: diffDays }, () => []);
            onSelectCity({
                name: description,
                lat,
                lng,
                days: diffDays,
                day_array: []
            });

                // Limpa tudo
                setValue('');
                setStartDate('');
                setEndDate('');
            } else {
                alert("Por favor, selecione o período da viagem.");
            }
        };

    return (
        <div className="relative w-full max-w-xl">
            <div className="flex flex-col md:flex-row gap-2 bg-white p-2 rounded-xl shadow-lg border border-gray-200">
                {/* Input da Cidade */}
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    className="flex-1 p-3 text-gray-800 outline-none min-w-[200px]"
                    placeholder="Para onde você vai?"
                />

                <div className="flex flex-row gap-2 border-l border-gray-100 pl-2">
                    {/* Data Início */}
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase font-bold text-gray-400 px-2">Ida</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="p-1 text-sm text-gray-600 outline-none"
                        />
                    </div>

                    {/* Data Fim */}
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase font-bold text-gray-400 px-2">Volta</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="p-1 text-sm text-gray-600 outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Sugestões do Google */}
            {status === 'OK' && (
                <ul className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl">
                    {data.map(({ place_id, description }) => (
                        <li
                            key={place_id}
                            onClick={() => handleSelect(description)}
                            className="cursor-pointer border-b p-3 text-gray-700 transition-colors last:border-none hover:bg-blue-50"
                        >
                            <span className="font-medium">{description.split(',')[0]}</span>
                            <span className="text-xs text-gray-400 ml-2">{description.split(',').slice(1).join(',')}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
