import React from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/products';

function ProductCard(props) {
  let product = props.product;
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} >
        <img src={product.picture} />
        <p>{product.productName}</p>
        <p>${product.price}</p>
      </Link>
        <button
          type="button"
          className="btn add-btn"
          onClick={() => props.addToCart(props.userId, product.id, 1)}
        >
          Add To Cart
        </button>
    </div>
  );
}

export default ProductCard;
