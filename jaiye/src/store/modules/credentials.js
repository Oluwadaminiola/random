import api from '@/api/auth';
import { Axios } from '../../config'

const state = {
    user: {},
    token: null,
    type: '',
    notification: [],
    permission: []
}

const getters = {
    user: state => state.user,
    token: state => state.token,
    type: state => state.type,
    notification: state => state.notification,
    permission: state => state.permission,
}

const actions = {
    setUser({ dispatch, commit, state }, user) {
        // Save user Details in state
        commit('setUser', user);
    },
    notify({ dispatch, commit, state }, notification, single = false) {
        if (single) {
            commit('singleNotification', notification);

            return;
        }
        commit('notify', notification);
    },
    notifys({ dispatch, commit, state }, notification) {

        commit('notifys', notification);
    },
    setPermission({ commit }, permission) {
        commit('setPermission', permission)
    },

    setToken({ dispatch, commit, state }, token) {
        //set user token in state
        commit('setToken', token)
        api.fetchUser(token).then(response => {
            if (response.status) {
                commit('setUser', response.message);
            }
        })
    },


    setType({ dispatch, commit, state }, type) {
        //set user type in state
        commit('setType', type)
    },

    setImage({ dispatch, commit, state }, args) {
        commit('setImage', args)
    },

    logout({ dispatch, commit }, args) {
        commit('logout');
        return true;
    },

    callWithToken({ dispatch, commit, state }, args) {
        const params = args.parameter;

        const storeAction = args.action;
        const token = state.token;
        params.token = token;

        return storeAction(params)
    }
}

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setPermission(state, permission) {
        state.permission = permission
    },
    setToken(state, token) {
        state.token = token;
    },
    setImage(state, image) {
        state.user.profile_thumbnail = image.thumb;
        state.user.profile_photo = image.pics;
    },
    setType(state, type) {
        state.type = type;
    },
    notify(state, notification) {
        state.notification = notification;
        console.log(notification)
    },
    notifys(state, notification) {
        notification.forEach(n => {
            state.notification.push(n)
        })
        // let n =  notification.concat(state.notification);
        // state.notification = n;
    },
    singleNotification(state, notification) {
        state.notification.unshift = notification;
    },
    logout(state) {
        state.user = {};
        state.token = null;
        state.type = '';

    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
