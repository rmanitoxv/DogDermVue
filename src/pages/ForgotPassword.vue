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

                    <button class="login__button w-full" id="sign-up" data-bs-toggle="modal" data-bs-target="#notifModal">Continue</button>
                    <div>
                        <span class="login__account">Want to switch accounts?</span>

                        <router-link to="/login">
                            <span class="login__signin"> Sign in here!</span>
                        </router-link>
                    </div>
                </form>
                <div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto !pr-0"
                    id="notifModal" tabindex="-1" aria-labelledby="notifModalLabel" aria-hidden="true">
                    <div class="modal-dialog relative w-auto pointer-events-none">
                        <div
                            class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-3xl outline-none text-current">
                            <div v-if="loading" class="m-8">
                                <div class="bg-white py-2 px-5 rounded-lg flex items-center flex-col">
                                    <div class="loader-dots block relative w-20 h-5 mt-2">
                                        <div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-first"></div>
                                        <div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-first"></div>
                                        <div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-first"></div>
                                        <div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-first"></div>
                                    </div>
                                    <div class="text-gray-500 text-xs font-medium mt-2 text-center">
                                        Sending email...
                                    </div>
                                </div>
                            </div>
                            <div v-else class="m-8 flex flex-col items-center justify-center">
                                <p v-if="response" class="text-xl !mb-0 font-bold text-red">{{ response }}</p>
                                <p v-else class="text-xl !mb-0 font-bold"> An email has been sent to your account. </p>
                                <button @click="passorfail" data-bs-dismiss="modal"
                                    class="w-[7.5rem] bg-first text-white p-2 rounded-3xl mt-[2.5rem] mx-2 text-sm sm:text-lg">
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    methods: {
        sendEmail(){
            this.loading = true
            this.response = null
            axios.get(`/api/forgotpassword?email=${email.value}`)
                .then((response) => {
                    this.loading = false
                    console.log(response)
                })
                .catch((error) => {
                    this.response = "Email is not Registered."
                    this.loading = false
                    console.log(error)
                })
        }
    },
    data(){
        return{
            loading: true,
            response: null
        }
    }
}
</script>
<style>
.loader-dots div {
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.loader-dots div:nth-child(1) {
    left: 8px;
    animation: loader-dots1 0.6s infinite;
}

.loader-dots div:nth-child(2) {
    left: 8px;
    animation: loader-dots2 0.6s infinite;
}

.loader-dots div:nth-child(3) {
    left: 32px;
    animation: loader-dots2 0.6s infinite;
}

.loader-dots div:nth-child(4) {
    left: 56px;
    animation: loader-dots3 0.6s infinite;
}

@keyframes loader-dots1 {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes loader-dots3 {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(0);
    }
}

@keyframes loader-dots2 {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(24px, 0);
    }
}
</style>