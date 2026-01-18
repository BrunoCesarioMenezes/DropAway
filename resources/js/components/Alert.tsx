type AlertProps = {
    message: string;
    onClose?: () => void;
};

export default function Alert({ message, onClose }: AlertProps) {
    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 z-40 bg-black/70" />

            {/* Modal */}
            <div className="fixed inset-0 z-100 flex items-center justify-center">
                <div className="w-full max-w-lg rounded-2xl bg-[#362312] p-8 text-center shadow-2xl">

                    <h2 className="mb-4 text-2xl font-black text-white">
                        Atenção
                    </h2>

                    <p className="mb-6 text-lg font-semibold text-[#ffe2b6]">
                        {message}
                    </p>

                    {onClose && (
                        <button
                            onClick={onClose}
                            className="rounded-full bg-[#ffe2b6] px-6 py-2 font-bold text-black transition hover:bg-[#f5c47a]"
                        >
                            OK
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
