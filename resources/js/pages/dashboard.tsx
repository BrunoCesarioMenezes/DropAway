import { PlaceholderPattern } from '@/components/laravel-defaults/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import NavbarAdm from '../components/NavbarAdm';

export default function Dashboard() {
    const { auth } = usePage().props as any;
    const user = auth?.user;


    return (
        <div className="flex items-center justify-center">
            <div className="w-screen h-screen bg-[#362312] pt-6 pb-10 pl-5 pr-5">
                {user.role === 'admin' ? (
                    //ADMIN
                    
                    <div>
                        <NavbarAdm></NavbarAdm>
                        <div className='pt-20 px-6'>
                            <h1>Você está na dashboard como ADMIN</h1>
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
