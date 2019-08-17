import store from "@/store"
import Vue from 'vue'
export function insertTokenWithRequest(requestInterceptor) {
    requestInterceptor.use(config => {
        const token = store.getters["credentials/token"];
        if (token) {
            config.headers.common["Authorization"] = `JWT ${token}`;
        }
        return config;
    })
}


export function interceptResponse(responseInterceptor) {
    responseInterceptor.use((response) => {
        // Do something with response data
        return response.data;
    }, function (error) {
        if (error.message == "Network Error") {
            Vue.prototype.$notify({ message: "Please check your internet", type: "error", title: "Network" })

        }
        if (error.response.data.message == "Invalid User Details" || error.response.data.message == "Invalid Login Details") {
            Vue.prototype.$notify({ message: error.response.data.message, type: "error", title: "Authentication" })

        }
        // Do something with response error
        if (error.response.status == 401) {
            if (!store.getters['credentials/token']) {
                router.push({ path: "login" })
            }
        }
        // return Promise.reject(error);
        return error
    });
}