import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import { WishlistProvider } from './context/WishlistContext'
import { ProductsProvider } from './context/ProductsContext'
import ScrollToTop from './components/ScrollToTop'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Catalog from './pages/Catalog/Catalog'
import Categories from './pages/Categories/Categories'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Cart from './pages/Cart/Cart'
import Product from './pages/Product/Product'
import Wishlist from './pages/Wishlist/Wishlist'
import AdminProducts from './pages/AdminProducts/AdminProducts'
import NotFound from './pages/NotFound/NotFound'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ProductsProvider>
            <ToastProvider>
              <ScrollToTop />
              <div className="app">
                <Header />

                <div className="app-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>

                  <Footer />
                </div>
              </div>
            </ToastProvider>
          </ProductsProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
