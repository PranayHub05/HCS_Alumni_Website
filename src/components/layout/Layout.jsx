import React, { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        {children || <Outlet />}
      </main>
      <Footer />
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            fontFamily: 'var(--font-body)',
            background: 'var(--color-primary-dark)',
            color: 'var(--color-white)',
          }
        }} 
      />
    </div>
  );
};

export default Layout;
