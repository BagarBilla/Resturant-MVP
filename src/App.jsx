import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import StickyFooter from './components/StickyFooter';
import TrackOrder from './pages/TrackOrder';
import MyOrders from './pages/MyOrders';

function HomePage() {
  return (
    <>
      <Hero />
      <MenuSection />
      <StickyFooter />
    </>
  );
}

function App() {
  return (
    <OrderProvider>
      <Router>
        <div className="min-h-screen bg-white font-body">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Routes>
        </div>
      </Router>
    </OrderProvider>
  );
}

export default App;