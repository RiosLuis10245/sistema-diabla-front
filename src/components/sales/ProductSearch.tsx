import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import api from '../../api/axios';
import { Product } from '../../types/sales';

interface Props {
  onProductSelect: (product: Product) => void;
}

export const ProductSearch: FC<Props> = ({ onProductSelect }) => {
  const [search, setSearch] = useState('');

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', search],
    queryFn: async () => {
      if (!search) return [];
      const { data } = await api.get<Product[]>(`/products/search?query=${search}`);
      return data;
    },
    enabled: search.length > 0
  });

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          className="w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Buscar producto por nombre o código..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {search.length > 0 && products && products.length > 0 && (
        <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 max-h-60 overflow-auto">
          {products.map((product) => (
            <button
              key={product.id}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                onProductSelect(product);
                setSearch('');
              }}
            >
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-gray-500">
                Código: {product.code} | Stock: {product.stock}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};