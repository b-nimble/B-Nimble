import { useStore } from "vuex";

export default function () {
  const store = useStore();

  const getAllByLastName = (data, callback) => {
    store.dispatch('skiSwap/getAllByLastName', data).then((response) => {
      if (callback) {
        callback(true, response.data);
      }
    }, () => {
      if (callback) {
        callback(false, {
          message: 'Something went wrong. Please try again later.',
        });
      }
    })
  }

  const getAllByClientID = (data, callback) => {
    store.dispatch('skiSwap/getAllByClientID', data).then((response) => {
      if (callback) {
        callback(true, response.data);
      }
    }, () => {
      if (callback) {
        callback(false, {
          message: 'Something went wrong. Please try again later.',
        });
      }
    })
  }

  const getCustomerInformation = (data, callback) => {
    store.dispatch('skiSwap/getCustomerInformation', data).then((response) => {
      if (callback) {
        callback(true, response.data);
      }
    }, () => {
      if (callback) {
        callback(false, {
          message: 'Something went wrong. Please try again later.',
        });
      }
    })
  }

  const saveCustomerInformation = (data, callback) => {
    store.dispatch('skiSwap/saveCustomerInformation', data).then((response) => {
      if (callback) {
        callback(true, response.data);
      }
    }, () => {
      if (callback) {
        callback(false, {
          message: 'Something went wrong. Please try again later.',
        });
      }
    })
  }

  const getSkiSwapBrand = (data, callback) => {
    store.dispatch('skiSwap/getSkiSwapBrand', data).then((response) => {
      if (callback) {
        callback(true, response.data);
      }
    }, () => {
      if (callback) {
        callback(false, {
          message: 'Something went wrong. Please try again later.',
        });
      }
    })
  }

  const getSkiSwapCategory = (data, callback) => {
    store.dispatch('skiSwap/getSkiSwapCategory', data).then((response) => {
      if (callback) {
        callback(true, response.data);
      }
    }, () => {
      if (callback) {
        callback(false, {
          message: 'Something went wrong. Please try again later.',
        });
      }
    })
  }

  const getSkiSwapStyle = (data, callback) => {
    store.dispatch('skiSwap/getSkiSwapStyle', data).then((response) => {
      if (callback) {
        callback(true, response.data);
      }
    }, () => {
      if (callback) {
        callback(false, {
          message: 'Something went wrong. Please try again later.',
        });
      }
    })
  }

  const saveSkiSwapItem = (data, callback) => {
    store.dispatch('skiSwap/saveSkiSwapItem', data).then((response) => {
      if (callback) {
        callback(true, response.data);
      }
    }, () => {
      if (callback) {
        callback(false, {
          message: 'Something went wrong. Please try again later.',
        });
      }
    })
  }

  const deleteSkiSwapItem = (data, callback) => {
    store.dispatch('skiSwap/deleteSkiSwapItem', data).then((response) => {
      if (callback) {
        callback(true, response.data);
      }
    }, () => {
      if (callback) {
        callback(false, {
          message: 'Something went wrong. Please try again later.',
        });
      }
    })
  }

  const getAllSkiSwapItem = (data, callback) => {
    store.dispatch('skiSwap/getAllSkiSwapItem', data).then((response) => {
      if (callback) {
        callback(true, response.data);
      }
    }, () => {
      if (callback) {
        callback(false, {
          message: 'Something went wrong. Please try again later.',
        });
      }
    })
  }

  return {
    getAllByLastName,
    getAllByClientID,
    getCustomerInformation,
    saveCustomerInformation,
    getSkiSwapBrand,
    getSkiSwapCategory,
    getSkiSwapStyle,
    saveSkiSwapItem,
    getAllSkiSwapItem,
    deleteSkiSwapItem,
  };
}
