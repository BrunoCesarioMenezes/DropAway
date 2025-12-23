import { PlaceholderPattern } from '@/components/laravel-defaults/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props as any;
    const user = auth?.user;

    function handleLogout(){
        router.post('/logout');
    }

    return (
        <div>
            {user.role === 'admin' ? (
                <h1 className='text-white'>Você está na dashboard como ADMIN</h1>
            ) : (
                <h1 className='text-white'>Você está na dashboard como USUARIO</h1>
            )}
            <button onClick={handleLogout} className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg">
                Logout
            </button>
        </div>
    );
}
