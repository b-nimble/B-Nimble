<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="start-gps-group-cpt">
      <n-form class="mx-auto card p-5" :model="model" :rules="rules" ref="startGpsGroupFormRef" v-if="!groupCreatedSuccess">
        <n-form-item path="groupname" label="Group Name" :show-require-mark="true" :label-props="{for: 'startGpsGroupForm-groupname'}">
          <n-input
            :input-props="{id: 'startGpsGroupForm-groupname'}"
            :value="model.groupname"
            placeholder=""
            @update:value="(v) => updateFieldVal(v, 'groupname')"
          />
        </n-form-item>
        <n-form-item path="firstName" label="First Name" :show-require-mark="true" :label-props="{for: 'startGpsGroupForm-firstName'}">
          <n-input
            :input-props="{id: 'startGpsGroupForm-firstName'}"
            :value="model.firstName"
            placeholder=""
            @update:value="(v) => updateFieldVal(v, 'firstName')"
          />
        </n-form-item>
        <n-form-item path="lastName" label="Last Name" :show-require-mark="true" :label-props="{for: 'startGpsGroupForm-lastName'}">
          <n-input
            :input-props="{id: 'startGpsGroupForm-lastName'}"
            :value="model.lastname"
            placeholder=""
            @update:value="(v) => updateFieldVal(v, 'lastname')"
          />
        </n-form-item>
        <n-form-item path="address1" label="Address 1" :show-require-mark="true" :label-props="{for: 'startGpsGroupForm-address1'}">
          <n-input
            :input-props="{id: 'startGpsGroupForm-address1'}"
            :value="model.address1"
            placeholder=""
            @update:value="(v) => updateFieldVal(v, 'address1')"
          />
        </n-form-item>
        <n-form-item path="address2" label="Address 2" :label-props="{for: 'startGpsGroupForm-address2'}">
          <n-input
            :input-props="{id: 'startGpsGroupForm-address2'}"
            :value="model.address2"
            placeholder=""
            @update:value="(v) => updateFieldVal(v, 'address2')"
          />
        </n-form-item>
        <n-form-item path="city" label="City/Town" :show-require-mark="true" :label-props="{for: 'startGpsGroupForm-city'}">
          <n-input
            :input-props="{id: 'startGpsGroupForm-city'}"
            :value="model.city"
            placeholder=""
            @update:value="(v) => updateFieldVal(v, 'city')"
          />
        </n-form-item>
        <n-form-item path="state" label="State" :show-require-mark="true" :label-props="{for: 'startGpsGroupForm-state'}">
          <n-select
            :input-props="{id: 'startGpsGroupForm-state'}"
            :value="model.state"
            placeholder=""
            :options="stateOptions"
            @update:value="(v) => updateFieldVal(v, 'state')"
            :filterable="true"
          />
        </n-form-item>
        <n-form-item path="zipcode" label="Postal Code" :show-require-mark="true" :label-props="{for: 'startGpsGroupForm-zipcode'}">
          <n-input
            :input-props="{id: 'startGpsGroupForm-zipcode'}"
            :value="model.zipcode"
            placeholder=""
            @update:value="(v) => updateFieldVal(v, 'zipcode')"
          />
        </n-form-item>
        <n-form-item class="phone-type-field" path="phonenumber" label="Phone" :show-require-mark="true" :label-props="{for: 'startGpsGroupForm-phonenumber'}">
          <n-input
            :input-props="{id: 'startGpsGroupForm-phonenumber'}"
            :value="model.phonenumber"
            placeholder=""
            @update:value="(v) => updateFieldVal(v, 'phonenumber')"
          />
        </n-form-item>
        <div>
          <div class="d-flex justify-content-center" v-if="formErrMsg">
            <div style="width:100%" class="alert alert-danger">{{formErrMsg}}</div>
          </div>
          <div class="d-flex justify-content-center align-items-center flex-column">
            <n-button
              :loading="loading"
              size="large"
              @click="submit"
              type="primary">
              Create Group
            </n-button>
          </div>
        </div>
      </n-form>
      <div class="alert alert-success" v-if="groupCreatedSuccess">
        <p>
        Your group has been created. A confirmation email has been sent to you. If you don't
        receive it within 24 hours, please contact us at <a href="mailto:groupsales@wachusett.com">groupsales@wachusett.com</a>.</p>
      </div>
    </div>
  </n-config-provider>
</template>

<script>
import { ref } from 'vue';
import {
  NForm,
  NFormItem,
  NInput,
  NCheckbox,
  NSelect,
  NButton,
  NConfigProvider
} from 'naive-ui';
import { mapGetters } from 'vuex';
import Inputmask from 'inputmask';
// COMPOSABLES
import useHelper from '@/composables/useHelper';

export default {
  components: {
    NForm,
    NFormItem,
    NInput,
    NCheckbox,
    NSelect,
    NButton,
    NConfigProvider
  },
  setup() {

    const {
      stateOptions,
    } = useHelper();

    return {
      stateOptions,
      formErrMsg: ref(''),
      loading: ref(false),

      groupCreatedSuccess: ref(null),

      model: ref({
        groupname: '',
        firstName: '',
        lastname: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipcode: '',
        phonenumber: '',
      })
    };
  },
  mounted() {
    const im = new Inputmask('999-999-9999');
    im.mask(document.querySelector('#startGpsGroupForm-phonenumber'));
  },
  methods: {
    updateFieldVal(value, field) {
      this.model[field] = value;
    },
    submit() {
      this.$refs.startGpsGroupFormRef.validate((errors) => {
        if (errors) {
          this.formErrMsg = 'Please complete all the required fields.';
          return;
        }

        this.loading = true;
        this.$store.dispatch('gps/startGPSGroup', {
          params: {
            groupname: this.model.groupname,
            firstName: this.model.firstName,
            lastname: this.model.lastname,
            address1: this.model.address1,
            address2: this.model.address2,
            city: this.model.city,
            state: this.model.state,
            zipcode: this.model.zipcode,
            phonenumber: this.model.phonenumber
          }
        }).then((response) => {
          this.loading = false;
          if (response.data.Valid) {
            this.groupCreatedSuccess = true;

            return;
          }

          this.groupCreatedSuccess = false;
          this.formErrMsg = response.data.Error || 'Unable to create a group';
        }).catch(() => {
          this.loading = false;
          this.groupCreatedSuccess = false;
          this.formErrMsg = 'Something went wrong! please try again';
        });
      });
    },
  },
  computed: {
    ...mapGetters([
      'themeOverrides',
    ]),
    rules() {
      return {
        groupname: [
          {
            required: true,
            message: 'This field is required',
            trigger: ['input', 'blur'],
          },
        ],
        firstName: [
          {
            required: true,
            message: 'This field is required',
            trigger: ['input', 'blur'],
          },
        ],
        lastname: [
          {
            required: true,
            message: 'This field is required',
            trigger: ['input', 'blur'],
          },
        ],
        address1: [
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
        zipcode: [
          {
            required: true,
            message: 'This field is required',
            trigger: ['input', 'blur'],
          },
        ],
        phonenumber: [
          {
            trigger: ['input', 'blur'],
            required: true,
            message: 'This field is required',
          },
          {
            message: 'Invalid Phone number',
            trigger: ['input'],
            validator: (rule, value) => {
              return value.indexOf('_') === -1 && value.length === 12;
            },
          }
        ],
      };
    },
  },
}
</script>

<style lang="scss">
.start-gps-group-cpt {
  form {
    margin-top: 30px !important;
    max-width: 600px;
    margin: auto;
  }
}
</style>
