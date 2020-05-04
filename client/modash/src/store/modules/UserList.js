import axios from "axios";
import config from "../../config/config";

const state = {
  users: [],
  error:{}
};

const getters = {
  users: (state) => state.users,
  error:(state) => state.error,
};

const actions = {
  async fetchUsers({ commit }) {
    try{
      const users = await axios.get(`${config.BASE_URL}/api/v1/all`);    
      if (users.status === 200) {  
         commit("setUsers", users.data);        
      }
    }catch(error) {
      commit("setError", error.response.data);      
    }
   
  },
};

const mutations = {
  setUsers: (state, users) => (state.users = users),
  setError: (state, error) => (state.error = error),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
