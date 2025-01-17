import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BanknotesIcon,
  ShoppingCartIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { StatsCard } from '../../components/dashboard/StatsCard';
import api from '../../api/axios';

interface DashboardStats {
  today: {
    totalSales: number;
    totalAmount: number;
    averageTicket: number;
  };
  lowStock: {
    totalProducts: number;
    products: Array<{
      id: number;
      name: string;
      stock: number;
      minStock: number;
      category: string;
    }>;
  };
}

const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await api.get('/dashboard/stats');
  return data;
};

export const DashboardPage: FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  const today = data?.today ?? { totalSales: 0, totalAmount: 0, averageTicket: 0 };
  const lowStock = data?.lowStock ?? { totalProducts: 0, products: [] };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Ventas de Hoy"
          value={today.totalSales}
          icon={<ShoppingCartIcon className="h-6 w-6" />}
        />

        <StatsCard
          title="Total Vendido"
          value={`S/. ${today.totalAmount.toFixed(2)}`}
          icon={<BanknotesIcon className="h-6 w-6" />}
        />

        <StatsCard
          title="Ticket Promedio"
          value={`S/. ${today.averageTicket.toFixed(2)}`}
          icon={<ChartBarIcon className="h-6 w-6" />}
        />

        <StatsCard
          title="Productos con Stock Bajo"
          value={lowStock.totalProducts}
          icon={<ExclamationTriangleIcon className="h-6 w-6" />}
          subtitle="Requieren atención"
        />
      </div>

      {lowStock.totalProducts > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Productos con Stock Bajo
          </h3>
          <div className="bg-white shadow rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock Actual
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock Mínimo
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lowStock.products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.minStock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};