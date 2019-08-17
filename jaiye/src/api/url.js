import store from "@/store"
import {insertTokenWithRequest,interceptResponse} from "@/helpers/token-manangement"
import axios from "axios"
import {API} from "@/config"
export default {
    event: "event/",
    listing: "listing/",
    attraction: "attraction/",
    ads: "placements/",
    user: "user/",
    dashboard: "dashboard",
    complaints: "complaint"
}

export const Axios = axios.create({
    baseURL: API
});
insertTokenWithRequest(Axios.interceptors.request);
interceptResponse(Axios.interceptors.response);
