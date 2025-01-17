import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingCartIcon,
  CubeIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

interface NavItem {
  name: string;
  path: string;
  icon: typeof HomeIcon;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: HomeIcon },
  { name: 'Ventas', path: '/ventas', icon: ShoppingCartIcon },
  { name: 'Productos', path: '/productos', icon: CubeIcon },
  { name: 'Inventario', path: '/inventario', icon: DocumentTextIcon },
  { name: 'Reportes', path: '/reportes', icon: ChartBarIcon },
  { name: 'Usuarios', path: '/usuarios', icon: UsersIcon },
  { name: 'Configuración', path: '/configuracion', icon: Cog6ToothIcon },
];

export const Sidebar: FC = () => {
  const location = useLocation();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <h1 className="text-xl font-bold text-white">Sistema de Inventario</h1>
          </div>
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-6 w-6 flex-shrink-0 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};