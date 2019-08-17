import Api from '@/api/listing';
var state = {
    listings: [],
    listing: {
        tags: [],
        bussiness_days: [],
        industry: [],
        business_name: "",
        description: "",
        opening_time:"",
        closing_time:"",
        image:"",
        email:"",
        phone:"",
        address:"",
        website: ""
      },
      totalItems:0,
      pageSize:0,
      pages:0
}

const getters = {
    listings: state => state.listings,
    singleListing: state => state.listing,
    pageSize: state => state.pageSize,
    pages: state => state.pages,
    totalItems: state => state.totalItems,

}

const actions = {

    createListing({ dispatch, commit, state }, args) {
        return Api.create(args).then(res => {
            return res;
        })
    },

    getListings({ dispatch, commit, state }, args) {
        return Api.get(args).then(res => {
            commit("listings", res.data);
        })
    },
    getListing({ dispatch, commit, state }, args) {
        return Api.get(args).then(res => {
            commit("listing", res.data);
        })
    },
    updateListing({ dispatch, commit, state }, args) {
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

    listings(state, data) {
        state.listings = data.docs || []
        state.pages = data.pages;
        state.totalItems = data.total
        state.pageSize = data.limit
    },
    listing(state, data) {
        state.listing = data || {};
        
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
