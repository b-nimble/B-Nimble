import { computed } from 'vue';
import { useStore } from 'vuex';

export default function () {
  const store = useStore();

  // COMPUTED

  // METHODS
  const loadCartInfo = () => {
    store.dispatch('store/getCartVUE')
      .then((response) => {
        store.dispatch('store/updateCart', {
          cart: response.data,
        });
      });
  }

  return {
    loadCartInfo,
  };
}
