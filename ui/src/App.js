import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import NoPage from './pages/NoPage/NoPage';
import Login from './pages/Login/Login';
import ProtectedRoute from './util/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='*' element={<NoPage />} />
          </Route>
        </Route>

        {/* Handle 404 */}
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
