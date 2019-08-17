import { Axios } from  "./url";
import Url from './url';
export default {
    update(user) {
        return Axios.put(`${Url.user}${user.Id}`, user.fd)
    },
    create(dargs) {
        return Axios.post(Url.user, dargs);
    },
    createAdmin(email) {
        return Axios.post(`${Url.user}admin`, { email });
    },
    signup(user){
        return Axios.patch(`${Url.user}admin?email=${user.email}`,user);
        
    },
    publish(dargs) {
        return Axios.patch(`${Url.user}/publish/${dargs.Id}`, {});
    },
    activate(dargs) {
        return Axios.patch(`${Url.user}activate/${dargs}`, {});
    },
    deactivate(dargs) {
        return Axios.patch(`${Url.user}suspend/${dargs}`, {});
    },
    updateTiming(dargs) {
        dargs.type = "update";
        return Axios.patch(`${Url.user}${dargs.type}/${dargs._id}`);
    },
    addTiming(dargs) {
        dargs.type = "new";
        return Axios.patch(`${Url.user}${dargs.type}/${dargs._id}`);

    },
    getAdminData(token){
        return Axios.get(`${Url.user}admin/${token}`);

    },
    get(data) {
        let url = `${Url.user}`;
        if (data.Id) {
            url = `${url}${data.Id}`
        }
        if(data.page){
            url = `${url}?page=${data.page}`

        }
        return Axios.get(url);

    }
}