import api from '@/api/support';

const state = {
    allSupport: [],
    ticket: {
        created_by: {}
    },
    support: {}
}

const getters = {
    support: state => state.support,
    allSupport: state => state.allSupport,
    ticket: state => state.ticket
}

const actions = {

    create({
        dispatch,
        commit,
        state
    }, args) {
        return api.create(args).then(response => {
            // if(response.status) {
            return response
            // }
        })
    },
    discuss({
        dispatch,
        commit,
        state
    }, args) {
        commit("set_ticket", args);
    },

    getAll({
        dispatch,
        commit,
        state
    }, args) {
        return api.getAll(args).then(response => {
            if (response.status) {
                commit('setSupport', response.message);
            }
            return response;
        })
    },

    single({
        dispatch,
        commit,
        state
    }, args) {
        return api.single(args).then(response => {
            if (response.status) {
                commit('setDetails', response.message);
            }
            return response;
        })
    },

    update({
        dispatch,
        commit,
        state
    }, args) {
        return api.update(args).then(response => {
            if (response.status) {
                commit('setDetails', response.message);
            }
            return response
        })
    },
}


const mutations = {

    setSupport(state, data) {
        state.allSupport = data || [];
    },

    setDetails(state, data) {
        state.suport = data || {};
    },
    set_ticket(state, data) {
        state.ticket = data || {};
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}