import React from 'react';
import { connect } from 'react-redux';
import { createProduct, fetchAllProducts } from '../../../store/products';

export class AdminProductEditSingle extends React.Component {
    constructor() {
        super();
        this.state = {
            productName: '',
            picture: '',
            description: '',
            price: 0,
            categoryId: 1
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({
        [evt.target.name]: evt.target.value
        });
      }

    handleSubmit(evt) {
        evt.preventDefault();
        console.log(this.state);
        this.props.createProduct({ ...this.state });
        this.setState({
            productName: '',
            picture: '',
            description: '',
            price: 0,
            categoryId: 0
        })
      }

      componentDidMount() {
          this.props.fetchAllProducts()
      }

    render() {
        const { productName, picture, description, price, categoryId } = this.state;
        const { handleSubmit, handleChange } = this;
        return (
            <form id='add-product-form' onSubmit={handleSubmit}>Edit Products Form
              <label htmlFor='productName'>Product Name:</label>
              <input name='productName' onChange={handleChange} value={productName} />

              <label htmlFor='picture'>Product Image URL:</label>
              <input name='picture' onChange={handleChange} value={picture} />
              
              <label htmlFor='description'>Product Description:</label>
              <input name='description' onChange={handleChange} value={description} />

              <label htmlFor='price'>Product Price:</label>
              $<input name='price' onChange={handleChange} value={price} />

              <label htmlFor='categoryId'>Category:</label>
              <select name='categoryId' onChange={handleChange} value={categoryId}>
                  <option value='1'>Test Option</option>
                  <option value='2'>Test Option</option>
              </select>
              <button type='submit'>Add Product</button>
            </form>
          );
    }
}

const mapDispatchToProps = (dispatch) => ({
    createProduct: (product) => dispatch(createProduct(product)),
    fetchAllProducts: () => dispatch(fetchAllProducts())
  });

  export default connect(null, mapDispatchToProps)(AdminProductEditSingle);