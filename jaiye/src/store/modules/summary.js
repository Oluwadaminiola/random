import api from '@/api/summary';

const state = {
    summary: [],
}

const getters = {
    summary: (state) => state.summary
}

const actions = { 

    summary({ dispatch, commit, state}, args) {
        return api.summary(args).then(res => {
            if(res.status) {
                commit('setSummary', res.message)
            }
            return res
        })
    },
}

const mutations = {
    
    setSummary(state, data) {
        state.summary = data || [];
    },
    
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  }
  