import { FC, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';

export const MainLayout: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="lg:pl-64">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};