
import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { useCart } from './context/CartContext.jsx'
import products from './data/products.js'
import ProductCard from './components/ProductCard.jsx'
import Checkout from './pages/Checkout.jsx'
import Cart from './pages/Cart.jsx'
import './App.css'

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.slice(1)

      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      })
    } else if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.pathname, location.hash])

  return null
}

function App() {
  const { addToCart, cartCount } = useCart()

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('easybuy-theme') || 'light'
  })

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('easybuy-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === 'light' ? 'dark' : 'light'
    )
  }

  return (
    <div className="app">
       <ScrollToHash />
      
<header className="navbar">
  <button
    type="button"
    className="menu-toggle"
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
    aria-expanded={isMenuOpen}
    aria-controls="main-navigation"
  >
    {isMenuOpen ? (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    ) : (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6h18M3 12h18M3 18h18" />
      </svg>
    )}
  </button>

  <Link
    to="/"
    className="logo"
    onClick={() => setIsMenuOpen(false)}
  >
    easybuy<span>.</span>
  </Link>

  <nav
    id="main-navigation"
    className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}
  >
    <Link to="/" onClick={() => setIsMenuOpen(false)}>
      Home
    </Link>

    <Link to="/#shop" onClick={() => setIsMenuOpen(false)}>
      Shop
    </Link>

    <Link to="/#about" onClick={() => setIsMenuOpen(false)}>
      About
    </Link>
  </nav>

  <div className="navbar-actions">
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${
        theme === 'light' ? 'dark' : 'light'
      } mode`}
      title={`Switch to ${
        theme === 'light' ? 'dark' : 'light'
      } mode`}
    >
      {theme === 'light' ? (
        <svg
          viewBox="0 0 24 24"
          className="theme-icon"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.9 13A8.5 8.5 0 0 1 11 3.1 8.5 8.5 0 1 0 20.9 13Z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="theme-icon"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
      )}
    </button>

    <Link
      to="/cart"
      className="cart-button"
      aria-label={`Shopping cart with ${cartCount} items`}
    >
      <svg
        className="cart-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6" />
        <circle cx="10" cy="20" r="1" />
        <circle cx="19" cy="20" r="1" />
      </svg>

      <span className="cart-count">{cartCount}</span>
    </Link>
  </div>
</header>


      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="hero" id="home">
                  <div className="hero-content">
                    <p className="eyebrow">
                      THE EYEWEAR COLLECTION
                    </p>

                    <h1>
                      See the world
                      <br />
                      differently.
                    </h1>

                    <p className="hero-description">
                      Discover eyewear designed for everyday
                      confidence. Minimal style. Maximum expression.
                    </p>

                    <a href="#shop" className="shop-button">
                      Explore collection
                    </a>
                  </div>

                  <div className="hero-image">
                    <img
                      src="/background.jpg"
                      alt="Eyeglasses from the EasyBuy collection"
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
                  <p className="eyebrow">
                    THE EASYBUY DIFFERENCE
                  </p>

                  <h2>Good frames. Good style. Every day.</h2>

                  <p>
                    We believe finding your everyday eyewear should
                    be simple. Explore frames that bring comfort
                    and personal style together.
                  </p>
                </section>
              </>
            }
          />

          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>

      <footer className="footer">
        <Link to="/" className="logo">
          easybuy<span>.</span>
        </Link>

        <p>Everyday eyewear, made easy.</p>

        <p>
          © {new Date().getFullYear()} EasyBuy. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default App
