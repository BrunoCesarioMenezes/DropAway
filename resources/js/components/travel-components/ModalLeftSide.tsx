import { useState } from "react";
import CitiesSearch from "./CitiesSearch";
import { City } from "./City";
import CityItem from "./CityItem";
import imagemLanding from '../../pages/img/landing_page.png';
import { Activity } from "./Activity";

export default function ModalLeftSide({ isLoaded, handleCitySelection, selectedCities, setSelectedCities }: { isLoaded: boolean, handleCitySelection: (cityData: City) => void, selectedCities: City[], setSelectedCities: (cities: City[]) => void }) {

    // Agora recebe também o dayIndex
    // No ModalLeftSide.tsx
    const handleAddActivity = ({ cityIndex, dayIndex, activity }: {
        cityIndex: number,
        dayIndex: number,
        activity: Activity
    }) => {
        const updatedCities : City[] = selectedCities.map((city, i) => {
            if (i === cityIndex) {
                const newDayArray = [...city.day_array];
                if (newDayArray[dayIndex]) {
                    newDayArray[dayIndex] = {
                        ...newDayArray[dayIndex],
                        // Adiciona o objeto activity completo
                        activities: [...newDayArray[dayIndex].activities, activity]
                    };
                }
                return { ...city, day_array: newDayArray };
            }
            return city;
        });
        setSelectedCities(updatedCities);
    };

    const handleRemoveActivity = (cityIndex: number, dayIndex: number, activityIndex: number) => {
        // Criamos o novo array baseado no valor atual do estado 'selectedCities'
        const updatedCities: City[] = selectedCities.map((city, i) => {
            if (i === cityIndex) {
                const newDayArray = [...city.day_array];
                if (newDayArray[dayIndex]) {
                    newDayArray[dayIndex] = {
                        ...newDayArray[dayIndex],
                        activities: newDayArray[dayIndex].activities.filter((_, idx) => idx !== activityIndex)
                    };
                }
                return { ...city, day_array: newDayArray };
            }
            return city;
        });

        // Passamos o objeto direto, sem a função prev => ...
        setSelectedCities(updatedCities);
    };



    return (
        <div className="text-white p-4">
            <img className="flex justify-self-center w-80 h-40 mb-4 rounded-lg" src={imagemLanding} alt="Landing" />
            <h2 className="text-2xl font-bold mb-4">Planeje sua Viagem</h2>

            <div className="flex flex-col items-center min-w-full">
                {isLoaded ? (
                    <CitiesSearch onSelectCity={handleCitySelection} />
                ) : (
                    <div className="w-full p-3 bg-gray-700 animate-pulse rounded-lg text-gray-400">
                        Carregando buscador...
                    </div>
                )}

                <div className="my-4 pb-8 w-full h-56 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    <p className="text-sm text-slate-400">Seu Roteiro:</p>
                    {selectedCities.map((city, i) => (
                        <CityItem
                            key={`${city.name}-${city.lat}-${city.lng}`}
                            city={city}
                            onAddActivity={(dayIndex, activity) => handleAddActivity({ cityIndex: i, dayIndex, activity: activity })}
                            onRemoveActivity={(dayIdx, actIdx) => handleRemoveActivity(i, dayIdx, actIdx)}
                            onRemoveCity={() => setSelectedCities(selectedCities.filter((_, index) => index !== i))}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
