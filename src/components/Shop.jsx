import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "./Shop.css"

import product1 from '../assets/1.png'
import product2 from '../assets/2.png'
import product3 from '../assets/3.png'
import product4 from '../assets/4.png'
import product5 from '../assets/5.png'
import product6 from '../assets/6.png'

const PRODUCTS = [
  { id: 1, category: 'Red Dot Sight & Magnifier', name: 'Frenzy FA 18×22 Enclosed MRT Red Dot Sight', image: product1, link: '/products/frenzy-fa', price: 129.99 },
  { id: 2, category: 'Red Dot Sight & Magnifier', name: 'Frenzy F3 26×32 MRT Red Dot Sight',          image: product2, link: '/products/frenzy-b',  price: 149.99 },
  { id: 3, category: 'Red Dot Sight & Magnifier', name: 'Frenzy FLEX 24×28 MRT Red Dot Sight',        image: product3, link: '/products/frenzy-fa', price: 139.99 },
  { id: 4, category: 'Rifle Scopes',              name: 'Veyron GenII 4-16x44 HD DCR FFP Rifle Scope',image: product4, link: '/products/frenzy-fa', price: 299.99 },
  { id: 5, category: 'Rifle Scopes',              name: 'Tauron 5-50x60 ED SFP Rifle Scope',          image: product5, link: '/products/frenzy-fa', price: 399.99 },
  { id: 6, category: 'Rifle Scopes',              name: 'Veyron GenII 4-16x44 HD CTR FFP Rifle Scope',image: product6, link: '/products/frenzy-fa', price: 319.99 },
]

export default function Shop() {
  const [cartOpen, setCartOpen] = useState(false)
  const { cartItems, addToCart, removeFromCart, updateQty, totalPrice, totalItems } = useCart()
  const navigate = useNavigate()

  return (
    <div className="shop">
      <button className="shop__cart-fab" onClick={() => setCartOpen(true)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        {totalItems > 0 && <span className="shop__cart-badge">{totalItems}</span>}
      </button>

      <section className="products" id="products">
        <div className="products__header">
          <p className="products__tagline">New Product Push</p>
          <h2 className="products__title">Innovation Never Stops</h2>
        </div>

        <div className="products__grid">
          {PRODUCTS.map((product) => (
            <div className="products__card" key={product.id}>
              <div className="products__card-top">
                <span className="products__card-category">{product.category}</span>
                <div className="products__card-img-wrap">
                  <img src={product.image} alt={product.name} className="products__card-img" draggable={false} />
                </div>
              </div>
              <div className="products__card-bottom">
                <p className="products__card-name">{product.name}</p>
                <p className="products__card-price">${product.price.toFixed(2)}</p>
                <div className="products__card-actions">
                  <Link to={product.link} className="products__card-link">
                    Learn More
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="M3 9H15M15 9L9.5 3.5M15 9L9.5 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                  <button className="products__card-add" onClick={() => { addToCart(product); setCartOpen(true) }}>
                    + Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)} />}

      <div className={`cart-drawer${cartOpen ? " cart-drawer--open" : ""}`}>
        <div className="cart-drawer__header">
          <h3>Your Cart {totalItems > 0 && <span>({totalItems})</span>}</h3>
          <button className="cart-drawer__close" onClick={() => setCartOpen(false)}>x</button>
        </div>

        <div className="cart-drawer__items">
          {cartItems.length === 0 ? (
            <p className="cart-drawer__empty">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-drawer__item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-drawer__item-img" />
                <div className="cart-drawer__item-info">
                  <p className="cart-drawer__item-name">{item.name}</p>
                  <p className="cart-drawer__item-price">${(item.price * item.qty).toFixed(2)}</p>
                  <div className="cart-drawer__item-qty">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                </div>
                <button className="cart-drawer__item-remove" onClick={() => removeFromCart(item.id)}>x</button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="cart-drawer__checkout" onClick={() => { setCartOpen(false); navigate("/checkout") }}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

