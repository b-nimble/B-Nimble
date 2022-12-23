import { createStore } from 'vuex';
import * as actions from './chute/actions';
import * as getters from './chute/getters';
// MODULES
import precart from '@/store/chute/modules/precart';
import productCalendar from '@/store/chute/modules/productCalendar';
import calendar from '@/store/chute/modules/calendar';
import coupon from '@/store/chute/modules/coupon';
import store from '@/store/chute/modules/store';
import auth from '@/store/chute/modules/auth';
import checkout from '@/store/chute/modules/checkout';
import address from '@/store/chute/modules/address';
import nightLeague from '@/store/chute/modules/nightLeague';
import schoolGroup from '@/store/chute/modules/schoolGroup';
import gps from '@/store/chute/modules/gps';
import skiSwap from '@/store/chute/modules/skiSwap';
import aapkReservation from '@/store/chute/modules/aapkReservation';

export default createStore({
  state: {},
  actions,
  getters,
  modules: {
    productCalendar,
    calendar,
    coupon,
    precart,
    store,
    auth,
    checkout,
    address,
    nightLeague,
    schoolGroup,
    gps,
    skiSwap,
    aapkReservation,
  }
})
