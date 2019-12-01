import React, {Component} from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';
const withErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    componentDidMount(){
      axios.interceptors.request.use(null, error => this.setState({
        error: null
      }));
      axios.interceptors.response.use(null, error => this.setState({
        error: error
      }));
    }
    errorConfirmedHandler = ()=>{
      this.setState({
        error: null
      });
    }
    render(){
      return (
        <Aux>
          <Modal show={this.state.error} onClicked={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponent {... this.props}/>
        </Aux>
      );
    }
  }
}

export default withErrorHandler;