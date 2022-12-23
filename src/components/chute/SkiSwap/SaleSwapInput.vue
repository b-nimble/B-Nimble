<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="chute-skip-swap-status-check-cpt">
      <n-form :model="customerModel" ref="skiSaleSwapCustomerFormRef" :rules="rules"
          class="card">
        <div class="dark-blue-bg card-header p-3">
          <h2 class="reverse mb-0">Online Entry</h2>
        </div>
        <div class="card-body">
          <div class="form-grouped-fields">
            <n-form-item path="firstName" label="First Name" :label-props="{for: 'skiSaleSwapCustomerForm-firstName'}">
              <n-input :input-props="{id: 'skiSaleSwapCustomerForm-firstName'}" v-model:value="customerModel.firstName" :show-require-mark="true" placeholder="" />
            </n-form-item>
            <n-form-item path="lastName" label="Last Name" :label-props="{for: 'skiSaleSwapCustomerForm-lastName'}">
              <n-input :input-props="{id: 'skiSaleSwapCustomerForm-lastName'}" v-model:value="customerModel.lastName" :show-require-mark="true" placeholder="" />
            </n-form-item>
          </div>
          <div>
            <n-form-item path="address1" label="Address" :label-props="{for: 'skiSaleSwapCustomerForm-address1'}">
              <n-input :input-props="{id: 'skiSaleSwapCustomerForm-address1'}" v-model:value="customerModel.address1" :show-require-mark="true" placeholder="" />
            </n-form-item>
          </div>
          <div>
            <n-form-item path="address2" label="Address 2" :label-props="{for: 'skiSaleSwapCustomerForm-address2'}">
              <n-input :input-props="{id: 'skiSaleSwapCustomerForm-address2'}" v-model:value="customerModel.address2" placeholder="" />
            </n-form-item>
          </div>
          <div class="form-grouped-fields">
            <n-form-item path="city" label="City" :label-props="{for: 'skiSaleSwapCustomerForm-city'}">
              <n-input :input-props="{id: 'skiSaleSwapCustomerForm-city'}" v-model:value="customerModel.city" :show-require-mark="true" placeholder="" />
            </n-form-item>
            <n-form-item path="state" label="State" :label-props="{for: 'skiSaleSwapCustomerForm-state'}">
              <n-select :input-props="{id: 'skiSaleSwapCustomerForm-state'}" v-model:value="customerModel.state" :show-require-mark="true" placeholder="" :options="stateOptions" :filterable="true"/>
            </n-form-item>
            <n-form-item path="zip" label="Zip" :label-props="{for: 'skiSaleSwapCustomerForm-zip'}">
              <n-input :input-props="{id: 'skiSaleSwapCustomerForm-zip'}" v-model:value="customerModel.zip" :show-require-mark="true" placeholder="" />
            </n-form-item>
          </div>
          <div>
            <n-form-item path="phoneNumber" label="Phone Number" :label-props="{for: 'skiSaleSwapCustomerForm-phoneNumber'}">
              <n-input :input-props="{id: 'skiSaleSwapCustomerForm-phoneNumber'}" v-model:value="customerModel.phoneNumber" :show-require-mark="true" placeholder="" />
            </n-form-item>
          </div>
          <div>
            <n-form-item path="payoutType" label="How would you like your payout?" :label-props="{for: 'skiSaleSwapCustomerForm-payoutType'}" :show-require-mark="true">
              <n-radio-group v-model:value="customerModel.payoutType" name="radiogroup">
                <n-space>
                  <n-radio
                    v-for="payoutOption in payoutOptions"
                    :key="payoutOption.value"
                    :value="payoutOption.value"
                    :label="payoutOption.label"
                  />
                </n-space>
              </n-radio-group>
            </n-form-item>
          </div>
          <div>
            <div class="d-flex justify-content-center" v-if="errMsg">
              <div style="width:100%" class="alert alert-danger">{{ errMsg }}</div>
            </div>
            <div class="d-flex justify-content-center" v-if="successMsg">
              <div style="width:100%" class="alert alert-success">{{ successMsg }}</div>
            </div>
            <div class="d-flex justify-content-center align-items-center flex-column">
              <n-button :loading="savingCustomerInfo" size="large" @click="saveCustomerInfo" type="primary">
                Update Information
              </n-button>
            </div>
          </div>
        </div>
      </n-form>
      <!-- SKIP SWAP ITEMS -->
      <div class="chute-skip-swap-status-check-cpt__items card mt-3">
        <div class="dark-blue-bg card-header p-3">
          <h4 class="reverse mb-0">Items</h4>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-end">
            <n-button type="primary" @click="addNewItem">Add New Item</n-button>
          </div>
          <n-data-table
            class="mt-3"
            v-if="items && items.length > 0"
            :columns="tableColumns"
            :data="tableData"
            :pagination="tablePagination"
            :bordered="true"
            striped
          />
        </div>
      </div>
      <sale-swap-input-item-modal
        :item="selectedItem"
        :brands="brands"
        :categories="categories"
        :styles="styles"
        modal-id="saleSwapInputItem"
        @updated="onItemUpdated"/>
    </div>
     <!-- Modal -->
     <div class="modal fade" id="saleSwapInputItemDeleteConfirm" tabindex="-1" aria-labelledby="saleSwapInputItemDeleteConfirmLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="saleSwapInputItemDeleteConfirmLabel">Delete Item</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h4>Are you sure to delete this item?</h4>
            <div class="d-flex justify-content-center" v-if="errDeleteMsg">
              <div style="width:100%" class="alert alert-danger">{{ errDeleteMsg }}</div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" @click="deleteItem" :disabled="deleting">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </n-config-provider>
</template>

<script>
import { ref, h } from 'vue';
import { mapGetters } from 'vuex';
import _ from 'lodash';
import {
  NConfigProvider,
  NForm,
  NFormItem,
  NButton,
  NInput,
  NCheckbox,
  NDataTable,
  NSpin,
  NSelect,
  NRadio,
  NRadioGroup,
  NSpace,
} from 'naive-ui';

// COMPONENTS
import SaleSwapInputItemModal from '@/components/chute/SkiSwap/SaleSwapInputItemModal.vue';

// COMPOSABLES
import useSkiSwap from '@/composables/useSkiSwap';
import useHelper from '@/composables/useHelper';
import useAuth from '@/composables/useAuth';

// CONSTANTS
import paths from '@/shared/constants/paths';

export default {
  setup() {
    const customerModelRef = ref({
      firstName: ref(''),
      lastName: ref(''),
      address1: ref(''),
      address2: ref(''),
      city: ref(''),
      state: ref(''),
      zip: ref(''),
      phoneNumber: ref(''),
      payoutType: ref('0'),
    });

    const {
      getAllByLastName,
      getAllByClientID,
      getCustomerInformation,
      saveCustomerInformation,
      getAllSkiSwapItem,
      getSkiSwapBrand,
      getSkiSwapCategory,
      getSkiSwapStyle,
      deleteSkiSwapItem,
    } = useSkiSwap();

    const {
      stateOptions
    } = useHelper();

    const {
      isLoggedIn
    } = useAuth();

    return {
      stateOptions,

      getAllByLastName,
      getAllByClientID,
      getCustomerInformation,
      saveCustomerInformation,
      getAllSkiSwapItem,
      getSkiSwapBrand,
      getSkiSwapCategory,
      getSkiSwapStyle,
      deleteSkiSwapItem,

      categories: ref([]),
      styles: ref([]),
      brands: ref([]),

      isLoggedIn,

      savingCustomerInfo: ref(false),
      selectedItem: ref(null),
      selectedItemId: ref(null),
      items: ref([]),
      errMsg: ref(''),
      errDeleteMsg: ref(''),
      successMsg: ref(''),
      deleting: ref(false),
      customerModel: customerModelRef,
      rules: {
        firstName: [
          {
            required: true,
            trigger: ['input'],
            message: 'First Name is required',
          },
        ],
        lastName: [
          {
            required: true,
            trigger: ['input'],
            message: 'Last Name is required',
          },
        ],
        address1: [
          {
            required: true,
            trigger: ['input'],
            message: 'Address is required',
          },
        ],
        city: [
          {
            required: true,
            trigger: ['input'],
            message: 'City is required',
          },
        ],
        state: [
          {
            required: true,
            trigger: ['input'],
            message: 'State is required',
          },
        ],
        zip: [
          {
            required: true,
            trigger: ['input'],
            message: 'Zip is required',
          },
        ],
        phoneNumber: [
          {
            required: true,
            trigger: ['input'],
            message: 'Phone Number is required',
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
    NDataTable,
    NSpin,
    NSelect,
    NRadio,
    NRadioGroup,
    NSpace,

    SaleSwapInputItemModal,
  },
  mounted() {
    if (!this.isLoggedIn) {
      window.location.href = paths.homePage;

      return;
    }

    this.loadCustomerInfo();
    this.getItems();
    this.loadAttributes();
  },
  methods: {
    onItemUpdated() {
      this.getItems();
    },
    loadAttributes() {
      this.getSkiSwapBrand({}, (success, result) => {
        if (!success) {
          return;
        }

        this.brands = result || [];
      });

      this.getSkiSwapCategory({}, (success, result) => {
        if (!success) {
          return;
        }

        this.categories = result || [];
      });

      this.getSkiSwapStyle({}, (success, result) => {
        if (!success) {
          return;
        }

        this.styles = result || [];
      });
    },
    getItems() {
      this.getAllSkiSwapItem({}, (success, result) => {
        if (!success) {
          return;
        }

        this.items = result;
      })
    },
    addNewItem() {
      this.selectedItem = null;
      this.toggleItemModal(true);
    },
    toggleItemModal(show) {
      const modal = window.bootstrap.Modal.getOrCreateInstance(
        document.getElementById('saleSwapInputItem')
      );

      if (!modal) {
        return;
      }

      if (show) {
        modal.show();
      } else {
        modal.hide();
      }
    },
    editItem(skiSwapItemID) {
      const item = _.find(this.items, { SkiSwapItemID: skiSwapItemID });

      if (!item) {
        return;
      }

      this.selectedItem = item;

      this.toggleItemModal(true);
    },
    deleteItemConfirm(id) {
      this.selectedItemId = id;

      const modal = window.bootstrap.Modal.getOrCreateInstance(
        document.getElementById('saleSwapInputItemDeleteConfirm')
      );

      if (!modal) {
        return;
      }

      modal.show();
    },
    deleteItem() {
      if (this.selectedItemId === null) {
        return;
      }

      this.deleting = true;
      this.deleteSkiSwapItem({
        params: {
          skiswapitemID: this.selectedItemId,
        }
      }, (success, result) => {
        this.deleting = false;
        if (!success || !result) {
          this.errDeleteMsg = 'Something went wrong. Please try again later.';

          return;
        }

        const modal = window.bootstrap.Modal.getOrCreateInstance(
          document.getElementById('saleSwapInputItemDeleteConfirm')
        );

        if (!modal) {
          return;
        }

        modal.hide();

        this.getItems();
      })
    },
    loadCustomerInfo() {
      this.getCustomerInformation({}, (success, result) => {
        if (!success || !result?.length > 0) {
          return;
        }

        const customer = result[0];
        this.customerModel.firstName = customer.FirstName;
        this.customerModel.lastName = customer.LastName;
        this.customerModel.address1 = customer.Address1;
        this.customerModel.address2 = customer.Address2;
        this.customerModel.city = customer.City;
        this.customerModel.state = customer.State;
        this.customerModel.zip = customer.Zip;
        this.customerModel.phoneNumber = customer.PhoneNumber;
        this.customerModel.payoutType = customer.PayoutTypeCheck ? '1' : '0';
      });
    },
    saveCustomerInfo() {
      this.$refs.skiSaleSwapCustomerFormRef.validate((errors) => {
        if (errors) {
          return;
        }

        this.savingCustomerInfo = true;
        this.errMsg = '';
        this.successMsg = '';
        this.saveCustomerInformation({
          data: {
            FirstName: this.customerModel.firstName,
            LastName: this.customerModel.lastName,
            Address1: this.customerModel.address1,
            Address2: this.customerModel.address2,
            City: this.customerModel.city,
            State: this.customerModel.state,
            Zip: this.customerModel.zip,
            PhoneNumber: this.customerModel.phoneNumber,
            PayoutTypeCheck: this.customerModel.payoutType === '1',
            PayoutTypeCowCard: this.customerModel.payoutType === '0',
          }
        }, (success, result) => {
          this.savingCustomerInfo = false;
          if (!success) {
            this.errMsg = result.message;
            return;
          }

          if (result !== true) {
            this.errMsg = 'Something went wrong. Please try again later.';
          }

          this.successMsg = 'Customer information updated successfully.';
        });
      });
    },
  },
  computed: {
    ...mapGetters([
      'themeOverrides',
    ]),
    payoutOptions() {
      return [
        {
          label: 'CoW Card Payout (90%)',
          value: '0',
        },
        {
          label: 'Check Payout (70%)',
          value: '1',
        }
      ]
    },
    tableColumns() {
      const self = this;

      return [
        {
          title: 'Price',
          render (row) {
            return `$${row.Price}`;
          },
        },
        {
          title: 'Category',
          render (row) {
            return _.find(
              self.categories,
              { SkiSwapCategoryID: row.Category }
            )?.CategoryName || '';
          },
        },
        {
          title: 'Size',
          render (row) {
            return row.SwapSkiSize;
          },
        },
        {
          title: 'Color',
          render (row) {
            return row.SwapSkiColor;
          },
        },
        {
          title: 'Model',
          render (row) {
            return row.SwapSkiModel;
          },
        },
        {
          title: 'Style',
          render (row) {
            return row.Style;
          },
        },
        {
          title: 'Actions',
          render (row) {
            return h(
              'div',
              { class: 'row-actions' },
              [
                h(
                  NButton,
                  {
                    size: 'small',
                    onClick: () => self.editItem(row.SkiSwapItemID),
                    title: 'Edit',
                    class: 'me-3',
                  },
                  { default: () => 'Edit' },
                ),
                h(
                  NButton,
                  {
                    size: 'small',
                    onClick: () => self.deleteItemConfirm(row.SkiSwapItemID),
                    title: 'Preview',
                  },
                  { default: () => 'Delete' },
                ),
            ]);
          },
        },
      ];
    },
    tableData () {
      return this.items;
    },
    tablePagination () {
      return {
        pageSize: 20,
      };
    }
  },
};
</script>

<style lang="scss">
.chute-skip-swap-status-check-cpt {
  form {
    background-color: white;
  }

  .clickable {
    color: #88d8df;
    cursor: pointer;
  }

  th {
    font-weight: bold !important;
  }

  form {

    .form-grouped-fields {
      display: flex;
      justify-content: space-between;

      > .n-form-item {
        flex: 1;
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }
      }

      @media (max-width: 767px) {
        flex-direction: column;
      }
    }
  }

  .n-data-table-table {
    overflow-x: scroll;

    @media (max-width: 991px) {
      width: 1000px;
    }
  }
}
</style>
