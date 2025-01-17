import { FC, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Product, SaleItem } from '../../types/sales';
import { ProductSearch } from '../../components/sales/ProductSearch';
import api from '../../api/axios';

export const NewSalePage: FC = () => {
  const [items, setItems] = useState<SaleItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD' | 'TRANSFER'>('CASH');

  const createSale = useMutation({
    mutationFn: async () => {
      const { data } = await api.post('/sales', {
        paymentMethod,
        products: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.price
        }))
      });
      return data;
    },
    onSuccess: () => {
      setItems([]);
      alert('Venta realizada con éxito');
    }
  });

  const handleAddProduct = (product: Product) => {
    const existingItem = items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        alert('Stock insuficiente');
        return;
      }
      
      setItems(items.map(item => 
        item.product.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.price
            }
          : item
      ));
    } else {
      setItems([
        ...items,
        {
          product,
          quantity: 1,
          price: product.salePrice,
          subtotal: product.salePrice
        }
      ]);
    }
  };

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Nueva Venta</h2>
        <div className="flex gap-2">
          <select
            className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as any)}
          >
            <option value="CASH">Efectivo</option>
            <option value="CARD">Tarjeta</option>
            <option value="TRANSFER">Transferencia</option>
          </select>
          <button
            onClick={() => createSale.mutate()}
            disabled={items.length === 0 || createSale.isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {createSale.isLoading ? 'Procesando...' : 'Completar Venta'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ProductSearch onProductSelect={handleAddProduct} />
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 space-y-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Cantidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="1"
                          max={item.product.stock}
                          value={item.quantity}
                          onChange={(e) => {
                            const quantity = parseInt(e.target.value);
                            if (quantity > item.product.stock) {
                              alert('Stock insuficiente');
                              return;
                            }
                            setItems(items.map(i => 
                              i.product.id === item.product.id
                                ? { ...i, quantity, subtotal: quantity * i.price }
                                : i
                            ));
                          }}
                          className="w-20 rounded-md border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        S/. {item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        S/. {item.subtotal.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>S/. {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};