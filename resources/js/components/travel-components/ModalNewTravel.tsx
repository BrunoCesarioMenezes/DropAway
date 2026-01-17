import Maps from "./Maps";
import imagemLanding from '../../pages/img/landing_page.png';
import { useState } from "react";
import { useJsApiLoader } from '@react-google-maps/api';
import CitiesSearch from "./CitiesSearch";
import { City } from "./City";
import ModalLeftSide from "./ModalLeftSide";
import { show } from "@/routes/two-factor";

export default function ModalnewTravel({toggleModal} : {toggleModal: () => void}) {
    const [mapCenter, setMapCenter] = useState({ lat: -23.5505, lng: -46.6333 });
    const [selectedCities, setSelectedCities] = useState<City[]>([]);

    const showStructureTravel = () => {
        console.log("Resumo da viagem: ", selectedCities.map(city =>
            ({ name: city.name, days: city.day_array.map(day =>
                ({ activities: day.activities }))
            })
        )
    );
    }

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
            <button onClick={showStructureTravel} className="absolute w-20 h-auto top-5 right-30 z-[200] bg-amber-400">Estrutura da viagem</button>

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

                <div className="relative z-10 col-span-1 w-full h-full bg-slate-200 overflow-hidden">
                    {/* O Mapa */}
                    <Maps isLoaded={isLoaded} center={mapCenter} markers={selectedCities} />

                    {/* Legenda Fixa no Canto Inferior Esquerdo */}
                    <div className="absolute bottom-20 left-6 z-[100] min-w-[160px] bg-slate-900/90 backdrop-blur-sm text-white p-4 rounded-lg border border-slate-700 shadow-2xl pointer-events-auto">
                        <h3 className="font-bold text-sm mb-1 border-b border-slate-700 pb-1">
                            Estatísticas da Viagem
                        </h3>
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-300">Cidades visitadas: {selectedCities.length}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-300">
                                    Total de dias: {selectedCities.reduce((total, city) => total + city.days, 0)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-300">
                                    Lugares visitados: {selectedCities.reduce((cityAcc, city) =>
                                        cityAcc + city.day_array.reduce((dayAcc, day) =>
                                            dayAcc + day.activities.length, 0), 0)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-300">
                                    Custo estimado: R${selectedCities.reduce((cityAcc, city) =>
                                        cityAcc + city.day_array.reduce((dayAcc, day) =>
                                            dayAcc + day.activities.reduce((actAcc, act) =>
                                                actAcc + ((act.cost?.max || 0)), 0), 0), 0).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-300">
                                    Total de quilômetros: {(() => {
                                        const R = 6371; // Raio da Terra em km
                                        let totalDistance = 0;

                                        const toRad = (value: number) => (value * Math.PI) / 180;

                                        const allPoints = selectedCities.map(city => ({ lat: city.lat, lng: city.lng }));

                                        for (let i = 0; i < allPoints.length - 1; i++) {
                                            const lat1 = allPoints[i].lat;
                                            const lon1 = allPoints[i].lng;
                                            const lat2 = allPoints[i + 1].lat;
                                            const lon2 = allPoints[i + 1].lng;

                                            const dLat = toRad(lat2 - lat1);
                                            const dLon = toRad(lon2 - lon1);

                                            const a =
                                                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                                                Math.sin(dLon / 2) * Math.sin(dLon / 2);
                                            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                                            const distance = R * c;

                                            totalDistance += distance;
                                        }

                                        return totalDistance.toFixed(2);
                                    })()} km
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
