import { useState } from "react";
import { Head, router } from '@inertiajs/react'; // Importe o router do Inertia
import ModalnewTravel from "../../components/travel-components/ModalNewTravel";
import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import NavbarAdm from "@/components/NavbarAdm";
import NavbarUser from "@/components/NavbarUser";

// Defina a interface para o TypeScript não reclamar
interface Trip {
    id: number;
    name: string;
    start_date?: string;
    end_date?: string;
}

// MUDANÇA 1: Receba 'trips' aqui nas props
export default function Travels({ trips }: { trips: Trip[] }) {

    // Remova: const [trips, setTrips] = useState(...) -> Não precisa mais!
    // Remova: useEffect(...) -> Não precisa mais!

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTripId, setSelectedTripId] = useState<number | null>(null);
    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const logout = () => {
        router.post('/logout');
    }

    const handleEdit = (tripID : number) => {
        setSelectedTripId(tripID);
        setIsModalOpen(true);
    }

    // MUDANÇA 2: Use o router do Inertia para deletar
    const handleDelete = (id: number) => {
    if (confirm("Deseja realmente excluir?")) {
        // MUDANÇA: Troque o route() pela string com template literal
        router.delete(`/travels/${id}`, {
            preserveScroll: true,
            onSuccess: () => alert("Viagem excluída!")
        });
    }
};

    // Debug: Veja no console do navegador se os dados chegaram
    console.log("Viagens recebidas do Laravel:", trips);

    return (
        <div className="flex flex-col h-screen p-8 bg-[#362312] text-white overflow-y-auto">
            <Head />
            {/* Header */}
            <NavbarUser></NavbarUser>
                <div className="flex mt-10 w-full items-center justify-between border-b-2 border-[#F8F4E1] pb-5">

                <div>
                <h3 className="text-2xl font-bold text-[#F8F4E1] mb-2">Suas viagens</h3>
                <p className="text-[#F8F4E1]">Gerencie suas próximas aventuras.</p>
                </div>  
                
                </div>


            <div className="pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {/* Botão de Criar */}
                <button
                    onClick={toggleModal}
                    className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-[#F8F4E1] rounded-xl hover:border-[#362312] hover:bg-[#F8F4E1] transition-all group"
                >
                    <div className="w-16 h-16 bg-[#F8F4E1] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#362312] transition-colors">
                        <span className="text-3xl text-[#362312] group-hover:text-[#F8F4E1]">+</span>
                    </div>
                    <span className="font-semibold text-[#F8F4E1] group-hover:text-[#362312]">Criar nova viagem</span>
                </button>

                {/* MUDANÇA 3: Mapeie direto a prop 'trips' */}
                {trips && trips.map((trip) => (
                    <div key={trip.id} className="relative flex flex-col justify-between h-64 bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-800">
                        <div>
                            <span>{trip.id}</span>
                            <h3 className="text-xl font-bold text-white">{trip.name}</h3>
                            <span className="bg-blue-900/50 text-blue-200 text-xs px-2 py-1 rounded mt-2 inline-block">
                                Planejada
                            </span>
                            <span className="bg-blue-900/50 text-blue-200 text-xs px-2 py-1 rounded mt-2 inline-block">
                                Data de início: {new Date(trip.start_date + 'T12:00:00').toLocaleDateString('pt-BR')}
                            </span>
                            <span className="bg-blue-900/50 text-blue-200 text-xs px-2 py-1 rounded mt-2 inline-block">
                                Data de fim: {new Date(trip.end_date + 'T12:00:00').toLocaleDateString('pt-BR')}
                            </span>
                        </div>

                        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-800">
                            <button onClick={() => {handleEdit(trip.id)}} className="flex-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded text-blue-400 text-sm">
                                Visualizar
                            </button>
                            <button
                                onClick={() => handleDelete(trip.id)}
                                className="px-3 py-2 bg-slate-800 hover:bg-red-900/30 text-slate-400 hover:text-red-400 rounded transition-colors"
                            >
                                Deletar
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            {isModalOpen && (
                <ModalnewTravel
                    toggleModal={toggleModal}
                    tripID={selectedTripId}
                />
            )}
        </div>
    );
}
