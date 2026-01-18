import imagemLanding from '../../pages/img/landing_page.png';
import { Activity } from './Activity';
import CitiesSearch from './CitiesSearch';
import { City } from './City';
import CityItem from './CityItem';

export default function ModalLeftSide({
    isLoaded,
    handleCitySelection,
    trip,
    selectedCities,
    setSelectedCities,
    setCenter,
    setZoom,
}: {
    isLoaded: boolean;
    handleCitySelection: (cityData: City) => void;
    trip: unknown;
    selectedCities: City[];
    setSelectedCities: (cities: City[]) => void;
    setCenter: (center: { lat: number; lng: number }) => void;
    setZoom: (zoom: number) => void;
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
        <div className="flex h-full w-[700px] flex-col overflow-hidden p-6 text-white">
            <div className="mb-6 flex flex-col items-center">
                <img
                    className="mb-4 h-24 w-48 rounded-xl object-cover shadow-lg"
                    src={imagemLanding}
                    alt="Landing"
                />
                <h2 className="text-2xl font-black tracking-tight">
                    Roteiro de Viagem
                </h2>
                <p className="text-xs text-slate-500">
                    Adicione destinos e planeje seus dias
                </p>
            </div>

            <div className="mb-6">
                {isLoaded ? (
                    <CitiesSearch onSelectCity={handleCitySelection} />
                ) : (
                    <div className="h-12 w-full animate-pulse rounded-xl bg-slate-800" />
                )}
            </div>

            <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pr-2">
                <div className="sticky top-0 z-10 mb-2 flex items-center justify-between border-b border-slate-800 bg-slate-900 py-2">
                    <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                        Meus Destinos
                    </p>
                    <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold">
                        {selectedCities.length}
                    </span>
                </div>

                {selectedCities.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-800 py-12 text-slate-600">
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
        </div>
    );
}
