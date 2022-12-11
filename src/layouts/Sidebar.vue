<template>
    <div>
        <div class="mx-[2rem] mt-[1.5rem]">
            <div class="flex mx-2 items-center mb-5">
                <button @click="sidebarFunction">
                    <img src="/images/list.svg" width="24" class="mr-3"/>
                </button>
                <span class="text-2xl text-first barlow">Dog</span>
                <span class="text-2xl text-second barlow">Derma</span>
            </div>
            <div class="flex mx-3 items-center mb-5">
                <img v-if="url" :src="url" class="w-10 mr-2 rounded-full"/>
                <img v-else src="/images/sample-profile.svg" class="w-10 mr-2" />
                <div>
                    <p class="poppins text-2xl text-second m-0">{{ datas.first_name }} {{ datas.last_name }}</p>
                    <p class="poppins text-xs text-third">{{ datas.email }}</p>
                </div>
            </div>
            <div v-if="currentRoute == 'AdminProfile'">
                <div class="flex bg-first p-3 rounded-md items-center">
                    <i class='bx bxs-user-circle text-xl text-white mr-4'></i>
                    <p class="poppins text-base text-white">Profile</p>
                </div>
            </div>
            <div v-else>
                <router-link to="/admin/profile">
                    <div class="flex p-3 rounded-md items-center">
                        <i class='bx bxs-user-circle text-xl text-fifth mr-4'></i>
                        <p class="poppins text-base text-fifth">Profile</p>
                    </div>
                </router-link>
            </div>
            <div v-if="currentRoute == 'AdminDiseases' || currentRoute == 'AddDisease' || currentRoute == 'EditDisease'">
                <div class="flex bg-first p-3 rounded-md items-center">
                    <i class='bx bxs-virus text-xl text-white mr-4'></i>
                    <p class="poppins text-base text-white">Disease</p>
                </div>
            </div>
            <div v-else>
                <router-link to="/admin/diseases">
                    <div class="flex p-3 rounded-md items-center">
                        <i class='bx bxs-virus text-xl text-fifth mr-4'></i>
                        <p class="poppins text-base text-fifth">Disease</p>
                    </div>
                </router-link>
            </div>
            <div v-if="currentRoute == 'AdminClinics' || currentRoute == 'AddClinics' || currentRoute == 'EditClinics'">
                <div class="flex bg-first p-3 rounded-md items-center">
                    <i class='bx bxs-clinic text-xl text-white mr-4'></i>
                    <p class="poppins text-base text-white">Clinics</p>
                </div>
            </div>
            <div v-else>
                <router-link to="/admin/clinics">
                    <div class="flex p-3 rounded-md items-center">
                        <i class='bx bxs-clinic text-xl text-fifth mr-4' ></i>
                        <p class="poppins text-base text-fifth">Clinics</p>
                    </div>
                </router-link>
            </div>
            <div v-if="currentRoute == 'AdminUsers' || currentRoute == 'AddUser' || currentRoute == 'EditUser'">
                <div class="flex bg-first p-3 rounded-md items-center mb-32">
                    <i class='bx bxs-user-account text-xl text-white mr-4'></i>
                    <p class="poppins text-base text-white">Users</p>
                </div>
            </div>
            <div v-else>
                <router-link to="/admin/users">
                    <div class="flex p-3 rounded-md items-center mb-32">
                        <i class='bx bxs-user-account text-xl text-fifth mr-4' ></i>
                        <p class="poppins text-base text-fifth">Users</p>
                    </div>
                </router-link>
            </div>
            
            <div class="flex p-3 rounded-md items-center">
                <a href="#" @click="logout">
                    <div class="sidebar-link flex items-center">
                        <i class='bx bx-log-in-circle text-xl text-fifth mr-4' ></i>
                        <span class="poppins text-base text-fifth">Logout</span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
;
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export default {
    created() {
        this.currentRoute;
        this.getData();
    },
    computed: {
        currentRoute() {
            return this.$route.name;
        }
    },
    methods:{
        logout(){
            axios.post('/api/token/logout/', {})
            .then((response) => {
                axios.defaults.headers.common['Authorization'] = ""
                localStorage.removeItem("token")
                this.$store.commit('removeToken')
                this.$router.push({ path: "/"});
            })
            .catch((error) => {
                console.log(error)
            })
        },
        getData(){
            axios.get('/api/user/')
            .then((response) => {
                this.datas = response.data[0]
                if (response.data[0].url){
                    const storage = getStorage();
                    const storageRef = ref(storage, 'images/' + response.data[0].url);
                    getDownloadURL(storageRef)
                        .then((url) => {
                            this.url = url
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
    },
    props:{
        sidebarFunction: Function
    },
    data(){
        return{
            datas: {},
            url: null
        }
    }
}
</script>
