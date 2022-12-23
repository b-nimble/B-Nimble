<template>
  <div class="chute-checkout-step2-credit-card-cpt">
    <h4>Enter your Credit Card information*</h4>
    <n-form :model="creditCard" :rules="rules" ref="checkoutStep2CreditCardFormRef">
      <n-form-item path="nameOnCard" label-placement="left" :label-width="200" label="Name On Card" :show-require-mark="true" :label-props="{for: 'creditCard-nameOnCard'}">
        <n-input
          :value="creditCard.nameOnCard"
          placeholder=""
          @update:value="(v) => updateFieldVal(v, 'nameOnCard')"
          :input-props="{for: 'creditCard-nameOnCard'}"
        />
      </n-form-item>
      <n-form-item path="cardType" label-placement="left" :label-width="200" label="Card Type" :show-require-mark="true" :label-props="{for: 'creditCard-cardType'}">
        <n-select
          :value="creditCard.cardType"
          placeholder=""
          :options="cardTypes"
          @update:value="(v) => updateFieldVal(v, 'cardType')"
          :input-props="{for: 'creditCard-cardType'}"
        />
      </n-form-item>
      <n-form-item path="cardNumber" label-placement="left" :label-width="200" label="Credit Card Number" :show-require-mark="true" :label-props="{for: 'creditCard-cardNumber'}">
        <n-input
          class="chute-checkout-step2-credit-card-cpt__form__cardnumber-input"
          :value="creditCard.cardNumber"
          placeholder=""
          @update:value="(v) => updateFieldVal(v, 'cardNumber')"
          :input-props="{for: 'creditCard-cardNumber'}"
        />
      </n-form-item>
      <n-form-item path="verificationCode" label-placement="left" :label-width="200" label="Credit Card Verfication Code" :show-require-mark="true" :label-props="{for: 'creditCard-verificationCode'}">
        <n-input
          :value="creditCard.verificationCode"
          placeholder=""
          @update:value="(v) => updateFieldVal(v, 'verificationCode')"
          :input-props="{for: 'creditCard-verificationCode'}"
        />
      </n-form-item>
      <div class="d-flex justify-content-between">
        <n-form-item path="expirationMonth" class="flex-grow-1 me-2" label-placement="left" :label-width="200" label="Expiration Date" :show-require-mark="true" :label-props="{for: 'creditCard-expirationMonth'}">
          <n-select
            :value="creditCard.expirationMonth"
            placeholder=""
            :options="monthOptions"
            @update:value="(v) => updateFieldVal(v, 'expirationMonth')"
            :filterable="true"
            :input-props="{for: 'creditCard-expirationMonth'}"
          />
        </n-form-item>
        <n-form-item path="expirationYear" label-placement="left" :label-width="200" label="" :show-require-mark="true" :label-props="{for: 'creditCard-expirationYear'}">
          <n-select
            :value="creditCard.expirationYear"
            placeholder=""
            :options="yearOptions"
            @update:value="(v) => updateFieldVal(v, 'expirationYear')"
            :filterable="true"
            :input-props="{for: 'creditCard-expirationYear'}"
          />
        </n-form-item>
      </div>
    </n-form>
  </div>
</template>

<script>
import {
  NForm,
  NFormItem,
  NInput,
  NSelect,
} from 'naive-ui';

import useCheckout from '@/composables/useCheckout';
import cardTypes from '@/shared/constants/cardTypes';
import Inputmask from 'inputmask';

export default {
  components: {
    NForm,
    NFormItem,
    NInput,
    NSelect,
  },
  setup() {
    const {
      step2,
      updateStep2CreditCard,
    } = useCheckout();

    return {
      step2,
      updateStep2CreditCard,
    };
  },
  mounted() {
    setTimeout(() => {
      const im = new Inputmask('9999-9999-9999-9999');

      document.querySelectorAll('.chute-checkout-step2-credit-card-cpt__form__cardnumber-input input')
        .forEach((el) => {
          im.mask(el);
        });
    }, 1000);
  },
  methods: {
    updateFieldVal(value, field) {
      this.updateStep2CreditCard({
        field,
        value,
      });
    },
  },
  computed: {
    creditCard() {
      return this.step2.creditCard;
    },
    cardTypes() {
      return cardTypes;
    },
    rules() {
      return {
        nameOnCard: [{
          required: true,
          message: 'This field is required',
          trigger: ['input', 'blur'],
        }],
        cardType: [{
          required: true,
          message: 'This field is required',
          trigger: ['blur', 'change'],
        }],
        cardNumber: [{
          required: true,
          message: 'This field is required',
          trigger: ['input', 'blur'],
        }],
        verificationCode: [{
          required: true,
          message: 'This field is required',
          trigger: ['input', 'blur'],
        }],
        expirationMonth: [{
          message: 'This field is required',
          trigger: ['blur', 'change'],
        }],
        expirationYear: [{
          message: 'This field is required',
          trigger: ['blur', 'change'],
        }],
      };
    },
    monthOptions() {
      return [
        {
          label: 'MONTH',
          value: '',
        },
        {
          label: 'JAN',
          value: '01',
        },
        {
          label: 'FEB',
          value: '02',
        },
        {
          label: 'MAR',
          value: '03',
        },
        {
          label: 'APR',
          value: '04',
        },
        {
          label: 'MAY',
          value: '05',
        },
        {
          label: 'JUN',
          value: '06',
        },
        {
          label: 'JUL',
          value: '07',
        },
        {
          label: 'AUG',
          value: '08',
        },
        {
          label: 'SEP',
          value: '09',
        },
        {
          label: 'OCT',
          value: '10',
        },
        {
          label: 'NOV',
          value: '11',
        },
        {
          label: 'DEC',
          value: '12',
        },
      ];
    },
    yearOptions() {
      const years = [{
        label: 'YEAR',
        value: '',
      }];
      const currentYear = (new Date()).getFullYear();

      for (let i = currentYear; i <= currentYear + 9; i++) {
        years.push({
          label: i,
          value: `${i}`,
        });
      }

      return years;
    },
  },
}
</script>

<style lang="scss">
.chute-checkout-step2-credit-card-cpt {
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
}
</style>
