import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0
  // }
  componentWillMount(){
    // const query = new URLSearchParams(this.props.location.search);
    // const ingredients = {};
    // let totalPrice=0;
    // for(let entry of query.entries()){
    //   if(entry[0] === 'totalPrice'){
    //     totalPrice = +entry[1]
    //   }else{
    //     ingredients[entry[0]] = +entry[1];
    //   }
    // }
    // this.setState({
    //   ingredients: ingredients,
    //   totalPrice
    // });
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
    let summary = <Redirect to='/'/>;
    if(this.props.ings){
      const purchaseRedirect = this.props.purchased ? <Redirect to='/'/> : null;
      summary = (
      <div>
        {purchaseRedirect}
        <CheckoutSummary 
        ingredients={this.props.ings}
        checkoutCancel={this.checkoutCancelHandler}
        checkoutContinue={this.checkoutContinueHandler}/>
        <Route path={this.props.match.path+'/contact-data'} 
        component={ContactData}/>
      </div>
      )
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);