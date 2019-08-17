import { Axios } from  "./url";

export default {
    api: {
        create: '/api/support/create',
        all : '/api/support/all/',
        single: '/api/support/single/',
        update: '/api/support/',
        discuss: '/api/support/discuss_ticket/'
    },

    create(dargs) {
        return Axios.post(this.api.create, dargs)
    },
    discussTicket(dargs){
        return Axios.post(this.api.discuss+dargs.id,dargs)
    }
    ,
    getAll(dargs) {
        return Axios.get(this.api.all + dargs.offset)
    },

    single(dargs) {
        return Axios.get(this.api.single + dargs.id)
    },

    markAsResolved(dargs) {
        return Axios.put(this.api.update + dargs)
    },

}