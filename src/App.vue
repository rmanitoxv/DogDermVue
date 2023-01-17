<template>
    <div>
        <div>
            <div v-if="isAdmin == 0">
                <Navbar />
                <router-view></router-view>
                <Footer />
            </div>
            <div v-else>
                <div v-bind:class="sidebarClass">
                    <Sidebar :sidebarFunction="sidebarFunction"/>
                </div>                
                <div v-bind:class="bodyClass">
                    <router-view :sidebarFunction="sidebarFunction"></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebaseConfig from './firebase'
    import Navbar from './layouts/Navbar.vue'
    import Sidebar from './layouts/Sidebar.vue'
    import Footer from './layouts/Footer.vue'
    import * as firebase from 'firebase/app'
import axios from 'axios'
    firebase.initializeApp(firebaseConfig)
    export default {
        beforeCreate() {
            this.$store.commit('initializeStore')
            
            const token = this.$store.state.token

            if (token){
                axios.defaults.headers.common['Authorization'] = "Token " + token
            }
            else {
                axios.defaults.headers.common['Authorization'] = ""
            }
        },
        components: {
            Navbar,
            Sidebar,
            Footer
        },
        methods: {
            checkAuth() {
                if (localStorage.getItem("token")){
                    axios.get('/api/users/me/'
                    )
                    .then((response) => {
                        const path = '/admin/'
                        const role = response.data.is_staff
                        if (role == true){
                            this.isAdmin = 1;
                            if (!this.$route.path.includes(path)){
                                this.$router.push('/admin/profile')
                            }
                        }
                        else{
                            this.isAdmin = 0;
                            if (this.$route.path.includes(path)){
                                this.$router.push('/')
                            }
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }
                else{
                    this.isAdmin = 0
                }
            },
            sidebarFunction(){
                if (this.sidebarClass == "sidebar"){
                    this.sidebarClass = "sidebar-hidden"
                    this.bodyClass = "admin-body-hidden"
                }
                else{
                    this.sidebarClass = "sidebar"
                    this.bodyClass = "admin-body"
                }
            }
        },
        data(){
            return {
                isAdmin: '0',
                sidebarClass: "sidebar",
                bodyClass: "admin-body",
            }
        },
        created() {
            this.checkAuth();
        },
        watch:{
            $route (to, from){
                this.checkAuth()
            }
        },
    }
</script>