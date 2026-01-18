import { Activity } from '../travel-activity/Activity';
import CitiesSearch from '../travel-activity/CitiesSearch';
import { City } from '../travel-activity/City';
import CityItem from '../travel-activity/CityItem';

export default function ModalLeftSide({
    isLoaded,
    handleCitySelection,
    trip,
    selectedCities,
    setSelectedCities,
    setCenter,
    setZoom,
    saveTravel,
}: {
    isLoaded: boolean;
    handleCitySelection: (cityData: City) => void;
    trip: unknown;
    selectedCities: City[];
    setSelectedCities: (cities: City[]) => void;
    setCenter: (center: { lat: number; lng: number }) => void;
    setZoom: (zoom: number) => void;
    saveTravel: () => void;
}) {

    const handleAddActivity = ({
        cityIndex,
        dayIndex,
        activity,
    }: {
        cityIndex: number;
        dayIndex: number;
        activity: Activity;
    }) => {
        const updatedCities = selectedCities.map((city, i) => {
            if (i === cityIndex) {
                const newDayArray = [...city.day_array];
                newDayArray[dayIndex] = {
                    ...newDayArray[dayIndex],
                    activities: [...newDayArray[dayIndex].activities, activity],
                };
                return { ...city, day_array: newDayArray };
            }
            return city;
        });
        setSelectedCities(updatedCities);
    };

    const handleRemoveActivity = (
        cityIndex: number,
        dayIndex: number,
        activityIndex: number,
    ) => {
        const updatedCities = selectedCities.map((city, i) => {
            if (i === cityIndex) {
                const newDayArray = [...city.day_array];
                newDayArray[dayIndex] = {
                    ...newDayArray[dayIndex],
                    activities: newDayArray[dayIndex].activities.filter(
                        (_, idx) => idx !== activityIndex,
                    ),
                };
                return { ...city, day_array: newDayArray };
            }
            return city;
        });
        setSelectedCities(updatedCities);
    };

    return (

        // TÍTULO
        <div className="flex h-full w-[700px] flex-col content-center overflow-hidden p-3 overflow-y-auto text-white">
            <div className="mb-6 flex flex-col items-center">
                <h2 className="text-2xl font-black tracking-tight">
                    Roteiro de Viagem
                </h2>
                <p className="text-xs text-[#ffffff82]">
                    Adicione destinos e planeje seus dias
                </p>
            </div>
            {/* Verificação */}
            <div className="mb-6">
                {isLoaded ? (
                    // PESQUISA DE CIDADE
                    <CitiesSearch onSelectCity={handleCitySelection} />
                ) : (
                    <div className="h-12 w-full animate-pulse rounded-xl bg-slate-800" />
                )}
            </div>

            {/* MEUS DESTINOS */}
            <div className="custom-scrollbar flex-1 space-y-4 pr-2">
                <div className="mb-2 flex items-center justify-between py-2">
                    <p className="text-xs font-black tracking-widest text-[#ffffffe7] uppercase">
                        Meus Destinos
                    </p>
                    <span className="rounded-full bg-[#ffe2b6] px-2 text-xs text-black font-bold">
                        {selectedCities.length}
                    </span>
                </div>
                {selectedCities.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#ffffff5b] py-12 text-[#ffffff5b]">
                        <p className="text-xs italic">
                            Nenhuma cidade adicionada ainda...
                        </p>
                    </div>
                ) : (
                    selectedCities.map((city, i) => (
                        <CityItem
                            key={`${city.name}`}
                            city={city}
                            onAddActivity={(dayIdx, act) =>
                                handleAddActivity({
                                    cityIndex: i,
                                    dayIndex: dayIdx,
                                    activity: act,
                                })
                            }
                            onRemoveActivity={(dayIdx, actIdx) =>
                            handleRemoveActivity(i, dayIdx, actIdx)
                            }
                            onRemoveCity={() =>
                                setSelectedCities(
                                    selectedCities.filter(
                                        (_, index) => index !== i,
                                    ),
                                )
                            }
                            onSetCenter={setCenter}
                            onSetZoom={setZoom}
                        />
                    ))
                )}
            </div>
            <button
                onClick={saveTravel}
                className="mx-auto mt-10 flex max-w-[200px] items-center justify-center rounded-full bg-[#ffe2b6] px-4 py-1.5 font-bold text-black shadow-lg transition-colors hover:bg-green-300 hover:cursor-pointer"
            >
                Salvar
            </button>
        </div>
    );
}
