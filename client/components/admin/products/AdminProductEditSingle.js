import React from 'react';
import { connect } from 'react-redux';
import { updateProduct, fetchAllProducts } from '../../../store/products';
import { fetchSingleProduct, setSingleProduct } from '../../../store/singleProduct';
import { Link } from 'react-router-dom';

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

    componentDidMount() {
        this.props.getSingleProduct(this.props.match.params.productId);
    }

    componentWillUnmount() {
        this.props.clearSingleProduct();
        this.setState({
            productName: '',
            picture: '',
            description: '',
            price: 0,
            categoryId: 0
        })
        // <<-- NOTE TO/FROM LAWRENCE: MAKE THIS THUNK! Clear singleProduct store data. Also put this in single product page veiw?
    }

    componentDidUpdate(prevProps) {
        if (prevProps.singleProduct.id !== this.props.singleProduct.id) {
            this.setState({
                id: this.props.singleProduct.id,
                productName: this.props.singleProduct.productName || '',
                picture: this.props.singleProduct.picture || '',
                description: this.props.singleProduct.description || '',
                price: this.props.singleProduct.price || 0,
                categoryId: this.props.singleProduct.categoryId || 1
            });
            }
        }

    handleChange(evt) {
        this.setState({
        [evt.target.name]: evt.target.value
        });
      }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.updateProduct({ ...this.state });

      }

    render() {
        const { productName, picture, description, price, categoryId } = this.state;
        const { handleSubmit, handleChange } = this;
        return (
            <div><form id='add-product-form' onSubmit={handleSubmit}><h2>Edit Products Form</h2>
              <label htmlFor='productName'>Product Name:</label>
              <input name='productName' onChange={handleChange} value={productName} />

              <label htmlFor='picture'>Product Image URL:</label>
              <input name='picture' onChange={handleChange} value={picture} />

              <label htmlFor='description'>Product Description:</label>
              <input name='description' onChange={handleChange} value={description} />

              <label htmlFor='price'>Product Price:</label>
              <input name='price' onChange={handleChange} value={price} />

              <label htmlFor='categoryId'>Category:</label>
              <select name='categoryId' onChange={handleChange} value={categoryId}>
                {this.props.categories.map(category => (
                <option key={category.id} value={category.id}>{category.categoryDisplayName}</option>
                ))}
              </select>
              <button type='submit'>Edit Product</button>
            </form>
            <div><Link to='/admin/products/edit/'>Back to Edit List</Link></div>
            </div>
          );
    }
}

const mapStateToProps = (state) => ({
    singleProduct: state.singleProduct,
    categories: state.categories || []
});

const mapDispatchToProps = (dispatch) => ({
    updateProduct: (product) => dispatch(updateProduct(product)),
    fetchAllProducts: () => dispatch(fetchAllProducts()),
    getSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
    clearSingleProduct: () => dispatch(setSingleProduct({}))
  });

  export default connect(mapStateToProps, mapDispatchToProps)(AdminProductEditSingle);
