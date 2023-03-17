import authApi from '@/api/auth'
import { setItem } from '@/helpers/persistanceStorage'
const state = {
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    validationsError: null,
    isLoggedIn: null
}

export const mutationTypes = {
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailure: '[auth] registerFailure',

    loginStart: '[auth] loginStart',
    loginSuccess: '[auth] loginSuccess',
    loginFailure: '[auth] loginFailure',

    getCurrentUserStart: '[auth] getCurrentUserStart',
    getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
    getCurrentUserFailure: '[auth] getCurrentUserFailure',

}

export const actionTypes = {
    register: '[auth] register',
    login: '[auth] login',
    getCurrentUser: '[auth] getCurrentUser'
}

export const getterTypes = {
    currentUser: '[auth] currentUser',
    isLoggedIn: '[auth] isLoggedIn',
    isAnonymos: '[auth] isAnonymos',
}

const getters = {
    [getterTypes.currentUser]: state => state.currentUser,
    [getterTypes.isLoggedIn]: state => Boolean(state.isLoggedIn),
    [getterTypes.isAnonymos]: state => state.isLoggedIn === false,
}



const mutations = {
    [mutationTypes.registerStart](state) {
        state.isSubmitting = true
        state.validationsError = null
    },
    [mutationTypes.registerSuccess](state, payload) {
        state.isSubmitting = false
        state.isLoggedIn = true
        state.currentUser = payload
    },
    [mutationTypes.registerFailure](state, payload) {
        state.isSubmitting = false
        state.validationsError = payload
    },
    [mutationTypes.loginStart](state) {
        state.isSubmitting = true,
        state.validationsError  = null
    },
    [mutationTypes.loginSuccess](state, payload) {
        state.isSubmitting = false
        state.isLoggedIn = true
        state.currentUser = payload
    },
    [mutationTypes.loginFailure](state, payload) {
        state.isSubmitting = false,
        state.validationsError = payload
    },
    [mutationTypes.getCurrentUserStart](state) {
        state.isLoading = true
    },
    [mutationTypes.getCurrentUserSuccess](state, payload) {
        state.isLoading = false
        state.isLoggedIn = true
        state.currentUser = payload
    },
    [mutationTypes.getCurrentUserFailure](state) {
        state.isLoading = false
        state.isLoggedIn = false
        state.currentUser = null
    }
}

const actions = {
    [actionTypes.register](context, credentials) {
        context.commit(mutationTypes.registerStart)
        return new Promise(resolve => {
            authApi.register(credentials)
            .then(response => {
                context.commit(mutationTypes.registerSuccess, response.data.user)
                setItem('accessToken', response.data.user.token)
                resolve(response.data.user)
            })
            .catch(result => {
                console.error(result);
                context.commit(mutationTypes.registerFailure, result.response.data.errors)
            })
        })
    },
    [actionTypes.login](context, credentials) {
        context.commit(mutationTypes.loginStart)
        return new Promise(resolve => {
            authApi.login(credentials)
            .then(response => {
                context.commit(mutationTypes.loginSuccess, response.data.user)
                setItem('accessToken', response.data.user.token)
                resolve(response.data.user)
            })
            .catch(result => {
                console.error(result);
                context.commit(mutationTypes.loginFailure, result.response.data.errors)
            })
        })
    },
    [actionTypes.getCurrentUser](context) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getCurrentUserStart)
            authApi.getCurrentUser()
            .then(response => {
                context.commit(mutationTypes.getCurrentUserSuccess, response.data.user)
                resolve(response.data.user)
            })
            .catch(() => {
                context.commit(mutationTypes.getCurrentUserFailure)
                }
            )
        })
    }

}

export default { state, mutations, actions, getters }