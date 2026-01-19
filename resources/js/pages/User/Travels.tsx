import { useState } from "react";
import { Head, router } from '@inertiajs/react'; // Importe o router do Inertia
import ModalnewTravel from "../../components/travel-components/travel-page/ModalNewTravel";
import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import NavbarAdm from "@/components/NavbarAdm";
import NavbarUser from "@/components/NavbarUser";
import DeleteModal from "@/components/travel-components/DeleteModal";

// Defina a interface para o TypeScript não reclamar
interface Trip {
    id: number;
    name: string;
    start_date?: string;
    end_date?: string;
}

// MUDANÇA 1: Receba 'trips' aqui nas props
export default function Travels({ trips }: { trips: Trip[] }) {
    const [deleteModal, setDeleteModal] = useState(false);
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

    return (
        <div className="flex flex-col h-screen p-8 bg-[#362312] text-white overflow-y-auto">
            <Head />
            {/* Header */}
            <NavbarUser></NavbarUser>
            {deleteModal && (
                    <DeleteModal id={selectedTripId} onClose={() => {
                        setSelectedTripId(null);
                        setDeleteModal(false);
                    }}>
                    </DeleteModal>
            )}
                <div className="flex mt-14 w-full items-center justify-between border-b-2 border-[#F8F4E1] pb-5">

                <div>
                <h3 className="text-2xl font-bold text-[#F8F4E1] mb-2">Suas viagens</h3>
                <p className="text-[#F8F4E1]">Gerencie suas próximas aventuras.</p>
                </div>

                </div>


            <div className="pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {/* Botão de Criar */}
                <button
                    onClick={toggleModal}
                    className="shadow-[inset_0_0_40px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center h-64 border-2 border-dashed border-[#F8F4E1] rounded-xl hover:border-[#362312] hover:bg-[#F8F4E1] transition-all group"
                >
                    <div className="w-16 h-16 bg-[#F8F4E1] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#362312] transition-colors">
                        <span className="text-3xl text-[#362312] group-hover:text-[#F8F4E1]">+</span>
                    </div>
                    <span className="font-semibold text-[#F8F4E1] group-hover:text-[#362312]">Criar nova viagem</span>
                </button>

                {/* MUDANÇA 3: Mapeie direto a prop 'trips' */}
                {trips && trips.map((trip) => (
                    <div key={trip.id} className="relative flex flex-col justify-between h-64 bg-gradient-to-b from-[#ffe2b6] to-[#bd965d] rounded-xl p-6 shadow-[0_0_80px_rgba(0,0,0,0.4)] border border-[#ffe8c55d]">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-bold text-[#362312]">{trip.name}</h3>
                            <div className="flex flex-col gap-1 w-40">
                                <span className="bg-cyan-700 text-[#ffe2b6] text-xs font-bold px-2 py-1 rounded mt-2 inline-block">
                                    Data de início: {new Date(trip.start_date + 'T12:00:00').toLocaleDateString('pt-BR')}
                                </span>
                                <span className="bg-[#db3a25] text-[#ffe2b6] text-xs font-bold px-2 py-1 rounded mt-2 inline-block">
                                    Data de fim: {new Date(trip.end_date + 'T12:00:00').toLocaleDateString('pt-BR')}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-4 pt-4 border-t border-[#3a2b1d]">
                            <button onClick={() => {handleEdit(trip.id)}} className="font-bold flex-1 w-[50%] px-3 py-2 bg-[#3a2b1d] hover:bg-[#2b1b0d] rounded hover:text-[#f7eddd] text-sm transition-colors">
                                Visualizar
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedTripId(trip.id);
                                    setDeleteModal(true);
                                }}
                                className="font-bold w-[50%] px-3 py-2 bg-red-600 hover:bg-red-800 text-[#ffe2b6] hover:text-[#f7eddd] rounded transition-colors"
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
