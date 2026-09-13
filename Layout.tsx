import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import ScrollProgress from './ScrollProgress';
import ScrollAura from './ScrollAura';

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-[#070a12]">
      <ScrollToTop />
      <ScrollProgress />
      <ScrollAura />
      <div className="relative z-10">
        <Navbar />
        <main className="pt-24">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
