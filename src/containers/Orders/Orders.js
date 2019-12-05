import React, {Component} from 'react'
import Order from '../../components/Order/Order';
class Orders extends Component {
  render(){
    return (
      <div>
        <Order totalPrice='10'/>
        <Order totalPrice='20'/>
      </div>
    );
  }
}

export default Orders;