import Maps from "./Maps";
import imagemLanding from '../../pages/img/landing_page.png';
import { useState } from "react";
import { useJsApiLoader } from '@react-google-maps/api';
import CitiesSearch from "./CitiesSearch";
import { City } from "./City";
import ModalLeftSide from "./ModalLeftSide";

export default function ModalnewTravel({toggleModal} : {toggleModal: () => void}) {
    const [mapCenter, setMapCenter] = useState({ lat: -23.5505, lng: -46.6333 });
    const [selectedCities, setSelectedCities] = useState<City[]>([]);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_API_GOOGLE_KEY,
        libraries: ['places']
    });

    const handleCitySelection = (cityData: City) => {
        const newCoords = { lat: cityData.lat, lng: cityData.lng };
        setMapCenter(newCoords);

        // Criamos uma versão da cidade com o day_array populado
        const cityWithDays = {
                ...cityData,
                // Se cityData.days for 3, cria [{activities: []}, {activities: []}, {activities: []}]
                day_array: cityData.day_array || Array.from({ length: cityData.days }, () => ({
                    activities: []
                }))
            };

            setSelectedCities((prev) => [...prev, cityWithDays]);
            console.log("Cidade adicionada com estrutura de dias:", cityWithDays);
        };

    return (
        <div className="fixed inset-0 flex flex-col z-10 w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] bg-blue-800 m-auto rounded-xl overflow-hidden shadow-2xl">
            <button onClick={toggleModal} className="absolute top-4 left-4 z-50 p-2 bg-red-600 text-white rounded-full hover:bg-red-500 shadow-lg">✕</button>

            <div className="grid grid-cols-2 h-full">
                <div className="flex flex-col items-center col-span-1 p-8 bg-slate-900 text-white relative z-20 shadow-[15px_0_30px_-5px_rgba(0,0,0,0.5)]">
                    <ModalLeftSide
                        isLoaded={isLoaded}
                        handleCitySelection={handleCitySelection}
                        selectedCities={selectedCities}
                        setSelectedCities={setSelectedCities}
                    >
                    </ModalLeftSide>
                </div>

                <div className="z-10 col-span-1 w-full h-full bg-slate-200">
                    <Maps isLoaded={isLoaded} center={mapCenter} markers={selectedCities} />
                </div>
            </div>

        </div>
    );
};
