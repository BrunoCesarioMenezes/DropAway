import { City } from "./City";
import CityItem from "./CityItem";
import { Activity } from "./Activity";
import CitiesSearch from "./CitiesSearch";
import imagemLanding from '../../pages/img/landing_page.png';

export default function ModalLeftSide({ isLoaded, handleCitySelection, selectedCities, setSelectedCities }: {
    isLoaded: boolean,
    handleCitySelection: (cityData: City) => void,
    selectedCities: City[],
    setSelectedCities: (cities: City[]) => void
}) {

    const handleAddActivity = ({ cityIndex, dayIndex, activity }: { cityIndex: number, dayIndex: number, activity: Activity }) => {
        const updatedCities = selectedCities.map((city, i) => {
            if (i === cityIndex) {
                const newDayArray = [...city.day_array];
                newDayArray[dayIndex] = {
                    ...newDayArray[dayIndex],
                    activities: [...newDayArray[dayIndex].activities, activity]
                };
                return { ...city, day_array: newDayArray };
            }
            return city;
        });
        setSelectedCities(updatedCities);
    };

    const handleRemoveActivity = (cityIndex: number, dayIndex: number, activityIndex: number) => {
        const updatedCities = selectedCities.map((city, i) => {
            if (i === cityIndex) {
                const newDayArray = [...city.day_array];
                newDayArray[dayIndex] = {
                    ...newDayArray[dayIndex],
                    activities: newDayArray[dayIndex].activities.filter((_, idx) => idx !== activityIndex)
                };
                return { ...city, day_array: newDayArray };
            }
            return city;
        });
        setSelectedCities(updatedCities);
    };

    return (
        <div className="flex flex-col w-[700px] h-full text-white overflow-hidden p-6">
            <div className="flex flex-col items-center mb-6">
                <img className="w-48 h-24 object-cover rounded-xl shadow-lg mb-4" src={imagemLanding} alt="Landing" />
                <h2 className="text-2xl font-black tracking-tight">Roteiro de Viagem</h2>
                <p className="text-slate-500 text-xs">Adicione destinos e planeje seus dias</p>
            </div>

            <div className="mb-6">
                {isLoaded ? (
                    <CitiesSearch onSelectCity={handleCitySelection} />
                ) : (
                    <div className="w-full h-12 bg-slate-800 animate-pulse rounded-xl" />
                )}
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                <div className="flex justify-between items-center sticky top-0 bg-slate-900 py-2 z-10 border-b border-slate-800 mb-2">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Meus Destinos</p>
                    <span className="bg-blue-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{selectedCities.length}</span>
                </div>

                {selectedCities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-slate-600 border-2 border-dashed border-slate-800 rounded-2xl">
            <p className="text-xs italic">Nenhuma cidade adicionada ainda...</p>
        </div>
    ) : (
        selectedCities.map((city, i) => (
            <CityItem
                // MUDE AQUI: De key={i} para isso 👇
                key={`${city.name}-${i}`}
                city={city}
                onAddActivity={(dayIdx, act) => handleAddActivity({ cityIndex: i, dayIndex: dayIdx, activity: act })}
                onRemoveActivity={(dayIdx, actIdx) => handleRemoveActivity(i, dayIdx, actIdx)}
                onRemoveCity={() => setSelectedCities(selectedCities.filter((_, index) => index !== i))}
            />
        ))
    )}
            </div>
        </div>
    );
}
