
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import '../App.css'

function formatPrice(amount) {
  return amount.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  })
}

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    subtotal,
  } = useCart()

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <h1>Your shopping bag</h1>
        <p>Your cart is currently empty.</p>
        <Link to="/" className="shop-button">
          Continue shopping
        </Link>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <h1>Your shopping bag</h1>

      <div className="cart-layout">
        <section className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>{formatPrice(item.price)}</p>

                <div className="quantity-controls">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.id)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.id)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>

              <p className="cart-item-total">
                {formatPrice(item.price * item.quantity)}
              </p>
            </article>
          ))}
        </section>

        <aside className="cart-summary">
          <h2>Order summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <p className="summary-note">
            Delivery and any applicable discounts will be calculated at checkout.
          </p>

          <Link to="/checkout" className="checkout-button">
            Proceed to checkout
          </Link>

          <Link to="/" className="continue-link">
            Continue shopping
          </Link>
        </aside>
      </div>
    </main>
  )
}

export default Cart
