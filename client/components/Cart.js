import React from "react";
import { connect } from "react-redux";

export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  render() {
    return (
      <div>
        <div>
          <h4>Your Items</h4>
        </div>
        <div>Products Here</div>
        <div>
          <button id="checkout">Checkout</button>
        </div>
      </div>
    );
  }
}

//will need eventually
// export default connect(mapState,mapDispatch)(Cart)
