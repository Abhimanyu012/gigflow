import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-matte-charcoal text-matte-bone">
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0 page-enter">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
