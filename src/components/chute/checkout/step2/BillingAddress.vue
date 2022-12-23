<template>
  <div class="chute-checkout-step2-billing-address-cpt">
    <h4>Billing Address</h4>
    <n-form :model="billingAddress" :rules="rules" ref="checkoutStep2BillingFormRef">
      <n-form-item path="firstName" label-placement="left" :label-width="200" label="First Name" :show-require-mark="true" :label-props="{for: 'billingAddress-firstName'}">
        <n-input
          :input-props="{id: 'billingAddress-firstName'}"
          :value="billingAddress.firstName"
          placeholder=""
          @update:value="(v) => updateFieldVal(v, 'firstName')"
        />
      </n-form-item>
      <n-form-item path="lastName" label-placement="left" :label-width="200" label="Last Name" :show-require-mark="true" :label-props="{for: 'billingAddress-lastName'}">
        <n-input
          :input-props="{id: 'billingAddress-lastName'}"
          :value="billingAddress.lastName"
          placeholder=""
          @update:value="(v) => updateFieldVal(v, 'lastName')"
        />
      </n-form-item>
      <n-form-item path="street1" label-placement="left" :label-width="200" label="Address 1" :show-require-mark="true" :label-props="{for: 'billingAddress-street1'}">
        <n-input
          :input-props="{id: 'billingAddress-street1'}"
          :value="billingAddress.street1"
          placeholder=""
          @update:value="(v) => updateFieldVal(v, 'street1')"
        />
      </n-form-item>
      <n-form-item path="street2" label-placement="left" :label-width="200" label="Address 2" :label-props="{for: 'billingAddress-street2'}">
        <n-input
          :input-props="{id: 'billingAddress-street2'}"
          :value="billingAddress.street2"
          placeholder=""
          @update:value="(v) => updateFieldVal(v, 'street2')"
        />
      </n-form-item>
      <n-form-item path="city" label-placement="left" :label-width="200" label="City" :show-require-mark="true" :label-props="{for: 'billingAddress-city'}">
        <n-input
          :input-props="{id: 'billingAddress-city'}"
          :value="billingAddress.city"
          placeholder=""
          @update:value="(v) => updateFieldVal(v, 'city')"
        />
      </n-form-item>
      <n-form-item path="state" label-placement="left" :label-width="200" label="State" :show-require-mark="true" :label-props="{for: 'billingAddress-state'}">
        <n-select
          :input-props="{id: 'billingAddress-state'}"
          :value="billingAddress.state"
          placeholder=""
          :options="stateOptions"
          @update:value="(v) => updateFieldVal(v, 'state')"
          :filterable="true"
        />
      </n-form-item>
      <n-form-item path="zip" label-placement="left" :label-width="200" label="Zip" :show-require-mark="true" :label-props="{for: 'billingAddress-zip'}">
        <n-input
          :input-props="{id: 'billingAddress-zip'}"
          :value="billingAddress.zip"
          placeholder=""
          @update:value="(v) => updateFieldVal(v, 'zip')"
        />
      </n-form-item>
      <n-form-item class="phone-type-field" path="phone1" label-placement="left" :label-width="200" label="Cell Phone" :show-require-mark="true" :label-props="{for: 'billingAddress-phone1'}">
        <n-input
          :input-props="{id: 'billingAddress-phone1'}"
          :value="billingAddress.phone1"
          placeholder=""
          @update:value="(v) => updateFieldVal(v, 'phone1')"
        />
      </n-form-item>
      <n-form-item label-placement="left" :label-width="200" label=" ">
        <n-checkbox
          :checked="billingAddress.sameAsShipping"
          @update:checked="(v) => updateFieldVal(v, 'sameAsShipping')">
          Billing Address same as Shipping Address
        </n-checkbox>
      </n-form-item>
    </n-form>
  </div>
</template>

<script>
import {
  NForm,
  NFormItem,
  NInput,
  NCheckbox,
  NSelect,
} from 'naive-ui';
import useCheckout from '@/composables/useCheckout';
import useHelper from '@/composables/useHelper';

export default {
  components: {
    NForm,
    NFormItem,
    NInput,
    NCheckbox,
    NSelect,
  },
  setup() {
    const {
      step2,
      updateStep2BillingAddress,
      updateStep2ShippingAddress,
      getDefaultBilling,
    } = useCheckout();

    const {
      stateOptions,
    } = useHelper();

    return {
      step2,
      getDefaultBilling,
      updateStep2BillingAddress,
      updateStep2ShippingAddress,

      stateOptions,
    };
  },
  mounted() {
    this.initBillingAddress();
  },
  methods: {
    updateFieldVal(value, field) {
      this.updateStep2BillingAddress({
        field,
        value,
        changed: true,
      });
    },
    initBillingAddress() {
      this.getDefaultBilling({}, (success, address) => {
        if (!success || !address) {
          return;
        }

        this.updateStep2BillingAddress({
          field: 'addressId',
          value: address.AddressID,
        });
        if (this.shippingAddress.addressId && this.shippingAddress.addressId === address.AddressID) {
          this.updateStep2BillingAddress({
            field: 'sameAsShipping',
            value: true,
          });
        }
        this.updateStep2BillingAddress({
          field: 'firstName',
          value: address.FirstName,
        });
        this.updateStep2BillingAddress({
          field: 'lastName',
          value: address.LastName,
        });
        this.updateStep2BillingAddress({
          field: 'street1',
          value: address.Street1,
        });
        this.updateStep2BillingAddress({
          field: 'street2',
          value: address.Street2,
        });
        this.updateStep2BillingAddress({
          field: 'state',
          value: address.State,
        });
        this.updateStep2BillingAddress({
          field: 'city',
          value: address.City,
        });
        this.updateStep2BillingAddress({
          field: 'zip',
          value: address.Zip,
        });
        this.updateStep2BillingAddress({
          field: 'phone1',
          value: address.Phone1,
        });

        const phoneMask = new Inputmask('(999) 999-9999');
        document.querySelectorAll('.phone-type-field input').forEach((el) => {
          phoneMask.mask(el);
        });
      });
    },
  },
  computed: {
    billingAddress() {
      return this.step2.billingAddress;
    },
    shippingAddress() {
      return this.step2.shippingAddress;
    },
    rules() {
      return {
        firstName: [
          {
            required: true,
            message: 'This field is required',
            trigger: ['input', 'blur'],
          },
        ],
        lastName: [
          {
            required: true,
            message: 'This field is required',
            trigger: ['input', 'blur'],
          },
        ],
        street1: [
          {
            required: true,
            message: 'This field is required',
            trigger: ['input', 'blur'],
          },
        ],
        city: [
          {
            required: true,
            message: 'This field is required',
            trigger: ['input', 'blur'],
          },
        ],
        state: [
          {
            required: true,
            message: 'This field is required',
            trigger: ['input', 'blur'],
          },
        ],
        zip: [
          {
            required: true,
            message: 'This field is required',
            trigger: ['input', 'blur'],
          },
        ],
        phone1: [
          {
            trigger: ['input', 'blur'],
            required: true,
            message: 'This field is required',
          },
        ],
      };
    },
  },
}
</script>

<style lang="scss">
.chute-checkout-step2-billing-address-cpt {
  > h4 {
    padding: 10px 0;
    margin-bottom: 0;
    color: #003865;
    border-bottom: 1px solid #e5e5e5;
  }

  form {
    margin-top: 30px !important;
    max-width: 600px;
    margin: auto;
  }
}
</style>
