import React from 'react'
import {connect} from 'react-redux'

export class AllUsers extends React.Component {    
    render() {
        return (<div>These are all the users</div>)
    }
}

const mapDispatch = dispatch => {
  return {
  }
}

export default connect(null,mapDispatch)(AllUsers)