export interface Product {
    id: number;
    code: string;
    name: string;
    purchasePrice: number;
    salePrice: number;
    stock: number;
    minStock: number;
    category: {
      id: number;
      name: string;
    };
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    description?: string;
  }