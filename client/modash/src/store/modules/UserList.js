import axios from "axios";
import config from "../../config/config";

const state = {
  users: [],
};

const getters = {
  users: (state) => state.users,
};

const actions = {
  async fetchUsers({ commit }) {
    const response = await axios.get(`${config.BASE_URL}/api/v1/all`);
    commit("setUsers", response.data);
  },

  // async getProfile(name) {
  //   for (let user of state.users) {
  //     if (user !== state.users.name) continue;
  //     return user;
  //   }
   
 // },
};

const mutations = {
  setUsers: (state, users) => (state.users = users),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
