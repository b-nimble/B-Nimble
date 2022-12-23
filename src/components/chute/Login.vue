<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="chute-login-cpt">
      <n-form
        :model="model"
        ref="loginFormRef"
        :rules="rules" class="mx-auto card p-5">
        <n-form-item
          path="email"
          label="Email"
          :label-props="{for: 'login-email'}">
          <n-input
            :input-props="{id: 'login-email'}"
            v-model:value="model.email"
            type="email"
            :show-require-mark="true"
            placeholder="Email"/>
        </n-form-item>
        <n-form-item
          path="password"
          label="Password"
          :label-props="{for: 'login-password'}">
          <n-input
            :input-props="{id: 'login-password'}"
            v-model:value="model.password"
            type="password"
            :show-require-mark="true"
            show-password-on="click"
            :clearable="true"
            placeholder="Password"/>
        </n-form-item>
        <div>
          <div class="d-flex justify-content-end">
            <a :href="paths.forgotPasswordPage">Forgot Password?</a>
          </div>
          <div class="d-flex justify-content-center mt-2 mb-2">
            <n-checkbox v-model:checked="model.rememberMe">
              Stay signed in on this computer
            </n-checkbox>
          </div>
          <div class="d-flex justify-content-center" v-if="loginErrMsg">
            <div style="width:100%" class="alert alert-danger">{{loginErrMsg}}</div>
          </div>
          <div class="d-flex justify-content-center">
            <n-button
              :loading="logging"
              size="large"
              @click="submit"
              type="primary">
              Login
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
  NCheckbox,
} from 'naive-ui';
import useAuth from '@/composables/useAuth';
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
      password: null,
      rememberMe: false,
    });
    const { login, tempToken, logging } = useAuth();

    return {
      login,
      logging,
      tempToken,

      rPasswordFormItemRef,
      loginErrMsg: ref(''),
      model: modelRef,
      rules: {
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
        password: [
          {
            required: true,
            message: 'Password is required',
            trigger: ['input'],
          },
        ],
      },
    };
  },
  components: {
    NConfigProvider,
    NForm,
    NFormItem,
    NButton,
    NInput,
    NCheckbox,
  },
  mounted() {
    this.captureReturnUrl();
  },
  methods: {
    captureReturnUrl() {
      const url = new URL(window.location.href);
      const returnUrl = url.searchParams.get('returnURL');

      if (returnUrl) {
        window.localStorage.setItem('returnURL', returnUrl);
      }
    },
    redirectToReturnUrl() {
      const returnUrl =  this.redirectAfterLogin || window.localStorage.getItem('returnURL');
      if (!returnUrl) {
        return false;
      }

      window.localStorage.removeItem('returnURL');
      window.location.href = returnUrl;

      return true;
    },
    submit(e) {
      e.preventDefault();

      this.loginErrMsg = '';
      this.$refs.loginFormRef.validate((errors) => {
        if (errors) {
          return;
        }
        this.login({
          params: {
            username: this.model.email,
            password: this.model.password,
            token: this.tempToken,
          },
        }, (success, result) => {
          if (success) {
            if (this.redirectToReturnUrl()) {
              return;
            }

            window.location.href = paths.homePage;
            return;
          }

          this.loginErrMsg = result.message;
        });
      });
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
