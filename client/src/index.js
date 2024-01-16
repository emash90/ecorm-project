import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './redux/store';


import { Home, Product, Products, AboutPage, ContactPage, Cart, Login, Register, Checkout, PageNotFound } from "./pages"
import AddProduct from './pages/AddProduct';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/merchant" element={<Products />} />
        <Route path="/merchant/add_product" element={<AddProduct />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />
      </Routes>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);