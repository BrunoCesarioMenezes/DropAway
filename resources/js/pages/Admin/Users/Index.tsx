import React from 'react';
import { Link } from '@inertiajs/react';

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
        <div style={{ padding: 20 }}>
            <h1>Gerenciamento de Usuários</h1>

            <table border={1} cellPadding={8} style={{ marginTop: 20, width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Foto</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>

                            <td>
                                {user.photo ? (
                                    <img
                                        src={`/storage/${user.photo}`}
                                        alt="Foto"
                                        width={40}
                                    />
                                ) : (
                                    '—'
                                )}
                            </td>

                            <td>{user.name}</td>
                            <td>{user.email}</td>

                            <td>
                                <Link href={`/admin/users/${user.id}/edit`}>
                                    Editar
                                </Link>

                                {' | '}

                                <Link
                                    href={`/admin/users/${user.id}`}
                                    method="delete"
                                    as="button"
                                    onBefore={() =>
                                        confirm('Deseja remover este usuário?')
                                    }
                                >
                                    Remover
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

