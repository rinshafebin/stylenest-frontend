import React from 'react'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Homepage from './Pages/Home/HomePage'
import Logout from './Pages/Auth/Logout'
import ChangePassword from './Pages/Auth/ChangePassword'
import CartPage from './Pages/User/cart/CartPage'
import WishlistPage from './Pages/User/wishlist/WishlistPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeAllProducts from './Pages/Home/HomeAllProducts'
import ProductbyCategory from './Pages/Home/ProductsbyCategory'
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from 'react-hot-toast'
import ForgetPassword from './Pages/Auth/ForgetPassword'
import Verifyotp from './Pages/Auth/Verifyotp'
import Profile from './Pages/User/Profile'
import OrdersPage from './Pages/User/orders/OrdersPage'
import ProductDetails from './Pages/Home/ProductDetail'
import CheckoutPage from './Pages/User/CheckoutPage'
import AddProduct from './Pages/AdminPanel/adminproducts/Addproduct'
import AdminDashboard from './Pages/AdminPanel/AdminDashboard'
import Customers from './Pages/AdminPanel/Customers'
import AllOrders from './Pages/AdminPanel/adminorders/AllOrders'
import AllProducts from './Pages/AdminPanel/AllProducts'
import EditProduct from './Pages/AdminPanel/EditProduct'
import ResetPassword from './Pages/Auth/ResetPassword'
import SearchResults from './Pages/User/SearchResults'
import ShippingAddressForm from './Pages/User/shipping/ShippingAddressForm'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Toaster position="bottom-right" reverseOrder={false} />

        <div className="flex-grow">
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Homepage />} />

            <Route path='/products' element={<HomeAllProducts />} />
            <Route path='/products/:category' element={<ProductbyCategory />} />
            <Route path='/productdetails/:id/' element={<ProductDetails />} />

            <Route path='/cart' element={<CartPage />} />
            <Route path='/wishlist' element={<WishlistPage />} />
            <Route path='/profile' element={<Profile />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path='/orders' element={<OrdersPage />} />
            <Route path='/shippingaddress' element={<ShippingAddressForm />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            <Route path='/changepassword' element={<ChangePassword />} />
            <Route path='/forgetpassword' element={<ForgetPassword />} />
            <Route path='/verifyotp' element={<Verifyotp />} />
            <Route path='/resetpassword' element={<ResetPassword />} />
            <Route path='/logout' element={<Logout />} />

            {/* Admin */}
            <Route path='/adminpanel' element={<AdminDashboard />} />
            <Route path='/addproduct' element={<AddProduct />} />
            <Route path='/allproducts' element={<AllProducts />} />
            <Route path='/allcustomers' element={<Customers />} />
            <Route path='/allorders' element={<AllOrders />} />
            <Route path='/editproduct/:id' element={<EditProduct />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}
