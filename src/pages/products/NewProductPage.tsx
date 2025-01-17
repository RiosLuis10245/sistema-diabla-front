import { FC } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ProductForm } from '../../components/products/ProductForm';
import api from '../../api/axios';

export const NewProductPage: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createProduct = useMutation({
    mutationFn: async (formData: FormData) => {
      const product = Object.fromEntries(formData.entries());
      const { data } = await api.post('/products', {
        ...product,
        purchasePrice: parseFloat(product.purchasePrice as string),
        salePrice: parseFloat(product.salePrice as string),
        stock: parseInt(product.stock as string),
        minStock: parseInt(product.minStock as string),
        categoryId: parseInt(product.categoryId as string)
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate('/productos');
    }
  });

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">Nuevo Producto</h2>
        <p className="mt-1 text-sm text-gray-600">
          Ingresa los datos del nuevo producto.
        </p>
      </header>

      <div className="bg-white shadow rounded-lg p-6">
        <ProductForm
          onSubmit={(formData) => createProduct.mutate(formData)}
          isLoading={createProduct.isLoading}
        />
      </div>
    </div>
  );
};