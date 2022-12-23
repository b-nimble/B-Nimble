<template>
  <div class="chute-checkout-step2-cpt">
    <div class="row" v-if="!loadingBillingAddress && !loadingShippingAddress">
      <div class="col-lg-8">
        <billing-address ref="billingAddressRef" />
        <shipping-address ref="shippingAddressRef" :class="{ 'd-none': billingAddress.sameAsShipping }"/>
        <credit-card ref="creditCardPaymentRef" />
        <div class="text-center py-4" style="color: #003865;font-size:2rem">
          <strong>OR</strong>
        </div>
        <cow-card />
        <div class="text-center mt-5">
          <h5><i>*Credit Card Info is only needed if COW balance does not cover amount due.</i></h5>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="position-sticky top-0 mb-5">
          <cart-info />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center" v-else>
      <n-spin size="large" />
    </div>
    <div class="my-3 alert alert-danger" v-if="stepErrorMsg?.length > 0">
      {{stepErrorMsg}}
    </div>
    <div class="col-12 d-flex justify-content-between mt-5">
      <n-button type="primary" @click="goToPrevStep" :disabled="productsInfoFilled && productsInfoFilled.skipStep">Previous</n-button>
      <n-button :loading="processingStep" :disabled="processingStep" type="primary" @click="goToNextStep">Next</n-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import {
  NSpin,
  NButton,
} from 'naive-ui';

// COMPOSABLES
import useCheckout from '@/composables/useCheckout';
import useStore from '@/composables/useStore';

// COMPONENTS
import BillingAddress from '@/components/chute/checkout/step2/BillingAddress.vue';
import ShippingAddress from '@/components/chute/checkout/step2/ShippingAddress.vue';
import CreditCard from '@/components/chute/checkout/step2/CreditCard.vue';
import CowCard from '@/components/chute/checkout/step2/CowCard.vue';
import CartInfo from '@/components/chute/checkout/CartInfo.vue';

export default {
  components: {
    BillingAddress,
    ShippingAddress,
    CreditCard,
    CartInfo,
    CowCard,

    NSpin,
    NButton,
  },
  setup() {
    const {
      step1,
      step2,
      currentStep,
      updateCurrentStep,
      loadingShippingAddress,
      loadingBillingAddress,
      cowCardsTotalBalanceApplied,
    } = useCheckout();

    const { cart } = useStore();

    return {
      processingStep: ref(false),
      stepErrorMsg: ref(''),

      step1,
      step2,
      currentStep,
      updateCurrentStep,
      loadingShippingAddress,
      loadingBillingAddress,
      cowCardsTotalBalanceApplied,

      cart,
    };
  },
  computed: {
    productsInfoFilled() {
      return this.step1.productsInfoFilled;
    },
    billingAddress() {
      return this.step2.billingAddress;
    },
    shippingAddress() {
      return this.step2.shippingAddress;
    },
    creditCard() {
      return this.step2.creditCard;
    },
    cartTotal() {
      if (!this.cart) {
        return 0;
      }

      return parseFloat((this.cart?.Total - this.cowCardsTotalBalanceApplied).toFixed(2));
    },
  },
  methods: {
    goToPrevStep() {
      this.updateCurrentStep({ currentStep: this.currentStep - 1 });
    },
    goToNextStep() {
      this.processingStep = true;
      this.stepErrorMsg = '';

      this.saveBillingAddress(() => {
        this.saveShippingAddress(() => {
          this.trackPayment(() => {
            this.processingStep = false;
            this.updateCurrentStep({ currentStep: this.currentStep + 1 });
          });
        });
      });
    },
    saveBillingAddress(callback) {
      const process = () => {
        if (!this.billingAddress.addressId) {
          this.$store.dispatch('address/createAddress', {data: this.transformAddressData(this.billingAddress)})
            .then((response) => {
              this.$store.dispatch(
                'checkout/resetStep2BillingAddress',
                {
                  address: {
                    ...this.transformToLocalAddressData(response.data),
                    sameAsShipping: this.billingAddress.sameAsShipping,
                  }
                }
              ).then(() => {
                this.$store.dispatch('address/setCartAddressBilling', { params: { addressId: response.data.AddressID } })
                  .then(() => {
                    callback();
                  }).catch((error) => {
                    console.log(error);
                    this.stepErrorMsg = 'Something went wrong! on setting default billing address, please try again.';
                    this.processingStep = false;
                  });
              });
            }).catch((error) => {
              console.log(error);
              this.stepErrorMsg = 'Something went wrong! on creating billing address, please try again.';
              this.processingStep = false;
            });
        } else if (this.billingAddress.addressId) {
          if (!this.step2.defaultBillingAddressChanged) {
            this.$store.dispatch('address/setCartAddressBilling', { params: { addressId: this.billingAddress.addressId } })
              .then(() => {
                callback();
              }).catch((error) => {
                console.log(error);
                this.stepErrorMsg = 'Something went wrong! on setting default billing address please try again.';
                this.processingStep = false;
              });

            return;
          }

          this.$store.dispatch('address/updateAddress', {data: this.transformAddressData(this.billingAddress)})
            .then((response) => {
              this.$store.dispatch(
                'checkout/resetStep2BillingAddress',
                {
                  address: {
                    ...this.transformToLocalAddressData(response.data),
                    sameAsShipping: this.billingAddress.sameAsShipping,
                  }
                }
              ).then(() => {
                this.$store.dispatch('address/setCartAddressBilling', { params: { addressId: response.data.AddressID } })
                  .then(() => {
                    callback();
                  }).catch((error) => {
                    console.log(error);
                    this.stepErrorMsg = 'Something went wrong! on setting default billing address please try again.';
                    this.processingStep = false;
                  });
              });
            }).catch((error) => {
              console.log(error);
              this.stepErrorMsg = 'Something went wrong! on updating billing address please try again.';
              this.processingStep = false;
            });
        }
      };

      this.$refs.billingAddressRef.$refs.checkoutStep2BillingFormRef.validate((errors) => {
        if (errors) {
          console.log(errors);
          this.stepErrorMsg = 'Please complete all the required fields.';
          this.processingStep = false;

          return;
        }

        process();
      });
    },
    saveShippingAddress(callback) {
      if (this.billingAddress.sameAsShipping) {
        this.$store
          .dispatch('address/setCartAddressShipping', { params: { addressId: this.billingAddress.addressId } })
          .then(() => {
            callback();
          }).catch((error) => {
            console.log(error);
            this.stepErrorMsg = 'Something went wrong! on setting default shipping address please try again.';
            this.processingStep = false;
          });

        return;
      }

      const process = () => {
        if (!this.shippingAddress.addressId && !this.billingAddress.sameAsShipping) {
          this.$store.dispatch('address/createAddress', {data: this.transformAddressData(this.shippingAddress)})
            .then((response) => {
              this.$store.dispatch(
                'checkout/resetStep2ShippingAddress',
                { address: this.transformToLocalAddressData(response.data) }
              ).then(() => {
                this.$store.dispatch('address/setCartAddressShipping', { params: { addressId: response.data.AddressID } })
                  .then(() => {
                    callback();
                  }).catch((error) => {
                    console.log(error);
                    this.stepErrorMsg = 'Something went wrong! on setting default shipping address please try again.';
                    this.processingStep = false;
                  });
              });
            }).catch((error) => {
              console.log(error);
              this.stepErrorMsg = 'Something went wrong! on creating shipping address please try again.';
              this.processingStep = false;
            });
        } else if (this.shippingAddress.addressId) {
          if (!this.step2.defaultShippingAddressChanged) {
            this.$store.dispatch('address/setCartAddressShipping', { params: { addressId: this.shippingAddress.addressId } })
              .then(() => {
                callback();
              }).catch((error) => {
                console.log(error);
                this.stepErrorMsg = 'Something went wrong! on setting default shipping address please try again.';
                this.processingStep = false;
              });

            return;
          }

          this.$store.dispatch('address/updateAddress', {data: this.transformAddressData(this.shippingAddress)})
            .then((response) => {
              this.$store.dispatch(
                'checkout/resetStep2ShippingAddress',
                { address: this.transformToLocalAddressData(response.data) }
              ).then(() => {
                this.$store.dispatch('address/setCartAddressShipping', { params: { addressId: response.data.AddressID } })
                .then(() => {
                  callback();
                }).catch((error) => {
                  console.log(error);
                  this.stepErrorMsg = 'Something went wrong! on setting default shipping address please try again.';
                  this.processingStep = false;
                });
              });
            }).catch((error) => {
              console.log(error);
              this.stepErrorMsg = 'Something went wrong! on saving Shipping address please try again.';
              this.processingStep = false;
            });
        }
      }

      this.$refs.shippingAddressRef.$refs.checkoutStep2ShippingFormRef.validate((errors) => {
        if (errors) {
          console.log(errors);
          this.stepErrorMsg = 'Please complete all the required fields.';
          this.processingStep = false;
          return;
        }

        process();
      });
    },
    trackPayment(callback) {
      const process = () => {
        const payload = {
          PaymentMethod: 0,
          NameOnCard: this.creditCard.nameOnCard,
          CardTypeString: this.creditCard.cardType,
          CardType: "CC",
          CardNumber: this.creditCard.cardNumber,
          VerificationCode: this.creditCard.verificationCode,
          ExpirationMonth: this.creditCard.expirationMonth,
          ExpirationYear: this.creditCard.expirationYear,
          giftCards: []
        };

        if (this.step2.cowCardsApplied.length > 0) {
          this.step2.cowCardsApplied.forEach((cc, ccIndex) => {
            payload.giftCards.push({
              giftCardIndex: ccIndex,
              giftCardNumber: cc.cardNumber,
              giftCardAmount: cc.balance,
              giftCardAmountCharged: cc.balanceApplied,
            });
          });
        }

        this.$store.dispatch('store/trackCart', { data: payload })
          .then((response) => {
            if (!response.data.validation) {
              this.stepErrorMsg = response.data.error;
              this.processingStep = false;
              return;
            }

            this.$store.dispatch('checkout/setTracker', { tracker: response.data.tracker })
              .then(() => {
                callback();
              });
          }).catch((error) => {
            console.log(error)
            this.stepErrorMsg = 'Something went wrong. Please try again later.';
            this.processingStep = false;
          });
      };

      if (this.cartTotal === 0) {
        process();

        return;
      }

      this.$refs.creditCardPaymentRef.$refs.checkoutStep2CreditCardFormRef.validate((errors) => {
        if (errors) {
          console.log(errors);
          this.stepErrorMsg = 'Please complete all the required fields.';
          this.processingStep = false;
          return;
        }

        process();
      });
    },
    transformAddressData(address) {
      const data = {
        FirstName: address.firstName,
        LastName: address.lastName,
        Street1: address.street1,
        Street2: address.street2,
        City: address.city,
        State: address.state,
        Zip: address.zip,
        Phone1: address.phone1,
      };

      if (address.addressId) {
        data.AddressID = address.addressId;
      }

      return data;
    },
    transformToLocalAddressData(address) {
      const data = {
        firstName: address.FirstName,
        lastName: address.LastName,
        street1: address.Street1,
        street2: address.Street2,
        city: address.City,
        state: address.State,
        zip: address.Zip,
        phone1: address.Phone1,
      };

      if (address.AddressID) {
        data.addressId = address.AddressID;
      }

      return data;
    },
  }
}
</script>
