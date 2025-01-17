import { FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Sale } from '../../types/sales';

interface Props {
  sale: Sale | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SaleDetailModal: FC<Props> = ({ sale, isOpen, onClose }) => {
  if (!sale) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Cerrar</span>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full text-left">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      Detalle de Venta #{sale.saleNumber}
                    </Dialog.Title>
                    <div className="mt-4 space-y-6">
                      <div className="border-t border-gray-200 pt-4">
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Fecha</dt>
                            <dd className="text-sm text-gray-900">
                              {format(new Date(sale.createdAt), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Estado</dt>
                            <dd className="text-sm text-gray-900">
                              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                sale.status === 'COMPLETED' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {sale.status === 'COMPLETED' ? 'Completada' : 'Anulada'}
                              </span>
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-sm font-medium text-gray-900">Productos</h4>
                        <table className="mt-2 min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                              <th className="text-right text-xs font-medium text-gray-500 uppercase">Cant.</th>
                              <th className="text-right text-xs font-medium text-gray-500 uppercase">Precio</th>
                              <th className="text-right text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {sale.details.map((detail) => (
                              <tr key={detail.id}>
                                <td className="text-sm text-gray-900">{detail.product.name}</td>
                                <td className="text-right text-sm text-gray-500">{detail.quantity}</td>
                                <td className="text-right text-sm text-gray-500">
                                  S/. {detail.price.toFixed(2)}
                                </td>
                                <td className="text-right text-sm text-gray-900">
                                  S/. {detail.subtotal.toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <th colSpan={3} className="text-right text-sm font-medium text-gray-900">Total</th>
                              <td className="text-right text-sm font-medium text-gray-900">
                                S/. {sale.total.toFixed(2)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};