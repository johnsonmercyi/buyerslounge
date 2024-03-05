import React from 'react';
import './App.css';
// import './global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import NoPage from './pages/NoPage/NoPage';
import Login from './pages/Login/Login';
import ProtectedRoute from './util/ProtectedRoute';
import SignUp from './pages/SignUp/SignUp';
import AdminCategory from './pages/admin/category/Category';
import AdminDashboard from './pages/admin/dashboard';
import SellerDashboard from './pages/seller/dashboard';
import Category from './pages/admin/category/Category';
import CreateCategory from './pages/admin/category/create/CreateCategory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/admin/dashboard' element={<AdminDashboard />}>
              <Route index element={<div>Welcome to admin Dashboard!</div>}/>
              <Route path='/admin/dashboard/categories' element={<Category />} />
              <Route path='/admin/dashboard/categories/create' element={<CreateCategory />} />
            </Route>
            <Route path='/seller/dashboard' element={<SellerDashboard />}>
              <Route path='/seller/dashboard/categories' element={<Category />} />
            </Route>
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
