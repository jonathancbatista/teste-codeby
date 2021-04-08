export const state = () => ({
  cart: [],
})

export const mutations = {
  add (state, item) {
    const record = state.cart.find(i => i.id === item.id),
          index = state.cart.findIndex(i => i.id === item.id)

    if (!record) {
      state.cart.push({
        quantity: 1,
        ...item
      })
    } else {
      record.quantity++
    }
  },
  remove(state, item) {
    const record = state.cart.find(i => i.id === item.id)

    if (record.quantity > 1) {
      record.quantity--
    } else {
      const index = state.cart.findIndex(i => i.id === item.id)
      state.cart.splice(index, 1)
    }
  },
  emptyList(state) {
    state.cart = []
  }
}

export const getters = {
  cart: state => {
    return state.cart
  },

  totalPrice: state => {
    return state.cart.reduce(
      (accumulator, item) => accumulator + item.sellingPrice * item.quantity,
      0
    )
  },

  totalItens: state => {
    return state.cart.length
  },

  countItens: state => {
    return state.cart.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    )
  },

  itemQuantity: (state) => (item) => {
    const record = state.cart.find(i => i.id === item.id)

    return record ? record.quantity : 0
  },

  itemTotalPrice: (state) => (item) => {
    const record = state.cart.find(i => i.id === item.id)

    return record ? record.quantity * record.sellingPrice : 0
  }
}