export interface Product {
    id: number;
    code: string;
    name: string;
    salePrice: number;
    stock: number;
    category: {
      id: number;
      name: string;
    };
  }
  
  export interface SaleItem {
    product: Product;
    quantity: number;
    price: number;
    subtotal: number;
  }

  export interface SaleDetail {
    id: number;
    productId: number;
    quantity: number;
    price: number;
    subtotal: number;
    product: {
      name: string;
      code: string;
    };
  }
  
  export interface Sale {
    id: number;
    saleNumber: string;
    total: number;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    paymentMethod: 'CASH' | 'CARD' | 'TRANSFER';
    createdAt: string;
    details: SaleDetail[];
  }