
    import React, { Suspense, lazy } from 'react';
    import { Routes, Route } from 'react-router-dom';
    import Layout from '@/components/Layout.jsx';
    import { useAuth } from '@/hooks/useAuth.jsx';
    import { Navigate } from 'react-router-dom';

    const HomePage = lazy(() => import('@/pages/HomePage.jsx'));
    const AuthPage = lazy(() => import('@/pages/AuthPage.jsx'));
    const ProfilePage = lazy(() => import('@/pages/ProfilePage.jsx'));
    const ServicesListPage = lazy(() => import('@/pages/ServicesListPage.jsx'));
    const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetailPage.jsx'));
    const AdminDashboardPage = lazy(() => import('@/pages/AdminDashboardPage.jsx'));
    const NotFoundPage = lazy(() => import('@/pages/NotFoundPage.jsx'));

    const LoadingFallback = () => (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );

    const ProtectedRoute = ({ children, adminOnly = false }) => {
      const { user, loading } = useAuth();

      if (loading) {
        return <LoadingFallback />;
      }

      if (!user) {
        return <Navigate to="/auth" replace />;
      }

      if (adminOnly && !user.isAdmin) { // Assuming user object has an isAdmin property
         return <Navigate to="/" replace />;
      }
      
      return children;
    };


    function App() {
      return (
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="auth" element={<AuthPage />} />
              <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="services" element={<ServicesListPage />} />
              <Route path="services/:id" element={<ServiceDetailPage />} />
              <Route path="admin" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      );
    }

    export default App;
  