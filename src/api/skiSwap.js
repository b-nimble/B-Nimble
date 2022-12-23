import axios from './axios';

const getAllByLastName = (data = {}) => axios
  .post('/SkiSwap/getAllByLastName', data.data || {}, {
    params: data.params || {},
  });

const getAllByClientID = (data = {}) => axios
  .post('/SkiSwap/getAllByClientID', data.data || {}, {
    params: data.params || {},
  });

const getCustomerInformation = (data = {}) => axios
  .post('/SkiSwap/getCustomerInformation', data.data || {}, {
    params: data.params || {},
  });

const saveCustomerInformation = (data = {}) => axios
  .post('/SkiSwap/saveCustomerInformation', data.data || {}, {
    params: data.params || {},
  });

const getSkiSwapBrand = (data = {}) => axios
  .post('/SkiSwap/getSkiSwapBrand', data.data || {}, {
    params: data.params || {},
  });

const getSkiSwapCategory = (data = {}) => axios
  .post('/SkiSwap/getSkiSwapCategory', data.data || {}, {
    params: data.params || {},
  });

const getSkiSwapStyle = (data = {}) => axios
  .post('/SkiSwap/getSkiSwapStyle', data.data || {}, {
    params: data.params || {},
  });

const saveSkiSwapItem = (data = {}) => axios
  .post('/SkiSwap/saveSkiSwapItem', data.data || {}, {
    params: data.params || {},
  });

const deleteSkiSwapItem = (data = {}) => axios
  .post('/SkiSwap/deleteSkiSwapItem', data.data || {}, {
    params: data.params || {},
  });

const getAllSkiSwapItem = (data = {}) => axios
  .post('/SkiSwap/getAllSkiSwapItem', data.data || {}, {
    params: data.params || {},
  });

export default {
  getAllByLastName,
  getAllByClientID,
  getCustomerInformation,
  saveCustomerInformation,
  getSkiSwapBrand,
  getSkiSwapCategory,
  getSkiSwapStyle,
  saveSkiSwapItem,
  getAllSkiSwapItem,
  deleteSkiSwapItem,
};
