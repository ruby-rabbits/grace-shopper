import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllCartProducts } from "../store/cart";

class Cart extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    if (this.props.userId){
      this.props.getCart(this.props.userId);
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.userId != prevProps.userId) {
      this.props.getCart(this.props.userId);

    }
  }

  render() {
    const codyData = [
      {
        quantity: 3,
        amountPaid: 10,
        purchased: true,
        purchaseDate: "Today",
        cartId: 1,
        productId: 1
      },
      {
        quantity: 1,
        amountPaid: 2,
        purchased: true,
        purchaseDate: "Today",
        cartId: 1,
        productId: 2
      }
    ]

    const murphyData = [
      {
        quantity: 5,
        amountPaid: 5,
        purchased: true,
        purchaseDate: "Yesterday",
        cartId: 2,
        productId: 2
      }
    ]
    console.log(this.props)
    return (
      <div className="cart">
        <h1>Your Items:</h1>
        <div>
          {
            //would eventually be this.props.cart.map
            codyData.map((product) => {
              return (
                <div key={product.productId}>
                  <h3>Product name here! (product.productName)</h3>
                  <h3>Product Image here! (product.picture)</h3>
                    <ul>
                      <li>Quantity: {product.quantity}</li>
                      <li>Price: {product.amountPaid}</li>
                      {/* For testing purposes */}
                      <li>{product.purchaseDate}</li>
                      <li>{product.productId}</li>
                    </ul>
                </div>
              )
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
  products: state.cart,
  userId: state.auth.id
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (userId) => {
      dispatch(fetchAllCartProducts(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

// {this.props.products.length === 0
//   ? `No products in cart`
//   : this.props.products.map(product => {
//     return JSON.stringify(product);
//   })
//   : `${this.props.products.length} items in cart`
//   : this.props.products.map((product) => {
//       return (
//         <div key={product.id}>
//           <Link to={`/products/${product.id}`}>
//             {product.productName}
//           </Link>
//           {product.price}
//           {product.quantity}
//           <img src={product.picture} />
//         </div>
//       );
//     })
// }
