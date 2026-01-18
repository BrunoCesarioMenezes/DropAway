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

                    <div>
                        <NavbarAdm></NavbarAdm>
                        <div className='flex flex-col pt-20 px-6'>
                        <h1 className='color-[#F8F4E1] p-2'>Bem vindo, Administrador.</h1>

                                <table className='justify center align-center border-2 border-[#F8F4E1] rounded-2xl border-separate border-spacing-2 border-spacing-x-4'>

                              <thead>
                                <tr>
                                <th scope="col">Person</th>
                                <th scope="col">Most interest in</th>
                                <th scope="col">Age</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">Chris</th>
                                <td>HTML tables</td>
                                <td>22</td>
                                </tr>
                                <tr>
                                <th scope="row">Dennis</th>
                                <td>Web accessibility</td>
                                <td>45</td>
                                </tr>
                                <tr>
                                <th scope="row">Sarah</th>
                                <td>JavaScript frameworks</td>
                                <td>29</td>
                                </tr>
                                <tr>
                                <th scope="row">Karen</th>
                                <td>Web performance</td>
                                <td>36</td>
                                </tr>
                            </tbody>
                        </table>


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
