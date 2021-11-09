import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class LandingPage extends React.Component {    
    render() {
        // get all product types, map out all product types and display it on landing page
        return (<div>
            <h2>What do you want to see?</h2>
                <ul>
                    <li><Link>Concerts</Link></li>
                    <li><Link>Theatre</Link></li>
                    <li><Link>Movies</Link></li>
                </ul>
            </div>
            )
    }
    
}

  const mapDispatch = dispatch => {
      // product types come through here
    return {
    }
  }
  
  export default connect(null,mapDispatch)(LandingPage)
  