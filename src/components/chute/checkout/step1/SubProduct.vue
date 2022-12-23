<template>
  <div class="card chute-checkout-step1-cpt-product-card-info">
    <div class="card-header">
      Guest Information
    </div>
    <div class="card-body">
      <div v-if="!isParentProduct">
        <div>Guest Products:</div>
        <div v-html="subProduct.ProductName"></div>
      </div>
      <!-- GUEST FIELDS -->
      <div :class="{'select-guest': true, 'd-none': currentInfoFilled.guest && currentInfo.ageRestricted !== true}">
        <n-form-item label="" :show-require-mark="true" :path="`${currentInfoPath}.guest`" :label-props="{for: makeUniqueAttr('guest') }">
          <n-select
            :value="currentInfo.guest"
            placeholder="Please select guest"
            :options="guests"
            :disabled="subProduct.setdefaultguest"
            @update:value="(v) => updateGuestVal(v)"
            :filterable="true"
            :input-props="{id: makeUniqueAttr('guest') }"/>
        </n-form-item>
        <div class="select-guest-fields" v-if="guestFields.length > 0">
          <div
            class="select-guest-field"
            v-for="field in guestFields"
            :key="field.ID">
            <div v-if="field.type === 'TextBox' && !field.hide">
              <n-form-item :label="field.label" :show-require-mark="field.required" :path="`${currentInfoPath}.guestFields.${field.name}`" :label-props="{for: makeUniqueAttr(`${field.name}-guest-field`) }">
                <n-input
                  :value="currentInfo.guestFields[field.name]"
                  :placeholder="field.label"
                  :disabled="field.disabled"
                  @update:value="(v) => updateGuestFieldsVal(v, field)"
                  :input-props="{id: makeUniqueAttr(`${field.name}-guest-field`) }"
                />
              </n-form-item>
            </div>
            <div v-else-if="field.type === 'Date' && !field.hide">
              <n-form-item :label="field.label" :show-require-mark="field.required" :path="`${currentInfoPath}.guestFields.${field.name}`">
                <chute-date-picker
                  :disabled="field.disabled || (field.name === 'birth_date' && checkGuestHasExistingBirthDate) || disabledBirthDateFieldValueForCommonGuest !== false"
                  :value="disabledBirthDateFieldValueForCommonGuest !== false ? disabledBirthDateFieldValueForCommonGuest : currentInfo.guestFields[field.name]"
                  @update:value="(v) => updateGuestFieldsVal(v, field)"
                  :cpt-props="{
                    month: {label: {for: makeUniqueAttr('dob-month-guest-field')}, input: {id: makeUniqueAttr('dob-month-guest-field')}},
                    day: {label: {for: makeUniqueAttr('dob-day-guest-field')}, input: {id: makeUniqueAttr('dob-day-guest-field')}},
                    year: {label: {for: makeUniqueAttr('dob-year-guest-field')}, input: {id: makeUniqueAttr('dob-year-guest-field')}}
                  }" />
              </n-form-item>
              <p class="text-danger" v-if="isAgeRestricted && field.name === 'birth_date'">Please try another guest or update date of birth!</p>
            </div>
          </div>
        </div>
      </div>
      <!-- EXTENSION FIELDS -->
      <div v-for="(field, index) in fields" :key="index" :class="{'d-none': currentInfoFilled.ext}">
        <div v-if="field.type === 'DropDown'">
          <n-form-item :label="field.label" :show-require-mark="field.required" :path="getFieldPath(field)" :label-props="{for: makeUniqueAttr(`${field.name}-ext-field`) }">
            <n-select :value="getFieldVal(field)" @update:value="(v) => updateFieldVal(v, field)" :placeholder="field.label" :options="field.dropdownOptions" :input-props="{id: makeUniqueAttr(`${field.name}-ext-field`) }" :filterable="true"/>
          </n-form-item>
          <div class="d-flex justify-content-center" v-if="field.label === 'Skier Type'">
            <a href="assets/pdf/SkierType2010.pdf" target="_blank">
              <n-button type="primary">What’s my Skier Type?</n-button>
            </a>
          </div>
        </div>
        <div class="axesswtp" v-else-if="field.type === 'TextBox' && field.name === wtpFieldName" :show-require-mark="field.required">
          <n-form-item label="Select Existing WTP" :show-require-mark="field.required" :path="getFieldPath(field)" v-if="currentInfo.wtpGuests.length">
            <n-select :value="getFieldVal(field, {type: 'select'})" @update:value="(v) => updateFieldVal(v, field, {type: 'select'})" :placeholder="field.label" :options="currentInfo.wtpGuests" :filterable="true" :input-props="{id: makeUniqueAttr(`${field.name}-ext-field`) }" :label-props="{for: makeUniqueAttr(`${field.name}-ext-field`) }"/>
          </n-form-item>
          <n-form-item :label="field.label" :path="getFieldPath(field)" :class="{ 'd-none': currentInfo.wtpGuests.length > 0 && getFieldVal(field, {type: 'select'}) !== 'addNewWtp' }" :label-props="{for: makeUniqueAttr(`${field.name}-ext-field`) }">
            <n-input :value="getFieldVal(field)" @update:value="(v) => updateFieldVal(v, field)" placeholder="" :input-props="{id: makeUniqueAttr(`${field.name}-ext-field`) }" />
          </n-form-item>
          <p v-if="wtpErrMsg?.length" class="text-danger"><small>{{wtpErrMsg}}</small></p>
          <div class="d-flex justify-content-center">
            <n-button data-bs-toggle="modal" data-bs-target="#wtpExampleModal" type="primary">Where’s my WTP Number??</n-button>
          </div>
        </div>
        <div v-else-if="field.type === 'TextBox' || field.type === 'Phone'" :show-require-mark="field.required">
          <n-form-item :class="{'phone-type-field': field.type === 'Phone'}" :label="field.label" :path="getFieldPath(field)" :label-props="{for: makeUniqueAttr(`${field.name}-ext-field`) }">
            <n-input :value="getFieldVal(field)" @update:value="(v) => updateFieldVal(v, field)" :placeholder="''" :input-props="{id: makeUniqueAttr(`${field.name}-ext-field`) }" />
          </n-form-item>
        </div>
        <div v-else-if="field.type === 'Upload'" :show-require-mark="field.required">
          <n-form-item :label="field.label" :path="getFieldPath(field)">
             <n-upload :max="1" :custom-request="(options) => uploadFieldVal(options, field)" @remove="() => onUploadFieldRemove(field)">
              <i><small><strong>Minors under 18 must upload a new picture. This includes Reloads.</strong></small></i>
              <n-button>Upload file</n-button>
            </n-upload>
          </n-form-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Inputmask from 'inputmask';
import { ref } from 'vue';
import moment from 'moment';
import {
  NSelect,
  NInput,
  NFormItem,
  NButton,
  NUpload,
  NDatePicker,
} from 'naive-ui';
// COMPOSABLES
import useCheckout from '@/composables/useCheckout';
import useAuth from '@/composables/useAuth';
// COMPONENTS
import ChuteDatePicker from '@/components/chute/ui/DatePicker/DatePicker.vue';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    subProduct: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const {
      step1,
      checkAgeRestriction,
      getAllWTPByGuest,
      validateAxess,
      uploadPhoto,
    } = useCheckout();

    const {
      isLoggedIn
    } = useAuth();

    return {
      step1,
      checkAgeRestriction,
      getAllWTPByGuest,
      validateAxess,
      uploadPhoto,

      isLoggedIn,

      wtpErrMsg: ref(''),
      wtpFieldName: ref('axesswtp'),
    };
  },
  components: {
    NSelect,
    NInput,
    NFormItem,
    NButton,
    NUpload,
    NDatePicker,

    ChuteDatePicker,
  },
  mounted() {
    setTimeout(() => {
      const im = new Inputmask('********-***-***');

      document.querySelectorAll('.axesswtp input').forEach((el) => {
        im.mask(el);
      });

      const phoneMask = new Inputmask('(999) 999-9999');
      document.querySelectorAll('.phone-type-field input').forEach((el) => {
        phoneMask.mask(el);
      });
    }, 2000);
  },
  methods: {
    makeUniqueAttr(id) {
      if (this.isParentProduct) {
        return `${this.product.ProductID}-${id}`;
      }

      return `${this.product.ProductID}-${this.subProduct.ID}-${id}`;
    },
    getFieldVal(field, options = {}) {
      let fieldName = field.name;
      if (field.name === this.wtpFieldName && options?.type === 'select') {
        fieldName = `${fieldName}_select`;
      }

      return this.currentInfo[`ext_${fieldName}`];
    },
    updateFieldVal(value, field, options = {}) {
      if (field.name === this.wtpFieldName) {
        if (value) {
          this.validateAxessOfGuest();
        } else {
          setTimeout(() => this.wtpErrMsg = '', 1000);
        }
      }

      let fieldName = field.name;
      if (field.name === this.wtpFieldName && options?.type === 'select') {
        fieldName = `${fieldName}_select`;
      }

      if (this.isParentProduct) {
        this.$store.dispatch('checkout/updateStep1ProductInfo', {
          productId: this.product.ID,
          field: fieldName,
          value
        });

        return;
      }

      this.$store.dispatch('checkout/updateStep1ProductInfo', {
        productId: this.product.ID,
        subProductId: this.subProduct.ID,
        field: fieldName,
        value
      });
    },
    uploadFieldVal({file}, field) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.uploadPhoto({
          data: {
            content: reader.result,
            filename: file.name,
            dpi: 72,
          },
        }, (success, result) => {
          if (success && result.valid) {
            this.updateFieldVal(result.filename, field);
          }
        });
      };
      reader.readAsDataURL(file.file);
    },
    onUploadFieldRemove(field) {
      this.updateFieldVal(null, field);
    },
    updateGuestVal(value) {
      this.wtpErrMsg = '';
      this.resetWtpGuests(value);

      if (this.isParentProduct) {
        this.$store.dispatch('checkout/updateStep1ProductInfo', {
          productId: this.product.ID,
          fieldType: 'guest',
          value
        });
      } else {
        this.$store.dispatch('checkout/updateStep1ProductInfo', {
          productId: this.product.ID,
          subProductId: this.subProduct.ID,
          fieldType: 'guest',
          value
        });
      }

      const selectedGuest = _.find(this.step1.productsandGuestsInformation.Guests, { ID: value });

      for (let guestField of this.step1.productsandGuestsInformation.Guestfields[0].Fields) {
        this.updateGuestFieldsVal(null, { name: guestField[3] });
      }

      for (let p of selectedGuest.Parameters) {
        if (p[0] === 'birth_date') {
          this.updateGuestFieldsVal(p[2] ? moment(p[2], "MM-DD-YYYY").unix() : null, { name: p[0] });
        } else {
          this.updateGuestFieldsVal(p[2], { name: p[0] });
        }
      }
    },
    updateGuestFieldsVal(value, field) {
      const data = {
        productId: this.product.ID,
        fieldType: 'guestFields',
        field: field.name,
        value
      };

      if (!this.isParentProduct) {
        data['subProductId'] = this.subProduct.ID;
      }

      if (this.disabledBirthDateFieldValueForCommonGuest === value) {
        this.checkAgeRestrictionOnProduct(field);
        return;
      }

      this.$store.dispatch('checkout/updateStep1ProductInfo', data).then(() => {
        if (
          field.name === 'birth_date' &&
          this.disabledBirthDateFieldValueForCommonGuest === false
        ) {
          this.checkAgeRestrictionOnProduct(field);
        }
      });
    },
    getFieldPath(field) {
      return `${this.currentInfoPath}.ext_${field.name}`;
    },
    resetWtpGuests(guestId) {
      if (!this.productsInfo[`product_${this.product.ID}`].hasWtpField) {
        return;
      }

      this.updateFieldVal(null, { name: this.wtpFieldName });
      this.updateFieldVal(null, { name: this.wtpFieldName }, { type: 'select' });

      const guestNo = _.find(this.step1.productsandGuestsInformation.Guests, { ID: guestId })?.GuestNo;
      if (!guestNo) {
        return;
      }

      this.getAllWTPByGuest({
        params: {
          guestNo
        }
      }, (success, guests) => {
        if (success) {
          const wtpGuests = [];
          if (guests.length > 0) {
            wtpGuests.push({
              label: 'Add New',
              value: 'addNewWtp',
            });

            guests.forEach((g) => {
              wtpGuests.push({
                label: g,
                value: g,
              });
            });
          }

          this.$store.dispatch('checkout/updateStep1ProductInfo', {
            productId: this.product.ID,
            fieldType: 'wtpGuests',
            value: wtpGuests,
          });
        }
      });
    },
    checkAgeRestrictionOnProduct(field) {
      if (field.name !== 'birth_date') {
        return;
      }

      let birthDate = this.disabledBirthDateFieldValueForCommonGuest || this.currentInfo['guestFields']?.birth_date || null;
      if (!birthDate) {
        return;
      }

      birthDate = moment.unix(birthDate).format("MM-DD-YYYY");

      this.checkAgeRestriction({
        params: {
          ProductID: this.product.ProductID,
          VariantID: this.product.VariantID,
          GuestDOB: birthDate,
          CartRecID: this.product.CartRecID,
        }
      }, (success, result) => {
        if (this.isParentProduct) {
          this.$store.dispatch('checkout/updateStep1ProductInfo', {
            productId: this.product.ID,
            fieldType: 'ageRestricted',
            value: !result,
          });
        } else {
          this.$store.dispatch('checkout/updateStep1ProductInfo', {
            productId: this.product.ID,
            subProductId: this.subProduct.ID,
            fieldType: 'ageRestricted',
            value: !result,
          });
        }
      });
    },
    validateAxessOfGuest() {
      this.wtpErrMsg = '';
      const debounced = _.debounce(() => {
        if (!this.currentInfo.hasWtpField) {
          return;
        }

        let wtpNo = this.currentInfo.ext_axesswtp_select;
        wtpNo = (!wtpNo || wtpNo === 'addNewWtp') ? this.currentInfo.ext_axesswtp : wtpNo;

        const guestId = this.currentInfo.guest;

        if (!wtpNo  || !this.isValidGuest) {
          return;
        }

        const guest =  _.find(this.step1.productsandGuestsInformation.Guests, {ID: guestId});
        const guestNo = guest?.GuestNo;
        if (!guestNo) {
          return;
        }

        wtpNo = wtpNo.replace(new RegExp('_', 'g'), '').replace(new RegExp('-', 'g'), '');

        this.validateAxess({
          params: {
            AxessCode: wtpNo,
            DCI: this.subProduct.DCI || ' ',
            GuestNumber: guestNo || '',
            FirstName: this.currentInfo.guestFields['first_name'] || '',
            LastName: this.currentInfo.guestFields['last_name'] || '',
            DateOfBirth: this.currentInfo.guestFields['last_name'] ? this.currentInfo.guestFields['birth_date'] && moment.unix(this.currentInfo.guestFields['birth_date']).format("MM-DD-YYYY") : '',
            Type: 'PASS',
            CartRecID: this.product.CartRecID,
          }
        }, (success, result) => {
          console.log(result)
          if (!result.Valid) {
            console.log("Incorrect WTP")
            this.wtpErrMsg = result.Message;
            this.updateFieldVal(false, { name: 'hasValidWtpField' });
          } else {
            console.log("Correct WTP")
            this.updateFieldVal(true, { name: 'hasValidWtpField' });
          }
        });
      }, 0);

      debounced();
    },
  },
  computed: {
    checkGuestHasExistingBirthDate() {
      if (!this.isLoggedIn) {
        return false;
      }

      const guest = _.find(this.step1.productsandGuestsInformation.Guests, {ID: this.currentInfo.guest});

      if (!guest) {
        return false;
      }

      const birthDate = _.find(guest.Parameters, {0: 'birth_date'});

      return !!(birthDate && birthDate[2]);
    },
    disabledBirthDateFieldValueForCommonGuest() {
      const hasSelectedDateTodayOrYester = (date) => {

        const isToday = moment.unix(date).format("MM-DD-YYYY") === moment().format("MM-DD-YYYY");
        const isYesterday = moment.unix(date).format("MM-DD-YYYY") === moment().subtract(1, 'days').format("MM-DD-YYYY");

        return isToday || isYesterday;
      }

      for (let product of this.step1.productsandGuestsInformation.Products) {
        if (product.ID === this.product.ID) {
          continue;
        }

        const pInfo = this.productsInfo[`product_${product.ID}`];

        if (
          pInfo.guest >= 0 &&
          pInfo.guestFields.birth_date &&
          pInfo.guest === this.currentInfo.guest &&
          !hasSelectedDateTodayOrYester(pInfo.guestFields.birth_date)
        ) {
          return pInfo.guestFields.birth_date;
        }

        if (this.isParentProduct) {
          continue;
        }

        for (let subProduct of product.SubProducts) {
          if (product.ID === this.product.ID && this.subProduct.ID === subProduct.ID) {
            continue;
          }

          const spInfo = pInfo[`subProduct_${subProduct.ID}`];

          if (
            spInfo.guest >= 0 &&
            spInfo.guestFields.birth_date &&
            spInfo.guest === this.currentInfo.guest &&
            !hasSelectedDateTodayOrYester(spInfo.guestFields.birth_date)
          ) {
            return spInfo.guestFields.birth_date;
          }
        }
      }

      return false;
    },

    isValidGuest() {
      if (!this.currentInfo) {
        return false;
      }

      const guestId = this.currentInfo.guest;

      if (guestId >= 0) {
        return true;
      }

      for (let gf of this.guestFields) {
        if (gf.required &&
          this.currentInfo.guestFields[gf.name]
        ) {
          return false;
        }
      }

      return true;
    },
    currentProductInfo() {
      return this.productsInfo[`product_${this.product.ID}`];
    },
    currentInfo() {
      if (this.isParentProduct) {
        return this.productsInfo[`product_${this.product.ID}`];
      }

      return this.productsInfo[`product_${this.product.ID}`][`subProduct_${this.subProduct.ID}`];
    },
    currentInfoFilled() {
      if (this.isParentProduct) {
        return this.productsInfoFilled[`product_${this.product.ID}`];
      }

      return this.productsInfoFilled[`product_${this.product.ID}`][`subProduct_${this.subProduct.ID}`];
    },
    currentInfoPath() {
      if (this.isParentProduct) {
        return `product_${this.product.ID}`;
      }

      return `product_${this.product.ID}.subProduct_${this.subProduct.ID}`;
    },
    productsInfo() {
      return this.step1.productsInfo;
    },
    productsInfoFilled() {
      return this.step1.productsInfoFilled;
    },
    isAgeRestricted() {
      if (!this.currentInfo) {
        return false;
      }

      return this.currentInfo?.ageRestricted === true;
    },
    selectedGuest() {
      return this.currentInfo?.guest;
    },
    isParentProduct() {
      return this.subProduct?.parent === 0;
    },
    guestFields() {
      if (
        !this.step1?.productsandGuestsInformation?.Guestfields?.length > 0 ||
        (!this.selectedGuest && this.selectedGuest !== 0)
      ) {
        return [];
      }

      const fields = this.step1.productsandGuestsInformation.Guestfields[0];

      return fields.Fields.map((f) => {
        return {
          name: f[3],
          type: f[4],
          label: f[2],
          required: f[5] === 'True',
          id: f[0],
          disabled: false,
          hide: this.selectedGuest >= 0 && f[4] !== 'Date' ? true : false,
        };
      });
    },
    guests() {
      if (!this.step1?.productsandGuestsInformation) {
        return [{
          label: 'Add New Guest',
          value: -1,
        }];
      };

      return this.step1.productsandGuestsInformation.Guests
        .map((item) => {
          const guest = {
            value: item.ID,
          };

          guest.label = 'Add New Guest';
          if (item.ID > -1) {
            guest.label = `${item.Parameters[1][2]} ${item.Parameters[2][2]}`;
          }

          return guest;
        });
    },
    fields() {
      return (this.subProduct?.Ext || []).map((f) => {
        const details ={
          name: f[0],
          type: f[1],
          label: f[2],
          required: f[4] === 'True',
          id: f[6],
        };

        if (details.type === 'DropDown') {
          details.dropdownOptions = [];

          const dropdownLabels =  f[3].split(',');
          const dropdownValues = f[7].split(',');
          const dropdownActives = f[8].split(',');

          for (let i = 0; i < dropdownLabels.length; i++) {
            const disabled = dropdownActives[i] === 'False';
            details.dropdownOptions.push({
              label: dropdownLabels[i],
              value: (dropdownValues[i] || !disabled)  ? dropdownValues[i] : dropdownLabels[i],
              disabled: disabled,
            })
          }
        }

        return details;
      });
    },
  },
}
</script>
