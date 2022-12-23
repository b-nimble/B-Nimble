import axios from './axios';

const defaultBilling = (data = {}) => axios
  .get('/AccountAddress/DefaultBilling', {
    params: data.params || {},
  });

const defaultShipping = (data = {}) => axios
  .get('/AccountAddress/DefaultShipping', {
    params: data.params || {},
  });

const updateAddress = (data = {}) => axios
  .post('/AccountAddress/Update', data.data || {}, {
    params: data.params || {},
  });

const createAddress = (data = {}) => axios
  .post('/AccountAddress/Create', data.data || {}, {
    params: data.params || {},
  });

const setCartAddressBilling = (data = {}) => axios
  .post('/AccountAddress/SetCartAddressBilling', data.data || {}, {
    params: data.params || {},
  });

const setCartAddressShipping = (data = {}) => axios
  .post('/AccountAddress/SetCartAddressShipping', data.data || {}, {
    params: data.params || {},
  });

export default {
  defaultBilling,
  defaultShipping,
  updateAddress,
  createAddress,
  setCartAddressBilling,
  setCartAddressShipping,
};
