import { createLogger, createStore } from "vuex";

const sleep = (ms) => {
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const customers = {
  namespaced: true,
  state: {
    list: [],
    loading: false,
  },
  mutations: {
    add(state, customer) {
      state.list.unshift(customer);
    },
    set(state, customers) {
      state.list = customers;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    async get({ commit }) {
      commit("setLoading", true);
      const result = await fetch("/customers.json");
      const json = await result.json();
      commit("set", json);
      await sleep(1000);
      commit("setLoading", false);
    },
  },
};

export default createStore({
  plugins: [createLogger()],
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { customers },
});
