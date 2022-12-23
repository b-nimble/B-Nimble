
// PreCartItems
export const precartProducts = state => {
  return state.precart.added
}

// PreCartItems Subtotal
export const precartSubTotal = state => {
  const sum = precartProducts(state).reduce((subtotal, item) => {
    return subtotal + item.Price * item.quantity
  }, 0)
  return sum
}
// PreCartItems QTY
export const precartQtyTotal = state => {
  const sum = precartProducts(state).reduce((subtotal, item) => {
    return subtotal + item.quantity
  }, 0)
  return sum
  // return state.precart.added.length
}

export const themeOverrides = () => {
  return {
    common: {
      primaryColor: '#88d8df ',
      primaryColorHover: '#003865 ',
      primaryColorPressed: '#003865 ',
    },
  };
}

// PreCartItems QTY

// PreCartItems Subtotal
/*
export const precartProducts = state => {
  return state.precart.added
}
precartProducts: state => {
      return state.todos.filter(todo => todo.done)
    }
export const itemsQuantity = state => {
  return precartProducts(state).reduce((quantity, item) => {
    return quantity + item.quantity
  }, 0)
}

export const subtotal = state => {
  const sum = precartProducts(state).reduce((subtotal, item) => {
    return subtotal + item.price
  }, 0)
} */
