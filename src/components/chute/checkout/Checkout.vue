<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="chute-checkout-cpt">
      <div class="chute-checkout-cpt-header">
        <div class="chute-checkout-cpt-header-title">Current Step:</div>
        <div class="progress mb-4">
          <!-- STEP 1 -->
          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%" v-if="currentStep === 1">Product Information</div>
          <!-- STEP 2 -->
          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 50%" v-else-if="currentStep === 2">Payment Information</div>
          <!-- STEP 3 -->
          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 70%" v-else-if="currentStep === 3">Terms and Conditions</div>
          <!-- STEP 4 -->
          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 80%" v-else-if="currentStep === 4">Verify Information</div>
          <!-- REMAINING -->
          <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" style="width: 10%"></div>
        </div>
      </div>
      <div class="chute-checkout-cpt-body">
        <checkout-step1 v-if="currentStep === 1" />
        <checkout-step2 v-if="currentStep === 2" />
        <checkout-step3 v-if="currentStep === 3" />
        <checkout-step4 v-if="currentStep === 4" />
      </div>
    </div>
  </n-config-provider>
</template>

<script>
import { NConfigProvider } from "naive-ui";
import { mapGetters } from "vuex";
// COMPONENTS
import CheckoutStep1 from "@/components/chute/checkout/step1/CheckoutStep1.vue";
import CheckoutStep2 from "@/components/chute/checkout/step2/CheckoutStep2.vue";
import CheckoutStep3 from "@/components/chute/checkout/step3/CheckoutStep3.vue";
import CheckoutStep4 from "@/components/chute/checkout/step4/CheckoutStep4.vue";
// COMPOSABLES
import useCheckout from '@/composables/useCheckout';

export default {
  components: {
    NConfigProvider,
    CheckoutStep1,
    CheckoutStep2,
    CheckoutStep3,
    CheckoutStep4,
  },
  setup() {
    const { currentStep } = useCheckout();

    return {
      currentStep,
    };
  },
  computed: {
    ...mapGetters(['themeOverrides']),
  },
}
</script>

<style lang="scss">
.progress-bar {
    background-color: #003865;
}
.chute-checkout-cpt {
  &-header {
    &-title {
      font-size: 2.25rem;
      font-weight: 700;
      color: #003865;
      font-family: 'rift-soft', Impact, sans-serif;
    }
  }
}
</style>
