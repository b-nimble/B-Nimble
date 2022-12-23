<template>
  <div class="chute-checkout-step2-cow-card-cpt">
    <h4>Apply COW Card(s)<sup>*</sup></h4>
    <n-form :model="cowCard" :rules="rules" ref="cowCardFormRef">
      <n-form-item path="cardNumber" label-placement="left" :label-width="200" label="Card Number" :show-require-mark="true" :label-props="{for: 'cowCard-cardNumber'}">
        <n-input
          :value="cowCard.cardNumber"
          placeholder=""
          @update:value="(v) => updateFieldVal(v, 'cardNumber')"
          :input-props="{for: 'cowCard-cardNumber'}"
        />
      </n-form-item>
      <n-form-item path="firstName" label-placement="left" :label-width="200" label="First Name" :show-require-mark="true" :label-props="{for: 'cowCard-firstName'}">
        <n-input
          :value="cowCard.firstName"
          placeholder=""
          @update:value="(v) => updateFieldVal(v, 'firstName')"
          :input-props="{for: 'cowCard-firstName'}"
        />
      </n-form-item>
      <n-form-item path="lastName" label-placement="left" :label-width="200" label="Last Name" :show-require-mark="true" :label-props="{for: 'cowCard-lastName'}">
        <n-input
          :value="cowCard.lastName"
          placeholder=""
          @update:value="(v) => updateFieldVal(v, 'lastName')"
          :input-props="{for: 'cowCard-lastName'}"
        />
      </n-form-item>
      <div class="alert alert-danger my-3" v-if="cowCardErrorMsg.length > 0">
        {{cowCardErrorMsg}}
      </div>
      <div class="d-flex justify-content-center">
        <n-button :loading="loading" type="primary" @click="addCowCard" :disabled="cart && cowCardsTotalBalanceApplied >= cart.Total">Apply COW Card</n-button>
      </div>
    </n-form>
    <!-- APPLIED COW CARDS -->
    <div class="chute-checkout-step2-cow-card-cpt__cowcards-applied mt-4" v-if="cowCardsApplied.length > 0">
      <div class="chute-checkout-step2-cow-card-cpt__cowcards-applied__header my-3">
        <div>
          Card Number
        </div>
        <div class="d-none d-sm-block">
          Available Balance
        </div>
        <div>
          Applied Balance
        </div>
        <div>
          Remaining Balance
        </div>
        <div>

        </div>
      </div>
      <div v-for="cowCardApplied in cowCardsApplied" class="chute-checkout-step2-cow-card-cpt__cowcards-applied__item my-3">
        <div>
          {{cowCardApplied.cardNumber}}
        </div>
        <div class="d-none d-sm-block">
          ${{cowCardApplied.balance}}
        </div>
        <div>
          ${{cowCardApplied.balanceApplied}}
        </div>
        <div>
          ${{cowCardApplied.balanceRemaining}}
        </div>
        <div>
          <n-button type="error" size="small" @click="() => removeCowCardApplied(cowCardApplied.cardNumber)">Delete</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NButton,
} from 'naive-ui';
import _ from 'lodash';
// COMPOSABLES
import useCheckout from '@/composables/useCheckout';
import useStore from '@/composables/useStore';
import { ref } from 'vue';

export default {
  components: {
    NForm,
    NFormItem,
    NInput,
    NSelect,
    NButton,
  },
  setup() {
    const {
      step2,
      updateStep2CowCard,
      applyCowCard,
      cowCardsTotalBalanceApplied,
      removeCowCard,
    } = useCheckout();

    const {
      cart,
      checkCowCardBalance,
    } = useStore();

    return {
      loading: ref(false),
      cowCardErrorMsg: ref(''),
      step2,
      cowCardsTotalBalanceApplied,
      cart,
      updateStep2CowCard,
      checkCowCardBalance,
      applyCowCard,
      removeCowCard,
    };
  },
  methods: {
    updateFieldVal(value, field) {
      this.updateStep2CowCard({
        field,
        value,
      });
    },
    removeCowCardApplied(cardNumber) {
      this.removeCowCard({ cardNumber });
    },
    addCowCard() {
      this.cowCardErrorMsg = '';

      const alreadyApplied = !!_.find(this.cowCardsApplied, {cardNumber: this.cowCard.cardNumber});
      if (alreadyApplied) {
        this.cowCardErrorMsg = 'Same COW CARD can\'t applied.';
        return;
      }

      this.$refs.cowCardFormRef.validate((errors) => {
        if (errors) {
          console.log(errors);
          return;
        }

        this.loading = true;
        this.checkCowCardBalance({
          params: {
            cardNumber: this.cowCard.cardNumber,
            lastName: this.cowCard.lastName,
          },
        }, (success, result) => {
          this.loading = false;

          if (!success) {
            this.cowCardErrorMsg = result.errorMsg;
            return;
          }

          if (!result.valid) {
            this.cowCardErrorMsg = result.msg;
            return;
          } else if (result.valid && result.balanceStatus === 0) {
            this.cowCardErrorMsg = 'COW Card balance is zero.';
            return;
          }

          const balanceApplied =  result.balanceStatus > this.cart.Total
            ? this.cart.Total : result.balanceStatus;

          const balanceRemaining = result.balanceStatus > this.cart.Total
            ? result.balanceStatus - this.cart.Total : 0;

          this.applyCowCard({
            cardNumber: this.cowCard.cardNumber,
            balance: result.balanceStatus,
            balanceApplied,
            balanceRemaining,
          }, () => {
            this.cowCard.cardNumber = '';
            this.cowCard.firstName = '';
            this.cowCard.lastName = '';
          });
        });
      });
    },
  },
  computed: {
    cowCard() {
      return this.step2.cowCard;
    },
    cowCardsApplied() {
      return this.step2.cowCardsApplied;
    },
    rules() {
      return {
        cardNumber: {
          required: true,
          message: 'This field is required',
          trigger: ['input', 'blur'],
        },
        firstName: {
          required: true,
          message: 'This field is required',
          trigger: ['input', 'blur'],
        },
        lastName: {
          required: true,
          message: 'This field is required',
          trigger: ['input', 'blur'],
        },
      };
    },
  },
}
</script>

<style lang="scss">
.chute-checkout-step2-cow-card-cpt {
  > h4 {
    padding: 10px 0;
    margin-bottom: 0;
    color: #003865;
    border-bottom: 1px solid #e5e5e5;
  }

  > form {
    margin-top: 30px !important;
    max-width: 600px;
    margin: auto;
  }

  &__cowcards-applied {
    &__header {
      border-bottom: 1px solid #e5e5e5;

      > div {
        font-weight: bold;
      }
    }

    &__header, &__item {
      display: flex;
      justify-content: between;

      > div {
        flex: 1;
        text-align: center;
      }
    }
  }
}
</style>
