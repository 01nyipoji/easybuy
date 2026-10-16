
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import deliveryRates from '../data/deliveryRates.js'
import '../App.css'

function formatPrice(amount) {
  return amount.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  })
}

function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart()

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
  })

  const [discountInput, setDiscountInput] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)
  const [discountMessage, setDiscountMessage] = useState('')
  const [submittedOrder, setSubmittedOrder] = useState(null)

  const deliveryFee = formData.state
    ? deliveryRates[formData.state] ?? deliveryRates.Other
    : 0

  const discountAmount = discountApplied
    ? Math.round(subtotal * 0.1)
    : 0

  const total = subtotal - discountAmount + deliveryFee

  function handleInputChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  function handleApplyDiscount() {
    if (discountInput.trim().toUpperCase() === 'EASYBUY10') {
      setDiscountApplied(true)
      setDiscountMessage('Success! You have received 10% off.')
    } else {
      setDiscountApplied(false)
      setDiscountMessage('Invalid discount code. Please try again.')
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (cartItems.length === 0) {
      return
    }

    const order = {
      customer: { ...formData },
      items: cartItems.map((item) => ({ ...item })),
      subtotal,
      discountAmount,
      deliveryFee,
      total,
      orderDate: new Date().toLocaleString(),
    }

    setSubmittedOrder(order)
    clearCart()
  }

  if (submittedOrder) {
    return (
      <main className="checkout-page">
        <section className="order-success">
          <div className="success-icon" aria-hidden="true">
            ✓
          </div>

          <p className="eyebrow">ORDER CONFIRMED</p>
          <h1>Thank you, {submittedOrder.customer.fullName}.</h1>

          <p>
            Your EasyBuy order has been submitted successfully in this demo.
          </p>

          <div className="success-summary">
            <h2>Order summary</h2>

            {submittedOrder.items.map((item) => (
              <div className="summary-row" key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(submittedOrder.subtotal)}</span>
            </div>

            <div className="summary-row">
              <span>Discount</span>
              <span>−{formatPrice(submittedOrder.discountAmount)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>{formatPrice(submittedOrder.deliveryFee)}</span>
            </div>

            <div className="summary-row final-total">
              <strong>Total</strong>
              <strong>{formatPrice(submittedOrder.total)}</strong>
            </div>

            <p className="delivery-confirmation">
              Delivery to: {submittedOrder.customer.address},{' '}
              {submittedOrder.customer.city},{' '}
              {submittedOrder.customer.state}
            </p>
          </div>

          <Link to="/" className="shop-button">
            Continue shopping
          </Link>
        </section>
      </main>
    )
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <section className="empty-checkout">
          <h1>Your cart is empty</h1>
          <p>Add some frames before proceeding to checkout.</p>

          <Link to="/" className="shop-button">
            Explore collection
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <div className="checkout-heading">
        <p className="eyebrow">ALMOST YOURS</p>
        <h1>Checkout</h1>
        <p>Enter your delivery details and review your order.</p>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <section className="checkout-section">
            <h2>Delivery information</h2>
            <p className="form-description">
              Where should we deliver your frames?
            </p>

            <div className="form-field">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="08012345678"
                autoComplete="tel"
                pattern="(\+234|0)[0-9]{10}"
                title="Enter a Nigerian phone number, such as 08012345678 or +2348012345678."
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="address">Street address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="House number, street and area"
                autoComplete="street-address"
                rows={3}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="city">City or town</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleInputChange}
                  autoComplete="address-level2"
                  placeholder="Enter city"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="state">State</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  autoComplete="address-level1"
                  required
                >
                  <option value="">Select state</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Plateau">Plateau</option>
                  <option value="Federal Capital Territory">
                    FCT
                  </option>
                  <option value="Rivers">Rivers</option>
                  <option value="Kano">Kano</option>
                  <option value="Other">Other states</option>
                </select>
              </div>
            </div>
          </section>

          <section className="checkout-section discount-section">
            <h2>Discount code</h2>
            <p className="form-description">
              Have a code? Enter it below to save 10%.
            </p>

            <div className="discount-controls">
              <input
                type="text"
                value={discountInput}
                onChange={(event) => {
                  setDiscountInput(event.target.value)
                  setDiscountApplied(false)
                  setDiscountMessage('')
                }}
                placeholder="Enter discount code"
                aria-label="Discount code"
              />

              <button
                type="button"
                onClick={handleApplyDiscount}
              >
                Apply
              </button>
            </div>

            {discountMessage && (
              <p
                className={
                  discountApplied
                    ? 'discount-message success'
                    : 'discount-message error'
                }
                role="status"
              >
                {discountMessage}
              </p>
            )}
          </section>

          <button className="place-order-button" type="submit">
            Place order · {formatPrice(total)}
          </button>

          <p className="demo-notice">
            Demo checkout only. No payment will be collected.
          </p>
        </form>

        <aside className="checkout-summary">
          <h2>Your order</h2>

          {cartItems.map((item) => (
            <div className="checkout-product" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="checkout-product-info">
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>{formatPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <span className={discountAmount > 0 ? 'discount-value' : ''}>
              −{formatPrice(discountAmount)}
            </span>
          </div>

          <div className="summary-row">
            <span>Delivery fee</span>
            <span>
              {formData.state
                ? formatPrice(deliveryFee)
                : 'Select a state'}
            </span>
          </div>

          <div className="summary-row final-total">
            <strong>Total</strong>
            <strong>{formatPrice(total)}</strong>
          </div>

          <p className="summary-note">
            Delivery fees are based on your selected state.
          </p>
        </aside>
      </div>
    </main>
  )
}

export default Checkout
