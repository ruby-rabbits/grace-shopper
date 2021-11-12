import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllCartProducts } from '../store/cart';
import ProductInCart from './CartProduct';
class Cart extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    if (this.props.userId) {
      this.props.getCart(this.props.userId);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId != prevProps.userId) {
      this.props.getCart(this.props.userId);
    }
  }



  render() {
    console.log(this.props);

    return (
      <div className="cart">
        <h1>Your Items:</h1>
        <div>
          {
            //would eventually be this.props.cart.map
            this.props.cart.length === 0
              ? 'Empty Cart'
              : this.props.cart.map((product) => {
                  return (
                    <ProductInCart product={product} key={product.id}/>
                    // <div key={product.id}>
                    //   <h3>{product.productName}</h3>
                    //   <img
                    //     style={{ width: '10rem', height: '13rem' }}
                    //     src={product.picture}
                    //   ></img>
                    //   <div>
                    //     {/* <li>Quantity: {product.cart_product.quantity}</li>
                    //      */}
                    //     <label htmlFor="quantity">Quantity: </label>
                    //     <input
                    //       type="number"
                    //       id="quantity"
                    //       name="quantity"
                    //       min="1"
                    //       value={product.cart_product.quantity}
                    //     />

                    //     <p>Price: {price}</p>
                    //     {/* For testing purposes */}
                    //   </div>
                    //   <button style={{ backgroundColor: 'red' }}>Remove</button>
                    // </div>
                  );
                })
          }
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
  cart: state.cart.filter((product) => !product.cart_product.purchased),
  userId: state.auth.id,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (userId) => {
      dispatch(fetchAllCartProducts(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
