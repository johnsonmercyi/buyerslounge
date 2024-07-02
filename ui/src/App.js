import ViewCategory from 'pages/admin/category/view/Page';
import ViewProducts from 'pages/admin/product/view/Page';
import MyProduct from 'pages/seller/products/Page';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NoPage from './pages/NoPage/NoPage';
import SignUp from './pages/SignUp/SignUp';
import Category from './pages/admin/category/Category';
import CreateCategory from './pages/admin/category/create/CreateCategory';
import AdminDashboard from './pages/admin/dashboard';
import Product from './pages/admin/product/Product';
import NewProduct from './pages/admin/product/new/Page';
import SellerDashboard from './pages/seller/dashboard';
import ProtectedRoute from './util/ProtectedRoute';
import AddNewProduct from 'pages/seller/products/create/Page';
import viewSellerProduct from 'pages/seller/products/view/Page';

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
              <Route index element={<div>Welcome to admin Dashboard!</div>} />
              <Route path='/admin/dashboard/categories' element={<Category />} />
              <Route path='/admin/dashboard/categories/create' element={<CreateCategory />} />
              <Route path='/admin/dashboard/categories/:category/' element={<ViewCategory />} />

              <Route path='/admin/dashboard/products' element={<Product />} />
              <Route path='/admin/dashboard/products/create' element={<NewProduct />} />
              <Route path='/admin/dashboard/products/:product/' element={<ViewProducts />} />

            </Route>
            <Route path='/seller/dashboard' element={<SellerDashboard />}>
              <Route index element={<div>Welcome to seller Dashboard!</div>} />
              <Route path='/seller/dashboard/products' element={<MyProduct />} />
              <Route path='/seller/dashboard/products/create' element={<AddNewProduct />} />
              <Route path='/seller/dashboard/products/:product/' element={<viewSellerProduct />} />
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
