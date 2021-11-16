import React from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/products';

function ProductCard(props) {
  let product = props.product;
  return (
  <div>
    <Link to={`/products/${product.id}`} className="product-card">
      <img src={product.picture} />
      <p>Name: {product.productName}</p>
      <p>Price: {product.price}</p>
    </Link>
    <button type="button" onClick={() => props.addToCart(props.userId, product.id, 1)} >Add To Cart</button>
    </div>
  );
}

export default ProductCard;
