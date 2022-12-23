import _ from 'lodash';
import checkoutApi from '@/api/checkout';
import axessValidationApi from '@/api/axessValidation';
import wtpGuestsApi from '@/api/wtpGuests';
import photoUploadApi from '@/api/photoUpload';
import orderReceipt from '@/api/orderReceipt';

export default {
  namespaced: true,

  state: () => ({
    tracker: null,
    currentStep: 1,
    cartTotals: {
      products: []
    },
    step1: {
      productsandGuestsInformation: null,
      productsInfo: [],
      productsInfoFilled: null,
    },
    step2: {
      cowCardsApplied: [], // { cardNumber: 123, balance: 0, balanceApplied: 0, balanceRemaining: 0}
      defaultBillingAddressChanged: false,
      defaultShippingAddressChanged: false,
      billingAddress: {
        addressId: null,
        firstName: '',
        lastName: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zip: '',
        phone1: '',
        sameAsShipping: false,
      },
      shippingAddress: {
        addressId: null,
        firstName: '',
        lastName: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zip: '',
        phone1: '',
      },
      creditCard: {
        nameOnCard: '',
        cardTypeString: '',
        cardType: '',
        cardNumber: '',
        verificationCode: '',
        expirationMonth: '',
        expirationYear: '',
      },
      cowCard: {
        cardNumber: '',
        firstName: '',
        lastName: '',
      },
    }
  }),

  getters: {
    tracker(state) {
      return state.tracker;
    },
    currentStep(state) {
      return state.currentStep;
    },
    step1(state) {
      return state.step1;
    },
    step2(state) {
      return state.step2;
    },
    cartTotals(state) {
      return state.cartTotals;
    },
  },

  actions: {
    updateCurrentStep(context, data) {
      return context.commit('updateCurrentStep', data);
    },
    getProductsandGuestsInformation(context, data) {
      return checkoutApi.getProductsandGuestsInformation(data);
    },
    saveProductsandGuestsInformation(context, data) {
      return checkoutApi.saveProductsandGuestsInformation(data);
    },
    getallProductInformation(context, data) {
      return checkoutApi.getallProductInformation(data);
    },
    updateStep(context, data) {
      context.commit('updateStep', data);
    },
    updateCartTotals(context, data) {
      context.commit('updateCartTotals', data);
    },
    guestCheckout(context, data) {
      return checkoutApi.guestCheckout(data);
    },
    updateStep1ProductInfo(context, data) {
      context.commit('updateStep1ProductInfo', data);
    },
    resetStep2BillingAddress(context, data) {
      context.commit('resetStep2BillingAddress', data);
    },
    resetStep2ShippingAddress(context, data) {
      context.commit('resetStep2ShippingAddress', data);
    },
    updateStep2BillingAddress(context, data) {
      context.commit('updateStep2BillingAddress', data);
    },
    updateStep2ShippingAddress(context, data) {
      context.commit('updateStep2ShippingAddress', data);
    },
    updateStep2CreditCard(context, data) {
      context.commit('updateStep2CreditCard', data);
    },
    updateStep2CowCard(context, data) {
      context.commit('updateStep2CowCard', data);
    },
    checkAgeRestriction(context, data) {
      return axessValidationApi.checkAgeRestriction(data);
    },
    getAllWTPByGuest(context, data) {
      return wtpGuestsApi.getAllWTPByGuest(data);
    },
    validateAxess(context, data) {
      return axessValidationApi.validateAxess(data);
    },
    uploadPhoto(context, data) {
      return photoUploadApi.uploadPhoto(data);
    },
    loadVerifyInformation(context, data) {
      return checkoutApi.loadVerifyInformation(data);
    },
    getLastOrderReceipt(context, data) {
      return orderReceipt.getLastOrderReceipt(data);
    },
    setTracker(context, data) {
      context.commit('setTracker', data);
    },
    applyCowCard(context, data) {
      context.commit('applyCowCard', data);
    },
    removeCowCard(context, data) {
      context.commit('removeCowCard', data);
    },
    paymentProcessor(context, data) {
      return checkoutApi.paymentProcessor(data);
    },
  },

  mutations: {
    updateCurrentStep(state, data) {
      state.currentStep = data.currentStep;
    },
    updateStep(state, data) {
      state[data.step][data.field] = data.value;
    },
    updateCartTotals(state, data) {
      state.cartTotals[data.field] = data.value;
    },
    updateStep1ProductInfo(state, data) {
      let currentInfo = state.step1.productsInfo[`product_${data.productId}`];
      if (data.subProductId !== undefined) {
        currentInfo = state.step1.productsInfo[`product_${data.productId}`][`subProduct_${data.subProductId}`];
      }

      if (data.fieldType === 'guest') {
        currentInfo.guest = data.value;
        return;
      }

      if (data.fieldType === 'guestFields') {
        currentInfo.guestFields[data.field] = data.value;
        return;
      }

      if (data.fieldType === 'ageRestricted') {
        currentInfo.ageRestricted = data.value;

        return;
      }

      if (data.fieldType === 'wtpGuests') {
        currentInfo.wtpGuests = data.value;

        return;
      }

      if (!data.subProductId) {
        currentInfo[`ext_${data.field}`] = data.value;

        return;
      }

      currentInfo[`ext_${data.field}`] = data.value;
    },
    resetStep2BillingAddress(state, data) {
      state.step2.defaultBillingAddressChanged = false;
      state.step2.billingAddress = data.address;
    },
    resetStep2ShippingAddress(state, data) {
      state.step2.defaultShippingAddressChanged = false;
      state.step2.shippingAddress = data.address;
    },
    updateStep2BillingAddress(state, data) {
      if (state.step2.billingAddress.addressId && data.changed) {
        state.step2.defaultBillingAddressChanged = true;
      }

      state.step2.billingAddress[data.field] = data.value;
    },
    updateStep2ShippingAddress(state, data) {
      if (state.step2.shippingAddress.addressId && data.changed) {
        state.step2.defaultShippingAddressChanged = true;
      }

      state.step2.shippingAddress[data.field] = data.value;
    },
    updateStep2CreditCard(state, data) {
      state.step2.creditCard[data.field] = data.value;
    },
    updateStep2CowCard(state, data) {
      state.step2.cowCard[data.field] = data.value;
    },
    setTracker(state, data) {
      state.tracker = data.tracker;
    },
    applyCowCard(state, data) {
      const cowCard = _.find(state.step2.cowCardsApplied, {cardNumber: data.cardNumber});
      if (cowCard) {
        return;
      }

      state.step2.cowCardsApplied.push(data);
    },
    removeCowCard(state, data) {
      state.step2.cowCardsApplied = state.step2.cowCardsApplied
        .filter((cc) => cc.cardNumber !== data.cardNumber);
    },
  },
}
