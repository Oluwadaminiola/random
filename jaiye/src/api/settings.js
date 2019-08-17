import { Axios } from  "./url";

export default {
    api: {
        updateSetting: '/api/individual/updateSetting',
        updateProfile: '/api/individual/updateProfile',
        account: '/api/superadmin/agentFee'
    },

    updateSetting(dargs) {
        return Axios.put(this.api.updateSetting, dargs)
    },

    updateProfile(dargs) {
        return Axios.put(this.api.updateProfile, dargs)
    },

    setFees(dargs) {
        return Axios.post(this.api.account + '/' + dargs.type, dargs)
    },

    fetchFees(dargs){
        return Axios.get(this.api.account)
    }
}