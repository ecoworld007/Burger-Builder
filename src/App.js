import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuidler';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import * as actions from './store/actions/';
import asyncComponent from './hoc/AsyncComponent/AsyncComponent';

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncLogout= asyncComponent(() => {
  return import('./containers/Auth/Logout/Logout');
});

class App extends Component {
  componentWillMount(){
    this.props.onTryAutoSignIn();
  }
  render() {
    let routes = (
      <Switch>
          <Route path='/auth' component={asyncAuth}/>
          <Route path='/' exact component={BurgerBuilder}/>
          <Redirect to='/'/>
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
            <Route path='/checkout' component={asyncCheckout}/>
            <Route path='/orders' component={asyncOrders}/>
            <Route path='/auth' component={asyncAuth}/>
            <Route path='/logout' component={asyncLogout}/>
            <Route path='/' exact component={BurgerBuilder}/>
            <Redirect to='/'/>
          </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token!=null
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authStateCheck())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
