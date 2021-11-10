import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchAllProducts } from '../store/products'


export class AllProducts extends React.Component {
    componentDidMount() {
        this.props.fetchAllProducts()
    }    
    render() {
        const products = this.props.products;
        const isLoggedIn = this.props.isLoggedIn;
        console.log();
        // get all product types, map out all product types and display it on landing page
        return (<div>
            {
            isLoggedIn ? (<div>Welcome, {this.props.username}!</div>)
            : (<div>Welcome, Guest!</div>)
            }
            <h2>What do you want to see?</h2>
                <div>
                    {
                        products.map(product => {
                            return(<ul key={product.id}>
                                <img src={product.picture} />
                                <li>{product.productName}</li>
                                <li>{product.description}</li>
                                <li>{product.price}</li>
                            </ul>)                            
                        })
                    }
                </div>
            </div>
            )
            
    }
    
}
  const mapState = state => {
      return {
          products: state.products,
          isLoggedIn: !!state.auth.id,
          username: state.auth.username
      }
  }
  const mapDispatch = dispatch => {
      // product types come through here
    return {
    fetchAllProducts: () => dispatch(fetchAllProducts())
    }
  }
  
  export default connect(mapState,mapDispatch)(AllProducts)
  