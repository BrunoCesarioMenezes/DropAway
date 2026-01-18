import { HomeIcon, UserIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import NavbarAdm from '@/components/NavbarAdm';
import EditModal from '@/components/user/EditModal';
import CreateUserModal from '../../../components/user/CreateModal';
import DeleteModal from '@/components/user/DeleteModal'


type User = {
    id: number;
    name: string;
    email: string;
    photo?: string;
};

interface Props {
    users: User[];
}

export default function Index({ users }: Props) {

    const [createVisible, setCreateVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState<User | null>(null)
    const [deleteModalVisible, setDeleteModalVisible] = useState<User | null>(null)

    return (
        <div className="flex min-h-screen items-center justify-center">
            <NavbarAdm></NavbarAdm>
            <div className="pt-20 px-6 w-full bg-[#362312] pt-6 pb-10 pl-5 pr-5">

                {/* Header */}
                <div className="flex w-full items-center justify-between border-b-2 border-white pb-5">
                    <button
                        onClick={() => setCreateVisible(true)}
                        className="bg-transparent hover:bg-[#f5c47a] hover:text-black hover:border-transparent border-2 border-white text-white px-2 py-2 rounded-lg font-bold hover:cursor-pointer"
                    >
                       + Novo Usuário
                    </button>

                    <h1 className="text-2xl font-semibold text-white">
                        Gerenciamento de Usuários
                    </h1>

                    <div className="flex gap-2">
                        <HomeIcon className="w-9 h-9 text-white" />
                        <UserIcon className="w-9 h-9 text-white" />
                    </div>
                </div>

                {/* Tabela */}
                <table className="w-full border-separate pt-6">
                    <thead>
                        <tr className="bg-[#f5c47a] text-[#3b1f0b]">
                            <th className="rounded-tl-lg py-2">ID</th>
                            <th>Img</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th className="rounded-tr-lg">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr
                                key={user.id}
                                className="bg-[#FFD18D] text-[#3b1f0b]"
                            >
                                <td className="py-3 text-center font-semibold">
                                    {user.id}
                                </td>

                                <td className="flex justify-center py-2">
                                    {user.photo ? (
                                        <div className="h-10 w-10 rounded-full overflow-hidden border">
                                            <img
                                                src={`/storage/${user.photo}`}
                                                alt="Foto do usuário"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-10 w-10 rounded-full overflow-hidden border">
                                            <img
                                                src="/img/default-avatar-icon-of-social-media-user-vector.jpg"
                                                alt="Avatar padrão"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    )}
                                </td>

                                    {/* Nome */}
                                    <td className=' text-center'>
                                        {user.name}
                                    </td>

                                    {/* Email */}
                                    <td className=' text-center'>
                                        {user.email}
                                    </td>

                                    {/* Ações */}
                                    <td className=''>
                                        <div className="flex gap-3 items-center justify-center">

                                            {/* Editar */}
                                            <button
                                                onClick={() => setEditModalVisible(user)}
                                                className="text-sm font-semibold text-[#3b1f0b] hover:underline hover:cursor-pointer"
                                            >
                                                Editar
                                            </button>

                                            {/* Remover */}
                                            <button
                                                onClick={() => setDeleteModalVisible(user)}
                                                className="text-sm font-semibold text-red-700 hover:underline hover:cursor-pointer"
                                            >
                                                Remover
                                            </button>

                                        </div>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Fim da Tabela */}

            {/* MODAL CRIAR */}
            <CreateUserModal
                open={createVisible}
                onClose={() => setCreateVisible(false)} />
            {/* MODAL EDITAR */}
            {editModalVisible && (
                <EditModal
                    user={editModalVisible}
                    onClose={() => setEditModalVisible(null)}
                />
            )}
            {/* MODAL EXCLUIR */}
            {deleteModalVisible && (
                <DeleteModal
                    user={deleteModalVisible}
                    onClose={() => setDeleteModalVisible(null)}
                />
            )}
        </div>
    );

}
