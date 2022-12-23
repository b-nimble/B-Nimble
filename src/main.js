import { createApp, defineAsyncComponent } from 'vue'
import store from './store'

// Create app instance.
const app = createApp({
  mounted() {
  }
}).use(store);

// Register custom components.

app.component('chute-login', defineAsyncComponent(() => import('./components/chute/Login.vue')))
app.component('chute-contactus', defineAsyncComponent(() => import('./components/chute/ContactUs.vue')))
app.mount('#app');
