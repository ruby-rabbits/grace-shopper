import React from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/products';

function ProductCard(props) {
  let product = props.product;
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} >
        <img src={product.picture} />
        <h4>{product.productName}</h4>
        <p>${product.price}</p>
      </Link>
    </div>
  );
}

export default ProductCard;
