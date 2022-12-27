<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="chute-login-cpt">

      <h1 class="center">Contact Us</h1>
      <n-form
        :model="model"
        ref="loginFormRef"
        :rules="rules" class="mx-auto card p-5 blue-bg">


      <!-- Name Input Field -->
      <n-form-item
      path="name"
          label=""
          :label-props="{for: 'contact-name'}">
          <n-input
            :input-props="{id: 'contact-name'}"
            v-model:value="model.name"
            type="name"
            :show-require-mark="true"
            :bordered="false"
            placeholder="Full Name"
           />
        </n-form-item>

      <!-- chnage it to phone -->
      <n-form-item
          path="phone"
          label=""
          :label-props="{for: 'contact-phone'}">
          <n-input
            :input-props="{id: 'contact-phone'}"
            v-model:value="model.phone"
            type="phone"
            :show-require-mark="true"
            :bordered="false"
            placeholder="Phone"
            />
        </n-form-item>

              <!-- chnage it to position -->
      <n-form-item
          path="position"
          label=""
          :label-props="{for: 'contact-position'}">
          <n-input
            :input-props="{id: 'contact-position'}"
            v-model:value="model.position"
            type="position"
            :show-require-mark="true"
            :bordered="false"
            placeholder="Title"/>
        </n-form-item>

        <n-form-item
          path="email"
          label=""
          :label-props="{for: 'login-email'}">
          <n-input
            :input-props="{id: 'login-email'}"
            v-model:value="model.email"
            type="email"
            :show-require-mark="true"
            :bordered="false"
            placeholder="Email"/>
        </n-form-item>

        <!-- Change it to Message -->
        <n-form-item :span="12" label="" path="textareaValue">
        <n-input
          v-model:value="model.textareaValue"
          placeholder="Message"
          :bordered="false"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 5
          }"
        />
      </n-form-item>
        
        <div>
          <div class="d-flex justify-content-center" v-if="loginErrMsg">
            <div style="width:100%" class="alert alert-danger">{{loginErrMsg}}</div>
          </div>
          <div class="d-flex justify-content-center ">
            <n-button
              :loading="logging"
              size="medium"
              :bordered="false"
              @click="submit"
              type="primary">
              Submit
            </n-button>
          </div>
        </div>
      </n-form>
    </div>
  </n-config-provider>
</template>

<script>
import { ref } from 'vue';
import { mapGetters } from 'vuex';
import {
  NConfigProvider,
  NForm,
  NFormItem,
  NButton,
  NInput,
  
} from 'naive-ui';
// import useAuth from '@/composables/useAuth';
import paths from '@/shared/constants/paths';

export default {
  props: {
    redirectAfterLogin: {
      type: String,
      required: false,
      default: null,
    }
  },
  setup() {
    const rPasswordFormItemRef = ref(null);
    const modelRef = ref({
      email: null,
      name: null,
      phone: null,
      position: null,
      textareaValue: null
    });
    // const { login, tempToken, logging } = useAuth();

    return {
      model: modelRef,
      rules: {
        name: {
            required: true,
            message: "Please enter your Full Name",
            trigger: "blur"
          },
          phone: {
          required: true,
          message: "Please enter your Phone Number",
          trigger: ["input"]
        },
        position: {
          required: true,
          message: "Please enter your title",
          trigger: ["input"]
        },
        email: [
          {
            required: true,
            trigger: ['input'],
            message: 'Email is required',
          },
          
          {
            type: 'email',
            trigger: ['input'],
            message: 'Email address is invalid',
          },
        ],
        textareaValue: {
          required: true,
          trigger: ['blur', 'input'],
          message: 'Please type a brief message'
        }
      },
    };
  },
  components: {
    NConfigProvider,
    NForm,
    NFormItem,
    NButton,
    NInput,
  },
  methods: {
    submit(e) {
      e.preventDefault();
    },
  },
  computed: {
    ...mapGetters([
      'themeOverrides',
    ]),
    paths() {
      return paths;
    },
  },
};
</script>
