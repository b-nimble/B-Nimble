const state = {
  added: [],
  cartAvail: 0
}

const mutations = {
  ADD_TO_PRECART (state, {variant, multi}) {
    // check if qty
    console.log('ck' + multi)
    if (multi) {
      console.log('is multi')
      var found = false

      for (var i = 0; i < state.added.length; i++) {
        console.log(state.added.length + '--' + state.added[i].variantId)
        if (state.added[i].variantId === variant.VariantID) {
          var newProduct = state.added[i]
          newProduct.quantity = newProduct.quantity + 1
          state.added.$set(i, newProduct)
          // console.log("DUPLICATE",  vue.cart[i].product + "'s quantity is now: " + vue.cart[i].quantity);
          console.log('DUPLICATE quantity is now: ')
          found = true
          break
        }
      }
      if (!found) {
        // product.quantity = 1;
        state.added.push({
          variantId: variant.VariantID,
          quantity: 1,
          VariantName: variant.VariantName,
          Price: variant.currentPrice,
          calendarDate: variant.calendarDate,
          level: variant.level,
          Variant: variant,
          optionalItems: variant.optionalItems,
          selectionOptionalItems: variant.selectionOptionalItems,
          multi: multi
        })
      }
    } else {
      state.added.push({
        variantId: variant.VariantID,
        quantity: 1,
        VariantName: variant.VariantName,
        Price: variant.currentPrice,
        calendarDate: variant.calendarDate,
        level: variant.level,
        Variant: variant,
        optionalItems: variant.optionalItems,
        selectionOptionalItems: variant.selectionOptionalItems,
        multi: multi
      })
    }
  },

  REMOVE_FROM_PRECART (state, {index, variant, multi}) {
    console.log('index removes: ' + index)
    if (multi) {
      console.log('is multi')
      for (var i = 0; i < state.added.length; i++) {
        console.log(state.added.length + '--' + state.added[i].variantId)
        if (state.added[i].variantId === variant.VariantID) {
          var newProduct = state.added[i]
          if (newProduct.quantity > 1) {
            newProduct.quantity = newProduct.quantity - 1
            state.added.$set(i, newProduct)
          } else {
            state.added.splice(i, 1)
            console.log('splice multi')
          }
          // console.log("DUPLICATE",  vue.cart[i].product + "'s quantity is now: " + vue.cart[i].quantity);
          console.log('DUPLICATE quantity is now: ')
          break
        }
      }
    } else {
      console.log('splice non multi' + index)
      state.added.splice(index, 1)
      console.log('splice non multi')
    }
  },

  REMOVE_ALL_FROM_PRECART (state) {
    state.added = []
  }
}

export default {
  state,
  mutations
}
