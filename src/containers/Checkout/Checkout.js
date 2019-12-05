import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  }
  componentDidMount(){
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for(let entry of query.entries()){
      ingredients[entry[0]] = +entry[1];
    }
    this.setState({
      ingredients: ingredients
    });
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }
  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-info');
  }
  render() {
    return (
      <div>
        <CheckoutSummary 
        ingredients={this.state.ingredients}
        checkoutCancel={this.checkoutCancelHandler}
        checkoutContinue={this.checkoutContinueHandler}/>
      </div>
    );
  }
}

export default Checkout;