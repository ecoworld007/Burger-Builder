import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
class Layout extends Component {
  state = {
    showSideDrawer: true
  }
  closeSideDrawerHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      }
    })
  }
  render(){
    return (
      <Aux>
        <SideDrawer closeSideDrawer={this.closeSideDrawerHandler} show={this.state.showSideDrawer} isAuth={this.props.isAuth}/>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} isAuth={this.props.isAuth}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: !!state.auth.token
  };
}

export default connect(mapStateToProps)(Layout);