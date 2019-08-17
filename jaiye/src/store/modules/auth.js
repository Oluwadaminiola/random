import api from '@/api/auth';


const state = {

}

const getters = {

}

const actions = {
    signup({ dispatch, commit }, args) {
        return api.signup(args).then(result => {
            return result;
        })
    },
    resend({ dispatch, commit}, args) {
        return api.resendConfirmation(args).then(result => {
            return result;
        })
    },
    confirm({ dispatch, commit}, args) {
        return api.confirmAccount(args).then(result => {
            return result;
        })
    },
    login({ dispatch, commit, state }, args) {
        return api.login(args)
        .then((result) => {
            if (result.status) {
                    // dispatch('credentials/setUser', result.message, { root: true })
                    dispatch('credentials/setToken', result.data.token, { root: true });
                    dispatch('credentials/setType', result.type, {root: true});
                    // dispatch('credentials/setPermission', result.permission, {root: true});
                    return result
            }
            return result;
        })
    },
    setPassword({ commit }, args) {
        return api.setPassword(args).then((result) => {
            if (result.status) {
                // commit('setSuccess', result.message)
                return result.message
            } else {
                // commit('setError', result.error)
                return result.message
            }
        })
    },
    changePassword({ commit }, args) {
        return api.changePassword(args).then((result) => {
            if (result.status) {
                // commit('setSuccess', result.message)
                return result.message
            } else {
                // commit('setError', result.error)
                return result.message
            }
        })
    }, 
    resetPassword({ commit }, args) {
        return api.resetPassword(args).then((result) => {
            return result;
            if (result.status) {
                // commit('setSuccess', result.message)
                return result.message
            } else {
                // commit('setError', result.error)
                return result.message
            }
        })
    },
    resendPassword({ commit }, args) {
        return api.resendPassword(args).then((result) => {
            return result;
            if (result.status) {
                // commit('setSuccess', result.message)
                return result.message
            } else if (result.error) {
                // commit('setError', result.error);
                return false;
            } else {
                // commit('setError', result.error)
                return result.message
            }
        })
    },
    updateAccount({ commit }, args) {
        return api.updateAccount(args).then((result) => {
            return result;
        })
    },
    // confirmAccount({ commit }, args) {
    //     return result;
    //     return api.confirmAccount(args).then((result) => {
    //         if (result.status) {
    //             // commit('setSuccess', result.message)
    //             return result.message
    //         } else if (result.error) {
    //             // commit('setError', result.error);
    //             return false;
    //         } else {
    //             // commit('setError', result.error)
    //             return result.message
    //         }
    //     })
    // },
    confirmResetToken({ commit }, args) {
        return api.confirmResetToken(args).then((result) => {
            return result;
        })
    },
    setResetPassword({  }, args) {
        return api.setResetPassword(args).then((result) => {
            return result;
        })
    },



}

const mutations = {
    
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}