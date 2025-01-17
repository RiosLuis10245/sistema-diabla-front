import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import api from '../../api/axios';
import { Product } from '../../types/products';
import { useNavigate } from 'react-router-dom';

export const ProductsPage: FC = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await api.get<Product[]>('/products');
      return data;
    }
  });

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.code.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Productos</h2>
        <button 
  onClick={() => navigate('/productos/nuevo')}
  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
>
  <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
  Nuevo Producto
</button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio Compra
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio Venta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center">
                    Cargando...
                  </td>
                </tr>
              ) : filteredProducts?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center">
                    No se encontraron productos
                  </td>
                </tr>
              ) : (
                filteredProducts?.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock <= product.minStock
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      S/. {product.purchasePrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      S/. {product.salePrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
  <div className="flex items-center space-x-4">
    <button
      onClick={() => navigate(`/productos/${product.id}/editar`)}
      className="text-blue-600 hover:text-blue-900"
    >
      Editar
    </button>
  </div>
</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};