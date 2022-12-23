import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import groups from '../store/chute/modules/groups';

export default function () {
  const store = useStore();


  // COMPUTED
  const token = computed(() => store.getters['auth/token']);
  const tempToken = computed(() => store.getters['auth/tempToken']);
  const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);

  // METHODS
  const getSchoolGroupInformation = (data, callback) => {
    console.log(data)
    if(isLoggedIn){
      console.log('User is Logged in')
    }
    else{
      console.log('User is not Logged in')
    }
    groups.dispatch('groups/getSchoolGroupInformation', data)
      .then((response) => {
        console.log(response);
      }).catch(() => {
      
      });
  };

  return {
    token,
    tempToken,
    isLoggedIn,
    getSchoolGroupInformation,
  };
}
