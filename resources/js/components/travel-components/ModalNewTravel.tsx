import { router, usePage } from '@inertiajs/react';
import { useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { City } from './City';
import Maps from './Maps';
import ModalLeftSide from './ModalLeftSide';
import axios from 'axios';

export default function ModalnewTravel({
    toggleModal,
    tripID = null,
}: {
    toggleModal: () => void;
    tripID?: number | null;
}) {
    const [mapCenter, setMapCenter] = useState({
        lat: -23.5505,
        lng: -46.6333,
    });
    const [selectedCities, setSelectedCities] = useState<City[]>([]);
    const [tripName, setTripName] = useState('');
    const [tripLoaded, setTripLoaded] = useState<Object>('');
    const [isEdit,setIsEdit] = useState(false);

    useEffect(() => {
        if (tripID) {
            axios.get(`/travels/${tripID}/edit`)
                .then(res => {
                    const trip = res.data;
                    setTripLoaded(trip);
                    setTripName(trip.tripName);
                    setIsEdit(true);

                    if (trip.selectedCities && trip.selectedCities.length > 0) {
                        const formattedCities = trip.selectedCities.map((city : unknown) => ({
                            ...city,
                            lat: parseFloat(city.lat),
                            lng: parseFloat(city.lng),
                        }));

                        setSelectedCities(formattedCities);

                        setMapCenter({
                            lat: formattedCities[0].lat,
                            lng: formattedCities[0].lng
                        });
                    }
                })
                .catch(err => console.error("Erro ao carregar viagem:", err));
        }
    }, [tripID]);



    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_API_GOOGLE_KEY,
        libraries: ['places'],
    });

    const handleCitySelection = (cityData: City) => {
        setMapCenter({ lat: cityData.lat, lng: cityData.lng });
        setSelectedCities((prev) => [...prev, cityData]);
    };

    const showStructureTravel = () => {
        console.log('Resumo da viagem:', selectedCities);
    };

    const saveTravel = () => {
        const start_date =
            selectedCities.length > 0 ? selectedCities[0].start_date : null;
        const end_date =
            selectedCities.length > 0
                ? selectedCities[selectedCities.length - 1].end_date
                : null;
        if(isEdit){
            router.put(
                `/travels/${tripID}`,
                JSON.parse(
                    JSON.stringify({
                        selectedCities,
                        tripName,
                        start_date,
                        end_date,
                    }),
                ),
            );
        } else{
            router.post(
                '/travels',
                JSON.parse(
                    JSON.stringify({
                        selectedCities,
                        tripName,
                        start_date,
                        end_date,
                    }),
                ),
            );

        }
        toggleModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex h-screen w-screen overflow-hidden bg-slate-950">
            {/* Esquerda: Painel de Controle */}
            {/* Aumentamos de 450px para 500px para acomodar melhor os inputs de data horizontais */}
            <div className="z-20 flex h-full w-[700px] min-w-[700px] flex-col border-r border-slate-800 bg-slate-900 shadow-2xl transition-all">
                {/* Cabeçalho do Painel */}
                <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
                    <button
                        onClick={toggleModal}
                        className="rounded-full bg-slate-800 p-2 text-white transition-all hover:bg-red-600"
                    >
                        ✕
                    </button>

                    {/* INPUT DE NOME DA VIAGEM - Adicionado aqui para destaque */}
                    <div className="mx-8 flex-1">
                        <input
                            type="text"
                            placeholder="Dê um nome à sua viagem..."
                            value={tripName}
                            onChange={(e) => setTripName(e.target.value)}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 font-bold text-white placeholder-slate-500 transition-all outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <button
                        onClick={showStructureTravel}
                        className="rounded-full bg-amber-500 px-4 py-1.5 text-[10px] font-bold text-black hover:bg-amber-400"
                    >
                        LOG ESTRUTURA
                    </button>
                </div>

                {/* Área de Conteúdo */}
                <div className="flex-1 overflow-hidden">
                    <ModalLeftSide
                        isLoaded={isLoaded}
                        trip={tripLoaded}
                        handleCitySelection={handleCitySelection}
                        selectedCities={selectedCities}
                        setSelectedCities={setSelectedCities}
                    />
                </div>
            </div>

            {/* Direita: Mapa e Estatísticas */}
            <div className="relative h-full flex-1 bg-slate-200">
                <Maps
                    isLoaded={isLoaded}
                    center={mapCenter}
                    markers={selectedCities}
                />

                {/* Dashboard flutuante de Estatísticas */}
                <div className="absolute bottom-6 left-6 z-10 min-w-[220px] rounded-2xl border border-slate-700 bg-slate-900/95 p-5 text-white shadow-2xl backdrop-blur-md">
                    <h3 className="mb-4 border-b border-slate-800 pb-2 text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">
                        Resumo da Viagem
                    </h3>

                    <div className="space-y-3">
                        <StatItem
                            label="Cidades"
                            value={selectedCities.length}
                        />

                        <StatItem
                            label="Total Dias"
                            value={selectedCities.reduce(
                                (acc, c) => acc + c.days,
                                0,
                            )}
                        />

                        <StatItem
                            label="Atividades"
                            value={selectedCities.reduce(
                                (acc, c) =>
                                    acc +
                                    c.day_array.reduce(
                                        (dAcc, d) => dAcc + d.activities.length,
                                        0,
                                    ),
                                0,
                            )}
                        />

                        <StatItem
                            label="Estimativa"
                            value={`R$ ${selectedCities
                                .reduce(
                                    (acc, c) =>
                                        acc +
                                        c.day_array.reduce(
                                            (dAcc, d) =>
                                                dAcc +
                                                d.activities.reduce(
                                                    (aAcc, a) =>
                                                        aAcc +
                                                        (a.cost?.max || 0),
                                                    0,
                                                ),
                                            0,
                                        ),
                                    0,
                                )
                                .toFixed(0)}`}
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={saveTravel}
                className="absolute bottom-[5%] left-[25%] z-[300] flex rounded-full bg-green-400 px-4 py-1.5 text-[10px] font-bold text-black shadow-lg transition-colors hover:bg-green-300"
            >
                Salvar
            </button>
        </div>
    );
}

function StatItem({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex items-center justify-between gap-6">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {label}
            </span>
            <span className="font-mono text-sm font-black text-blue-400">
                {value}
            </span>
        </div>
    );
}
