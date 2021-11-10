import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllCartProducts } from "../store/cart";

class Cart extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="cart">
        <h4>Your Items</h4>

        <div>
          {this.props.products.length === 0
            ? `No products in cart`
            : this.props.products.map((product) => {
                return (
                  <div key={product.id}>
                    <Link to={`/products/${product.id}`}>
                      {product.productName}
                    </Link>
                    {product.price}
                    {product.quantity}
                    <img src={product.picture} />
                  </div>
                );
              })}
        </div>
        <div>
          <button id="checkout">
            <Link to="/checkout">Checkout</Link>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (userId) => {
      dispatch(fetchAllCartProducts(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
