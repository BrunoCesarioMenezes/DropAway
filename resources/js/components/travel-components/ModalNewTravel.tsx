import { useState } from "react";
import { useJsApiLoader } from '@react-google-maps/api';
import Maps from "./Maps";
import ModalLeftSide from "./ModalLeftSide";
import { City } from "./City";
import { router } from "@inertiajs/react";

export default function ModalnewTravel({ toggleModal }: { toggleModal: () => void }) {
    const [mapCenter, setMapCenter] = useState({ lat: -23.5505, lng: -46.6333 });
    const [selectedCities, setSelectedCities] = useState<City[]>([]);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_API_GOOGLE_KEY,
        libraries: ['places']
    });

    const handleCitySelection = (cityData: City) => {
        setMapCenter({ lat: cityData.lat, lng: cityData.lng });
        setSelectedCities((prev) => [...prev, cityData]);
    };

    const showStructureTravel = () => {
        console.log("Resumo da viagem:", selectedCities);
    };

    const saveTravel = () => {
        router.post('/travels', JSON.parse(JSON.stringify({ selectedCities })));
    };

    return (
        <div className="fixed inset-0 flex z-50 w-screen h-screen bg-slate-950 overflow-hidden">

            {/* Esquerda: Painel de Controle */}
            {/* Aumentamos de 450px para 500px para acomodar melhor os inputs de data horizontais */}
            <div className="w-[700px] min-w-[700px] h-full bg-slate-900 shadow-2xl z-20 flex flex-col border-r border-slate-800 transition-all">

                {/* Cabeçalho do Painel */}
                <div className="p-4 flex justify-between items-center bg-slate-900/50 backdrop-blur-sm border-b border-slate-800">
                    <button
                        onClick={toggleModal}
                        className="p-2 bg-slate-800 text-white rounded-full hover:bg-red-600 transition-all hover:scale-105 active:scale-95"
                    >
                        ✕
                    </button>
                    <button
                        onClick={showStructureTravel}
                        className="text-[10px] font-bold bg-amber-500 px-4 py-1.5 rounded-full text-black hover:bg-amber-400 transition-colors shadow-lg"
                    >
                        LOG ESTRUTURA
                    </button>
                </div>

                {/* Área de Conteúdo (CitiesSearch + Roteiro) */}
                <div className="flex-1 overflow-hidden">
                    <ModalLeftSide
                        isLoaded={isLoaded}
                        handleCitySelection={handleCitySelection}
                        selectedCities={selectedCities}
                        setSelectedCities={setSelectedCities}
                    />
                </div>
            </div>

            {/* Direita: Mapa e Estatísticas */}
            <div className="flex-1 relative bg-slate-200 h-full">
                <Maps isLoaded={isLoaded} center={mapCenter} markers={selectedCities} />

                {/* Dashboard flutuante de Estatísticas */}
                <div className="absolute bottom-6 left-6 z-10 bg-slate-900/95 backdrop-blur-md p-5 rounded-2xl border border-slate-700 shadow-2xl text-white min-w-[220px]">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 border-b border-slate-800 pb-2">
                        Resumo da Viagem
                    </h3>

                    <div className="space-y-3">
                        <StatItem label="Cidades" value={selectedCities.length} />

                        <StatItem
                            label="Total Dias"
                            value={selectedCities.reduce((acc, c) => acc + c.days, 0)}
                        />

                        <StatItem
                            label="Atividades"
                            value={selectedCities.reduce((acc, c) =>
                                acc + c.day_array.reduce((dAcc, d) => dAcc + d.activities.length, 0), 0)
                            }
                        />

                        <StatItem
                            label="Estimativa"
                            value={`R$ ${selectedCities.reduce((acc, c) =>
                                acc + c.day_array.reduce((dAcc, d) =>
                                    dAcc + d.activities.reduce((aAcc, a) =>
                                        aAcc + (a.cost?.max || 0), 0), 0), 0).toFixed(0)}`}
                        />
                    </div>
                </div>
            </div>

            <button onClick={saveTravel} className="flex absolute bottom-[5%] left-[25%] z-[300] text-[10px] font-bold bg-green-400 px-4 py-1.5 rounded-full text-black hover:bg-green-300 transition-colors shadow-lg">Salvar</button>
        </div>
    );
}

function StatItem({ label, value }: { label: string, value: string | number }) {
    return (
        <div className="flex justify-between items-center gap-6">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}</span>
            <span className="text-sm font-mono text-blue-400 font-black">{value}</span>
        </div>
    );
}
