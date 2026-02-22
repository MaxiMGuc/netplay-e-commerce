import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import './App.css'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Catalog from './pages/Catalog/Catalog'
import Categories from './pages/Categories/Categories'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Cart from './pages/Cart/Cart'
import Product from './pages/Product/Product'

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />

        <div className="app-body">
          <Sidebar />

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
            </Routes>

            <Footer />
          </div>
        </div>
      </div>
    </CartProvider>
  )
}

export default App
