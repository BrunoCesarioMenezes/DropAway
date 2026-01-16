import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { City } from "./City";
import { useState } from "react";

export default function CitiesSearch({ onSelectCity } : { onSelectCity: (cityData: City) => void }) {
  const {ready,value,suggestions: { status, data },setValue,clearSuggestions} =
    usePlacesAutocomplete({
        requestOptions: {
        types: ["(cities)"],
        },
        debounce: 300,
    });

  const handleSelect = async (description : string) => {
    if (days > 0){
        setValue(description, false);
        clearSuggestions();
        const results = await getGeocode({ address: description });
        const { lat, lng } = await getLatLng(results[0]);
        onSelectCity({ name: description, lat, lng, days: days });
        setValue('');
        setDays(0);

        const inputDays = document.getElementsByName("days")[0] as HTMLInputElement;
        inputDays.value = '';
    }
  };

  const [days,setDays] = useState(0);

  return (
    <div className="relative w-full max-w-sm">
      <div className="flex flex-row gap-2">
        <input
            name="city"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
            placeholder="Para onde você vai?"
        />

        <input required name="days" type="number"
        onChange ={(e) => setDays(Number(e.target.value))}
        placeholder="Quantos dias?"
        className="w-24 p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
        />
      </div>

      {status === "OK" && (
        <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-xl overflow-hidden">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className="p-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b last:border-none transition-colors"
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
