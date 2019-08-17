import { Axios } from  "./url";

export default {
    api: {
        list: '/messaging/users'
    },

    getAll(dargs) {
        return Axios.get(this.api.list)
    },

}