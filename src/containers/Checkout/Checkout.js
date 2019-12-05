import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }
  componentWillMount(){
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice=0;
    for(let entry of query.entries()){
      if(entry[0] === 'totalPrice'){
        totalPrice = +entry[1]
      }else{
        ingredients[entry[0]] = +entry[1];
      }
    }
    this.setState({
      ingredients: ingredients,
      totalPrice
    });
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }
  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  orderHandler = (event) => {
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <CheckoutSummary 
        ingredients={this.state.ingredients}
        checkoutCancel={this.checkoutCancelHandler}
        checkoutContinue={this.checkoutContinueHandler}/>
        <Route path={this.props.match.path+'/contact-data'} render={(props) => {
          return (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>)
        }}/>
      </div>
    );
  }
}

export default Checkout;