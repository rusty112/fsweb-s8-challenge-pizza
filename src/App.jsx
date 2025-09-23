import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Sayfa bileşenlerinizi import edin
import Home from './pages/Home.jsx';
import OrderPizza from './pages/OrderPizza.jsx';
import Success from './pages/Success.jsx';
import Options from './pages/Options.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<OrderPizza />} />
        <Route path="/success" element={<Success />} />
        <Route path="/options" element={<Options />} />
      </Routes>
    </Router>
  );
}

export default App;
