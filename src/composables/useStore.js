import { computed } from 'vue';
import { useStore } from 'vuex';

export default function () {
  const store = useStore();

  // COMPUTED
  const cart = computed(() => store.getters['store/cart']);

  // METHODS
  const loadCartInfo = () => {
    store.dispatch('store/getCartVUE')
      .then((response) => {
        store.dispatch('store/updateCart', {
          cart: response.data,
        });
      });
  }

  const checkCowCardBalance = (data, callback) => {
    store.dispatch('store/checkCowCardBalance', data)
      .then((response) => {
        if (callback) {
          callback(true, response.data);
        }
      }).catch(() => {
        if (callback) {
          callback(false, {
            errorMsg: 'Something went wrong. Please try again later.'
          });
        }
      });
  };

  const addtoCartGiftCard = () => {
    console.log('Call method in usestore js')
    store.dispatch('store/addtoCartGiftCard')
      .then((response) => {
        console.log(response);
      });
  }
  const addtoCartrefillGiftCard = () => {
    store.dispatch('store/addtoCartrefillGiftCard')
      .then((response) => {
        console.log(response);
      });
  }
  const checkGiftCardBalance = () => {
    store.dispatch('store/CheckCowCardBalance')
      .then((response) => {
        console.log(response);
      });
  }

  const checkGiftCardHistory = () => {
    store.dispatch('store/checkGiftCardHistory')
      .then((response) => {
        return response;
      });
  }

  const getTermsByCartID = (callback) => {
    store.dispatch('store/getTermsByCartID')
      .then((response) => {
        if (callback) {
          callback(true, response.data);
        }
      }).catch(() => {
        if (callback) {
          callback(false);
        }
      });
  }

  return {
    cart,
    loadCartInfo,
    checkCowCardBalance,
    addtoCartGiftCard,
    addtoCartrefillGiftCard,
    checkGiftCardBalance,
    checkGiftCardHistory,
    getTermsByCartID,
  };
}
