import React from 'react';
import { connect } from 'react-redux';
import { changeQuantity, removeItem } from '../store/cart';
import { Link } from 'react-router-dom';

class ProductInCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: props.product.cart_product.quantity };
    this.onQuantityChange = this.onQuantityChange.bind(this);
  }

  onQuantityChange(e) {
    this.setState({ quantity: e.target.value });
    // console.log(this.props);
    const { userId, product } = this.props;
    this.props.changeQuantity({
      userId,
      quantity: e.target.value,
      productId: product.id,
    });
  }

  render() {
    let { product } = this.props;
    return (
      <div className="cart-row">
        <Link id="img" to={`/products/${this.props.product.id}`}>
          <img src={product.picture}></img>{' '}
        </Link>
        <section className="info">
          <div className="row-left">
            <Link to={`/products/${this.props.product.id}`}>
              <h3 id="name">{product.productName}</h3>
            </Link>
            <button
              className="delete"
              type="submit"
              onClick={() => {
                const { userId, product } = this.props;
                const productId = product.id;
                console.log(this.props);
                this.props.remFromCart({ userId, productId });
              }}
            >
              <i className="bi bi-trash"></i>
              <span>REMOVE</span>
            </button>
          </div>

          <div className="row-right">
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={this.state.quantity}
              onChange={this.onQuantityChange}
            />
            <p style={{ textAlign: 'end', fontWeight: 'bold' }}>
              ${product.price}
            </p>
          </div>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeQuantity: (data) => dispatch(changeQuantity(data)),
    remFromCart: (data) => dispatch(removeItem(data)),
  };
};

export default connect(null, mapDispatchToProps)(ProductInCart);
