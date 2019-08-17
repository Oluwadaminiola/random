import { Axios } from  "./url";

export default {
    api: {
        login: 'user/login',
        signup: 'user',
        fetchUser: '/user/details',
        resend: '/user/resend/',
        resetPassword: 'user/forgot/link',
        resendPassword: 'user/resendPassword/',
        confirmResetToken: 'user/forgot/confirm/',
        setResetPassword: '/user/forgot/set/',
        confirmAccount: '/user/activate/',
        /* update account for sub companies and sub admins that jst completed their registration */
        updateAccount: '/user/updateAccount',
    },

    login(dargs) {
        return Axios.post(this.api.login, dargs, {
            'headers': { Authorization: `JWT ${dargs.token}` }
        })
            
    },
    confirmAccount(dargs) {
        return Axios.get(this.api.confirmAccount + dargs.token)
    },

    signup(dargs) {
        return Axios.post(this.api.signup, dargs)
    },

    updateAccount(dargs) {
        return Axios.put(this.api.updateAccount, dargs)
    },

    resendConfirmation(dargs) {
        return Axios.get(this.api.resend + dargs, {
            'headers': { Authorization: `JWT ${dargs.token}` }
        })
    },

    fetchUser(token) {
        return Axios.get(this.api.fetchUser, {
            'headers': { Authorization: `JWT ${token}` }
        })
            
    },
    resetPassword(dargs) {
        return Axios.post(this.api.resetPassword, dargs, {
            'headers': { Authorization: `JWT ${dargs.token}` }
        })
        
    },
    resendPassword(dargs) {
        return Axios.get(this.api.resendPassword + dargs.email, {
            'headers': { Authorization: `JWT ${dargs.token}` }
        })
        
    },
    confirmResetToken(dargs) {
        return Axios.get(this.api.confirmResetToken + dargs.token, {
            'headers': { Authorization: `JWT ${dargs.token}` }
        })
        
    },
    setResetPassword(dargs){
        return Axios.post(this.api.setResetPassword + dargs.token, dargs, {
            'headers': { Authorization: `JWT ${dargs.token}` }
        })
        
    }

}