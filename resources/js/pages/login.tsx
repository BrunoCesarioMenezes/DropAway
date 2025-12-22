import { useEffect, useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(e : React.FormEvent) {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);

        fetch("/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            if (response.ok) {
                alert("Login successful");
            } else {
                alert("Login failed");
                console.log("Login failed with status:", response);
            }
        })
        .catch(error => {
            console.error("Error during login:", error);
            alert("An error occurred during login");
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
