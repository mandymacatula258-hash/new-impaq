import React from 'react'
import './ProductGrid.css'
import { Link } from "react-router-dom"

import product1 from '../assets/1.png'
import product2 from '../assets/2.png'
import product3 from '../assets/3.png'
import product4 from '../assets/4.png'
import product5 from '../assets/5.png'
import product6 from '../assets/6.png'

const PRODUCTS = [
  { id: 1, category: 'Red Dot Sight & Magnifier', name: 'Frenzy FA 18×22 Enclosed MRT Red Dot Sight', image: product1, link: '/products/frenzy-fa' },
  { id: 2, category: 'Red Dot Sight & Magnifier', name: 'Frenzy F3 26×32 MRT Red Dot Sight',          image: product2, link: '/products/frenzy-b'  },
  { id: 3, category: 'Red Dot Sight & Magnifier', name: 'Frenzy FLEX 24×28 MRT Red Dot Sight',        image: product3, link: '/products/frenzy-fa' },
  { id: 4, category: 'Rifle Scopes',              name: 'Veyron GenII 4-16×44 HD DCR FFP Rifle Scope',image: product4, link: '/products/frenzy-fa' },
  { id: 5, category: 'Rifle Scopes',              name: 'Tauron 5-50×60 ED SFP Rifle Scope',          image: product5, link: '/products/frenzy-fa' },
  { id: 6, category: 'Rifle Scopes',              name: 'Veyron GenII 4-16×44 HD CTR FFP Rifle Scope',image: product6, link: '/products/frenzy-fa' },
]

export default function ProductGrid() {
  return (
    <section className="products" id="products">

      {/* Header */}
      <div className="products__header">
        <p className="products__tagline">New Product Push</p>
        <h2 className="products__title">Innovation Never Stops</h2>
      </div>

      {/* Grid */}
      <div className="products__grid">
        {PRODUCTS.map((product) => (
          <div className="products__card" key={product.id}>
            <div className="products__card-top">
              <span className="products__card-category">{product.category}</span>
              <div className="products__card-img-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="products__card-img"
                  draggable={false}
                />
              </div>
            </div>
            <div className="products__card-bottom">
              <p className="products__card-name">{product.name}</p>
              <Link to={product.link} className="products__card-link">
                Learn More
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M3 9H15M15 9L9.5 3.5M15 9L9.5 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="products__footer">
        <p className="products__footer-tagline">High-End Series Recommendation</p>
        <h2 className="products__footer-title">Precision-crafted for superior optical quality</h2>
      </div>

    </section>
  )
}