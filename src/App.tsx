import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AISimulationProvider } from './contexts/AISimulationContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Features from './pages/Features';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';

function App() {
  return (
    <AISimulationProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </AISimulationProvider>
  );
}

export default App;