import { Axios } from  "./url";
import Url from './url';
export default {
    update(attraction) {
        return Axios.put(`${Url.attraction}${attraction.Id}`, attraction.fd)
    },
    create(dargs) {
        return Axios.post(Url.attraction, dargs);
    },
    publish(dargs) {
        return Axios.patch(`${Url.attraction}/publish/${dargs.Id}`, dargs);
    },
    updateTiming(dargs) {
        dargs.type = "update";
        return Axios.patch(`${Url.attraction}${dargs.type}/${dargs._id}`);
    },
    discard(Id){
        return Axios.delete(`${Url.attraction}${Id}`)

    },
    addTiming(dargs) {
        dargs.type = "new";
        return Axios.patch(`${Url.attraction}${dargs.type}/${dargs._id}`);

    },
    get(data) {
        let url = `${Url.attraction}`;
        if (data) {
            if (data.Id) {
                url = `${url}${data.Id}`
            }
            if (data.page) {
                url = `${url}?page=${data.page}&&status=${data.status}`
            }
            if(data.from){
                url = `${url}&&start_date=${data.from}&&end_date=${data.to}`
            }
        }
        return Axios.get(url);

    }
}