<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Sign up</h1>
                    <p class="text-xs-center">
                        <router-link :to="{name: 'login'}">Need an account?</router-link>
                    </p>
                    <mcv-validation-errors 
                    v-if="validationsError"
                    :validations-errors="validationsError"/>
                    <form @submit.prevent="onSubmit">
                        <fieldset class="form-group">
                            <input v-model="username" type="text" class="form-control form-control-lg" placeholder="Username" />
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="email" type="text" class="form-control form-control-lg" placeholder="Email" />
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="password" type="password" class="form-control form-control-lg" placeholder="Password" />
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right" type="submit" :disabled="isSubmitting">Sign up</button>
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
    name:'McvRegister',
    components: {
        McvValidationErrors
    },
    data() {
        return {
            email: '',
            password: '',
            username:''
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
            this.$store.dispatch(actionTypes.register, {
                email: this.email,
                username: this.username,
                password: this.password
            }).then(user => {
                console.log('successfully register', user);
                this.$router.push({name: 'globalFeed'})
            })
        }
    }
}
</script>