import store from "@/store"
import router from './../router'
const AdminGaurd = (from,to,next) => {
    if(!store.getters["credentials/token"]){
        router.push({path:"/login"})
    }
    else{
        next();
    }
}

export{
    AdminGaurd
}