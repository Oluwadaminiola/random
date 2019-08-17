import { Axios } from  "./url";
import Url from './url';
export default {
    update(arg) {
        return Axios.put(`${Url.listing}${arg.Id}`, arg.fd)
    },
    create(dargs) {
        return Axios.post(Url.listing, dargs);
    },
    updateTiming(dargs) {
        dargs.type = "update";
        return Axios.patch(`${Url.event}${dargs.type}/${dargs._id}`);
    },
    decline(dargs) {
        return Axios.patch(`${Url.listing}decline/${dargs.Id}`, dargs);
    },
    discardListing(Id){
        return Axios.delete(`${Url.listing}${Id}`)  
    },
    publishListing(Id){
        return Axios.patch(`${Url.listing}publish/${Id}`)  
    },
    addTiming(dargs) {
        dargs.type = "new";
        return Axios.patch(`${Url.event}${dargs.type}/${dargs._id}`);

    },
    get(data) {
        let url = `${Url.listing}`;
        if (data) {
            if (data.Id) {
                url = `${url}${data.Id}`
            }
        }

        url = `${url}?page=${data.page}&&status=${data.status}`
        if(data.from){
            url = `${url}&&start_date=${data.from}&&end_date=${data.to}`
        }
        return Axios.get(url);

    }
}