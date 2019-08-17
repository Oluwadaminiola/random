import Api from '@/api/ads';
var state = {
    ads: [],
    ad: {
        name: '',
        content: '',
        website: '',
        phone: "",
        duration: "",
        description: "",
        image: "",
    },
    totalItems:0,
      pageSize:0,
      pages:0
}

const getters = {
    ads: state => state.ads,
    singleAd: state => state.ad,
    pageSize: state => state.pageSize,
    pages: state => state.pages,
    totalItems: state => state.totalItems,
}


const actions = {

    createAd({ dispatch, commit, state }, args) {
        return Api.create(args).then(res => {
            return res;
        })
    },
    delete({ dispatch, commit, state }, args) {
        return Api.delete(args).then(res => {
            return res
        })
    },
    publishEvent({ dispatch, commit, state }, args) {
        return Api.publish(args).then(res => {
            return res;
        })
    },

    getAds({ dispatch, commit, state }, args) {
        return Api.get(args).then(res => {
            commit("ads", res.data);
        })
    },
    getAd({ dispatch, commit, state }, args) {
        return Api.get(args).then(res => {
            commit("ad", res.data);
        })
    },
    updateAd({ dispatch, commit, state }, args) {
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

    ads(state, data) {
        state.ads = data.docs || []
        state.pages = data.pages;
        state.totalItems = data.total
        state.pageSize = data.limit
    },
    ad(state, data) {
        state.ad = data || {}
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
