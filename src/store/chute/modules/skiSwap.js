import skiSwapApi from '@/api/skiSwap';

export default {
  namespaced: true,

  state: () => ({}),

  actions: {
    getAllByLastName(context, data) {
      return skiSwapApi.getAllByLastName(data);
    },
    getAllByClientID(context, data) {
      return skiSwapApi.getAllByClientID(data);
    },
    getCustomerInformation(context, data) {
      return skiSwapApi.getCustomerInformation(data);
    },
    saveCustomerInformation(context, data) {
      return skiSwapApi.saveCustomerInformation(data);
    },
    getSkiSwapBrand(context, data) {
      return skiSwapApi.getSkiSwapBrand(data);
    },
    getSkiSwapCategory(context, data) {
      return skiSwapApi.getSkiSwapCategory(data);
    },
    getSkiSwapStyle(context, data) {
      return skiSwapApi.getSkiSwapStyle(data);
    },
    saveSkiSwapItem(context, data) {
      return skiSwapApi.saveSkiSwapItem(data);
    },
    getAllSkiSwapItem(context, data) {
      return skiSwapApi.getAllSkiSwapItem(data);
    },
    deleteSkiSwapItem(context, data) {
      return skiSwapApi.deleteSkiSwapItem(data);
    }
  }
}
