<template>
  <div class="chute-checkout-step4-cpt" v-if="!loadingVerifyInformation && info">
    <!-- Billing Info -->
    <div class="row mb-4" v-if="billingInfo">
      <div class="col-12 col-md-8 offset-md-2">
        <h4 class="text-center mb-3">Billing Information</h4>
        <div class="chute-checkout-step4-cpt__billing-info">
          <div class="d-flex mb-3">
            <div><strong>First Name</strong></div>
            <div>{{billingInfo.FirstName}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>Last Name</strong></div>
            <div>{{billingInfo.LastName}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>Phone</strong></div>
            <div>{{billingInfo.Phone1}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>Address 1</strong></div>
            <div>{{billingInfo.Street1}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>Address 2</strong></div>
            <div>{{billingInfo.Street2}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>City</strong></div>
            <div>{{billingInfo.City}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>State</strong></div>
            <div>{{billingInfo.State}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>Zip Code</strong></div>
            <div>{{billingInfo.Zip}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Shipping Info -->
    <div class="row mb-4" v-if="shippingInfo && shippingInfo.AddressID !== billingInfo.AddressID">
      <div class="col-12 col-md-8 offset-md-2">
        <h4 class="text-center mb-3">Shipping Information</h4>
        <div class="chute-checkout-step4-cpt__shipping-info">
          <div class="d-flex mb-3">
            <div><strong>First Name</strong></div>
            <div>{{shippingInfo.FirstName}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>Last Name</strong></div>
            <div>{{shippingInfo.LastName}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>Phone</strong></div>
            <div>{{shippingInfo.Phone1}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>Address 1</strong></div>
            <div>{{shippingInfo.Street1}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>Address 2</strong></div>
            <div>{{shippingInfo.Street2}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>City</strong></div>
            <div>{{shippingInfo.City}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>State</strong></div>
            <div>{{shippingInfo.State}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>Zip Code</strong></div>
            <div>{{shippingInfo.Zip}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Payment Info -->
    <div class="row mb-4" v-if="paymentInfo">
      <div class="col-12 col-md-8 offset-md-2">
        <h4 class="text-center mb-3">Payment Information</h4>
        <div class="chute-checkout-step4-cpt__payment-info">
          <div class="d-flex mb-3">
            <div><strong>Name On Credit Card</strong></div>
            <div>{{paymentInfo.NameOnCard}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>Credit Card Number</strong></div>
            <div>{{paymentInfo.CardNumber}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>Credit Card Verfication Code</strong></div>
            <div>{{paymentInfo.VerificationCode}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>Card Type</strong></div>
            <div>{{paymentInfo.CardTypeString}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>Expiration Date</strong></div>
            <div>{{paymentInfo.ExpirationMonth}}-{{paymentInfo.ExpirationYear}}</div>
          </div>
          <div class="d-flex mb-3">
            <div><strong>COW Card Number</strong></div>
            <div>{{formatGiftCards(paymentInfo.giftCards)}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Products -->
    <div class="row mb-4" v-if="products.length > 0">
      <div class="col-12">
        <h4 class="text-center mb-3">Products</h4>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Options</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.ProductID">
                <td><div v-html="formatProductName(product)"></div></td>
                <td><div v-html="formatExtensionData(product)"></div></td>
                <td>{{product.ProductQty}}</td>
                <td>{{product.ProductPrice.toFixed(2)}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr v-if="info && info.CouponAppliedAmount > 0" style="border-color:transparent">
                <td colspan="2"></td>
                <td>Coupon Discount</td>
                <td>${{info.CouponAppliedAmount.toFixed(2)}}</td>
              </tr>
              <tr v-if="info" style="border-color:transparent">
                <td colspan="2"></td>
                <td>Subtotal</td>
                <td>${{info.SubTotal.toFixed(2)}}</td>
              </tr>
              <tr v-if="info">
                <td colspan="2"></td>
                <td>Total</td>
                <td>${{info.Total.toFixed(2)}}</td>
              </tr>
            </tfoot>
          </table>
      </div>
    </div>
    <!-- Error -->
    <div class="my-3 alert alert-danger" v-if="stepErrorMsg?.length > 0">
      {{stepErrorMsg}}
    </div>
    <!-- Navigation -->
    <div class="col-12 d-flex justify-content-between mt-5">
      <n-button type="primary" @click="goToPrevStep">Previous</n-button>
      <n-button
        :loading="processingStep"
        type="primary"
        @click="goToNextStep"
        :disabled="processingStep">Place Order</n-button>
    </div>
  </div>
  <div class="d-flex py-5 justify-content-center" v-else>
    <n-spin size="large" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { NButton, NSpin } from 'naive-ui';
import _ from 'lodash';

// COMPOSABLES
import useCheckout from '@/composables/useCheckout';

// CONSTANTS
import paths from '@/shared/constants/paths';

// UTILS
import { gtmDataLayer } from '@/shared/utils/tagmanager';

export default {
  components: {
    NButton,
    NSpin,
  },
  setup() {
    const {
      currentStep,
      updateCurrentStep,
      loadVerifyInformation,
      loadingVerifyInformation,
      tracker,
      step1,
      paymentProcessor,
    } = useCheckout();


    return {
      info: ref(null),
      tracker,
      stepErrorMsg: ref(''),
      processingStep: ref(false),

      step1,
      currentStep,
      updateCurrentStep,
      loadVerifyInformation,
      loadingVerifyInformation,
      paymentProcessor,
    };
  },
  mounted() {
    this.loadVerifyInformation({
      params: {
        tracker: this.tracker,
      }
    }, (success, result) => {
      if (!success) {
        this.stepErrorMsg = 'Something went wrong. Please try again later.';

        return;
      }

      this.info = result;
    });
  },
  methods: {
    goToNextStep() {
      console.log('go to next step');
      this.processingStep = true;
      this.paymentProcessor({
        params: {
          tarcker: this.tracker,
        },
      }, (success, result) => {
        this.processingStep = false;
        if (!success) {
          this.stepErrorMsg = 'Something went wrong. Please try again later.';

          return;
        }

        if (!result.Valid) {
          this.stepErrorMsg = result.Error || 'Unable to place order, please try again';

          return;
        }

        if (result.DataLayer) {
          gtmDataLayer().push(result.DataLayer);
        }

        setTimeout(() => {
          window.location.href = paths.orderReceiptPage;
        }, 3000);
      });
    },
    goToPrevStep() {
      this.updateCurrentStep({ currentStep: this.currentStep - 1 });
    },
    formatGiftCards(giftCards) {
      return giftCards.map((gc) => gc.giftCardNumber).join(', ');
    },
    formatProductName(product) {
      let groupedProducts = '';
      if (product.GroupedProducts?.length > 0) {
        groupedProducts = product.GroupedProducts.map((gp) => {
          return `<div>${gp.Variant_Name}</div>`;
        }).join('');
      }

      let template = `<div>${product.ProductName}</div>`;
      if (groupedProducts) {
        template += `<div class="ps-3">${groupedProducts}</div>`;
      }

      return template;
    },
    formatExtensionData(product) {
      let template = '';

      if (product?.GroupedProducts?.length === 0) {
        const guestNoField = _.find(product.ExtensionData, { FieldName: 'GuestNo' });
        if (guestNoField) {
          const guest = _.find(this.guests, { GuestNo: guestNoField.Value });
          if (!guest) {
            return;
          }

          const firstName = _.find(guest.Parameters, {0: 'first_name'});
          const lastName = _.find(guest.Parameters, {0: 'last_name'});
          template += `
            <div>
              <i>${firstName[1]} - ${firstName[2]}</i><br>
              <i>${lastName[1]} - ${lastName[2]}</i><br>
            </div>
          `;
        }

        product.ExtensionData.forEach((ed) => {
            if (ed.Category === 'Product') {
              if (!ed.Value) {
                return;
              }

              if (ed.Value.indexOf('Invalid') >= 0) {
                return;
              }

              template += `
                <div>
                  <i>${ed.FieldDisplayName} - ${ed.Value}</i>
                </div>
              `;
            }
        });

        return template;
      }

      const firstName = _.find(
        product.GroupedProducts[0].ExtensionDataFieldValues,
        {FieldName: 'first_name'}
      )?.Value || '';
      const lastName = _.find(
        product.GroupedProducts[0].ExtensionDataFieldValues,
        {FieldName: 'last_name'}
      )?.Value || '';
      template += `
        <div>
          <i>First Name - ${firstName}</i><br>
          <i>Last Name - ${lastName}</i><br>
        </div>
      `;

      product.GroupedProducts[0].ExtensionDataFieldValues.forEach((ed) => {
        if (ed.Category === 'Product') {
          if (!ed.Value) {
            return;
          }

          if (ed.Value.indexOf('Invalid') >= 0) {
            return;
          }

          template += `
            <div>
              <i>${ed.FieldDisplayName} - ${ed.Value}</i>
            </div>
          `;
        }
      });

      return template;
    },
  },
  computed: {
    billingInfo() {
      return this.info?.BillingAddress;
    },
    shippingInfo() {
      return this.info?.ShippingAddress;
    },
    paymentInfo() {
      return this.info?.PaymentInformation;
    },
    products() {
      return this.info?.Items;
    },
    guests() {
      return this.step1?.productsandGuestsInformation?.Guests || [];
    }
  },
}
</script>

<style lang="scss">
.chute-checkout-step4-cpt {
  &__billing-info,
  &__shipping-info {
    > div {
      > div:first-child {
        max-width: 130px;
        width: 100%;
      }
    }
  }

  &__payment-info {
    > div {
      > div:first-child {
        max-width: 230px;
        width: 100%;
      }
    }
  }
}
</style>
