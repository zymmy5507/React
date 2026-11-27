import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { products } from './data/products'
import {
  addToCart,
  clearCart,
  decrementQuantity,
  removeFromCart,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
} from './features/cart/cartSlice'
import './App.css'

function Navbar() {
  const itemCount = useSelector(selectCartCount)

  return (
    <header className="topbar">
      <a className="brand" href="#" aria-label="Daylight home">
        <span className="brand-mark">d.</span>
        daylight
      </a>
      <nav className="nav-links" aria-label="Main navigation">
        <a href="#shop">Shop</a>
        <a href="#story">Our story</a>
      </nav>
      <a className="cart-link" href="#cart" aria-label={`Shopping bag, ${itemCount} items`}>
        <span className="bag-icon" aria-hidden="true">▱</span>
        <span className="cart-label">Bag</span>
        <span className="cart-count">{itemCount}</span>
      </a>
    </header>
  )
}

function ProductCard({ product, index }) {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const quantity = cartItems.find((item) => item.id === product.id)?.quantity ?? 0

  return (
    <article className="product-card">
      <div className={`product-art product-art-${index + 1}`}>
        <span className="product-emoji" role="img" aria-label={product.name}>
          {product.emoji}
        </span>
        {product.tag && <span className="product-tag">{product.tag}</span>}
      </div>
      <div className="product-info">
        <div>
          <p className="product-category">{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <span className="product-price">${product.price.toFixed(2)}</span>
      </div>
      <button
        className={`add-button${quantity > 0 ? ' is-added' : ''}`}
        type="button"
        onClick={() => dispatch(addToCart(product))}
        aria-label={`Add ${product.name} to bag`}
      >
        {quantity > 0 ? `Added · ${quantity} in bag` : 'Add to bag'}
        <span aria-hidden="true">{quantity > 0 ? '✓' : '+'}</span>
      </button>
    </article>
  )
}

function CartSummary() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const [checkedOut, setCheckedOut] = useState(false)

  const handleCheckout = () => {
    setCheckedOut(true)
    dispatch(clearCart())
  }

  return (
    <aside className="cart-panel" id="cart">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR ORDER</p>
          <h2>Your bag <span>({items.reduce((count, item) => count + item.quantity, 0)})</span></h2>
        </div>
        <span className="cart-sparkle" aria-hidden="true">✳</span>
      </div>

      {checkedOut ? (
        <div className="empty-cart checkout-message">
          <span className="empty-icon" aria-hidden="true">✓</span>
          <p>Order placed. Thanks for shopping with us!</p>
          <button type="button" className="text-button" onClick={() => setCheckedOut(false)}>
            Continue shopping
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-icon" aria-hidden="true">＋</span>
          <p>Your bag is taking a little break.</p>
          <span>Add something lovely to get started.</span>
        </div>
      ) : (
        <ul className="cart-items">
          {items.map((item) => (
            <li className="cart-item" key={item.id}>
              <span className={`mini-art mini-art-${item.id}`} aria-hidden="true">{item.emoji}</span>
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <span>${item.price.toFixed(2)} each</span>
                <div className="quantity-controls" aria-label={`Quantity of ${item.name}`}>
                  <button
                    type="button"
                    aria-label={`Remove one ${item.name}`}
                    onClick={() => dispatch(decrementQuantity(item.id))}
                  >−</button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Add one ${item.name}`}
                    onClick={() => dispatch(addToCart(item))}
                  >+</button>
                </div>
              </div>
              <div className="cart-item-end">
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  aria-label={`Remove ${item.name} from bag`}
                >Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="order-total">
        <div><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div>
        <div><span>Shipping</span><span className="shipping-value">{items.length ? 'Free' : '—'}</span></div>
        <div className="total-line"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
        <button
          className="checkout-button"
          type="button"
          onClick={handleCheckout}
          disabled={items.length === 0}
        >
          Checkout <span aria-hidden="true">↗</span>
        </button>
        <p className="secure-note"><span aria-hidden="true">✳</span> A little joy, delivered to your door.</p>
      </div>
    </aside>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <section className="hero" id="story">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> GOOD THINGS, THOUGHTFULLY MADE</p>
            <h1>Little things.<br /><span>Better days.</span></h1>
            <p className="hero-description">
              Everyday essentials with a little extra thought. Find your new favorite thing.
            </p>
            <a className="hero-cta" href="#shop">Find your favorite <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <span className="hero-sun" />
            <span className="hero-flower">✳</span>
            <span className="hero-object">☼</span>
            <span className="hero-note">made for<br />the everyday</span>
          </div>
          <span className="hero-index">01 — 04</span>
        </section>

        <section className="shop-layout" id="shop">
          <div className="catalog">
            <div className="section-heading">
              <div>
                <p className="eyebrow">A FEW GOOD THINGS</p>
                <h2>Shop the collection<span>.</span></h2>
              </div>
              <p className="item-note">Thoughtful picks for everyday living</p>
            </div>
            <div className="product-grid">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
            <div className="redux-note">
              <span className="redux-note-icon" aria-hidden="true">↗</span>
              <p><strong>See Redux in action.</strong> Add an item and watch the bag count, product button, and order total update together — all powered by one shared store.</p>
            </div>
          </div>
          <CartSummary />
        </section>
      </main>
      <footer className="footer">
        <a className="brand footer-brand" href="#"><span className="brand-mark">d.</span> daylight</a>
        <span>Good things for the everyday.</span>
        <span>Made with a little thought <span className="footer-heart">♥</span></span>
      </footer>
    </>
  )
}

export default App
