
function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <p className="product-category">{product.category}</p>
      <h3>{product.name}</h3>

      <p className="product-description">
        {product.description}
      </p>

      <div className="product-footer">
        <p>
          {product.price.toLocaleString('en-NG', {
            style: 'currency',
            currency: 'NGN',
            maximumFractionDigits: 0,
          })}
        </p>

        <button
          type="button"
          onClick={() => onAddToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </article>
  )
}

export default ProductCard
