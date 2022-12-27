import axios from './axios';

const addToCartVUE = (data = {}) => axios.post('/Store/AddToCartVUE', data.data, {
  params: data.params || {},
});

const getCartVUE = (data = {}) => axios.get('/Store/GetCartVUE', {
  params: data.params || {},
});

const removeFromCart = (data = {}) => axios.post('/Store/RemoveFromCart', data.data || {}, {
  params: data.params || {},
});

const getBasicProductVUE = (data = {}) => axios.get('/Store/GetBasicProductVUE', {
  params: data.params || {},
});

const trackCart = (data = {}) => axios.post('/Store/trackCart', data.data, {
  params: data.params || {},
});

const checkCowCardBalance = (data = {}) => axios.get('/Store/CheckCowCardBalance', {
  params: data.params || {},
});

const addtoCartGiftCard = (data = {}) => axios.post('/Store/AddGiftCard', {
  params: data.params || {},
});

const addtoCartrefillGiftCard = (data = {}) => axios.post('/Store/RefillGiftCard', data.data, {
  params: data.params || {},
});

const checkGiftCardBalance = (data = {}) => axios.post('/Store/CheckGiftCardBalance', data.data, {
  params: data.params || {},
});

const checkGiftCardHistory = (data = {}) => axios.post('/Store/cardHistory', data.data, {
  params: data.params || {},
});

const refillGiftCard = (data = {}) => axios.post('/Store/RefillGiftCard', data.data, {
  params: data.params || {},
});

const getTermsByCartID = (data = {}) => axios.get('/Store/GetTermsByCartID', {
  params: data.params || {},
});

export default {
  getBasicProductVUE,
  addToCartVUE,
  getCartVUE,
  removeFromCart,
  trackCart,
  checkCowCardBalance,
  addtoCartGiftCard,
  addtoCartrefillGiftCard,
  checkGiftCardBalance,
  checkGiftCardHistory,
  refillGiftCard,
  getTermsByCartID,
};
