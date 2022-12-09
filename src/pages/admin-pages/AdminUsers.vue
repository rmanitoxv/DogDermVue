<template>
    <div class="flex flex-col mt-[6.25rem]">
        <div class="left-10 top-6 absolute flex items-center">
            <button @click="sidebarFunction">
                <img src="/images/list.svg" width="24" class="mr-3" />
            </button>
            <span class="text-2xl text-first barlow">Dog</span>
            <span class="text-2xl text-second barlow">Derma</span>
        </div>
        <DatabaseCount />
        <div class="mt-[3.5rem] mx-[2.5rem]">
            <div class="flex justify-between">
                <div class="amiko font-bold text-[2rem]">
                    Users
                </div>
                <div>
                    <button class="w-[7.75rem] py-2 bg-blue1 text-white rounded-xl"
                        @click="$router.push({name: 'AddUser'})">
                        + Add New
                    </button>
                </div>
            </div>
            <div class="flex flex-col shadow-md rounded-xl w-full justify-center">
                <div class="flex h-[3rem] items-center">
                    <div class="font-medium w-[50%]">&nbsp;</div>
                    <div class="font-medium w-full">&nbsp;</div>
                    <div class="font-medium w-full">Email</div>
                    <div class="font-medium w-full">First Name</div>
                    <div class="font-medium w-full">Last Name</div>
                    <div class="font-medium w-full">Role</div>
                    <div class="font-medium w-[50%]">&nbsp;</div>
                </div>
                <div class="h-[65vh] overflow-auto">
                    <div v-for="item in users">
                        <label v-bind:for="item.id" class="w-full">
                            <div class="flex h-[4.5rem] items-center text-sixth">
                                <div class="font-medium w-full text-center">
                                    <input type="checkbox" v-bind:id="item.id" />
                                </div>
                                <div class="font-medium w-[50%]">
                                    <img v-if="item.url" :src="item.url" class="w-9 h-9 object-cover rounded-full" />
                                    <img v-else src="/images/circle.svg" />
                                </div>
                                <div class="font-medium w-full">{{item.email}} {{index}}</div>
                                <div class="font-medium w-full">{{item.first_name}}</div>
                                <div class="font-medium w-full">{{item.last_name}}</div>
                                <div class="font-medium w-full" v-if="item.is_staff == 1">Admin</div>
                                <div class="font-medium w-full" v-else>User</div>
                                <div class="font-medium w-[50%] text-white">
                                    <button class="bg-blue w-[2.25rem] h-[2.25rem] rounded-xl mx-[0.25rem]"
                                        @click="$router.push({ name: 'EditUser', params: { id: item.id } })">
                                        <i class='bx bx-edit'></i>
                                    </button>
                                    <button class="bg-red w-[2.25rem] h-[2.25rem] rounded-xl mx-[0.25rem]"
                                        @click="deleteUser(item.id)">
                                        <i class='bx bx-trash-alt'></i>
                                    </button>
                                </div>
                            </div>
                        </label>
                        <hr>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DatabaseCount from '../../components/DatabaseCount.vue'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export default {
    components: {
        DatabaseCount
    },
    props: {
        sidebarFunction: Function
    },
    data() {
        return {
            users: {}
        }
    },
    methods: {
        getUser() {
            axios.get('/api/alluser/')
                .then((response) => {
                    this.users = response.data
                    for (let i=0; i < this.users.length; i++){
                        if (this.users[i].url){
                            const storage = getStorage();
                            const storageRef = ref(storage, 'images/' + this.users[i].url);
                            getDownloadURL(storageRef)
                                .then((url) => {
                                    this.users[i].url = url
                                })
                        }
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        deleteUser(id) {
            axios.delete(`/api/alluser/${id}/`, {
            })
            .then((response) => {
                this.getUser()
            })
            .catch((error) => {
                console.log(error)
            })
        }
    },
    created() {
        this.getUser()
    }
}
</script>