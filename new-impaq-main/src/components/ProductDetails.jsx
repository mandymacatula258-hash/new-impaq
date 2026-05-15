import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import { useCart } from "../context/CartContext"
import "./ProductDetail.css"

import product1 from '../assets/1.png'
import product2 from '../assets/2.png'
import product3 from '../assets/3.png'
import product4 from '../assets/4.png'
import product5 from '../assets/5.png'
import product6 from '../assets/6.png'

const getLocalImage = (name = "") => {
  const n = name.toLowerCase()
  if (n.includes("fa") || n.includes("18×22") || n.includes("18x22")) return product1
  if (n.includes("f3") || n.includes("26×32") || n.includes("26x32")) return product2
  if (n.includes("flex") || n.includes("24×28") || n.includes("24x28")) return product3
  if (n.includes("dcr")) return product4
  if (n.includes("tauron")) return product5
  if (n.includes("ctr")) return product6
  return product1
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const snap = await getDoc(doc(db, "products", id))
        if (snap.exists()) {
          const data = snap.data()
          setProduct({
            id: snap.id,
            ...data,
            image: data.image && data.image.startsWith("http")
              ? data.image
              : getLocalImage(data.name),
          })
        } else {
          navigate("/products")
        }
      } catch (e) {
        console.error("Failed to load product:", e)
        navigate("/products")
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="pd__loading">
        <div className="pd__spinner" />
      </div>
    )
  }

  if (!product) return null

  return (
    <div className="pd">
      {/* Back button */}
      <div className="pd__back-wrap">
        <button className="pd__back" onClick={() => navigate("/products")}>
          ← Back to Products
        </button>
      </div>

      <div className="pd__layout">
        {/* Image panel */}
        <div className="pd__img-panel">
          <div className="pd__img-wrap">
            <img
              src={product.image}
              alt={product.name}
              className="pd__img"
              draggable={false}
              onError={(e) => { e.target.onerror = null; e.target.src = getLocalImage(product.name) }}
            />
          </div>
        </div>

        {/* Info panel */}
        <div className="pd__info-panel">
          <span className="pd__category">{product.category}</span>
          <h1 className="pd__name">{product.name}</h1>
          <p className="pd__price">${Number(product.price).toFixed(2)}</p>

          {product.description && (
            <p className="pd__description">{product.description}</p>
          )}

          <div className="pd__divider" />

          <div className="pd__actions">
            <button
              className={`pd__add-btn${added ? " pd__add-btn--added" : ""}`}
              onClick={handleAddToCart}
            >
              {added ? "✓ Added to Cart" : "+ Add to Cart"}
            </button>
            <button className="pd__buy-btn" onClick={() => { addToCart(product); navigate("/checkout") }}>
              Buy Now
            </button>
          </div>

          <div className="pd__meta">
            <div className="pd__meta-item">
              <span className="pd__meta-label">Category</span>
              <span className="pd__meta-value">{product.category || "—"}</span>
            </div>
            <div className="pd__meta-item">
              <span className="pd__meta-label">Availability</span>
              <span className="pd__meta-value pd__meta-value--green">In Stock</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}