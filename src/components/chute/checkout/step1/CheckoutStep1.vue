<template>
  <div
    class="chute-checkout-step1-cpt"
    v-if="step1.productsandGuestsInformation && !loadingProductsandGuestsInformation && !checkingStepFilledData">
    <n-form ref="checkoutStep1FormRef" :model="productsInfo" :rules="rules">
      <div class="row">
        <div class="col-lg-8">
          <h5 class="mb-3">Products requiring additional information:</h5>
        </div>
        <div class="col-lg-4">
          <div class="d-flex flex-column align-items-center align-items-md-end">
            <n-button class="mb-2" type="primary" data-bs-toggle="modal" data-bs-target="#whyInfoNeededModal">Why is this information needed?</n-button>
          </div>
        </div>
        <div class="col-lg-8">
          <!-- PRODUCTS -->
          <div
            :class="{
              'card': true,
              'chute-checkout-step1-cpt-product-card': true,
              'mb-5': true,
              'd-none': isProductInfoFilled(product, productIndex)
            }"
            v-for="(product, productIndex) in products" :key="product.ID">
            <div class="card-header">
              {{product.ProductName}}
            </div>
            <div class="card-body">
              <sub-product
                :product="product"
                :sub-product="subProduct"
                v-for="subProduct in getSubproducts(product)"
                :key="subProduct.ID"
                />
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="position-sticky top-0 mb-5">
            <cart-info />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-lg-8 offset-lg-2" v-if="stepError.length > 0">
          <div class="alert alert-danger">{{stepError}}</div>
        </div>
        <div class="col-12 d-flex justify-content-end">
          <n-button :loading="processingStep" :disabled="processingStep" type="primary" @click="goToNextStep">Next</n-button>
        </div>
      </div>
    </n-form>
    <!-- MODALS START-->
    <!-- MODAL 1-->
    <div class="modal" id="whyInfoNeededModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Why is this information needed?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body modal-lg text-center">
            <h4 class="mb-4">We require the names and dates of birth for all guests to ensure that all customers receive the correct items from an order.</h4>
            <h4 class="mb-4">This will allow us to save you time for your next purchase.</h4>
            <h4 class="mb-4">With this in mind, if you need to alter the name or date of birth for a “Guest” from a previous order, please create a new one with the correct information.</h4>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- MODAL 2 -->
    <div class="modal" id="wtpExampleModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Where's my WTP Number?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body modal-lg text-center">
            <p>REMEMBER TO CHECK YOUR SPAM AND JUNK EMAIL FOLDERS IF YOUR RECEIPT IS MISSING</p>
            <img src="/assets/img/wtpexample.jpeg" class="img-fluid my-3" alt="Where is my WTP number">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- MODALS END-->
  </div>
  <div class="d-flex py-5 justify-content-center" v-else>
    <n-spin size="large" />
  </div>
</template>

<script>
import { ref } from 'vue';
import _ from 'lodash';
import {
  NForm,
  NSelect,
  NInput,
  NFormItem,
  NButton,
  NUpload,
  NSpin,
} from 'naive-ui';
// COMPOSABLES
import useCheckout from '@/composables/useCheckout';
import useAuth from '@/composables/useAuth';
// COMPONENTS
import SubProduct from '@/components/chute/checkout/step1/SubProduct.vue';
import CartInfo from '@/components/chute/checkout/CartInfo.vue';
import paths from '@/shared/constants/paths';

export default {
  setup() {
    const {
      step1,
      currentStep,
      checkingStepFilledData,
      loadingProductsandGuestsInformation,
      getProductsandGuestsInformation,
      saveProductsandGuestsInformation,
      setProductsandGuestsInformation,
      updateCurrentStep,
    } = useCheckout();

    const {
      isLoggedIn
    } = useAuth();

    return {
      processingStep: ref(false),
      stepError: ref(''),

      step1,
      currentStep,
      checkingStepFilledData,
      loadingProductsandGuestsInformation,
      getProductsandGuestsInformation,
      saveProductsandGuestsInformation,
      setProductsandGuestsInformation,
      updateCurrentStep,

      isLoggedIn,
    };
  },
  components: {
    NForm,
    NSelect,
    NInput,
    NFormItem,
    NButton,
    NUpload,
    NSpin,

    SubProduct,
    CartInfo,
  },
  mounted() {
    this.getProductsandGuestsInformation({}, (success, data) => {
      if (success) {
        if (data.Products?.length === 0) {
          window.location.href = paths.homePage;

          return;
        }

        this.setProductsandGuestsInformation(data);
        this.setProductInfo(data);
      }
    });
  },
  methods: {
    isProductInfoFilled(product, productIndex) {
      const pInfoFilled = this.productsInfoFilled[`product_${productIndex}`];
      const pInfo = this.productsInfo[`product_${productIndex}`];

      if (product.SubProducts.length === 0) {
        return pInfoFilled.guest && pInfoFilled.ext && pInfo.ageRestricted !== true;
      }

      let isFilled = true;
      product.SubProducts.forEach((sp, spIndex) => {
        const spInfoFilled = pInfoFilled[`subProduct_${spIndex}`];
        const spInfo = pInfoFilled[`subProduct_${spIndex}`];

        if (isFilled) {
          isFilled = spInfoFilled.guest && spInfoFilled.ext && spInfo.ageRestricted !== true;
        }
      });

      return isFilled;
    },
    setProductInfo(data) {
      const productsInfo = {};

      if (!data.Products || data.Products.length === 0) {
        return productsInfo;
      }

      // const guestsWithoutBirthDate = [];
      for (let product of data.Products) {
        const selectedGuest =  _.find(this.guests,  { GuestNo: product.GuestNo });
        const pInfo = {
          guest: selectedGuest ? selectedGuest.ID : null,
          guestFields: {},
          ageRestricted: null,
          hasWtpField: false,
          hasValidWtpField: false,
          wtpGuests: [],
        };

        for (let guestField of this.guestFields[0].Fields) {
          if (selectedGuest) {
            const parameter = _.find(selectedGuest.Parameters, { 0: guestField[3] });

            let parameterValue = parameter ? parameter[2] : null;
            if (guestField[4] === 'Date') {
              parameterValue = parameterValue ? moment(parameterValue, "MM-DD-YYYY").unix() : null;
            }

            pInfo.guestFields[guestField[3]] = parameterValue;

            continue;
          }

          pInfo.guestFields[guestField[3]] = null;
        }

        if (product.Ext.length > 0) {
          for (let ef of product.Ext) {
            if (ef[0] === 'axesswtp') {
              pInfo.hasWtpField = true;
              pInfo[`ext_${ef[0]}_select`] = null;
            }

            pInfo[`ext_${ef[0]}`] = ef[5] || null;
          }
        }

        if (product.SubProducts.length > 0) {
          for (let subProduct of product.SubProducts) {
            const selectedGuestSp =  _.find(this.guests,  { GuestNo: product.GuestNo });
            const spInfo = {
              guest: selectedGuestSp ? selectedGuestSp.ID : null,
              guestFields: {},
              ageRestricted: null,
              hasWtpField: false,
              hasValidWtpField: false,
              wtpGuests: [],
            };

            for (let guestField of this.guestFields[0].Fields) {
              if (selectedGuestSp) {
                const parameter = _.find(selectedGuestSp.Parameters, { 0: guestField[3] });

                let parameterValue = parameter ? parameter[2] : null;
                if (guestField[4] === 'Date') {
                  parameterValue = parameterValue ? moment(parameterValue, "MM-DD-YYYY").unix() : null;
                }

                spInfo.guestFields[guestField[3]] = parameterValue;

                continue;
              }

              spInfo.guestFields[guestField[3]] = null;
            }

            if (subProduct.Ext.length > 0) {
              for (let ef of subProduct.Ext) {
                if (ef[0] === 'axesswtp') {
                  spInfo.hasWtpField = true;
                  spInfo[`ext_${ef[0]}_select`] = null;
                }

                spInfo[`ext_${ef[0]}`] = ef[5] || null;
              }
            }

            pInfo[`subProduct_${subProduct.ID}`] = spInfo;
          }
        }

        productsInfo[`product_${product.ID}`] = pInfo;
      }

      this.$store.dispatch('checkout/updateStep', {
        step: 'step1',
        field: 'productsInfo',
        value: productsInfo,
      }).then(() => {
        this.checkingStepData();
      });
    },
    checkingStepData() {
      const pInfoFilledDetail = {};
      let skipStep = true;
      this.products.forEach((p, pIndex) => {
        const pInfo = this.productsInfo[`product_${pIndex}`];
        const pInfoFilled = {
          guest: false,
          ext: false,
        }

        if (p.Ext.length > 0) {
          let pExtFilled = true;

          p.Ext.forEach((pExt) => {
            if (pInfo[`ext_${pExt[0]}`] === null && pExt[4] === 'True') {
              pExtFilled = false;
            }
          });

          pInfoFilled.ext = pExtFilled;
        } else {
          pInfoFilled.ext = true;
        }

        pInfoFilled.guest = isNaN(parseInt(pInfo.guest)) ? false : pInfo.guest >= 0;

        if (p.SubProducts.length === 0) {
          if (skipStep) {
            skipStep = pInfoFilled.guest && pInfoFilled.ext;
          }
          pInfoFilledDetail[`product_${pIndex}`] = pInfoFilled;
          return;
        }

        p.SubProducts.forEach((sp, spIndex) => {
          const spInfo = pInfo[`subProduct_${spIndex}`];
          const spInfoFilled = {
            guest: false,
            ext: false,
          };

          if (sp.Ext.length > 0) {
            let spExtFilled = true;

            sp.Ext.forEach((spExt) => {
              if (spInfo[`ext_${spExt[0]}`] === null && spExt[4] === 'True') {
                spExtFilled = false;
              }
            });

            spInfoFilled.ext = spExtFilled;
          } else {
            spInfoFilled.ext = true;
          }

          spInfoFilled.guest = isNaN(parseInt(spInfo.guest)) ? false : spInfo.guest >= 0;

          if (skipStep) {
            skipStep = spInfoFilled.guest && spInfoFilled.ext;
          }
          pInfoFilled[`subProduct_${spIndex}`] = spInfoFilled;
        });

        pInfoFilledDetail[`product_${pIndex}`] = pInfoFilled;
      });

      pInfoFilledDetail.skipStep = skipStep;

      this.$store.dispatch('checkout/updateStep', {
        step: 'step1',
        field: 'productsInfoFilled',
        value: pInfoFilledDetail,
      }).then(() => {
        this.checkingStepFilledData = false;

        if (skipStep) {
          this.updateCurrentStep({ currentStep: this.currentStep + 1 });
        }
      });
    },
    getSubproducts(product) {
      if (product.SubProducts.length === 0) {
        return [
          {
            ProductID: product.ProductID,
            Ext: product.Ext,
            parent: 0,
            DCI: product.DCI
          }
        ];
      }

      return product.SubProducts;
    },
    goToNextStep() {
      const hasSelectedDateTodayOrYester = (date) => {

        const isToday = moment.unix(date).format("MM-DD-YYYY") === moment().format("MM-DD-YYYY");
        const isYesterday = moment.unix(date).format("MM-DD-YYYY") === moment().subtract(1, 'days').format("MM-DD-YYYY");

        return isToday || isYesterday;
      }

      this.stepError = '';

      this.$refs.checkoutStep1FormRef.validate((errors) => {
        if (errors) {
          this.stepError = 'Please complete all the required fields.';
          console.log(errors);
          return;
        }

        this.processingStep = true;

        const data = _.cloneDeep(this.step1.productsandGuestsInformation);
        let hasValidWtps = true;
        let hasValidDobs = true;

        for (let product of data.Products) {
          const currentProductInfo = this.productsInfo[`product_${product.ID}`];

          if (
            currentProductInfo[`ext_axesswtp`] &&
            currentProductInfo.hasWtpField &&
            !currentProductInfo.hasValidWtpField
          ) {
            hasValidWtps = false;
          }
          if (currentProductInfo.ageRestricted === true) {
            hasValidDobs = false;
          }

          const productGuest = _.find(data.Guests, { ID: currentProductInfo.guest });

          if (productGuest && product.SubProducts.length === 0) {
            const productGuestBirthDate = _.find(productGuest.Parameters, {0: 'birth_date'});
            if (
              productGuestBirthDate &&
              (!productGuestBirthDate[2] || !this.isLoggedIn) &&
              currentProductInfo.guestFields.birth_date &&
              !hasSelectedDateTodayOrYester(currentProductInfo.guestFields.birth_date)
            ) {
              productGuestBirthDate[2] = moment.unix(currentProductInfo.guestFields.birth_date).format("MM-DD-YYYY");
            }

            if (productGuest.ID === -1) {
              const newGuest = this.createNewGuest(currentProductInfo.guestFields);
              data.Guests.push(newGuest);
              product.GuestNo = newGuest.ID;
            } else {
              product.GuestNo = productGuest.GuestNo;
            }
          }

          for (let ext of product.Ext) {
            ext[5] = currentProductInfo[`ext_${ext[0]}`] || ext[5];
          }

          for (let subProduct of  product.SubProducts) {
            const currentSubProductInfo = currentProductInfo[`subProduct_${subProduct.ID}`]

            if (
              currentSubProductInfo[`ext_axesswtp`] &&
              currentSubProductInfo.hasWtpField &&
              !currentSubProductInfo.hasValidWtpField
            ) {
              hasValidWtps = false;
            }
            if (currentSubProductInfo.ageRestricted === true) {
              hasValidDobs = false;
            }

            const subProductGuest = _.find(data.Guests, { ID: currentSubProductInfo.guest });
            if (subProductGuest) {
              const subProductGuestBirthDate = _.find(subProductGuest.Parameters, {0: 'birth_date'});
              if (
                subProductGuestBirthDate &&
                (!subProductGuestBirthDate[2] || !this.isLoggedIn) &&
                currentSubProductInfo.guestFields.birth_date &&
                !hasSelectedDateTodayOrYester(currentSubProductInfo.guestFields.birth_date)
              ) {
                subProductGuestBirthDate[2] = moment.unix(currentSubProductInfo.guestFields.birth_date)
                  .format("MM-DD-YYYY");
              }

              if (subProductGuest.ID === -1) {
                const newGuestSp = this.createNewGuest(currentSubProductInfo.guestFields);
                data.Guests.push(newGuestSp);
                subProduct.GuestNo = newGuestSp.ID;
              } else {
                subProduct.GuestNo = subProductGuest.GuestNo;
              }
            }

            for (let ext of subProduct.Ext) {
              ext[5] = currentSubProductInfo[`ext_${ext[0]}`] || ext[5];
            }
          }
        }

        if (!hasValidWtps) {
          this.processingStep = false;
          this.stepError = 'Please provide valid WTP number';
          return;
        }

        if (!hasValidDobs) {
          this.processingStep = false;
          this.stepError = 'Please provide valid DOB for selected guests';
          return;
        }

        this.saveProductsandGuestsInformation({ data }, (success, result) => {
          this.processingStep = false;

          if (success) {
            if (!result) {
              this.stepError = 'Something went wrong. Please try again later.';
              return;
            }

            this.updateCurrentStep({ currentStep: this.currentStep + 1 });
          }
        });
      })
    },
    getMaxGuestIndexId() {
      let max = -1;

      for (let guest of this.step1.productsandGuestsInformation.Guests) {
        if (guest.ID > max) {
          max = guest.ID;
        }
      }

      return max + 1;
    },
    createNewGuest(guestFieldVals) {
      const Parameters = [];
      for (let field of this.step1.productsandGuestsInformation.Guestfields[0].Fields) {
        let value = guestFieldVals[field[3]];
        if (value && field[4] === 'Date') {
          value = moment.unix(value).format("MM-DD-YYYY");
        }

        Parameters.push([
          field[3],
          field[2],
          value,
        ]);
      }

      const maxId = this.getMaxGuestIndexId();

      const newGuest = {
        Selected: true,
        Enabled: true,
        GuestNo: maxId,
        Parameters,
        ID: maxId,
      };

      return newGuest;
    },
  },
  computed: {
    rules() {
      const rules = {};

      if (!this.products || this.products.length === 0) {
        return rules;
      }

      for (let product of this.products) {
        const pRule = {
          guest: [
            {
              type: 'number',
              required: true,
              message: 'This field is required',
              trigger: ['blur', 'change'],
            }
          ],
          guestFields: {},
        };

        for (let guestField of this.guestFields[0].Fields) {
          if (guestField[5] === 'True') {
            pRule.guestFields[guestField[3]] = [{
              type: guestField[4] === 'Date' ? 'number' : 'string',
              required: true,
              message: 'This field is required',
              trigger: ['input', 'blur',],
            }];
          }
        }

        if (product.Ext.length > 0) {
          for (let ef of product.Ext) {
            pRule[`ext_${ef[0]}`] = [];

            if (ef[4] === 'True') {
              pRule[`ext_${ef[0]}`].push({
                type: ef[1] === 'Date' ? 'number' : 'string',
                required: true,
                message: 'This field is required',
                trigger: ['input', 'blur',],
              });
            }
          }
        }

        if (product.SubProducts.length > 0) {
          for (let subProduct of product.SubProducts) {

            const spRule = {
              guest: [
                {
                  type: 'number',
                  required: true,
                  message: 'This field is required',
                  trigger: ['blur', 'change'],
                }
              ],
              guestFields: {},
            };

            for (let guestField of this.guestFields[0].Fields) {
              if (guestField[5] === 'True') {
                spRule.guestFields[guestField[3]] = [{
                  type: guestField[4] === 'Date' ? 'number' : 'string',
                  required: true,
                  message: 'This field is required',
                  trigger: ['input', 'blur'],
                }];
              }
            }

            if (subProduct.Ext.length > 0) {
              for (let ef of subProduct.Ext) {
                spRule[`ext_${ef[0]}`] = []

                if (ef[4] === 'True') {
                  spRule[`ext_${ef[0]}`].push({
                    type: ef[1] === 'Date' ? 'number' : 'string',
                    required: true,
                    message: 'This field is required',
                    trigger: ['input', 'blur'],
                  });
                }
              }
            }

            pRule[`subProduct_${subProduct.ID}`] = spRule;
          }
        }

        rules[`product_${product.ID}`] = pRule;
      }

      return rules;
    },
    products() {
      if (!this.step1?.productsandGuestsInformation?.Products) {
        return [];
      }

      return this.step1.productsandGuestsInformation.Products;
    },
    productsInfo() {
      return this.step1.productsInfo;
    },
    productsInfoFilled() {
      return this.step1.productsInfoFilled;
    },
    guestFields() {
      return this.step1?.productsandGuestsInformation?.Guestfields || [];
    },
    guests() {
      return this.step1?.productsandGuestsInformation?.Guests || [];
    },
  },
}
</script>

<style lang="scss">
.chute-checkout-step1-cpt {
  &-product-card {
    border-radius: 0;

    > .card-header {
      background-color: #003865;
      color: #fff;
      padding: 25px;
      border-radius: 0;
      font-family: 'rift-soft', Impact, sans-serif;
      font-size: 1.5rem;
    }
  }

  &-product-card-info {
    border-radius: 0;

    > .card-header {
      background-color: #003865;
      color: #fff;
      border-radius: 0;
      font-family: 'rift-soft', Impact, sans-serif;
      font-size: 1.25rem;
    }
    .n-form-item-label {
      font-weight: 700;
    }
  }
}
</style>
