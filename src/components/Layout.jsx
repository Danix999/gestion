
    import React from 'react';
    import { Outlet } from 'react-router-dom';
    import Navbar from '@/components/Navbar.jsx';
    import Footer from '@/components/Footer.jsx';
    import { Toaster } from '@/components/ui/toaster.jsx';

    const Layout = () => {
      return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-gray-100">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </main>
          <Footer />
          <Toaster />
        </div>
      );
    };

    export default Layout;
  