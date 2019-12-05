import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street : '',
      postalCode: ''
    }
  }
  render(){
    return(
      <div className={classes.ContactData}>
        <h3>Enter your contact details</h3>
        <form>
          <input className={classes.Input} type='text' name='name' placeholder='Your Name'/>
          <input className={classes.Input} type='text' name='email' placeholder='Your Email'/>
          <input className={classes.Input} type='text' name='street' placeholder='Street'/>
          <input className={classes.Input} type='text' name='postalCode' placeholder='Postal Code'/>
          <Button btnType='Success'>Order</Button>
        </form>
      </div>
    )
  }
}

export default ContactData;