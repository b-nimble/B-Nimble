<template>
  <div class="card chute-checkout-cart-info-cpt">
    <div class="card-header">
      <i class="fa fa-shopping-cart"></i>
      <strong>CART ITEMS:</strong>
      {{cartItemCount}}
    </div>
    <div class="card-body p-0">
      <div class="chute-checkout-cart-info-cpt-product p-3" v-for="product in products" :key="product.ID">
        <div class="d-flex justify-content-between">
          <div class="chute-checkout-cart-info-cpt-product-detail pe-2">
            <div class="chute-checkout-cart-info-cpt-product-name"><strong>{{product.ProductName}} - {{product.ProductVariantName}}</strong></div>
            <div class="ps-3 chute-checkout-cart-info-cpt-subproduct-name" v-for="groupProduct in product.GroupedProducts" :key="groupProduct.ProductID">
              {{groupProduct.Product_Name}} - {{groupProduct.Variant_Name}}
            </div>
            <div class="chute-checkout-cart-info-cpt-product-ext-field" v-for="extensionData in product.ExtensionData" :key="extensionData.ID">
              <i>{{extensionData.FieldDisplayName}} - {{extensionData.Value}}</i>
            </div>
          </div>
          <div class="chute-checkout-cart-info-cpt-product-price">
            <strong>${{product.ProductPrice}}</strong>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="d-flex justify-content-between mb-3">
        <div><strong>Sub Total:</strong></div>
        <div><strong>${{subTotal}}</strong></div>
      </div>
      <div class="d-flex justify-content-between mb-3" v-if="cowCardsTotalBalanceApplied > 0">
        <div><strong>Applied Cow Card:</strong></div>
        <div><strong>${{cowCardsTotalBalanceApplied}}</strong></div>
      </div>
      <div class="d-flex justify-content-between mb-3" v-if="couponAmount > 0">
        <div><strong>Coupon Amount:</strong></div>
        <div><strong>${{couponAmount}}</strong></div>
      </div>
      <div class="d-flex justify-content-between">
        <div><strong>Total:</strong></div>
        <div><strong>${{total}}</strong></div>
      </div>
    </div>
  </div>
</template>

<script>
// COMPOSABLES
import useCheckout from '@/composables/useCheckout';
import useStore from '@/composables/useStore';

export default {
  setup() {
    const {
      step1,
      cowCardsTotalBalanceApplied,
    } = useCheckout();

    const  {
      cart
    } = useStore();

    return {
      cart,

      step1,
      cowCardsTotalBalanceApplied,
    };
  },
  computed: {
    cartItemCount() {
      return this.cart?.Items?.length || 0;
    },
    products() {
      return this.cart?.Items || []
    },
    subTotal() {
      return this.cart?.SubTotal?.toFixed(2);
    },
    couponAmount() {
      return this.cart?.CouponAppliedAmount?.toFixed(2);
    },
    total() {
      if (!this.cart) {
        return '0.00';
      }

      return (this.cart?.Total - this.cowCardsTotalBalanceApplied).toFixed(2);
    },
  }
}
</script>

<style lang="scss">
  .chute-checkout-cart-info-cpt {
    &-product {
      border: 1px solid #003865;
      border-bottom: 0;
    }

    .card-body {
      > .chute-checkout-cart-info-cpt-product:last-child {
        border: 1px solid #003865;
        border-bottom: 1px solid #003865;
      }
    }

    .card-header {
      padding: 0.75rem 0.5rem;
      background-color: #003865;
      color: #fff;
      border-radius: 0;
      font-family: 'rift-soft', Impact, sans-serif;
      font-size: 1.5rem;

      i {
        margin-right: 5px;
        font-size: 1.5rem;
      }
    }

    .card-footer {
      padding: 0.75rem 0.5rem;
      background-color: #003865;
      color: #fff;
      border-radius: 0;
    }


    .chute-checkout-cart-info-cpt-subproduct-name,
    .chute-checkout-cart-info-cpt-product-ext-field {
      font-size: 0.9rem;
    }
  }
</style>
