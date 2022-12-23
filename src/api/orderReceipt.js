import axios from './axios';

const getLastOrderReceipt = (data = {}) => axios.get('/OrderReceipt/GetLastOrderReceipt', {
  params: data.params || {},
});

export default {
  getLastOrderReceipt,
};
