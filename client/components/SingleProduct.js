import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleProduct } from '../store/singleProduct';
import { addToCart } from '../store/cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 1 };
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId);
  }

  onClickQuantity = (e) => {
    let newQuant;
    if (e.target.id === 'inc') newQuant = this.state.quantity + 1;
    else newQuant = this.state.quantity - 1;
    this.setState({ quantity: newQuant });
  };

  onClickAddCart = () => {
    const toastEmitter = {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };
    try {
      this.props.addToCart(
        this.props.product.id,
        this.state.quantity
      );
      const successAlert = () => toast.success(`${this.state.quantity} ticket(s) for ${this.props.product.productName} added to cart!`, toastEmitter);
      successAlert();
    } catch (e) {
      const errorAlert = () => toast.error(`error occurred`, toastEmitter);
      errorAlert();
    }
  };

  render() {
    const product = this.props.product;
    return (
      <div className="single-product-container">
        <div className="img-desc">
          <img className="single-product" src={product.picture} />
          <p className="single-product">{product.description}</p>
        </div>

        <div className="sp-description">
          <h2 className="single-product">{product.productName}</h2>


          <section
            style={{
              width: 'auto',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <section>
              <i
                className="bi bi-dash-circle quantity"
                id="ded"
                onClick={this.onClickQuantity}
              ></i>
              <span>{this.state.quantity}</span>
              <i
                className="bi bi-plus-circle quantity"
                id="inc"
                onClick={this.onClickQuantity}
              ></i>
            </section>

            <button
              type="button"
              className="btn add-btn"
              onClick={this.onClickAddCart}
            >
              Add To Cart
            </button>
            <ToastContainer autoClose={1500} />
            {/* This is a link back to the home page (All Products) */}
            <Link to="/">
              <h3>Back to All Products</h3>
            </Link>
          </section>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.singleProduct,
    userId: state.auth.id,
    cartId: state.auth.cartId
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    addToCart: (productId, quantity) =>
      dispatch(addToCart(productId, quantity)),
  };
};
export default connect(mapState, mapDispatch)(SingleProduct);
