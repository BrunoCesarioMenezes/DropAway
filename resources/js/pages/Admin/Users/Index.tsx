import { Link } from '@inertiajs/react';
import { HomeIcon, UserIcon } from '@heroicons/react/24/solid'

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
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#180C02] p-5">
            <div className="w-full rounded-2xl bg-[#362312] pt-6 pb-10 pl-5 pr-5">
                {/* Header */}
                <div className='flex w-full items-center justify-between border-white border-b-3 flex-row pb-5 '>
                    <div className='flex gap-2'>
                        <a href="" className="bg-[#03989E] hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                        Novo Usuario
                    </a>    
                        
                    </div>
                    <h1 className="text-center text-2xl font-semibold text-white ">
                        Gerenciamento de Usuários
                    </h1>
                    <div className='flex flex-row gap-2 w-25'>
                        <HomeIcon className='w-9 h-9 text-white solid'>Icon</HomeIcon>
                        <UserIcon className='w-9 h-9 text-white solid'>Icon</UserIcon>
                    </div>
                </div>

                {/* Tabela */}
                <div>
                    <table className="w-full border-separate pt-6 pr-5 pl-5">

                        {/* Cabeçalho da Tabela */}
                        <thead>
                            <tr className="bg-[#f5c47a] text-[#3b1f0b]">
                                <th className="rounded-tl-lg w-1/15 py-2">ID</th>
                                <th className='w-1/15'>Img</th>
                                <th className='w-4/15'>Nome</th>
                                <th className='w-7/15'>Email</th>
                                <th className="rounded-tr-lg">
                                    Ações
                                </th>
                            </tr>
                        </thead>

                        {/* Linhas */}
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="bg-[#FFD18D] text-[#3b1f0b]"
                                >

                                    {/* ID */}
                                    <td className=" py-3 font-semibold text-center">
                                        {user.id}
                                    </td>

                                    {/* Imagem */}
                                    <td className='flex h-full  justify-center pt-1'>
                                        {user.photo ? (
                                            <img
                                                src={`/storage/${user.photo}`}
                                                alt="Foto"
                                                className=" flex items-center justify-center h-10 w-10 rounded-full border-1 border-[#3b1f0b] object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center rounded-full bg-[#3b1f0b] text-[#ffd89b]">
                                                👤
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
                                            <Link
                                                href={`/admin/users/${user.id}/edit`}
                                                className="text-sm font-semibold text-[#3b1f0b] hover:underline"
                                            >
                                                Editar
                                            </Link>

                                            <Link
                                                href={`/admin/users/${user.id}`}
                                                method="delete"
                                                as="button"
                                                onBefore={() =>
                                                    confirm(
                                                        'Deseja remover este usuário?',
                                                    )
                                                }
                                                className="text-sm font-semibold text-red-700 hover:underline"
                                            >
                                                Remover
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Fim da Tabela */}

            </div>
            {/* Fim do Card Principal */}

        </div>
    );
}
