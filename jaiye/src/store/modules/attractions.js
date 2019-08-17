import Api from '@/api/attractions';
var state = {
    attractions: [],
    attraction: {
        name: '',
        tags: [],
        bussiness_days: [],
        price: '',
        website: '',
        phone: "",
        address: "",
        description: "",
        image_photo:"",
        opening_hour: "",
        closing_hour: ""
    },
    totalItems:0,
      pageSize:0,
      pages:0
}

const getters = {
    attractions: state => state.attractions,
    singleAttraction: state => state.attraction,
    pageSize: state => state.pageSize,
    pages: state => state.pages,
    totalItems: state => state.totalItems,
}

const actions = {

    createAttraction({ dispatch, commit, state }, args) {
        return Api.create(args).then(res => {
            return res;
        })
    },

    publishEvent({ dispatch, commit, state }, args) {
        return Api.publish(args).then(res => {
            return res;
        })
    },

    getAttractions({ dispatch, commit, state }, args) {
        return Api.get(args).then(res => {
            commit("attractions", res.data);
        })
    },
    getAttraction({ dispatch, commit, state }, args) {
        return Api.get(args).then(res => {
            commit("attraction", res.data);
        })
    },
    updateAttraction({ dispatch, commit, state }, args) {
        return Api.update(args).then(res => {
            return res
        })
    },
    updateEventTiming({ dispatch, commit, state }, args) {
        return api.updateTiming(args).then(res => {
            return res;
        })
    },
    addEventTiming({ dispatch, commit, state }, args) {
        return api.addTiming(args).then(res => {
            return res;
        })
    }



}

const mutations = {

    attractions(state, data) {
        state.attractions = data.docs || []
        state.pages = data.pages;
        state.totalItems = data.total
        state.pageSize = data.limit
    },
    attraction(state, data) {
        state.attraction = data || {}
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
