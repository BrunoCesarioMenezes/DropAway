import { useRef, useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function CreateUserModal({ open, onClose }: Props) {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="relative w-full max-w-md rounded-2xl bg-[#362312] p-6">

                <button
                    onClick={() => {
                        setPreview(null);
                        onClose();
                    }}
                    className="absolute right-4 top-4 text-white text-xl"
                >
                    ✕
                </button>

                <h2 className="mb-4 text-xl font-semibold text-white">
                    Criar Usuário
                </h2>

                {/* PREVIEW */}
                <div className="mb-4 flex justify-center">
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

                        router.post('/admin/users', formData, {
                            forceFormData: true,
                            onSuccess: () => {
                                setPreview(null);
                                onClose();
                            },
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

                    {/* BOTÃO + INPUT FILE (DENTRO DO FORM) */}
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
                        className="mt-3 rounded bg-[#03989E] py-2 font-bold text-white hover:bg-teal-600"
                    >
                        Criar
                    </button>
                </form>
            </div>
        </div>
    );
}
