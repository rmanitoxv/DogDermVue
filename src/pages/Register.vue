<template>
    <div class="login animate-fade-in-down">
        <div class="login__content">
            <div class="login__img">
                <img src="/images/register-dog-vector.svg" alt="">
            </div>

            <div class="login__forms">

                <!-- =====  SIGN UP =====  -->
                <form action="" class="login__create" id="login-up" @submit.prevent="registerForm()">
                    <h1 class="logo__title"><span>Dog</span>Derma </h1>
                    <h1 class="login__title">Create Account</h1>

                    <input type="file" accept="image/*" class="opacity-0 absolute bottom-0" id="upload"
                        value="/images/sample-profile.svg" />
                    <div class="login__box">
                        <i class='bx bx-user login__icon'></i>
                        <input type="text" placeholder="First Name" class="login__input capitalize" id="first_name" />
                    </div>

                    <div class="login__box">
                        <i class='bx bx-user login__icon'></i>
                        <input type="text" placeholder="Last Name" class="login__input capitalize" id="last_name" />
                    </div>

                    <div class="login__box">
                        <i class='bx bx-at login__icon'></i>
                        <input type="text" placeholder="Email" class="login__input" id="email" />
                    </div>

                    <div class="pass__box">
                        <i class='bx bx-lock-alt login__icon'></i>
                        <input :type="password" placeholder="Password" class="login__input" id="password" />
                        <button type="button" @click="showPass()"> <i :class="passClass"></i> </button>
                    </div>

                    <div class="pass__box">
                        <i class='bx bx-lock-alt login__icon'></i>
                        <input :type="cpassword" placeholder="Confirm Password" class="login__input" id="cpassword" />
                        <button type="button" @click="showCPass()"> <i :class="cpassClass"></i> </button>
                    </div>

                    <button class="login__button w-full" data-bs-toggle="modal" data-bs-target="#notifModal">Create
                        Account</button>

                    <div>
                        <span class="login__account">Already have an Account?</span>
                        <router-link to="/login"><span class="login__signup" id="sign-in"> Sign In
                                here!</span></router-link>
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
                                        Saving Account...
                                    </div>
                                </div>
                            </div>
                            <div v-else class="m-8 flex flex-col items-center justify-center">
                                <p v-if="response" class="text-xl !mb-0 font-bold text-red">{{ response }}</p>
                                <p v-else class="text-xl !mb-0 font-bold"> Successfully Registered </p>
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
    data() {
        return {
            response: null,
            password: "password",
            cpassword: "password",
            passClass: "login__icon bi bi-eye",
            cpassClass: "login__icon bi bi-eye",
            loading: true
        }
    },
    methods: {
        registerForm() {
            this.response = null
            this.loading = true
            if (!first_name.value || !last_name.value || !email.value || !password.value || !cpassword.value) {
                this.response = "All fields are required"
                this.loading = false
                return
            }
            if (cpassword.value == password.value) {
                axios.post('/api/user/', {
                    first_name: first_name.value,
                    last_name: last_name.value,
                    email: email.value,
                    password: password.value,
                    is_staff: 0,
                    url: upload.value,
                }
                )
                    .then((response) => {
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
                                        this.loading = false
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                    })
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    })
                    .catch((error) => {
                        if (error.response.data.email) {
                            this.response = "This email is already registered."
                        }
                        else {
                            this.response = "There was an error saving this account."
                        }
                        this.loading = false
                        console.log(error)
                    })
            }
            else {
                this.loading = false
                this.response = "Passwords are not matching"
            }
        },
        showPass() {
            if (this.password == "password") {
                this.password = "text"
                this.passClass = "login__icon bi bi-eye-slash"
            }
            else {
                this.password = "password"
                this.passClass = "login__icon bi bi-eye"
            }
        },
        showCPass() {
            if (this.cpassword == "password") {
                this.cpassword = "text"
                this.cpassClass = "login__icon bi bi-eye-slash"
            }
            else {
                this.cpassword = "password"
                this.cpassClass = "login__icon bi bi-eye"
            }
        },
        passorfail() {
            if (!this.response) {
                this.$router.push({ name: "Homepage" })
            }
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