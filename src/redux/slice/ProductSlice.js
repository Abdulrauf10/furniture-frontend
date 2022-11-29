import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from '../../api/api'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    value: {
      products: [],
      cartItem: localStorage.getItem("cartItem")? JSON.parse(localStorage.getItem("cartItem")) : [],
      productQuantity: 0,
      productTotal: 0,
    }
  },
  reducers:{
    getProducts: (state, action) => {
      state.value.products = action.payload
    },
    addToCart(state, action) {
      const existingIndex = state.value.cartItem.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.value.cartItem[existingIndex] = {
          ...state.value.cartItem[existingIndex],
          cartQuantity: state.value.cartItem[existingIndex].cartQuantity + 1,
        };
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.value.cartItem.push(tempProductItem);
      }
      localStorage.setItem("cartItem", JSON.stringify(state.value.cartItem));
    },
    decreaseCart(state, action) {
      const itemIndex = state.value.cartItem.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.value.cartItem[itemIndex].cartQuantity > 1) {
        state.value.cartItem[itemIndex].cartQuantity -= 1;
      } else if (state.value.cartItem[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.value.cartItem.filter(
          (item) => item.id !== action.payload.id
        );

        state.value.cartItem = nextCartItems;
      }

      localStorage.setItem("cartItem", JSON.stringify(state.value.cartItem));
    },
    removeFromCart(state, action) {
      state.value.cartItem.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.value.cartItem.filter(
            (item) => item.id !== cartItem.id
          );

          state.value.cartItem = nextCartItems;
        }
        localStorage.setItem("cartItem", JSON.stringify(state.value.cartItem));
        return state;
      });
    },
    totalItem(state, action) {
      let { total, quantity } = state.value.cartItem.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.value.productQuantity = quantity;
      state.value.productTotal = total;
    },
    clearCart(state, action) {
      state.value.cartItem = [];
      localStorage.setItem("cartItem", JSON.stringify(state.value.cartItem));
    },
  }
})

export const { getProducts, addToCart, decreaseCart, removeFromCart, totalItem, clearCart } = productSlice.actions

export default productSlice.reducer

// create thunk to render all 
export const getDataProducts = () => (dispatch) => {
  getAllProducts()
  .then((res) => {
    const data = res.map((item) => {
      return {
        id: item.id,
        image: item.image,
        name: item.name,
        price: item.price,
        description: item.description 
      }
    })
    dispatch(getProducts(data))
  })
}
