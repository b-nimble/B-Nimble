import axios from './axios';

const addToCart = (data = {}) => axios.post('/Coupon/AddToCart', data.data || {}, {
  params: data.params || {},
});

const removeFromCart = (data = {}) => axios.post('/Coupon/RemoveFromCart', {
  params: data.params || {},
});

export default {
  addToCart,
  removeFromCart,
};
