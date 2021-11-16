import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleProduct } from "../store/singleProduct";

export class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId);
  }

  render() {
    const product = this.props.product;
    // console.log(this.props)
    return (
      <div>
        <div className="single-product">
          <img className="single-product" src={product.picture} />
          <h2 className="single-product">{product.productName}</h2>
          <div className="single-product">{product.description}</div>
          <div className="single-product">{product.price}</div>
        </div>
        More stuff can go here! (Maybe an addToCart? Or a quantity they want to
        purchase in the format of a form/submit?)
        {/* This is a link back to the home page (All Products) */}
        <Link to="/">
          <h2>Back to All Products</h2>
        </Link>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.singleProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  };
};
export default connect(mapState, mapDispatch)(SingleProduct);
