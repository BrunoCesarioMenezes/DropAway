import Maps from "./Maps";
import imagemLanding from '../img/landing_page.png';
import { useState } from "react";
import { useJsApiLoader } from '@react-google-maps/api';
import CitiesSearch from "./CitiesSearch";


export default function ModalnewTravel({toggleModal} : {toggleModal: () => void}) {
    const [mapCenter, setMapCenter] = useState({ lat: -23.5505, lng: -46.6333 });
    const [selectedCities, setSelectedCities] = useState([]);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_API_GOOGLE_KEY,
        libraries: ['places']
    });

    const handleCitySelection = (cityData : { lat: number; lng: number; name: string }) => {
        const newCoords = { lat: cityData.lat, lng: cityData.lng };
        setMapCenter(newCoords);
        setSelectedCities((prev) => [...prev, cityData]);
        console.log("Cidade adicionada:", cityData.name);
    };

    return (
        <div className="fixed inset-0 flex flex-col z-10 w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] bg-blue-800 m-auto rounded-xl overflow-hidden shadow-2xl">
            <button onClick={toggleModal} className="absolute top-4 left-4 z-50 p-2 bg-red-600 text-white rounded-full hover:bg-red-500 shadow-lg">✕</button>

            <div className="grid grid-cols-2 h-full">
                <div className="flex flex-col items-center col-span-1 p-8 bg-slate-900 text-white relative z-20 shadow-[15px_0_30px_-5px_rgba(0,0,0,0.5)]">
                    <img className="w-64 h-auto mb-8 rounded-lg" src={imagemLanding} alt="Landing" />

                    <h2 className="text-2xl font-bold mb-4">Planeje sua Viagem</h2>

                    <div className="flex flex-col items-center h-64 min-w-full">
                        {isLoaded ? (
                            <CitiesSearch onSelectCity={handleCitySelection} />
                        ) : (
                            <div className="w-full p-3 bg-gray-700 animate-pulse rounded-lg text-gray-400">
                                Carregando buscador...
                            </div>
                        )}

                        <div className="mt-6 w-full overflow-y-auto">
                            <p className="text-sm text-slate-400 mb-2">Cidades no roteiro:</p>
                            {selectedCities.map((city, i) => (
                                <div key={i} className="bg-slate-800 flex flex-row gap-2 p-2 mb-2 rounded border-l-4 border-blue-500 text-sm">
                                    <p>{city.name}</p>
                                    <button onClick={() => setSelectedCities(selectedCities.filter((_, index) => index !== i))} className="bg-red-600 text-white p-1 ml-2">X</button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="z-10 col-span-1 w-full h-full bg-slate-200">
                    <Maps isLoaded={isLoaded} center={mapCenter} markers={selectedCities} />
                </div>
            </div>

        </div>
    );
};
