import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-64336.firebaseio.com/'
})

export default instance;