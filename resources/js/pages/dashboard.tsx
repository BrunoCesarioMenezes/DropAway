import { PlaceholderPattern } from '@/components/laravel-defaults/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import NavbarAdm from '../components/NavbarAdm';

export default function Dashboard() {
    const { auth } = usePage().props as any;
    const user = auth?.user;


    return (
        <div className="flex items-center justify-center ">
            <div className="w-screen h-screen bg-[#362312] pt-6 pb-10 pl-5 pr-5">
                {user.role === 'admin' ? (
                    //ADMIN

                    <div className='flex flex-col justify-center'>
                        <NavbarAdm></NavbarAdm>
                        <div className='bg-[#f3d9a0] rounded-sm bg-gradient-to-br from-[#ffe2b6] to-[#d8b580] text-neutral-900 flex flex-col mt-16 gap-2 px-6 py-8 self-center items-center shadow-[0_0_100px_rgba(0,0,0,0.8)] w-[calc(100vw-40rem)] h-fit'>
                            <h1 className='color-[#F8F4E1] text-xl font-bold text-black'>Bem vindo, {user.name}...</h1>
                            <div className='flex flex-col m-2 gap-4 text-md'>
                                <p>
                                    O DropAway nasceu de uma percepção simples: planejar uma viagem não deveria ser frustrante. Frequentemente, a magia da descoberta se perde entre planilhas frias e anotações espalhadas, dando margem à ansiedade e insegurança. O projeto existe para devolver ao viajante o prazer de ver o seu sonho ganhar forma, transformando a organização em algo visual e vivo.
                                </p>
                                <p>
                                    Nossa motivação é tirar o roteiro do campo das ideias e colocá-lo no mapa. Quando você seleciona um destino ou aquele ponto turístico que você sempre quis ver, o sistema não apenas guarda um dado; ele traça a jornada na sua frente. É o nascimento de uma trajetória. As retas que unem cidades não são apenas geometria, são os fios que conectam suas intenções e dão escala à sua aventura.
                                </p>
                                <p>
                                    O DropAway existe para quem acredita que o mapa é o coração da jornada. É sobre a satisfação de ver um espaço vazio ser preenchido pelas suas escolhas, transformando a ansiedade do "para onde ir" na clareza de ver o caminho se construindo em tempo real. É, acima de tudo, uma ferramenta feita para dar vida à jornada antes mesmo dela começar.
                                </p>
                            </div>



                        </div>

                    </div>
                ) :

                //USUÀRIO
                (
                    <div>
                    <h1 className='text-white'>Você está na dashboard como USUARIO</h1>
                </div>
            )}

            </div>
        </div>
    );
}
