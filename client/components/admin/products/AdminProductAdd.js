import React from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../../store/category';
import { createProduct, fetchAllProducts } from '../../../store/products';

export class AdminProductAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      productName: '',
      picture: '',
      description: '',
      price: 0,
      categoryId: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createProduct({ ...this.state });
    this.setState({
      productName: '',
      picture: '',
      description: '',
      price: 0,
      categoryId: 1,
    });
  }

  componentDidMount() {
    this.props.fetchAllProducts();
  }

  render() {
    const { productName, picture, description, price, categoryId, error } =
      this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <form id="add-product-form" onSubmit={handleSubmit}>
        <h2>Add a Product Form</h2>
        <label htmlFor="productName">Product Name:</label>
        <input name="productName" onChange={handleChange} value={productName} />

        <label htmlFor="picture">Product Image URL:</label>
        <input name="picture" onChange={handleChange} value={picture} />

        <label htmlFor="description">Product Description:</label>
        <input name="description" onChange={handleChange} value={description} />

        <label htmlFor="categoryId">Category:</label>
        <select name="categoryId" onChange={handleChange} value={categoryId}>
          {this.props.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoryDisplayName}
            </option>
          ))}
        </select>
        <button type="submit">Add Product</button>
        {error && error.response && <div> {error.response.data}</div>}


      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.products.error,
  categories: state.categories || [],
});

const mapDispatchToProps = (dispatch, {history}) => ({
  createProduct: (product) => dispatch(createProduct(product,history)),
  fetchAllProducts: () => dispatch(fetchAllProducts()),
  getCategories: () => dispatch(getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductAdd);
