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
