import { useRef, useState, useEffect } from 'react';
import { router, Link } from '@inertiajs/react';
import telaLoginBg from './img/tela_login.png'
import box from './img/box.svg'
import password from '@/routes/password';

// icon olho aberto
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
    </svg>
);

// icon olho fechado
const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" />
    </svg>
);
export default function CreateUser() {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConf, setShowPasswordConf] = useState(false);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        router.get('/login');
    }

    return (
        <div style={{ backgroundImage: `url(${telaLoginBg})` }} className="flex w-screen h-screen justify-center items-center bg-cover">
            <div className="flex h-150 w-150 flex-col px-2 text-white bg-[#362312] rounded-lg border border-[#FFB562]">

                <img src={box} alt="" className="w-full h-[60px] object-contain flex items-center justify-center mt-5" />

                {/* VOLTAR */}
                <button onClick={handleLogin} className="w-6 ring-1 relative flex rounded-full hover:rounded-full hover:ring-2 ring-[#FFB562] bg-[#7C420B] hover:bg-[#402103]" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </button>

                <h1 className="font-sansita font-bold italic text-2xl text-center pt-1 p-8"

                >Cadastre-se! É um prazer te ter por aqui</h1>

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

                    {/* PREVIEW */}
                    <div className="mt-2 flex justify-center gap-5">
                        <div className="h-15 w-15 rounded-full overflow-hidden border-2 border-[#FFB562]">
                            <img
                                src={
                                    preview ??
                                    '/img/default-avatar-icon-of-social-media-user-vector.jpg'
                                }
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-30 h-10 mt-2 font-sansita font-semibold bg-[#7C420B] hover:bg-[#402103] rounded-2xl border-1 border-black"
                        >
                            Escolher foto
                        </button>
                    </div>



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

                    <div className='flex items-end mt-2 m-12 mb-1 gap-6'>

                        <label >Nome: </label>
                        <input className="flex-1 bg-transparent border-b border-white text-white focus:outline-none pb-1"
                        type="text" 
                        name="name"
                        required/>

                    </div>

                    <div className='flex items-end mt-2 m-12 mb-2 gap-6'>

                        <label >Email: </label>
                        <input className="flex-1 bg-transparent border-b border-white text-white focus:outline-none pb-1" 
                        type="email" name='email' required />

                    </div>

                    <div className='flex items-end mt-2 m-12 mb-0 gap-5'>
                        <label className="mb-1">Senha: </label>

                        <div className="flex-1 flex items-center relative border-b border-white">
                            <input
                                className="w-full bg-transparent text-white focus:outline-none pb-1 pr-8"
                                type={showPassword ? "text" : "password"}
                                name='password'
                                required
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

                    <div className='flex items-end mt-2 m-12 gap-5'>
                        <label className="mb-1">Confirmar Senha: </label>

                        <div className="flex-1 flex items-center relative border-b border-white">
                            <input
                                className="w-full bg-transparent text-white focus:outline-none pb-1 pr-8"
                                type={showPasswordConf ? "text" : "password"}
                                name="password_confirmation"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPasswordConf(!showPasswordConf)}
                                className="absolute right-0 bottom-1 text-white opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                            >
                                {showPasswordConf ? <EyeIcon /> : <EyeOffIcon />}
                            </button>
                        </div>

                    </div>



                    {/* FILE PICKER */}
                    <div className="flex justify-center">

                        <button
                            className="w-30 h-10 font-sansita font-semibold bg-[#7C420B] hover:bg-[#402103] rounded-2xl border-1 border-black"
                            type="submit">
                            Criar Usuário</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
