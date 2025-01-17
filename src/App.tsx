import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainLayout } from './layouts/MainLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { NewSalePage } from './pages/sales/NewSalePage';
import { ProductsPage } from './pages/products/ProductsPage';
import { NewProductPage } from './pages/products/NewProductPage';
import { EditProductPage } from './pages/products/EditProductPage';
import { SalesPage } from './pages/sales/SalesPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="ventas">
              <Route index element={<SalesPage />} />
              <Route path="nueva" element={<NewSalePage />} />
            </Route>
            <Route path="productos" element={<ProductsPage />} />
            <Route path="productos/nuevo" element={<NewProductPage />} />
            <Route path="productos/:id/editar" element={<EditProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;