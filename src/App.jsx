
import './App.css'
import products from './data/products'
import ProductCard from './components/ProductCard'

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <a href="/" className="logo">
          easybuy<span>.</span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
        </nav>

        <button className="cart-button" type="button">
          Cart (0)
        </button>
      </header>

      <main>
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
            <article className="product-card">
              <div className="product-image">
                <img
                  src="/placeholder-glasses.svg"
                  alt="Classic black eyeglasses"
                />
              </div>

              <p className="product-category">OPTICAL FRAME</p>
              <h3>Classic Black</h3>

              <div className="product-footer">
                <p>₦18,500</p>
                <button type="button">Add to cart</button>
              </div>
            </article>

            <article className="product-card">
              <div className="product-image">
                <img
                  src="/placeholder-glasses.svg"
                  alt="Transparent eyeglasses"
                />
              </div>

              <p className="product-category">OPTICAL FRAME</p>
              <h3>Crystal Clear</h3>

              <div className="product-footer">
                <p>₦22,000</p>
                <button type="button">Add to cart</button>
              </div>
            </article>

            <article className="product-card">
              <div className="product-image">
                <img
                  src="/placeholder-glasses.svg"
                  alt="Modern rectangular eyeglasses"
                />
              </div>

              <p className="product-category">OPTICAL FRAME</p>
              <h3>Urban Rectangle</h3>

              <div className="product-footer">
                <p>₦20,000</p>
                <button type="button">Add to cart</button>
              </div>
            </article>
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
