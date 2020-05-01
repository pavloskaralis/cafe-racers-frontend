import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: "",
  },
  mutations: {
    setID(state, payload) {
      state.id = payload;
    },
  },
  actions: {
    async checkID(context) {
      const token = localStorage.getItem("cafe-racers");
      const url = "http://localhost:8000/api/jwt";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(url, config);
      const jwt = response.data.jwt;
      if (jwt) localStorage.setItem("cafe-racers", jwt);
      const id = response.data.id;
      context.commit("setID", id);
    },
  },
  modules: {},
});
