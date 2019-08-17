import { Axios } from  "./url";
console.log(Axios)
import Url from './url';
export default {
    update(ads) {
        return Axios.put(`${Url.ads}${ads.Id}`, ads.fd)
    },
    create(dargs) {
        return Axios.post(Url.ads, dargs);
    },
    publish(dargs) {
        return Axios.patch(`${Url.ads}publish/${dargs.Id}`, dargs);
    },
    discard(dargs) {
        return Axios.delete(`${Url.ads}${dargs}`);

    },
    toggle(Id,status){
        return Axios.patch(`${Url.ads}${Id}?type=status&&status=${status}`)
    },
    updateTiming(dargs) {
        dargs.type = "update";
        return Axios.patch(`${Url.ads}${dargs.type}/${dargs._id}`);
    },
    adsdTiming(dargs) {
        dargs.type = "new";
        return Axios.patch(`${Url.ads}${dargs.type}/${dargs._id}`);

    },
    get(data) {
        let url = `${Url.ads}`;
        if (data) {
            if (data.Id) url = `${url}${data.Id}`
            if (data.page) {
                url = `${url}?page=${data.page}`

            }
            if(data.status){
                url = `${url}&&status=${data.status}` 
            }
            if(data.from){
                url = `${url}&&start_date=${data.from}&&end_date=${data.to}`
            }
        }

        return Axios.get(url);

    }
}