import { useEffect, useState } from "react";
import {router} from "@inertiajs/react";
import telaLoginBg from './img/tela_login.png'
import box from './img/box.svg'

// icon olho aberto
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
    </svg>
);

// icon olho fechado
const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/>
    </svg>
);

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        router.post('/login', {
            email,
            password,
        });
    }

    return (
        <div style={{ backgroundImage: `url(${telaLoginBg})` }} className="flex w-screen h-screen justify-center items-center bg-cover">
            <div className="flex h-125 w-150 flex-col gap-2 px-2 text-white bg-[#362312] rounded-lg border border-[#FFB562]">

                <img src={box} alt="" className="w-full h-[60px] object-contain flex items-center justify-center mt-5" />

                <h1 className="font-sansita font-bold italic text-2xl text-center pt-10 p-3"

                >Bem-vindo de volta!</h1>
                
                <form className="flex flex-col gap-2 m-3" action="" onSubmit={handleLogin}>

                    <div className='flex items-end mt-10 m-15 mb-2 gap-6'>
                        <label >Email: </label>
                        <input onChange={(e) => setEmail(e.currentTarget.value)} className="flex-1 bg-transparent border-b border-white text-white focus:outline-none pb-1" type="email" />
                    </div>
                    
                    <div className='flex items-end mt-2 m-15 gap-5'>
    <label className="mb-1">Senha: </label>
    
    <div className="flex-1 flex items-center relative border-b border-white">
        <input 
            onChange={(e) => setPassword(e.currentTarget.value)} 
            className="w-full bg-transparent text-white focus:outline-none pb-1 pr-8" 
            type={showPassword ? "text" : "password"} 
        />
        
        <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 bottom-1 text-white opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
        >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
        </button>
    </div>
</div>

                <div className="flex items-center justify-center w-full h-full">
                    <button className= "w-20 h-10 font-sansita font-semibold bg-[#7C420B] hover:bg-[#402103] rounded-2xl border-2 border-black" type="submit">
                        Entrar</button>
                </div>

                </form>
            </div>
        </div>
    );
}
