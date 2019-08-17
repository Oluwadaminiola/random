import { Axios } from  "./url";
import Url from './url';
import axios from "axios"


export default {
    dashboardData(dargs) {
        let url = Url.dashboard;
        if(dargs.to && dargs.from){
            url=`${url}?start_date=${dargs.from}&&end_date=${dargs.to}`
        }
        return Axios.get(`${url}`)
    }
}