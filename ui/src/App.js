import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import AboutUs from './pages/AboutUs/AboutUs';
import NoPage from './pages/NoPage/NoPage';
import Complaints from './pages/Complaints/Complaints';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={<Home />} />
          <Route path='contact' element={<Contact />} />
          <Route path='about' element={<AboutUs />} />
          <Route path='complaints' element={<Complaints />} />
          <Route path='*' element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
