import Api from '@/api/events';
var state = {
    events: [],
    event: {
        event_name: '',
        event_date: new Date(),
        price: 0,
        phone: '',
        address: '',
        email: '',
        category: '',
        website: '',
        description: '',
        image: '',
        showing_time: [

        ],
        tags:[]

    },
    pages: 0,
    totalItems: 0,
    pageSize:0
}

const getters = {
    events: state => state.events,
    singleEvent: state => state.event,
    pages: state => state.pages,
    pageSize: state => state.pageSize,
    totalItems: state => state.totalItems
}

const actions = {

    createEvent({ dispatch, commit, state }, args) {
        return Api.create(args).then(res => {
            return res;
        })
    },
    
    clearEvent({ dispatch, commit, state }, args) {
        commit("clearEvent")
    },

    publishEvent({ dispatch, commit, state }, args) {
        return Api.publish(args).then(res => {
            return res;
        })
    },

    getEvents({ dispatch, commit, state }, args) {
        return Api.get(args).then(res => {
            commit("events", res.data);
        })
    },
    getEvent({ dispatch, commit, state }, args) {
        return Api.get(args).then(res => {
            commit("event", res.data);
        })
    },
    updateEvent({ dispatch, commit, state }, args) {
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

    events(state, data) {
        state.events = data.docs || [];
        state.pages = data.pages;
        state.totalItems = data.total
        state.pageSize = data.limit
    },
    clearEvent(state){
        state.event = {};
    },
    event(state, data) {
        state.event = data || {}
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
