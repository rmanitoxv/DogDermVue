<template>
    <header class="header" id="header">
        <nav class="nav container">
            <router-link to="/" class="nav__logo">
                <span class="text-2xl text-first barlow">Dog</span>
                <span class="text-2xl text-second barlow">Derma</span>
            </router-link>
            <div class="nav__menu" id="nav-menu">
                <div class="nav__list">
                    <div class="nav__item" v-if="currentRoute == 'Homepage'">
                        <router-link to="/" class="nav__link active-link">
                            <i class='text-first bx bx-home-alt nav__icon'></i>
                            <span class="nav__name">Home</span>
                        </router-link>
                    </div>
                    <div class="nav__item" v-else>
                        <router-link to="/" class="nav__link">
                            <i class='text-first bx bx-home-alt nav__icon'></i>
                            <span class="nav__name">Home</span>
                        </router-link>
                    </div>
                    <div class="nav__item" v-if="currentRoute == 'Results'">
                        <div>
                            <router-link to="/results" class="nav__link active-link">
                                <i class='text-first bx bxs-bar-chart-alt-2 nav__icon'></i>
                                <span class="nav__name">Results</span>
                            </router-link>
                        </div>
                    </div>
                    <div class="nav__item" v-else>
                        <div>
                            <router-link to="/results" class="nav__link">
                                <i class='text-first bx bxs-bar-chart-alt-2 nav__icon'></i>
                                <span class="nav__name">Results</span>
                            </router-link>
                        </div>
                    </div>
                    <div class="nav__item" v-if="currentRoute == 'Upload' || currentRoute == 'UploadResult'">
                        <router-link to="/upload" class="nav__link active-link">
                            <i class='text-first bx bxs-camera nav__icon'></i>
                            <span class="nav__name">Upload</span>
                        </router-link>
                    </div>
                    <div class="nav__item" v-else>
                        <router-link to="/upload" class="nav__link">
                            <i class='text-first bx bxs-camera nav__icon'></i>
                            <span class="nav__name">Upload</span>
                        </router-link>
                    </div>
                    <div class="nav__item" v-if="currentRoute == 'Clinics'">
                        <router-link to="/clinics" class="nav__link active-link">
                            <i class='text-first bx bxs-location-plus nav__icon'></i>
                            <span class="nav__name">Clinics</span>
                        </router-link>
                    </div>
                    <div class="nav__item" v-else>
                        <router-link to="/clinics" class="nav__link">
                            <i class='text-first bx bxs-location-plus nav__icon'></i>
                            <span class="nav__name">Clinics</span>
                        </router-link>
                    </div>
                    <div class="nav__item lg:mr-10" v-if="currentRoute == 'Diseases'">
                        <router-link to="/diseases" class="nav__link active-link">
                            <i class='text-first bx bxs-virus nav__icon'></i>
                            <span class="nav__name">Diseases</span>
                        </router-link>
                    </div>
                    <div class="nav__item lg:mr-10" v-else>
                        <router-link to="/diseases" class="nav__link">
                            <i class='text-first bx bxs-virus nav__icon'></i>
                            <span class="nav__name">Diseases</span>
                        </router-link>
                    </div>
                    <div class="flex items-center" v-if="authenticated == false">
                        <div class="nav__item__register" v-if="currentRoute == 'Login'">
                            <router-link to="/login" class="nav__link active-link">
                                <span class="nav__name">Login</span>
                            </router-link>
                        </div>
                        <div class="nav__item__register" v-else>
                            <router-link to="/login" class="nav__link">
                                <span class="nav__name">Login</span>
                            </router-link>
                        </div>
                        <div class="nav__item__register ml-4">
                            <router-link to="/register" class="nav__link py-2.5 px-6 rounded-3xl text-white button-color">
                                <span>Register</span>
                            </router-link>
                        </div>
                    </div>
                    <div class="nav__item__register" v-else>
                        <div class="dropdown relative">
                            <a href="#" 
                                class="dropdown-toggle
                                    text-second
                                    transition
                                    duration-150
                                    ease-in-out
                                    flex
                                    items-center
                                    hover:text-first" 
                                    type="button"
                                id="dropdownMenuButton2"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                            <span class="adminmodule user-img">
                                <img src="/images/sample-profile.svg" alt="" class="w-5 inline"/>
                                {{ name }}
                                
                            </span>
                            </a>
                            <ul class="dropdown-menu
                                w-full
                                absolute
                                hidden
                                bg-white
                                text-base
                                z-50
                                float-left
                                py-2
                                list-none
                                text-left
                                rounded-lg
                                shadow-lg
                                mt-1
                                m-0
                                bg-clip-padding
                                border-none
                                "
                            aria-labelledby="dropdownMenuButton2">
                                <li>
                                    <router-link to="/profile" tag="button" class="dropdown-item
                                        py-2
                                        px-4
                                        text-base
                                        font-normal
                                        font-sans
                                        block
                                        w-full
                                        whitespace-nowrap
                                        bg-transparent
                                        text-grey
                                        hover:text-second
                                        active:bg-first
                                        active:text-white
                                        text-center" 
                                    >Profile</router-link>
                                </li>
                                <li>
                                    <button class="dropdown-item
                                        py-2
                                        px-4
                                        text-base
                                        font-normal
                                        block
                                        w-full
                                        whitespace-nowrap
                                        bg-transparent
                                        text-grey
                                        hover:text-second
                                        active:bg-first
                                        active:text-white" 
                                        @click="logout"
                                        >Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                        
                </div>
            </div>
            <img src="/images/sample-profile.svg" alt="" class="nav__img" />
        </nav>
    </header>
</template>

<script>
export default {
    created() {
        this.currentRoute;
        this.checkAuth();
    },
    computed: {
        currentRoute() {
            return this.$route.name;
        }
    },
    methods: {
        checkAuth() {
            if (localStorage.getItem("token")){
                axios.get('/api/user/', )
                    .then((response) => {
                        this.authenticated = true
                        this.name = response.data[0].first_name + " " + response.data[0].last_name
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },
        logout(){
            axios.post('/api/token/logout/', {})
            .then((response) => {
                this.authenticated = false
                axios.defaults.headers.common['Authorization'] = ""
                localStorage.removeItem("token")
                this.$store.commit('removeToken')
                this.$router.push({ path: "/"});
            })
            .catch((error) => {
                console.log(error)
            })
        }
    },
    data() {
        return {
            authenticated: false,
            name: ''
        }
    },
    watch:{
        $route (to, from){
            this.checkAuth()
        }
    },
}
</script>
