import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Archives from './pages/Archives';
import Login from './pages/Login'; 
import Register from './pages/Register';
import Search from './pages/Search';



function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content"> {/* This div is used for pushing the footer down */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/search" element={<Search />} />
        
        </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

