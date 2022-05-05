import Api from '../components/Api';

const api = new Api({
  baseUrl: 'https://my-json-server.typicode.com/kateworks/data',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
