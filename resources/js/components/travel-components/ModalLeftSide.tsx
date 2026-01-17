import { useState } from "react";
import CitiesSearch from "./CitiesSearch";
import { City } from "./City";
import CityItem from "./cityItem";
import imagemLanding from '../../pages/img/landing_page.png';

export default function ModalLeftSide({ isLoaded, handleCitySelection, selectedCities, setSelectedCities }: { isLoaded: boolean, handleCitySelection: (cityData: City) => void, selectedCities: City[], setSelectedCities: (cities: City[]) => void }) {
    
    const handleAddActivity = (index: number, activityName: string) => {
        const updatedCities = selectedCities.map((city, i) => {
            if (i === index) {
                return {
                    ...city,
                    activities: [...city.activities, activityName] 
                };
            }
            return city;
        });
        setSelectedCities(updatedCities);
    };

    return (
        <div className="text-white p-4">
            <img className="w-64 h-auto mb-8 rounded-lg" src={imagemLanding} alt="Landing" />
            <h2 className="text-2xl font-bold mb-4">Planeje sua Viagem</h2>

            <div className="flex flex-col items-center min-w-full">
                {isLoaded ? (
                    <CitiesSearch onSelectCity={handleCitySelection} />
                ) : (
                    <div className="w-full p-3 bg-gray-700 animate-pulse rounded-lg text-gray-400">
                        Carregando buscador...
                    </div>
                )}

                <div className="mt-6 w-full max-h-96 overflow-y-auto space-y-4">
                    <p className="text-sm text-slate-400">Seu Roteiro:</p>
                    {selectedCities.map((city, i) => (
                        <CityItem 
                            key={i} 
                            city={city} 
                            onAddActivity={(activity) => handleAddActivity(i, activity)}
                            onRemoveCity={() => setSelectedCities(selectedCities.filter((_, index) => index !== i))}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}