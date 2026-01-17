import React, { useState } from 'react';
import { router } from '@inertiajs/react';

type User = {
    id: number;
    name: string;
    email: string;
};

interface Props {
    user: User;
    onClose: () => void;
}

export default function EditModal({ user, onClose }: Props) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    function submit(e: React.FormEvent) {
        e.preventDefault();

        router.put(`/admin/users/${user.id}`, {
            name,
            email,
        }, {
            onSuccess: () => onClose(),
        })
    }

     return (
        /* Overlay */
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

            {/* Modal */}
            <div className="w-full max-w-lg rounded-2xl bg-[#362312] p-6 shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                    <h2 className="text-xl font-semibold text-white">
                        Editar Usuário
                    </h2>

                    <button
                        onClick={() => window.history.back()}
                        className="text-white hover:text-red-400 transition"
                    >
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={submit} className="mt-6 space-y-4">

                    {/* Nome */}
                    <div>
                        <label className="block text-sm font-medium text-[#FFD18D]">
                            Nome
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-[#3b1f0b] bg-[#FFD18D] px-3 py-2 text-[#3b1f0b] focus:outline-none focus:ring-2 focus:ring-[#03989E]"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-[#FFD18D]">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-[#3b1f0b] bg-[#FFD18D] px-3 py-2 text-[#3b1f0b] focus:outline-none focus:ring-2 focus:ring-[#03989E]"
                        />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-white hover:text-red-400 transition"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-[#03989E] px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 transition"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
