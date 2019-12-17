import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/';

// const INGREDIENTS_PRICE = {
//   salad : 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7
// }
class BurgerBuilder extends Component{
  state = {
    purchasing: false
  }
  componentDidMount(){
    this.props.onInitIngredients();
  }

  componentWillMount(){
    this.props.onInitPurchase();
  }
  updatePurchaseState(ingredients){
    const sumOfIngredients =Object.keys(ingredients).map(key => {
      return ingredients[key];
    }).reduce((sum, el) => {
      return sum+el;
    });
    return sumOfIngredients>0
  }

  // addIngredientHandler = (type) => {
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] +=1;
  //   const updatedPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: updatedPrice
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] -=1;
  //   const updatedPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: updatedPrice
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // }

  purchaseHandler = () => {
    if(this.props.isAuthenticated){
      this.setState({
        purchasing: true
      });
    }else{
      this.props.history.push('/auth');
    }
  }

  cancelPurchaseHandler = () => {
    this.setState({
      purchasing: false
    });
  }

  continuePurchaseHandler = () => {
    // let queryParams = [];
    // for(let key of Object.keys(ings)){
    //   queryParams.push(encodeURIComponent(key)+'='+encodeURIComponent(ings[key]));
    // }
    // queryParams.push('totalPrice='+encodeURIComponent(price));
    this.props.history.push({
      pathname: '/checkout',
    });
  }

  render(){
    const disabledInfo = {
      ...this.props.ings
    }
    for(let key of Object.keys(disabledInfo)){
      disabledInfo[key] = disabledInfo[key]<=0;
    }
    let orderSummary = null;
    let burger = this.props.error ? <div>Ingredients can't be loaded</div> : <Spinner/>;
    if(this.props.ings){
      burger = (<Aux>
        <Burger ingredients={this.props.ings}/>
        <BuildControls 
          addIngredient={this.props.onAddIngredient}
          removeIngredient={this.props.onRemoveIngredient}
          labels={Object.keys(this.props.ings)}
          disabledInfo={disabledInfo}
          totalPrice={this.props.price}
          disabled={!this.updatePurchaseState(this.props.ings)}
          purchased={this.purchaseHandler}
          isAuth={this.props.isAuthenticated}/>
      </Aux>)
      orderSummary = <OrderSummary ingredients={this.props.ings} totalPrice={this.props.price.toFixed(2)} cancelClick={this.cancelPurchaseHandler} continueClick={this.continuePurchaseHandler}/>;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} onClicked={this.cancelPurchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    error: state.burger.error,
    isAuthenticated: !!state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
    onRemoveIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.onInitPurchase())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));