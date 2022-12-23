<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="chute-skip-swap-status-check-cpt">
      <n-form :model="model" ref="skipSwapStatusCheckFormRef" :rules="rules"
          class="mx-auto card p-5">
        <h4>Watch the status of your items in the Swap</h4>
        <p>Enter your last name and click on your client number to see all your items.</p>
        <n-form-item path="lastName" label="Last Name" :label-props="{for: 'skiSwapStatusCheck-lastName'}">
          <n-input :input-props="{id: 'skiSwapStatusCheck-lastName'}" v-model:value="model.lastName" :show-require-mark="true" placeholder="" />
        </n-form-item>
        <div>
          <div class="d-flex justify-content-center" v-if="errMsg">
            <div style="width:100%" class="alert alert-danger">{{ errMsg }}</div>
          </div>
          <div class="d-flex justify-content-center align-items-center flex-column">
            <n-button :loading="clickTriggered" size="large" @click="submit" type="primary">
              Lookup
            </n-button>
          </div>
        </div>
      </n-form>
      <!-- SKIP SWAP CLIENTS -->
      <n-data-table
        class="mt-5"
        v-if="items && items.length > 0"
        :columns="tableColumns"
        :data="tableData"
        :pagination="tablePagination"
        :bordered="true"
        striped
      />
      <div class="d-flex justify-content-center my-5"><n-spin size="large" v-if="clickTriggered && currentClientId" /></div>
    </div>
  </n-config-provider>
</template>

<script>
import { ref, h } from 'vue';
import { mapGetters } from 'vuex';
import moment from 'moment';
import {
  NConfigProvider,
  NForm,
  NFormItem,
  NButton,
  NInput,
  NCheckbox,
  NDataTable,
  NSpin,
} from 'naive-ui';
import useSkiSwap from '@/composables/useSkiSwap';

export default {
  setup() {
    const modelRef = ref({
      lastName: ref(''),
    });

    const {
      getAllByLastName,
      getAllByClientID,
    } = useSkiSwap();

    return {
      getAllByLastName,
      getAllByClientID,

      currentClientId: ref(null),
      items: ref([]),
      errMsg: ref(''),
      clickTriggered: ref(false),
      model: modelRef,
      rules: {
        lastName: [
          {
            required: true,
            trigger: ['input'],
            message: 'Last Name is required',
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
  },
  methods: {
    submit() {
      this.$refs.skipSwapStatusCheckFormRef.validate((errors) => {
        if (errors) {
          return;
        }

        this.currentClientId = null;
        this.errMsg = '';
        this.clickTriggered = true;
        this.items = [];
        this.getAllByLastName({
          params: {
            lastName: this.model.lastName,
          }
        }, (success, result) => {
          console.log(result);
          this.clickTriggered = false;

          if (!success) {
            this.errMsg = result.message;

            return;
          }

          if (result && result.length === 0) {
            this.errMsg = 'Name not found.';

            return;
          }

          this.items = result || [];
        });
      });
    },
    getClientDetails(clientId) {
      this.currentClientId = clientId;
      this.errMsg = '';
      this.clickTriggered = true;
      this.items = [];
      this.getAllByClientID({
        params: {
          clientID: clientId,
        }
      }, (success, result) => {
        console.log(result);
        this.clickTriggered = false;

        if (!success) {
          this.errMsg = result.message;

          return;
        }

        this.items = result || [];
      });
    },
  },
  computed: {
    ...mapGetters([
      'themeOverrides',
    ]),
    tableColumns() {
      const self = this;

      if (this.currentClientId) {
        return [
          {
            title: 'Product Type',
            render (row) {
              return row.categoryname;
            },
          },
          {
            title: 'Product Number',
            render (row) {
              return row.barcode;
            },
          },
          {
            title: 'Item Description',
            render (row) {
              return row.description;
            },
          },
          {
            title: 'Price',
            render (row) {
              return `$${row.price}`;
            },
          },
          {
            title: 'Sold?',
            render (row) {
              return row.sold;
            },
          },
          {
            title: 'Date Sold',
            render (row) {
              return row.solddate ? moment(row.solddate).fromNow() : '';
            },
          },
        ];
      }

      return [
        {
          title: '#',
          render (row) {
            return h(
              'div',
              {class: 'clickable', onclick: () => self.getClientDetails(row.clientnum)},
              row.clientnum
            );
          },
        },
        {
          title: 'First Name',
          render (row) {
            return row.firstname;
          },
        },
        {
          title: 'Last Name',
          render (row) {
            return row.lastname;
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
  .clickable {
    color: #88d8df;
    cursor: pointer;
  }

  th {
    font-weight: bold !important;
  }
}
</style>
