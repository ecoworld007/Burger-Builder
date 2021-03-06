import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject, checkValidity} from '../../shared/utility';

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
    },
    isSignUp: true
  }

  componentDidMount() {
    if(!this.props.building && this.props.authRedirectPath!=='/'){
      this.props.setAuthRedirectPath();
    }
  }

  onFormChangeHandler = (event, inputIdentifier) => {
    const controls = updateObject(this.state.controls, {
      [inputIdentifier]: updateObject(this.state.controls[inputIdentifier], {
        touched: true,
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[inputIdentifier].validation)
      })
    })
    this.setState({
      controls
    });
  }

  switchAuthHandler = () => {
    this.setState(preState => {
      return {
        isSignUp: !this.state.isSignUp
      }
    });
  }

  authSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onAuthSubmit(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
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
    let form = (
      <form onSubmit={this.authSubmitHandler}>
          {formInputs}
          <Button btnType='Success'>Sumit</Button>
      </form>
    );
    if(this.props.loading){
      form = <Spinner/>;
    }
    let authenticated = null;
    if(this.props.isAuthenticated){
      authenticated = <Redirect to={this.props.authRedirectPath}/>
    }
    return (
      <div className={classes.Auth}>
        {authenticated}
        {this.props.error ? this.props.error.response.data.error.message : null}
        {form}
        <Button clicked={this.switchAuthHandler} btnType='Danger'>Switch to {this.state.isSignUp ? 'Singin':'Singup'}</Button>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onAuthSubmit: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: !!state.auth.token,
    building: state.burger.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);