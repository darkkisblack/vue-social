<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Sign in</h1>
                    <p class="text-xs-center">
                        <router-link :to="{name: 'register'}">Have an account?</router-link>
                    </p>
                    <mcv-validation-errors 
                    v-if="validationsError"
                    :validations-errors="validationsError"/>
                    <form @submit.prevent="onSubmit">
                        <fieldset class="form-group">
                            <input v-model="email" type="text" class="form-control form-control-lg" placeholder="Email" />
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="password" type="password" class="form-control form-control-lg" placeholder="Password" />
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right" type="submit" :disabled="isSubmitting">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import McvValidationErrors from '../components/ValidationErrors.vue'
import {actionTypes} from '@/store/modules/auth'
export default {
    name:'McvLogin',
    components: {
        McvValidationErrors
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        ...mapState({
            isSubmitting: state => state.auth.isSubmitting,
            validationsError: state => state.auth.validationsError
        })
        /* isSubmitting() {
            return this.$store.state.auth.isSubmitting
        },
        validationsError() {
            return this.$store.state.auth.validationsError
        } */

    },
    methods: {
        onSubmit() {
            this.$store.dispatch(actionTypes.login, {
                email: this.email,
                password: this.password
            }).then(() => {
                /* console.log('successfully login', user); */
                this.$router.push({name: 'globalFeed'})
            })
        }
    }
}
</script>