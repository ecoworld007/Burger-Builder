import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component{
  state = {
    ingredients: {
      bacon: 1,
      cheese: 2,
      salad: 2,
      meat: 1
    }
  }
  render(){
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <div>Burger Controller</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;