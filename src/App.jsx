import React from 'react';
import {
  BrowserRouter,
  MemoryRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ThankYouPage from './pages/ThankYouPage';

function App() {
  const Router = process.env.NODE_ENV === 'test' ? MemoryRouter : BrowserRouter;

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;