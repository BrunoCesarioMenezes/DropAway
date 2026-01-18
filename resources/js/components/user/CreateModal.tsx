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

        // Overlay
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            {/* Modal */}
            <div className="w-full max-w-120 rounded-2xl bg-[#362312] p-6 shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                    <h2 className="text-xl font-semibold text-white">
                        Criar Usuário
                    </h2>
                </div>

                {/* PREVIEW */}
                <div className="mb-4 flex justify-center pt-5">
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

                    {/* Nome */}
                    <div>
                        <label className="block text-sm font-medium text-[#FFD18D]">
                            Nome
                        </label>
                        <input
                            name="name"
                            placeholder="Nome"
                            required
                            className="mt-1 w-full rounded-lg border border-[#3b1f0b] bg-[#FFD18D] px-3 py-2 text-[#3b1f0b] focus:outline-none focus:ring-2 focus:ring-[#27832c]"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-[#FFD18D]">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="mt-1 w-full rounded-lg border border-[#3b1f0b] bg-[#FFD18D] px-3 py-2 text-[#3b1f0b] focus:outline-none focus:ring-2 focus:ring-[#27832c]"
                            required
                        />
                    </div>

                    {/* Passord 1 */}
                    <div>
                        <label className="block text-sm font-medium text-[#FFD18D]">
                            Senha
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Senha"
                            className="mt-1 w-full rounded-lg border border-[#3b1f0b] bg-[#FFD18D] px-3 py-2 text-[#3b1f0b] focus:outline-none focus:ring-2 focus:ring-[#27832c]"
                            required
                        />
                    </div>

                    {/* Password 2 - Verificação */}
                    <div>
                        <label className="block text-sm font-medium text-[#FFD18D]">
                            Confirmar Senha
                        </label>
                        <input
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirmar senha"
                            className="mt-1 w-full rounded-lg border border-[#3b1f0b] bg-[#FFD18D] px-3 py-2 text-[#3b1f0b] focus:outline-none focus:ring-2 focus:ring-[#27832c]"
                            required
                        />
                    </div>


                    {/* BOTÃO + INPUT FILE (DENTRO DO FORM) */}
                    <div className="flex justify-center pt-5 pb-5">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="rounded-lg px-4 py-2 text-sm font-bold text-[#FFD18D] border-2 border-[#FFD18D] hover:bg-[#FFD18D] hover:text-black"
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

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-white hover:text-red-400 transition hover:cursor-pointer"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-[#27832c] min-w-25 px-4 py-2 text-sm font-semibold text-white hover:cursor-pointer hover:bg-[#246e27]"
                        >
                            Criar
                        </button>
                    </div>
                </form>
            </div>
        </div>


    );
}
