import { useState } from "react";
import ModalnewTravel from "../../components/travel-components/ModalNewTravel";

export default function Travels() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <div className="flex flex-col h-screen p-8">
            <h1 className="text-2xl font-bold mb-4">Suas viagens</h1>
            <p>Veja todas as suas viagens planejadas abaixo:</p>
            <div className="flex-1 flex items-center justify-center">
                <button onClick={toggleModal} className="w-64 h-84 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                Criar nova viagem
                </button>
            </div>
            {isModalOpen && (
                <ModalnewTravel toggleModal={toggleModal} />
            )}
        </div>
    );
}
