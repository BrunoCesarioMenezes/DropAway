import { useState } from "react";
import CitiesSearch from "./CitiesSearch";
import { City } from "./City";
import imagemLanding from '../../pages/img/landing_page.png';

export default function ModalLeftSide( {isLoaded, handleCitySelection, selectedCities, setSelectedCities} : {isLoaded: boolean, handleCitySelection: (cityData: City) => void, selectedCities: City[], setSelectedCities: (cities: City[]) => void} ) {
    return (
        <div>
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
                            <p>{city.days} dias</p>
                            <button onClick={() => setSelectedCities(selectedCities.filter((_, index) => index !== i))} className="bg-red-600 text-white p-1 ml-2">X</button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
