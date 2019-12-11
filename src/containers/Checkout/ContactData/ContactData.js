import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'; 
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/';
import {connect} from 'react-redux';
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Your Name'
        },
        value:'',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig:{
          type: 'email',
          placeholder: 'Your email'
        },
        value:'',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Street'
        },
        value:'',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Country'
        },
        value:'',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Zip Code'
        },
        value:'',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig:{
          options: [{value: 'fastest', displayValue: 'Fastest'}, {value: 'cheapest', displayValue: 'Cheapest'}],
        },
        value:'fastest',
        valid: true,
        touched: false
      },
    },
    isFormValid: false
  }
  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for(let key in this.state.orderForm){
      formData[key] = this.state.orderForm[key].value
    }
    const order = {
      ingredients: this.props.ings,
      totalPrice: this.props.price,
      orderDetail: formData
    }
    this.props.onPurchaseBurger(order);
  }
  onFormChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedInputConfig = {
      ...updatedOrderForm[inputIdentifier]
    }
    updatedInputConfig.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedInputConfig;
    updatedOrderForm[inputIdentifier].touched = true;
    updatedOrderForm[inputIdentifier].valid = this.checkIsValid(updatedInputConfig.value, updatedInputConfig.validation);
    let formValid = true;
    for(let key in updatedOrderForm){
      formValid = updatedOrderForm[key].valid && formValid;
    }
    this.setState({
      orderForm: updatedOrderForm,
      isFormValid: formValid
    });
  }
  checkIsValid(value, rules){
    let isValid =true;
    if(!rules){
      return isValid;
    }
    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }
    if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }
  render(){
    const formElements = [];
    for(let key in this.state.orderForm){
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
        <form onSubmit={this.orderHandler}>
          {formElements.map(formElement => {
            return (
              <Input 
                key={formElement.id} 
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} value={formElement.config.value} 
                isValid={formElement.config.valid}
                touched={formElement.config.touched}
                changeHandler={(event)=>this.onFormChangeHandler(event, formElement.id)}/>
            )
          })}
          <Button btnType='Success' disabled={!this.state.isFormValid}>Order</Button>
        </form>
    );
    if(this.props.loading){
      form = <Spinner/>;
    }
    return(
      <div className={classes.ContactData}>
        <h3>Enter your contact details</h3>
        {form}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseBurger: (order) => dispatch(actions.purchaseBurger(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));