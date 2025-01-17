import { FC } from 'react';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../../store/authStore';

interface Props {
  setSidebarOpen: (open: boolean) => void;
}

export const Header: FC<Props> = ({ setSidebarOpen }) => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Abrir sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex flex-1 justify-between px-4">
        <div className="flex flex-1"></div>
        <div className="ml-4 flex items-center md:ml-6">
          <button
            type="button"
            className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="sr-only">Ver notificaciones</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="relative ml-3">
            <button
              onClick={logout}
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};