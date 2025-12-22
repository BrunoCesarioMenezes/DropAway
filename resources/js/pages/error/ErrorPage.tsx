export default function ErrorPage() {
    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <div className="flex flex-col gap-2 w-fit px-2 text-black bg-gray-100 rounded-lg shadow-white">
                <h1>Erro 403 - Acesso não autorizado</h1>
                <p>Você não tem permissão para acessar esta página.</p>
            </div>
        </div>
    );
}
