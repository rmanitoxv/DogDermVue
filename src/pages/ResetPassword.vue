<template>
    <div class="login">
            <div class="login__content">
                <div class="recoveracc__img">
                    <img src="/images/login-dog-vector.svg" alt="">
                </div>

                <div class="login__forms">

                    <!-- =====  ENTER NEW PASSWORD =====  -->
                    <form class="login__create" id="login-up" @submit.prevent="resetPassword()">
                        <h1 class="logo__title"><span>Dog</span>Derma </h1>
                        <h1 class="login__title">Enter new password</h1>

                        <div>
                            <span class="login__account">Set the new password for <br> your account to access all features.</span>
                        </div>

                        <div class="newpass__box">
                            <i class='bx bx-lock-alt login__icon'></i>
                            <input type="password" placeholder="New Password" id="password" class="login__input">
                        </div>

                        <div class="confirmpass__box">
                            <i class='bx bx-lock-alt login__icon'></i>
                            <input type="password" placeholder="Confirm Password" id="cpassword" class="login__input">
                        </div>

                        <div class="newpass-continue__button"> </div>

                        <button class="login__button w-full" data-bs-toggle="modal" data-bs-target="#notifModal">Continue</button>
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
export default {
    methods: {
        resetPassword(){
            this.loading = true
            this.response = null
            axios.post('/api/token/login/', {
                email: "admin@email.com",
                password: "admin"
            })
            .then((response) => {
                const token = response.data.auth_token
                this.$store.commit('setToken', token)
                axios.defaults.headers.common['Authorization'] = "Token " + token
                localStorage.setItem("token", token)
                axios.get(`/api/resetpassword?email_verification=${this.$route.params.code}`)
                .then((response) => {
                    this.loading = false
                    axios.patch(`/api/alluser/${response.data[0].id}/`, {
                        password: password.value,
                        message: "Change Password"
                    }
                        )
                        .then((response) => {
                            console.log(response.data)
                            axios.post('/api/token/logout/', {})
                                .then((response) => {
                                    axios.defaults.headers.common['Authorization'] = ""
                                    localStorage.removeItem("token")
                                    this.$store.commit('removeToken')
                                })
                        })
                        .catch((error)=>{
                            console.log(error)
                            axios.post('/api/token/logout/', {})
                                .then((response) => {
                                    axios.defaults.headers.common['Authorization'] = ""
                                    localStorage.removeItem("token")
                                    this.$store.commit('removeToken')
                                })
                        })
                })
                .catch((error) => {
                    axios.post('/api/token/logout/', {})
                        .then((response) => {
                            axios.defaults.headers.common['Authorization'] = ""
                            localStorage.removeItem("token")
                            this.$store.commit('removeToken')
                        })
                    this.response = "Invalid Reset Password Link."
                    this.loading = false
                    console.log(error)
                })
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