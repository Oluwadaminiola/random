import api from '@/api/settings';

const state = {
    fees: {},
}

const getters = {
    fees: (state) => state.fees
}

const actions = { 

    updateSetting({ dispatch, commit, state}, args) {
        return api.updateSetting(args).then(res => {
            if(res.status && res.message.pics){
                    dispatch("credentials/setImage", {thumb: res.message.thumb, pics: res.message.pics}, {root: true});
                    return res;
            }
            return res
        })
    },

    updateProfile({ dispatch, commit, state}, args) {
        return api.updateProfile(args).then(res => {
            if(res.status){
                    dispatch("credentials/setImage", {pics: res.message.pics}, {root: true});
                    return res;
            }
            return res
        })
    },
    
    profile({ dispatch, commit, state}, args) {

    },
    company({ dispatch, commit, state}, args) {
        
    },
    account({ dispatch, commit, state}, args) {
        return api.setFees(args).then(res => {
            return res;
        })
    },
    getAccount({ dispatch, commit, state}, args) {
        return api.fetchFees(args).then(res => {
            if(res.status ) {
                commit('setFees', res.message)
            }
            return res;
        })
    }
    
    
}

const mutations = {
    
    logout(state) {
        state.user = {};
    },
    setFees(state,  data) {
        state.fees = data || {}
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  }
  