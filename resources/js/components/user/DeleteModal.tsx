import { router } from '@inertiajs/react'

type User = {
    id: number
    name: string
    email: string
}

interface Props {
    user: User
    onClose: () => void
}

export default function DeleteModal({ user, onClose }: Props) {

    function handleDelete() {
        router.delete(`/admin/users/${user.id}`, {
            onSuccess: () => onClose(),
        })
    }

    return (
        /* Overlay */
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

            {/* Modal */}
            <div className="w-full max-w-120 rounded-2xl bg-[#362312] p-6 shadow-xl">

                {/* BODY */}
                <div className="mt-6">
                    <p className="text-center text-[#FFD18D] text-2xl">
                        Deseja mesmo excluir esse usuário?
                    </p>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 pt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-white hover:text-red-400 transition hover:cursor-pointer"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleDelete}
                        className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 hover:cursor-pointer"
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    )
}
