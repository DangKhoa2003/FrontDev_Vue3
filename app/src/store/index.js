import { createStore } from "vuex";
import axios from "axios";
import store from "../store";

export default createStore({
  state: {
    store,
    products: [],
    product: null,
    transactions: [],
    cart: [],
  },
  getters: {
    trans: (state) => state.transactions,
    cart: (state) => state.cart,
  },

  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },

    SET_PRODUCT(state, product) {
      state.product = product;
    },

    loadTransactions(state, payload) {
      state.transactions = payload;
    },
    AddItemToCart(state, prod) {
      const AddedItem = state.cart.find((product) => product.id === prod.id);
      if (AddedItem) {
        AddedItem.qty++;
      } else {
        state.cart.push({ ...prod, qty: 1 });
      }
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
