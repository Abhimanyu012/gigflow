import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-matte-charcoal text-matte-bone">
      <main className="flex-1 pb-28 page-enter">
        <Outlet />
      </main>
      <Footer />
      <Navbar />
    </div>
  );
};

export default Layout;
