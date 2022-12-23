import { computed, ref } from "vue";
import { useStore } from "vuex";

export default function () {
  // STORE
  const store = useStore();

  // REFS
  const loadingProductsandGuestsInformation = ref(false);
  const loadingShippingAddress = ref(false);
  const loadingBillingAddress = ref(false);
  const loadingVerifyInformation = ref(false);
  const checkingStepFilledData = ref(true);

  // COMPUTED
  const currentStep = computed(() => store.getters['checkout/currentStep']);
  const tracker  = computed(() => store.getters['checkout/tracker']);
  const step1  = computed(() => store.getters['checkout/step1']);
  const step2  = computed(() => store.getters['checkout/step2']);
  const cartTotals  = computed(() => store.getters['checkout/cartTotals']);
  const cowCardsTotalBalanceApplied = computed(() => {
    let total = 0;

    step2.value.cowCardsApplied.forEach((cc) => {
      total += cc.balanceApplied;
    });

    return total;
  });

  // METHODS
  const getProductsandGuestsInformation = (data, callback) => {
    loadingProductsandGuestsInformation.value = true;
    store.dispatch('checkout/getProductsandGuestsInformation', data)
      .then((response) => {
        loadingProductsandGuestsInformation.value = false;
        if (callback) {
          callback(true, response.data);
        }
      }).catch((error) => {
        loadingProductsandGuestsInformation.value = false;
        console.log(error);
        if (callback) {
          callback(false);
        }
      });
  };

  const setProductsandGuestsInformation = (data) => store
    .dispatch('checkout/updateStep', {
      step: 'step1',
      field: 'productsandGuestsInformation',
      value: data,
    });

  const getallProductInformation = (data, callback) => {
    store.dispatch('checkout/getallProductInformation', data)
      .then((response) => {
        if (callback) {
          callback(true, response.data);
        }
      }).catch((error) => {
        console.log(error);
        if (callback) {
          callback(false);
        }
      });
  }

  const setallProductInformation = (data) => store.dispatch('checkout/updateCartTotals', {
    field: 'products',
    value: data
  });

  const guestCheckout = (data, callback) => {
    store.dispatch('checkout/guestCheckout', data)
      .then((response) => {
        if (callback) {
          if (response.data.valid !== true) {
            callback(false, {
              errorMsg: response.data.error || 'Something went wrong. Please try again later.'
            });

            return;
          }

          callback(true);
        }
      }).catch(() => {
        if (callback) {
          callback(false, {
            errorMsg: 'Something went wrong. Please try again later.'
          });
        }
      });
  };

  const checkAgeRestriction = (data, callback) => {
    store.dispatch('checkout/checkAgeRestriction', data)
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

  const getAllWTPByGuest = (data, callback) => {
    store.dispatch('checkout/getAllWTPByGuest', data)
      .then((response) => {
        if (callback) {
          callback(true, response.data || []);
        }
      }).catch(() => {
        if (callback) {
          callback(false, {
            errorMsg: 'Something went wrong. Please try again later.'
          });
        }
      });
  };

  const validateAxess = (data, callback) => {
    store.dispatch('checkout/validateAxess', data)
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

  const uploadPhoto = (data, callback) => {
    store.dispatch('checkout/uploadPhoto', data)
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

  const updateCurrentStep = (data, callback) => {
    store.dispatch('checkout/updateCurrentStep', data)
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
  }

  const saveProductsandGuestsInformation = (data, callback) => {
    store.dispatch('checkout/saveProductsandGuestsInformation', data)
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

  const updateStep2BillingAddress = (data, callback) => {
    store.dispatch('checkout/updateStep2BillingAddress', data)
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

  const updateStep2ShippingAddress = (data, callback) => {
    store.dispatch('checkout/updateStep2ShippingAddress', data)
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

  const updateStep2CreditCard = (data, callback) => {
    store.dispatch('checkout/updateStep2CreditCard', data)
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

  const updateStep2CowCard = (data, callback) => {
    store.dispatch('checkout/updateStep2CowCard', data)
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

  const applyCowCard = (data, callback) => {
    store.dispatch('checkout/applyCowCard', data)
      .then(() => {
        if (callback) {
          callback(true);
        }
      });
  };

  const removeCowCard = (data, callback) => {
    store.dispatch('checkout/removeCowCard', data)
      .then(() => {
        if (callback) {
          callback(true);
        }
      });
  };

  const getDefaultBilling = (data, callback) => {
    loadingBillingAddress.value = true;
    store.dispatch('address/getDefaultBilling', data)
      .then((response) => {
        loadingBillingAddress.value = false;
        if (callback) {
          callback(true, response.data);
        }
      }).catch(() => {
        loadingBillingAddress.value = false;
        if (callback) {
          callback(false, {
            errorMsg: 'Something went wrong. Please try again later.'
          });
        }
      });
  };

  const getDefaultShipping = (data, callback) => {
    loadingShippingAddress.value = true;
    store.dispatch('address/getDefaultShipping', data)
      .then((response) => {
        loadingShippingAddress.value = false;
        if (callback) {
          callback(true, response.data);
        }
      }).catch(() => {
        loadingShippingAddress.value = false;
        if (callback) {
          callback(false, {
            errorMsg: 'Something went wrong. Please try again later.'
          });
        }
      });
  };

  const loadVerifyInformation = (data, callback) => {
    loadingVerifyInformation.value = true;
    store.dispatch('checkout/loadVerifyInformation', data)
      .then((response) => {
        loadingVerifyInformation.value = false;
        if (callback) {
          callback(true, response.data);
        }
      }).catch(() => {
        loadingVerifyInformation.value = false;
        if (callback) {
          callback(false, {
            errorMsg: 'Something went wrong. Please try again later.'
          });
        }
      });
  }

  const paymentProcessor = (data, callback) => {
    store.dispatch('checkout/paymentProcessor', data)
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
  }

  const getLastOrderReceipt = (data, callback) => {
    store.dispatch('checkout/getLastOrderReceipt', data)
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
  }

  return {
    tracker,
    step1,
    step2,
    currentStep,
    cartTotals,
    loadingProductsandGuestsInformation,
    loadingBillingAddress,
    loadingShippingAddress,
    checkingStepFilledData,
    cowCardsTotalBalanceApplied,
    getProductsandGuestsInformation,
    saveProductsandGuestsInformation,
    getallProductInformation,
    setProductsandGuestsInformation,
    setallProductInformation,
    guestCheckout,
    checkAgeRestriction,
    getAllWTPByGuest,
    validateAxess,
    uploadPhoto,
    updateCurrentStep,
    updateStep2BillingAddress,
    updateStep2ShippingAddress,
    updateStep2CreditCard,
    updateStep2CowCard,
    getDefaultBilling,
    getDefaultShipping,
    applyCowCard,
    removeCowCard,
    loadVerifyInformation,
    paymentProcessor,
    getLastOrderReceipt,
  };
}
