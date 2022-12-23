<template>
  <div class="ski-sale-swap-input-item-cpt">
    <!-- Modal -->
    <div class="modal fade" :id="modalId" tabindex="-1" :aria-labelledby="`${modalId}Label`" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="`${modalId}Label`">Online Entry</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <n-form
              :model="itemModal"
              ref="skiSaleSwapItemFormRef"
              :rules="rules">
              <div class="form-grouped-fields">
                <n-form-item path="category" label="Category" :label-props="{for: 'skiSaleSwapItemFormRef-category'}">
                  <n-select :input-props="{id: 'skiSaleSwapItemFormRef-category'}" v-model:value="itemModal.category" :show-require-mark="true" placeholder="" :options="categoryOptions" :filterable="true"/>
                </n-form-item>
                <n-form-item path="quantity" label="Quantity" :label-props="{for: 'skiSaleSwapItemFormRef-quantity'}">
                  <n-input-number :input-props="{id: 'skiSaleSwapItemFormRef-quantity'}" v-model:value="itemModal.quantity" :show-require-mark="true" placeholder=""/>
                </n-form-item>
              </div>
              <div class="form-grouped-fields">
                <n-form-item path="price" label="Price" :label-props="{for: 'skiSaleSwapItemFormRef-price'}">
                  <n-input-number :input-props="{id: 'skiSaleSwapItemFormRef-price'}" v-model:value="itemModal.price" :show-require-mark="true" placeholder="">
                    <template #prefix>
                      $
                    </template>
                  </n-input-number>
                </n-form-item>
                <n-form-item path="model" label="Model / Name" :label-props="{for: 'skiSaleSwapItemFormRef-model'}">
                  <n-input :input-props="{id: 'skiSaleSwapItemFormRef-model'}" v-model:value="itemModal.model" :show-require-mark="true" placeholder="">
                  </n-input>
                </n-form-item>
              </div>
              <div class="form-grouped-fields">
                <n-form-item path="brand" label="Brand" :label-props="{for: 'skiSaleSwapItemFormRef-brand'}">
                  <n-select :input-props="{id: 'skiSaleSwapItemFormRef-brand'}" v-model:value="itemModal.brand" :show-require-mark="true" placeholder="" :options="brandOptions" :filterable="true"/>
                </n-form-item>
                <n-form-item path="size" label="Size" :label-props="{for: 'skiSaleSwapItemFormRef-size'}">
                  <n-input :input-props="{id: 'skiSaleSwapItemFormRef-size'}" v-model:value="itemModal.size" :show-require-mark="true" placeholder=""/>
                </n-form-item>
              </div>
              <div class="form-grouped-fields">
                <n-form-item path="color" label="Color" :label-props="{for: 'skiSaleSwapItemFormRef-color'}">
                  <n-input :input-props="{id: 'skiSaleSwapItemFormRef-color'}" v-model:value="itemModal.color" :show-require-mark="true" placeholder=""/>
                </n-form-item>
                <n-form-item path="style" label="Style" :label-props="{for: 'skiSaleSwapItemFormRef-style'}">
                  <n-select :input-props="{id: 'skiSaleSwapItemFormRef-style'}" v-model:value="itemModal.style" :show-require-mark="true" placeholder="" :options="styleOptions" :filterable="true"/>
                </n-form-item>
              </div>
              <div>
                <div class="d-flex justify-content-center" v-if="errMsg">
                  <div style="width:100%" class="alert alert-danger">{{ errMsg }}</div>
                </div>
              </div>
            </n-form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <n-button type="primary" @click="saveNewItem" :loading="saving">Save New Item Record</n-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import {
  NForm,
  NFormItem,
  NButton,
  NInput,
  NInputNumber,
  NCheckbox,
  NSpin,
  NSelect,
  NRadio,
  NRadioGroup,
  NSpace,
} from 'naive-ui';
import _ from 'lodash';

// COMPOSABLES
import useSkiSwap from '@/composables/useSkiSwap';

export default {
  props: {
    modalId: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: false,
      default: null
    },
    categories: {
      type: Array,
      required: false,
      default: []
    },
    styles: {
      type: Array,
      required: false,
      default: []
    },
    brands: {
      type: Array,
      required: false,
      default: []
    },
  },
  setup() {
    const {
      getSkiSwapBrand,
      getSkiSwapCategory,
      getSkiSwapStyle,
      saveSkiSwapItem,
    } = useSkiSwap();

    return {
      getSkiSwapBrand,
      getSkiSwapCategory,
      getSkiSwapStyle,
      saveSkiSwapItem,

      errMsg: ref(''),
      saving: ref(false),

      itemModal: ref({
        category: '',
        quantity: 1,
        price: 0,
        model: '',
        brand: '',
        size: '',
        style: '',
        color: '',
      }),
    };
  },
  components: {
    NForm,
    NFormItem,
    NButton,
    NInput,
    NInputNumber,
    NCheckbox,
    NSpin,
    NSelect,
    NRadio,
    NRadioGroup,
    NSpace,
  },
  methods: {
    saveNewItem() {
      this.$refs.skiSaleSwapItemFormRef.validate((errors) => {
        if (errors) {
          console.log(errors);

          return;``
        }

        this.saving = true;
        this.saveSkiSwapItem({
          data: {
            Category: this.itemModal.category,
            Quantity: this.itemModal.quantity,
            Price: this.itemModal.price,
            Description: '',
            SwapSkiBrandID: this.itemModal.brand,
            SwapSkiModel: this.itemModal.model,
            SwapSkiColor: this.itemModal.color,
            SwapSkiSize: this.itemModal.size,
            Style: this.itemModal.style,
            SkiSwapID: this.item ? this.item.SkiSwapID : null,
            SkiSwapItemID: this.item ? this.item.SkiSwapItemID : null,
          }
        }, (success, result) => {
          this.saving = false;

          if (!success || !result) {
            this.errMsg = result.message;

            return;
          }

          const modal = window.bootstrap.Modal.getOrCreateInstance(
            document.getElementById('saleSwapInputItem')
          );

          if (modal) {
            modal.hide();
          }

          this.$emit('updated');
        })
      });
    }
  },
  computed: {
    rules() {
      return {
        category: [
          {
            type: 'number',
            required: true,
            trigger: ['input'],
            message: 'Category is required',
          },
        ],
        quantity: [
          {
            type: 'number',
            required: true,
            trigger: ['input'],
            message: 'Quantity is required',
          },
        ],
        price: [
          {
            type: 'number',
            required: true,
            trigger: ['input'],
            message: 'Price is required',
          },
        ],
        model: [
          {
            required: true,
            trigger: ['input'],
            message: 'Model / Name is required',
          },
        ],
        brand: [
          {
            type: 'number',
            required: true,
            trigger: ['input'],
            message: 'Brand is required',
          },
        ],
        size: [
          {
            required: true,
            trigger: ['input'],
            message: 'Size is required',
          },
        ],
        color: [
          {
            required: true,
            trigger: ['input'],
            message: 'Color is required',
          },
        ],
        style: [
          {
            type: 'number',
            required: true,
            trigger: ['input'],
            message: 'Style is required',
          },
        ],
      };
    },
    categoryOptions() {
      return this.categories
        .map((b) => ({label: b.CategoryName, value: b.SkiSwapCategoryID}));
    },
    brandOptions() {
      return this.brands
        .map((b) => ({label: b.BrandName, value: b.SkiSwapBrandID}));
    },
    styleOptions() {
      return this.styles
        .map((b) => ({label: b.StyleName, value: b.SkiSwapStyleID}));
    }
  },
  watch: {
    item (newVal) {
      if (!newVal) {
        this.itemModal.category = '';
        this.itemModal.quantity = 1;
        this.itemModal.price = 0;
        this.itemModal.model =  '';
        this.itemModal.brand = '';
        this.itemModal.size = '',
        this.itemModal.style = '',
        this.itemModal.color = '';

        return;
      }

      this.itemModal.category = newVal.Category;
      this.itemModal.quantity = newVal.Quantity;
      this.itemModal.price = newVal.Price;
      this.itemModal.model =  newVal.SwapSkiModel;
      this.itemModal.brand = newVal.SwapSkiBrandID;
      this.itemModal.size = newVal.SwapSkiSize;
      this.itemModal.style = Number(newVal.Style);
      this.itemModal.color = newVal.SwapSkiColor;
    }
  }
}
</script>

<style lang="scss">
.ski-sale-swap-input-item-cpt {
  form {
    .n-form-item {
      flex: 1;
    }
    .n-input-number {
      width: 100%;
    }
  }
}
</style>
