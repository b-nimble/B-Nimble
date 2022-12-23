export const addToPreCart = ({ commit }, {variant, multi}) => {
  // state, variantId, ProductName, VariantName, Price, Variant
  console.log('seh' + multi)
  commit('ADD_TO_PRECART', {variant, multi: multi})
}

export const removeFromPreCart = ({ commit }, {product, variant, multi}) => {
  commit('REMOVE_FROM_PRECART', {product, variant, multi})
}

export const removeAllFromPreCart = ({ commit }) => {
  console.log('remove all ')
  commit('REMOVE_ALL_FROM_PRECART')
}
