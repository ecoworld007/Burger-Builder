import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'; 
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
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
    isFormValid: false, 
    loading: false
  }
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    })
    const formData = {};
    for(let key in this.state.orderForm){
      formData[key] = this.state.orderForm[key].value
    }
    const order = {
      ingredients: this.props.ings,
      totalPrice: this.props.price,
      orderDetail: formData
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch(error => this.setState({
        loading: false
      }));
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
    if(this.state.loading){
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
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData);