import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { HomeIcon, UserIcon } from '@heroicons/react/24/solid';
import CreateUserModal from './Create';

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
    const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#180C02] p-5">
            <div className="w-full rounded-2xl bg-[#362312] pt-6 pb-10 pl-5 pr-5">

                {/* Header */}
                <div className="flex w-full items-center justify-between border-b-2 border-white pb-5">
                    <button
                        onClick={() => setOpen(true)}
                        className="bg-[#03989E] hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-bold"
                    >
                        Novo Usuário
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

                                <td className="text-center">{user.name}</td>
                                <td className="text-center">{user.email}</td>

                                <td>
                                    <div className="flex justify-center gap-3">
                                        <Link
                                            href={`/admin/users/${user.id}/edit`}
                                            className="font-semibold hover:underline"
                                        >
                                            Editar
                                        </Link>

                                        <Link
                                            href={`/admin/users/${user.id}`}
                                            method="delete"
                                            as="button"
                                            onBefore={() =>
                                                confirm('Deseja remover este usuário?')
                                            }
                                            className="font-semibold text-red-700 hover:underline"
                                        >
                                            Remover
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* MODAL */}
                <CreateUserModal open={open} onClose={() => setOpen(false)} />
            </div>
        </div>
    );
}
