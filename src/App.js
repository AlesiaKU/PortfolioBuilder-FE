import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; 
import Header from './components/header/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Generator from './components/Generator';
import FAQ from './components/FAQ';
import Payment from './components/Payment';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App">
      <ScrollToTop />
      {/* Скрываем хедер и футер на страницах логина и регистрации */}
      {!isAuthPage && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
