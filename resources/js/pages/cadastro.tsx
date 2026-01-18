import { useRef, useState, useEffect } from 'react';
import { router, Link } from '@inertiajs/react';

export default function CreateUser() {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    return (
        <div className="min-h-screen bg-[#1f1f1f] flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-[#362312] p-6 shadow-lg">

                {/* HEADER */}
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">
                        Criar Usuário
                    </h2>

                    <Link
                        href="/login"
                        className="text-sm text-gray-300 hover:text-white"
                    >
                        Voltar
                    </Link>
                </div>

                {/* PREVIEW */}
                <div className="mb-6 flex justify-center">
                    <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-white">
                        <img
                            src={
                                preview ??
                                '/img/default-avatar-icon-of-social-media-user-vector.jpg'
                            }
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                {/* FORM */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);

                        router.post('/users/cadastro/create', formData, {
                            forceFormData: true,
                        });
                    }}
                    encType="multipart/form-data"
                    className="flex flex-col gap-3"
                >
                    <input
                        name="name"
                        placeholder="Nome"
                        className="rounded px-3 py-2"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="rounded px-3 py-2"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        className="rounded px-3 py-2"
                        required
                    />

                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirmar senha"
                        className="rounded px-3 py-2"
                        required
                    />

                    {/* FILE PICKER */}
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="rounded-lg bg-[#03989E] px-4 py-2 text-sm font-bold text-white hover:bg-teal-600"
                        >
                            Escolher foto
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            name="photo"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setPreview(URL.createObjectURL(file));
                                }
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 rounded bg-[#03989E] py-2 font-bold text-white hover:bg-teal-600"
                    >
                        Criar Usuário
                    </button>
                </form>
            </div>
        </div>
    );
}
