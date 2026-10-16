
import { Link, Route, Routes } from 'react-router-dom'
import { useCart } from './context/CartContext.jsx'
import products from './data/products.js'
import ProductCard from './components/ProductCard.jsx'
import Cart from './pages/Cart.jsx'
import './App.css'

function App() {
  const { addToCart, cartCount } = useCart()
  return (
    <div className="app">
      <header className="navbar">
        <a href="/" className="logo">
          easybuy<span>.</span>
        </a>

       <nav className="nav-links">
  <Link to="/">Home</Link>
  <Link to="/#shop">Shop</Link>
  <a href="/#about">About</a>
</nav>

<Link to="/cart" className="cart-button">
  Cart ({cartCount})
</Link>

        <button className="cart-button" type="button">
          Cart (0)
        </button>
      </header>

      <main>
      <Routes>
  <Route
    path="/"
    element={
      <>
         <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">THE EYEWEAR COLLECTION</p>

            <h1>
              See the world
              <br />
              differently.
            </h1>

            <p className="hero-description">
              Discover eyewear designed for everyday confidence.
              Minimal style. Maximum expression.
            </p>

            <a href="#shop" className="shop-button">
              Explore collection
            </a>
          </div>

          <div className="hero-image">
            <img
              src="/placeholder-glasses.svg"
              alt="Minimal illustration of eyeglasses"
            />
          </div>
        </section>

       <section className="products-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">OUR COLLECTION</p>
              <h2>Find your frame.</h2>
            </div>

            <p>Simple designs. Timeless appeal.</p>
          </div>

         <div className="products-grid">
  {products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      onAddToCart={addToCart}
    />
  ))}
</div>
        </section>

         <section className="about-section" id="about">
          <p className="eyebrow">THE EASYBUY DIFFERENCE</p>
          <h2>Good frames. Good style. Every day.</h2>
          <p>
            We believe finding your everyday eyewear should be simple.
            Explore frames that bring comfort and personal style together.
          </p>
        </section>
      </>
    }
  />

  <Route path="/cart" element={<Cart />} />
</Routes>
      </main>

      <footer className="footer">
        <a href="/" className="logo">
          easybuy<span>.</span>
        </a>
        <p>Everyday eyewear, made easy.</p>
        <p>© {new Date().getFullYear()} EasyBuy. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
