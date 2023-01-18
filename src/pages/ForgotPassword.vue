<template>
    <div class="login">
        <div class="login__content">
            <div class="recoveracc__img">
                <img src="/images/login-dog-vector.svg" alt="">
            </div>

            <div class="login__forms">
                <!-- =====  RECOVER YOUR ACCOUNT =====  -->
                <form action="" class="login__registre" id="login-in" @submit.prevent="sendEmail">
                    <h1 class="logo__title"><span>Dog</span>Derma </h1>
                    <h1 class="login__title">Recover your account</h1>

                    <div>
                        <span class="login__account">Enter your email for verification process.</span>
                    </div>

                    <div class="recoveracc__box">
                        <i class='bx bx-at login__icon'></i>
                        <input type="text" placeholder="Email" id="email" class="login__input">
                    </div>

                    <button class="login__button w-full" id="sign-up">Continue</button>
                    <div>
                        <span class="login__account">Want to switch accounts?</span>

                        <router-link to="/login">
                            <span class="login__signin"> Sign in here!</span>
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    methods: {
        sendEmail(){
            axios.get(`/api/forgotpassword?email=${email.value}`)
            .then((response) => {
                console.log(response.data)
                axios.patch(`api/user/${response.data[0].id}/`, {
                    email: email.value,
                    email_verification: null
                })
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>