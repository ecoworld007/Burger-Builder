import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

const INGREDIENTS_PRICE = {
  salad : 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
class BurgerBuilder extends Component{
  state = {
    ingredients: {
      bacon: 0,
      cheese: 0,
      salad: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  updatePurchaseState(ingredients){
    const sumOfIngredients =Object.keys(ingredients).map(key => {
      return ingredients[key];
    }).reduce((sum, el) => {
      return sum+el;
    });
    this.setState({
      purchasable: sumOfIngredients>0
    });
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] +=1;
    const updatedPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] -=1;
    const updatedPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  }

  cancelPurchaseHandler = () => {
    this.setState({
      purchasing: false
    });
  }

  continuePurchaseHandler = () => {
    this.setState({
      loading: true
    })
    const order = {
      ingredients: {
        bacon: 1,
        cheese: 2,
        salad: 2,
        meat: 2
      },
      totalPrice: 9.78,
      customer: {
        name: 'Himanshu Negi',
        address: {
          street: 'street 1',
          country: 'India',
          zipCode: '42557'
        },
        email: 'dummy@test.com',
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => this.setState({
        loading: false
      }))
      .catch(error => this.setState({
        loading: false
      }));
  }

  render(){
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key of Object.keys(disabledInfo)){
      disabledInfo[key] = disabledInfo[key]<=0;
    }
    let orderSummary = <OrderSummary ingredients={this.state.ingredients} totalPrice={this.state.totalPrice.toFixed(2)} cancelClick={this.cancelPurchaseHandler} continueClick={this.continuePurchaseHandler}/>;
    if(this.state.loading){
      orderSummary = <Spinner/>
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <Modal show={this.state.purchasing} onClicked={this.cancelPurchaseHandler}>
          {orderSummary}
        </Modal>
        <BuildControls 
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          labels={Object.keys(this.state.ingredients)}
          disabledInfo={disabledInfo}
          totalPrice={this.state.totalPrice}
          disabled={!this.state.purchasable}
          purchased={this.purchaseHandler}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;