import axios from 'axios';

export default axios.create({
  baseURL: 'https://binday-server.herokuapp.com/api',
  headers: {
    'Content-type': 'application/json'
  }
});
