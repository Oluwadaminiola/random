import { Axios } from  "./url";
import Url from './url';
export default {
    update(event){
        return Axios.put(`${Url.event}${event.Id}`,event.fd)
    },
    create(dargs) {
        return Axios.post(Url.event, dargs.fd);
    },
    publish(dargs) {
        return Axios.patch(`${Url.event}publish/${dargs.Id}`, dargs.fd);
    },
    decline(dargs) {
        return Axios.patch(`${Url.event}decline/${dargs.Id}`, dargs);
    },
    discardEvent(Id) {
        return Axios.patch(`${Url.event}discard/${Id}`);
    },
    updateTiming(dargs){
        dargs.type = "update";
        return Axios.patch(`${Url.event}${dargs.type}/${dargs._id}`);
    },
    addTiming(dargs){
        dargs.type = "new";
        return Axios.patch(`${Url.event}${dargs.type}/${dargs._id}`);

    },
    createBestThings(dargs){
        return Axios.post(`${Url.event}bestthings`,dargs);

    },
    get(data) {
        let url = `${Url.event}`;
        if(data.Id){
            url = `${url}${data.Id}`
        }
        url = `${url}?page=${data.page}&&status=${data.status}`
        if(data.from){
            url = `${url}&&start_date=${data.from}&&end_date=${data.to}`
        }
        if(data.isBestThings){
            url = `${url}&&isBestThing=true`

        }
        return Axios.get(url);

    }
}