import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = state.items.find((item) => item.id === action.payload.id)

      if (product) {
        product.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    decrementQuantity(state, action) {
      const product = state.items.find((item) => item.id === action.payload)

      if (product) {
        product.quantity -= 1
        if (product.quantity === 0) {
          state.items = state.items.filter((item) => item.id !== action.payload)
        }
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, decrementQuantity, removeFromCart, clearCart } = cartSlice.actions

export const selectCartItems = (state) => state.cart.items
export const selectCartCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0)
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

export default cartSlice.reducer
