import React, {Component} from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount(){
    axios.get('/orders.json')
      .then(res => {
        console.log(res.data);
        const fetchedOrders = [];
        for(let key of res.data){
          fetchedOrders.push({
            ...res.data[key],
            id: key
          })
        }
        this.setState({
          loading: false,
          orders: fetchedOrders
        })
      })
      .catch(err => {
        this.setState({
          loading: false
        })
      })
  }
  render(){
    return (
      <div>
        <Order totalPrice='10'/>
        <Order totalPrice='20'/>
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);