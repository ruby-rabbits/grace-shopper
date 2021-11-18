import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { addToCart } from '../store/cart';
import { fetchAllProducts } from '../store/products';
import ProductCard from './ProductCard';


class AllProducts extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // will only be called if we go to /shows directly
    if (this.props.products.length === 0) this.props.fetchAllProducts();
  }


  render() {
    const totalProducts = this.props.products.length;
    const productsOnPage = 10;
    const totalPages = Math.ceil(totalProducts / productsOnPage);
    let currentpage = Number(this.props.CurrentPage);

    const startelement = (currentpage*productsOnPage)-productsOnPage;
    const endelement = startelement+productsOnPage;

    const products = this.props.products.slice(startelement,endelement);

    const pagesArray = [];
    
    for(let i = 1; i <= totalPages; i++) {
      pagesArray.push(i)
    }
    
    // get all product types, map out all product types and display it on landing page
    return (
      <div>
        <div className="pages-container">Pages: 
          {pagesArray.map((page) => (<span key={page}> 
            {page === 1 ? 
            (<Link to={`/`}>1</Link>)
             : 
            (<Link to={`/page/${page}`}>{page}</Link>) }
              {page === totalPages ? (``) : (` | `)}
              </span>)) }
        </div>
      <div className="all-product-container">
          {products.map((product) => {
            return (
              <ProductCard userId={this.props.userId} product={product} key={product.id}/>

            );
          })}
      </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    products: state.products,
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
    userId: state.auth.id
  };
};
const mapDispatch = (dispatch) => {
  // product types come through here
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts()),
    // addToCart: (userId, productId, quantity) => dispatch(addToCart(userId, productId, quantity))
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
