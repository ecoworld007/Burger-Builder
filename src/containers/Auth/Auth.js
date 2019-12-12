import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/';

class Auth extends Component {
  state = {
    controls : {
      email: {
        elementType: 'input',
        elementConfig:{
          type: 'email',
          placeholder: 'Your email'
        },
        value:'',
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig:{
          type: 'password',
          placeholder: 'Password'
        },
        value:'',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false
      },
    }
  }

  onFormChangeHandler = (event, inputIdentifier) => {
    this.setState({
      controls: {
        ...this.state.controls,
        [inputIdentifier]: {
          ...this.state.controls[inputIdentifier],
          touched: true,
          value: event.target.value,
          valid: this.checkIsValid(event.target.value, this.state.controls[inputIdentifier].validation)
        }
      }
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
    if(rules.email){
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      isValid = reg.test(value) && isValid;
    }
    if(rules.numeric){
      const reg = /^\d+$/;
      isValid = reg.test(value) && isValid;
    }
    return isValid;
  }

  authSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onAuthSubmit(this.state.controls.email.value, this.state.controls.password.value);
  }
  render() {
    const formElements = [];
    for(let key in this.state.controls){
      formElements.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    const formInputs = formElements.map(formElement => {
      return (
        <Input 
          key={formElement.id} 
          elementType={formElement.config.elementType} 
          elementConfig={formElement.config.elementConfig} value={formElement.config.value} 
          isValid={formElement.config.valid}
          touched={formElement.config.touched}
          changeHandler={(event)=>this.onFormChangeHandler(event, formElement.id)}/>
      )
    });
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.authSubmitHandler}>
          {formInputs}
          <Button btnType='Success'>Sumit</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthSubmit: (email, password) => dispatch(actions.auth(email, password))
  }
}

export default connect(null, mapDispatchToProps)(Auth);