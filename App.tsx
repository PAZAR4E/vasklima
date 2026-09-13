import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductPage from './pages/Product';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import HeatPumps from './pages/HeatPumps';
import HeatPumpPage from './pages/HeatPump';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/klimatici" element={<Catalog />} />
          <Route path="/klimatici/:slug" element={<ProductPage />} />
          <Route path="/katalog" element={<Catalog />} />
          <Route path="/katalog/:slug" element={<ProductPage />} />
          <Route path="/termopompi" element={<HeatPumps />} />
          <Route path="/termopompi/:slug" element={<HeatPumpPage />} />
          <Route path="/uslugi" element={<Services />} />
          <Route path="/za-nas" element={<About />} />
          <Route path="/kontakt" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
