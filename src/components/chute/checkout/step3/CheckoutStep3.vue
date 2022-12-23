<template>
  <div class="chute-checkout-step3-cpt">
    <div class="d-flex justify-content-center">
      <n-button
        class="chute-checkout-step3-cpt__scroll-to-agree-btn"
        type="primary"
        @click="scrollToAgree">SCROLL TO READ AND ACCEPT TERMS & CONDITIONS</n-button>
    </div>
    <div class="row">
      <div class="text-center my-5">
        <strong>TERMS, CONDITIONS, RELEASE LIABILITIES</strong><br>
       <strong>All online orders are final and non-refundable.</strong>
      </div>
      <div>
        <!-- TERMS HEADER -->
        <div v-if="termsHeader" v-html="termsHeader"></div>
        <!-- TERMS PRODUCTS -->
        <div v-for="termsProduct in termsProducts" :key="termsProduct.ID">
          <div v-html="termsProduct.Terms"></div>
        </div>
        <!-- TERMS FOOTER -->
        <div v-if="termsFooter" v-html="termsFooter"></div>
        <div class="row justify-content-center text-center">
          <div class="col-12 col-sm-8" id="accept-button">
            <div class="checkbox">
              <label for="chkIHaveReadAndAccept">
                <input type="checkbox" id="chkIHaveReadAndAccept" v-model="acceptTerms" class="chkIHaveReadAndAccept"> I HAVE READ AND ACCEPT THE TERMS &amp; CONDITIONS
              </label>
            </div>
          </div>
        </div>
        <div class="my-3 alert alert-danger" v-if="stepErrorMsg?.length > 0">
          {{stepErrorMsg}}
        </div>
        <div class="col-12 d-flex justify-content-between mt-5">
          <n-button type="primary" @click="goToPrevStep">Previous</n-button>
          <n-button :loading="processingStep" :disabled="processingStep" type="primary" @click="goToNextStep">Next</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NButton } from 'naive-ui';
import { ref } from 'vue';
import _ from 'lodash';
// COMPOSABLES
import useCheckout from '@/composables/useCheckout';
import useStore from '@/composables/useStore';

export default {
  components: {
    NButton,
  },
  setup() {
    const {
      currentStep,
      updateCurrentStep,
    } = useCheckout();

    const { getTermsByCartID } = useStore();

    return {
      termsData: ref(null),
      acceptTerms: ref(false),
      stepErrorMsg: ref(false),
      processingStep: ref(false),

      currentStep,
      updateCurrentStep,

      getTermsByCartID,
    };
  },
  mounted() {
    this.getTermsByCartID((success, data) => {
      if (success) {
        this.termsData = data;
      }

      const el = document.querySelector('.chute-checkout-step3-cpt__scroll-to-agree-btn');
      el.scrollIntoView(true);
    });
  },
  computed: {
    termsHeader() {
      if (!this.termsData) {
        return null;
      }

      const header = _.find(this.termsData, {Type: 'Header'});

      return header?.Terms;
    },
    termsFooter() {
      if (!this.termsData) {
        return null;
      }

      const footer = _.find(this.termsData, {Type: 'Footer'});

      return footer?.Terms;
    },
    termsProducts() {
      if (!this.termsData) {
        return null;
      }

      const products = _.filter(this.termsData, {Type: 'ProductType'});

      return products ? products : [];
    },
  },
  methods: {
    scrollToAgree() {
      const el = document.getElementById('chkIHaveReadAndAccept');
      el.scrollIntoView(false);
    },
    goToPrevStep() {
      this.updateCurrentStep({ currentStep: this.currentStep - 1 });
    },
    goToNextStep() {
      this.stepErrorMsg = '';

      if (!this.acceptTerms) {
        this.stepErrorMsg = 'Please accept terms and conditions by clicking the checkbox.';

        return;
      }

      this.updateCurrentStep({ currentStep: this.currentStep + 1 });
    },
  },
}
</script>

<style lang="scss">
.chute-checkout-step3-cpt {
  &__scroll-to-agree-btn {
    background: #01365e;
    .n-button__content {
      color: #fff;
    }
  }
}
#accept-button {
   border: 3px solid #003865;
   .checkbox {
     margin: 0px;
     label {
      font-weight: 700;
      font-size: 1.75rem;
      padding: 2rem;
      line-height: 1;
      display: block;
      cursor: pointer;
      #chkIHaveReadAndAccept {
        margin-top: 0px;
        margin-left: -2rem;
        height: 1.75rem;
        width: 1.75rem;
        vertical-align: bottom;
        cursor: pointer;
      }
     }
   }
}
</style>
