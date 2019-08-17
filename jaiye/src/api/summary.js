import { Axios } from  "./url";

export default {
    api: {
        summary: '/api/address/summary/'
    },

    summary(dargs) {
        if(dargs.status) {
            return Axios.get(this.api.summary + dargs.year + '/?status=successful')
        }
        return Axios.get(this.api.summary + dargs.year)
    },

}