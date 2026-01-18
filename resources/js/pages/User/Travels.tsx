import { useState } from "react";
import { Head, router } from '@inertiajs/react'; // Importe o router do Inertia
import ModalnewTravel from "../../components/travel-components/ModalNewTravel";

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
    const toggleModal = () => {
        if(selectedTripId){
            setSelectedTripId(null);
        }
        setIsModalOpen(!isModalOpen)
    }
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
        <div className="flex flex-col h-screen p-8 bg-slate-950 text-white overflow-y-auto">
            <Head title="Minhas Viagens" />

            <h1 className="text-3xl font-bold mb-2">Suas viagens</h1>
            <p className="text-slate-400 mb-8">Gerencie suas próximas aventuras.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {/* Botão de Criar */}
                <button
                    onClick={toggleModal}
                    className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-700 rounded-xl hover:border-blue-500 hover:bg-slate-900 transition-all group"
                >
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                        <span className="text-3xl text-slate-400 group-hover:text-white">+</span>
                    </div>
                    <span className="font-semibold text-slate-300 group-hover:text-white">Criar nova viagem</span>
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

            <button className="bg-red-500 px-2 py-1 w-32 self-start mt-4" onClick={logout}>Logout</button>

            {isModalOpen && (
                <ModalnewTravel
                    toggleModal={toggleModal}
                    tripID={selectedTripId}
                />
            )}
        </div>
    );
}
