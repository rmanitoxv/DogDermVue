<template>
    <!-- NEW UI!!!!! -->
        <div class="login">
            <div class="login__content">
                <div class="login__img">
                    <img src="/images/register-dog-vector.svg" alt="">
                </div>

                <div class="login__forms">
                    <!-- =====  SIGN IN =====  -->
                    <form action="" class="login__registre" id="login-in" @submit.prevent="loginForm">
                        <h1 class="logo__title"><span>Dog</span>Derma </h1>
                        <h1 class="login__title">Sign In</h1>
    
                        <div class="login__box">
                            <i class='bx bx-user login__icon'></i>
                            <input type="text" placeholder="Email" class="login__input" id="email">
                        </div>
    
                        <div class="login__box">
                            <i class='bx bx-lock-alt login__icon'></i>
                            <input type="password" placeholder="Password" class="login__input" id="password">
                        </div>

                        <router-link to="/forgotpassword" class="login__forgot">Forgot password?</router-link>

                        <button class="login__button w-full">Sign In</button>

                        <div>
                            <span class="login__account">Don't have an account?</span>
                            <router-link to="/register">
                                <span class="login__signin" id="sign-up"> Register here!</span>
                            </router-link>
                        </div>
                        <p v-if="response" class="text-red text-end">
                                {{response}}
                        </p>
                    </form>
                </div>
            </div>
        </div>

</template>

<script>
import axios from 'axios';
;
export default {
    methods: {
        loginForm(){
            axios.defaults.headers.common['Authorization'] = ""

            localStorage.removeItem("token")
            axios.post('/api/token/login/', {
                email: email.value,
                password: password.value
            })
            .then((response) => {
                const token = response.data.auth_token
                this.$store.commit('setToken', token)
                axios.defaults.headers.common['Authorization'] = "Token " + token
                localStorage.setItem("token", token)
                axios.get('/api/users/me/'
                )
                .then((response) => {
                    const role = response.data.is_staff
                    if (role == true){
                        this.$router.push({ name: "AdminProfile" })
                    }
                    else{
                        this.$router.push({ name: "Homepage" })
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            })
            .catch((error) => {
                console.log(JSON.stringify(error))
                for (const prop in error.response.data){
                    this.response = `${error.response.data[prop]}`
                }

            })
        }
    },
    data() {
        return{
            response: null
        }
    }
}
</script>
