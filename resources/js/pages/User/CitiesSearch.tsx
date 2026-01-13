import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

export default function CitiesSearch({ onSelectCity } : { onSelectCity: (cityData: { lat: number; lng: number; name: string }) => void }) {
  const {ready,value,suggestions: { status, data },setValue,clearSuggestions} =
    usePlacesAutocomplete({
        requestOptions: {
        types: ["(cities)"],
        },
        debounce: 300,
    });

  const handleSelect = async (description : string) => {
    setValue(description, false);
    clearSuggestions();
    const results = await getGeocode({ address: description });
    const { lat, lng } = await getLatLng(results[0]);
    onSelectCity({ lat, lng, name: description });
  };

  return (
    <div className="relative w-full max-w-sm">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
        placeholder="Para onde você vai?"
      />

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
