import { createStore } from "vuex";
import axios from "axios";
import store from "../store";
import swal from 'sweetalert2';

export default createStore({
  state: {
     paypalDescription:'',
     TotalPriceShip:0,
    store,
    products: [],
    product: null,
    transactions: [],
    cart: [],
    
  },
  getters: {
    trans: (state) => state.transactions,
    cart: (state) => state.cart,
    CartIemCount:(state) => state.cart.length,
  },

  mutations: {
    /* A mutation that is used to set the products in the state. */
    SET_PRODUCTS(state, products) {
      state.products = products;
    },

    SET_PRODUCT(state, product) {
      state.product = product;
    },

    /* A mutation that is used to set the transactions in the state. */
    loadTransactions(state, payload) {
      state.transactions = payload;
    },
    /* Adding the product to the cart. */
    AddItemToCart(state, prod) {
     window.Swal = swal;
      const AddedItem = state.cart.find((product) => product.id === prod.id);
      if (AddedItem) {
        AddedItem.qty++;
      } else {
        state.cart.push({ ...prod, qty: 1 });
      }
      swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Added to your cart',
          showConfirmButton: false,
          timer: 1500
        })
    },
    AddQty(state, id) {
      const currentItem = state.cart.find((product) => product.id === id);
      currentItem.qty++;
    },
    ReduceQty(state, id) {
      const currentItem = state.cart.find((product) => product.id === id);
      if (currentItem.qty > 1) {
        currentItem.qty--;
      } else {
        state.cart = state.cart.filter((product) => product.id !== id);
      }
    },
    RemoveItem(state, id) {
      state.cart = state.cart.filter((product) => product.id !== id);
    },
  },

  actions: {
    getProducts({ commit }) {
      axios.get("http://localhost:3000/products/").then((response) => {
        commit("SET_PRODUCTS", response.data);
      });
    },
    getProduct({ commit }, productId) {
      axios
        .get(`http://localhost:3000/products/${productId}`)
        .then((response) => {
          commit("SET_PRODUCT", response.data);
        });
    },

    loadTrans(context) {
      axios.get("http://localhost:3000/products/").then((response) => {
        let reversed = response.data.reverse();
        context.commit("loadTransactions", reversed);
      });
    },
    AddToCart({ commit }, prod) {
      commit("AddItemToCart", prod);
    },
    AddQty({ commit }, id) {
      commit("AddQty", id);
    },
    ReduceQty({ commit }, id) {
      commit("ReduceQty", id);
    },
    RemoveItem({ commit }, id) {
      commit("RemoveItem", id);
    },
  },
  modules: {},
});
