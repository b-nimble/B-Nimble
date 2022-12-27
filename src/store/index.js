import { createStore } from 'vuex';
import * as getters from './chute/getters';
// MODULES
import store from '@/store/chute/modules/store';

export default createStore({
  state: {},
  getters,
  modules: {
    store,
  }
})
