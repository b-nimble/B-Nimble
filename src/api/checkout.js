import axios from './axios';

const getProductsandGuestsInformation = (data = {}) => axios
  .post('/Checkout/GetProductsandGuestsInformation', data.data || {}, {
    params: data.params || {},
  });

const saveProductsandGuestsInformation = (data = {}) => axios
  .post('/Checkout/SaveProductAndGuestInformation', data.data || {}, {
    params: data.params || {},
  });

const getallProductInformation = (data = {}) => axios
  .post('/Checkout/GetallProductInformation', data.data || {}, {
    params: data.params || {},
  });

const guestCheckout = (data = {}) => axios
  .post('/Checkout/GuestCheckout', data.data || {}, {
    params: data.params || {},
  });

const loadVerifyInformation = (data = {}) => axios
  .post('/Checkout/LoadVerifyInformation', data.data || {}, {
    params: data.params || {}
  });

const paymentProcessor = (data = {}) => axios
  .post('/Checkout/PaymentProcessor', data.data || {}, {
    params: data.params || {}
  });

export default {
  getProductsandGuestsInformation,
  saveProductsandGuestsInformation,
  getallProductInformation,
  guestCheckout,
  loadVerifyInformation,
  paymentProcessor,
};
