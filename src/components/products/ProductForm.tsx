import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Product, Category } from '../../types/products';
import api from '../../api/axios';

interface Props {
  initialData?: Product;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export const ProductForm: FC<Props> = ({ initialData, onSubmit, isLoading }) => {
  // Obtener categorías
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/categories');
      return data;
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Código de Barras
          </label>
          <input
            type="text"
            name="code"
            id="code"
            defaultValue={initialData?.code}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre del Producto
          </label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={initialData?.name}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <select
            name="categoryId"
            id="categoryId"
            defaultValue={initialData?.category.id}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Seleccione una categoría</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">
            Precio de Compra
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">S/.</span>
            </div>
            <input
              type="number"
              name="purchasePrice"
              id="purchasePrice"
              defaultValue={initialData?.purchasePrice}
              required
              step="0.01"
              min="0"
              className="mt-1 block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="salePrice" className="block text-sm font-medium text-gray-700">
            Precio de Venta
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">S/.</span>
            </div>
            <input
              type="number"
              name="salePrice"
              id="salePrice"
              defaultValue={initialData?.salePrice}
              required
              step="0.01"
              min="0"
              className="mt-1 block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            id="stock"
            defaultValue={initialData?.stock ?? 0}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="minStock" className="block text-sm font-medium text-gray-700">
            Stock Mínimo
          </label>
          <input
            type="number"
            name="minStock"
            id="minStock"
            defaultValue={initialData?.minStock ?? 5}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};