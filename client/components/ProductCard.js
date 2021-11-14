import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard(props) {
  let product = props.product;
  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div>
        <img src={product.picture} />
        <p>{product.productName}</p>
        <p>{product.price}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
