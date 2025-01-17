import { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductForm } from '../../components/products/ProductForm';
import { Product } from '../../types/products';
import api from '../../api/axios';

export const EditProductPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Obtener datos del producto
  const { data: product, isLoading: isLoadingProduct } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data;
    }
  });

  // Mutación para actualizar el producto
  const updateProduct = useMutation({
    mutationFn: async (formData: FormData) => {
      const productData = Object.fromEntries(formData.entries());
      const { data } = await api.put(`/products/${id}`, {
        ...productData,
        purchasePrice: parseFloat(productData.purchasePrice as string),
        salePrice: parseFloat(productData.salePrice as string),
        stock: parseInt(productData.stock as string),
        minStock: parseInt(productData.minStock as string),
        categoryId: parseInt(productData.categoryId as string)
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      navigate('/productos');
    }
  });

  if (isLoadingProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Producto no encontrado</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">
          Editar Producto: {product.name}
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Modifica los datos del producto.
        </p>
      </header>

      <div className="bg-white shadow rounded-lg p-6">
        <ProductForm
          initialData={product}
          onSubmit={(formData) => updateProduct.mutate(formData)}
          isLoading={updateProduct.isLoading}
        />
      </div>
    </div>
  );
};