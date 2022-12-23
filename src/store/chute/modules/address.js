import accountAddress from '@/api/accountAddress';

export default {
  namespaced: true,

  state: () => ({}),

  actions: {
    getDefaultBilling(context, data) {
      return accountAddress.defaultBilling();
    },
    getDefaultShipping(context, data) {
      return accountAddress.defaultShipping();
    },
    updateAddress(context, data) {
      return accountAddress.updateAddress(data);
    },
    createAddress(context, data) {
      return accountAddress.createAddress(data);
    },
    setCartAddressBilling(context, data) {
      return accountAddress.setCartAddressBilling(data);
    },
    setCartAddressShipping(context, data) {
      return accountAddress.setCartAddressShipping(data);
    },
  }
}
