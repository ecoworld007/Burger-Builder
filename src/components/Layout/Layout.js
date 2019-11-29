import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
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
        <SideDrawer closeSideDrawer={this.closeSideDrawerHandler} show={this.state.showSideDrawer}/>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;