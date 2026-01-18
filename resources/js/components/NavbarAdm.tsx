import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Head, router, usePage, Link } from '@inertiajs/react';
const navigation = [
{ name: 'Dashboard', href: '/admin/dashboard' }, // Exemplo de rota
  { name: 'Tabela de Usuários', href: '/admin/users' },

]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}


export default function NavbarAdm() {

  return (
    <Disclosure
      as="nav"
      className="w-full bg-[#F8F4E1] shadow-md fixed top-0 left-0"
    >
      <div className="max-w-10xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <h1 className='font-bold font-sansita italic text-3xl text-[#362312]'>Dropaway</h1>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  usePage().url === item.href
                    ? 'font-extrabold bg-[#362312] text-[#F8F4E1]'
                    : 'text-[#362312] hover:bg-[#362312] hover:text-[#F8F4E1]',
                  'rounded-md px-3 py-2 text-sm font-bold',
                )}
              >
                {item.name}
              </Link>
            ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {/* Logout dropdown */}
            <Menu as="div" className="relative ml-3 ">
              <MenuButton className="relative flex rounded-full hover:rounded-full hover:ring-2 ring-[#362312]">
                <span className="absolute -inset-1.5 hover:#362312 houver:rounded-full" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#362312" className="size-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-24 origin-top-right border rounded-md bg-[#F8F4E1] py-1 shadow-lg outline out font-bold"
              >

                <MenuItem>
                  <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="block right-0 w-23 z-10 px-4 py-2 text-sm text-[#362312] hover:bg-[#e0dcc5] rounded-xl font-bold"

                  >
                    Sign out
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

    </Disclosure>
  )
}
