import { Axios } from  "./url";

export default {
    api: {
        dashboard: '/api/company/dashboard/',
        users: '/api/superadmin/company/all',
        activateCompany: '/api/superadmin/activate/',
        deactivateCompany: '/api/superadmin/suspend/',
        freelance: "/api/superadmin/",
        blockCompany: '/api/superadmin/company/block/',
        unblockCompany: '/api/superadmin/company/unblock/',

        blockSubCompany: '/api/superadmin/subcompany/block/',
        unblockSubCompany: '/api/superadmin/subcompany/unblock/',

        singleCompany: '/api/superadmin/company/',
        single: '/api/superadmin/company/single/',
        approve: '/api/superadmin/approve/',
        reject: '/api/superadmin/reject/',

        fetchDetail: '/user/details'

    },

    dashboard(dargs) {
        return Axios.post(this.api.dashboard, dargs);
    },

    fetchDetail(dargs) {
        return Axios.get(this.api.fetchDetail)
    },
    
    users(dargs) {

        let url = this.api.users + "/" + dargs.offset;
        if (dargs.start_date && dargs.end_date) {
            url = `${url}?start_date=${dargs.start_date}&end_date=${dargs.end_date}`;
        }
        return Axios.get(url)
    },

    //get list of agents
    agents(dargs) {
        let url = `/api/company/agent/${dargs.offset}`;
        if (dargs.start_date && dargs.end_date) {
            url = `${url}?start_date=${dargs.start_date}&end_date=${dargs.end_date}`;
        }
        if (dargs.type == 'specific') {
            url = `${url}/?type=${dargs.type}&id=${dargs.id}`;
        }
        return Axios.get(url)
    },


    //get list of freelance agents (approved: 0, not: 1)
    freelance(dargs) {
        let url = `/api/superadmin/freelance/${dargs.type}/${dargs.offset}`;
        if (dargs.start_date && dargs.end_date) {
            url = `${url}?start_date=${dargs.start_date}&end_date=${dargs.end_date}`;
        }
        return Axios.get(url)
    },

    //create agent
    createAgent(dargs) {
        return Axios.post(`/api/superadmin/createAgent`, dargs)
    },

    //create agent
    createAdmin(dargs) {
        return Axios.post(`/api/superadmin/create`, dargs)
    },

    admin(dargs) {
        if(dargs.class == 'specific') {
            return Axios.get(`/api/company/admin/${dargs.offset}/?class=${dargs.class}&id=${dargs.id}`)
        }
        return Axios.get(`/api/company/admin/${dargs.offset}`)
    },
    getAllIndividuals(dargs) {
          let url =`/api/superadmin/individuals/${dargs.offset}`;
        if (dargs.start_date && dargs.end_date) {
            url = `${url}?start_date=${dargs.start_date}&end_date=${dargs.end_date}`;
        }
        return Axios.get(url)
    },

    activate(dargs) {
        return Axios.put(this.api.activateCompany + dargs.id)
    },

    deactivate(dargs) {
        return Axios.put(this.api.deactivateCompany + dargs.id, dargs)
    },

    unblockCompany(dargs) {
        return Axios.put(this.api.unblockCompany + dargs.id)
    },

    blockCompany(dargs) {
        return Axios.put(this.api.blockCompany + dargs.id)
    },

    unblockSubCompany(dargs) {
        return Axios.put(this.api.unblockSubCompany + dargs.id)
    },

    blockSubCompany(dargs) {
        return Axios.put(this.api.blockSubCompany + dargs.id)
    },

    singleCompany(dargs) {
        return Axios.get(this.api.singleCompany + dargs.id)
    },

    single(dargs) {
        return Axios.get(this.api.single + dargs.id)
    },

    approve(dargs) {
        return Axios.put(this.api.approve + dargs.id)
    },

    reject(dargs) {
        return Axios.put(this.api.reject + dargs.id)
    },
}