import React, { useState } from 'react';
import { router } from '@inertiajs/react';

type User = {
    id: number;
    name: string;
    email: string;
};

interface Props {
    user: User;
}

export default function Edit({ user }: Props) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    function submit(e: React.FormEvent) {
        e.preventDefault();

        router.put(`/admin/users/${user.id}`, {
            name,
            email,
        });
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Editar Usuário</h1>

            <form onSubmit={submit}>
                <div style={{ marginBottom: 10 }}>
                    <label>Nome</label><br />
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div style={{ marginBottom: 10 }}>
                    <label>Email</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <button type="submit">
                    Salvar
                </button>
            </form>
        </div>
    );
}
