import storeApi from '@/api/store';
export default {
  namespaced: true,

  state: () => ({
    cart: null,
  }),

  getters: {
    cart(state) {
      return state.cart;
    },
  },

  actions: {
    addToCartVUE(context, data) {
      return storeApi.addToCartVUE(data);
    },
    getCartVUE(context, data) {
      return storeApi.getCartVUE(data);
    },
    removeFromCart(context, data) {
      return storeApi.removeFromCart(data);
    },
    getBasicProductVUE(context, data) {
      return storeApi.getBasicProductVUE(data);
    },
    updateCart(context, data) {
      context.commit('updateCart', data);
    },
    trackCart(context, data) {
      return storeApi.trackCart(data);
    },
    checkCowCardBalance(context, data) {
      return storeApi.checkCowCardBalance(data);
    },
    addtoCartGiftCard(context, data) {
      return storeApi.addtoCartGiftCard(data);
    },
    addtoCartrefillGiftCard(context, data) {
      return storeApi.addtoCartrefillGiftCard(data);
    },
    checkGiftCardBalance(context, data) {
      return storeApi.checkGiftCardBalance(data);
    },
    checkGiftCardHistory(context, data) {
      return storeApi.checkGiftCardHistory(data);
    },
    refillGiftCard(context, data) {
      return storeApi.refillGiftCard(data);
    },
    getTermsByCartID(context, data) {
      return storeApi.getTermsByCartID();
    },
  },

  mutations: {
    updateCart(state, data) {
      state.cart = data.cart;
    }
  }
}
