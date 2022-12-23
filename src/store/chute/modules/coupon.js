import couponApi from '@/api/coupon';

export default {
  namespaced: true,

  state: () => ({}),

  actions: {
    addToCart(context, data) {
      return couponApi.addToCart(data);
    },
    removeFromCart(context, data) {
      return couponApi.removeFromCart(data);
    }
  }
}
