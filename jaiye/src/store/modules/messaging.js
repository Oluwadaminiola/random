import api from '@/api/message';

const state = {
    list: [],
}

const getters = {
    list: state => state.list,
}

const actions = { 

    getAll({ dispatch, commit, state}, args) {
        return api.getAll(args).then(response => {
            // console.log(response)
            console.log('res', response)
            if(response.status) {
                commit('setList', response.message);
            }
            return response;
        })
    },

}


const mutations = {
    
    setList(state, data) {
        state.list = data || [];
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  }
  