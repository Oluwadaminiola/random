import Api from '@/api/user';

const state = {
    dashboard: {},
    users: [],
    company: {},
    company_name: '',
    count:0,
    totalItems:0,
    pages:0,
    pageSize:0,
    user:{}
}

const getters = {
    dashboard: state => state.dashboard,
    users: state => state.users,
    user: state => state.user,
    company: state => state.company,
    company_name: state => state.company_name,
    count: state => state.count,
    pageSize: state => state.pageSize,
    pages: state => state.pages,
    totalItems: state => state.totalItems,
}

const actions = { 

    dashboardDetails({ dispatch, commit, state}, args) {
        return api.dashboard(args).then(response => {
            // if(response.status) {
                    if(response.status == true) {
                        // console.log('adf', response.message)
                        commit('dashboard', response.message)
                    }
                return response
            // }
        })
    },

    getUsers({ dispatch, commit, state}, args) {
        return Api.get(args).then(response => {
                commit('users', response.data);
        })
    },
    getUser({ dispatch, commit, state}, args) {
        return Api.get(args).then(response => {
                commit('user', response.data);
        })
    },

    //get admin users for platform;
    getAllAdmin({ dispatch, commit, state}, args) {
        return api.admin(args).then(response => {
            if(response.status) {
                commit('users', response.message);
                commit('setCount', response.count);
                
            }
            return response;
        })
    },

    //get all agents for platform;
    getAllAgents({ dispatch, commit, state}, args) {
        return api.agents(args).then(response => {
            if(response.status) {
                commit('users', response.message);
                commit('setCount', response.count);
                
            }
            return response;
        })
    },
    //get all agent for platform;
    getAllIndividuals({ dispatch, commit, state}, args) {
        return api.getAllIndividuals(args).then(response => {
            if(response.status) {
                commit('users', response.message);
                commit('setCount', response.count);
                
            }
            return response;
        })
    },
    
    getFreelance({ dispatch, commit, state}, args) {
        return api.freelance(args).then(response => {
            if(response.status) {
                commit('users', response.message);
                commit('setCount', response.count);
                
            }
            return response;
        })
    },

    //create agent
    createAgent({ dispatch, commit, state}, args) {
        return api.createAgent(args).then(response => {
            if(response.status) {
                // commit('agent', response.message);
            }
            return response;
        })
    },

    //create admin
    createAdmin({ dispatch, commit, state}, args) {
        return api.createAdmin(args).then(response => {
            if(response.status) {
                // commit('agent', response.message);
            }
            return response;
        })
    },

    singleCompany({ dispatch, commit, state}, args) {
        return api.singleCompany(args).then(response => {
            if(response.status) {
                commit('setCompany', response.message);
                
            }
            return response;
        })
    },

    single({ dispatch, commit, state}, args) {
        return api.single(args).then(response => {
            if(response.status) {
                commit('setCompany', response.message);
            }
            return response;
        })
    },

    approveUser({ dispatch, commit, state}, args) {
        return api.approve(args).then(response => {
            // if(response.status) {
            //     commit('setDetails', response.message);
            // }
            return response;
        })
    },

    rejectUser({ dispatch, commit, state}, args) {
        return api.reject(args).then(response => {
            // if(response.status) {
            //     commit('setDetails', response.message);
            // }
            return response;
        })
    },

    activateComp({ dispatch, commit, state}, args) {
        return api.activate(args).then(response => {
            // if(response.status) {
            //     commit('setDetails', response.message);
            // }
            return response;
        })
    },
    
    deactivateComp({ dispatch, commit, state}, args) {
        return api.deactivate(args).then(response => {
            // if(response.status) {
            //     commit('setDetails', response.message);
            // }
            return response;
        })
    },

    blockCompany({ dispatch, commit, state}, args) {
        return api.blockCompany(args).then(response => {
            // if(response.status) {
            //     commit('setDetails', response.message);
            // }
            return response;
        })
    },
    
    unblockCompany({ dispatch, commit, state}, args) {
        return api.unblockCompany(args).then(response => {
            // if(response.status) {
            //     commit('setDetails', response.message);
            // }
            return response;
        })
    },

    blockSubCompany({ dispatch, commit, state}, args) {
        return api.blockSubCompany(args).then(response => {
            // if(response.status) {
            //     commit('setDetails', response.message);
            // }
            return response;
        })
    },
    
    unblockSubCompany({ dispatch, commit, state}, args) {
        return api.unblockSubCompany(args).then(response => {
            // if(response.status) {
            //     commit('setDetails', response.message);
            // }
            return response;
        })
    },

    update({ dispatch, commit, state}, args) {
        return api.update(args).then(response => {
            if(response.status){
                commit('setDetails', response.message);
            }
            return response
        })
    },
}


const mutations = {
    
    dashboard(state, data) {
        state.dashboard = data || [];
    },

    users(state, data) {
        state.users = data.docs || [];
        state.pages = data.pages;
        state.totalItems = data.total
        state.pageSize = data.limit
    },
    user(state, data) {
        state.user = data || {};
    },
    setCount(state,data){
        state.count = data
    },
    setCompany(state, data) {
        state.company = data || {};
    },
    setname(state, data) {
        state.company_name = data;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  }
  