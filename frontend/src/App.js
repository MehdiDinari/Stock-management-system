import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Manage from "./components/Manage";
import Products from './components/Products';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/manage" element={<Manage />} />
        
        {/* 🔄 Redirection de /students vers /products */}
        <Route path="/students" element={<Navigate to="/products" replace />} />

        {/* 🛑 Page 404 si aucune route ne correspond */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
