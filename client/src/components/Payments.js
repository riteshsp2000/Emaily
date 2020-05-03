import React, { Component } from "react"
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render () {
    return (
      <StripeCheckout 
        name="Emaily"
        description="₹500 for 5 email credits"
        currency="INR"
        amount={50000}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn custom-payment-button">
          Add Credits
        </button>
      </StripeCheckout>
    );
  }
}
 
export default connect(null, actions)(Payments);