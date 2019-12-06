import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'; 
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street : '',
      postalCode: ''
    },
    loading: false
  }
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    })
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer: {
        name: 'Himanshu Negi',
        address: {
          street: 'street 1',
          postalCode: '42557',
        },
        email: 'dummy@test.com',
      },
      deliveryMethod: 'fastest'
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
  render(){
    let form = (
        <form>
          <Input type='text' inputtype='input' name='name' placeholder='Your Name'/>
          <Input type='email' inputtype='input' name='email' placeholder='Your Email'/>
          <Input type='text' inputtype='input' name='street' placeholder='Street'/>
          <Input type='text' inputtype='input' name='postalCode' placeholder='Postal Code'/>
          <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
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

export default ContactData;