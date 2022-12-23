import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default function () {
  const store = useStore();

  // REFS
  const logging = ref(false);
  const registering = ref(false);

  // COMPUTED
  const token = computed(() => store.getters['auth/token']);
  const tempToken = computed(() => store.getters['auth/tempToken']);
  const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);

  // METHODS
  const login = (data, callback) => {
    logging.value = true;
    store.dispatch('auth/login', data)
      .then((response) => {
        logging.value = false;
        if (!response.data.token) {
          callback(false, {
            message: 'Invalid credentials',
          });

          return;
        }

        store.dispatch('auth/loginSuccess', response.data).then(() => {
          if (callback) {
            callback(true);
          }
        });
      }).catch(() => {
        logging.value = false;
        if (callback) {
          callback(false, {
            message: 'Something went wrong. Please try again later.',
          });
        }
      });
  };

  const register = (data, callback) => {
    registering.value = true;
    store.dispatch('auth/register', data)
      .then((response) => {
        registering.value = false;
        if (response.data?.error?.length > 0) {
          if (callback) {
            callback(false, {
              message: response.data.error,
            });
          }

          return;
        }
        callback(true, {
          token: response.data.token,
        });
      }).catch((error) => {
        console.log(error);
        registering.value = false;
        if (callback) {
          callback(false, {
            message: 'Something went wrong. Please try again later.',
          });
        }
      });
  };

  const updateAuthToken = (data, callback) => {
    store.dispatch('auth/updateAuthToken', data).then(() => {
      if (callback) {
        callback(true);
      }
    });
  };

  return {
    token,
    tempToken,
    logging,
    isLoggedIn,
    registering,

    login,
    register,
    updateAuthToken,
  };
}
