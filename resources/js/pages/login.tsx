import { useEffect, useState } from "react";
import {router} from "@inertiajs/react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        router.post('/login', {
            email,
            password,
        });
    }

    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <div className="flex flex-col gap-2 w-fit px-2 text-black bg-gray-100 rounded-lg shadow-white">
                <h1>Login</h1>
                <form className="flex flex-col gap-2" action="" onSubmit={handleLogin}>
                    <input placeholder="Email" onChange={(e) => setEmail(e.currentTarget.value)} className="border-black border-2" type="email" />
                    <input placeholder="Senha" onChange={(e) => setPassword(e.currentTarget.value)} className="border-black border-2" type="password" />
                    <button type="submit">Logar</button>
                </form>
            </div>
        </div>
    );
}
