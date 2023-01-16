<template>
    <div class="flex flex-col mt-[6.25rem]">
        <div class="left-10 top-6 absolute flex items-center">
            <button @click="sidebarFunction">
                <img src="/images/list.svg" width="24" class="mr-3" />
            </button>
            <span class="text-2xl text-first barlow">Dog</span>
            <span class="text-2xl text-second barlow">Derma</span>
        </div>
        <form @submit.prevent="afterComplete(file)">
            <div class="flex justify-center">
                <div class="ml-[2rem] text-center">
                    <img :src="url" class="rounded-full w-[15rem] h-[15rem] shadow-md object-cover mb-6" />
                    <label for="upload"
                        class="w-[12rem] bg-first text-white py-2 px-4 rounded-3xl mt-[2.5rem] text-lg cursor-pointer">
                        Upload Image
                    </label>
                    <input type="file" :disabled="validated == 1" id="upload" accept=".jpeg,.jpg,.png,.svg"
                        class="hidden" @input="getImage()" />
                </div>
                <div class="mt-[2.5rem] mx-[5.5rem] ">
                    <div class="flex items-center justify-end">
                        <label class="text-2xl mr-6">
                            First Name:
                        </label>
                        <div class="login__box1 w-[18.75rem] mt-0">
                            <input type="text" placeholder="First Name" class="login__input" id="first_name" v-model="datas.first_name">
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-2xl mr-6">
                            Last Name:
                        </label>
                        <div class="login__box1 w-[18.75rem] mt-0">
                            <input type="text" placeholder="Last Name" class="login__input" id="last_name" v-model="datas.last_name">
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-2xl mr-6">
                            Email:
                        </label>
                        <div class="login__box1 w-[18.75rem] mt-0">
                            <input type="text" placeholder="Email" class="login__input" id="email" v-model="datas.email">
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-2xl mr-6">
                            Password:
                        </label>
                        <div class="login__box1 w-[18.75rem] mt-0">
                            <input type="password" placeholder="Password" class="login__input" id="password" v-model="datas.password">
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-2xl mr-6">
                            Role:
                        </label>
                        <select id="role" class="login__box1 w-[18.75rem] mt-0" v-model="datas.is_staff">
                            <option :value="false">User</option>
                            <option :value="true">Admin</option>
                        </select>
                    </div>
                    <div class="flex items-center mt-[1rem] justify-end">
                        <button :class="buttonClass" :disabled="saving">
                            {{ status }}
                        </button>
                    </div>
                    <p v-if="response" class="text-red text-end">{{response}}</p>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from 'uuid';
export default {
    data() {
        return {
            id: this.$route.params.id,
            datas: {},
            response: null,
            url: null,
            dburl: null,
            status: 'Edit',
            saving: 0,
            buttonClass: 'w-[7.5rem] bg-first text-white py-2 rounded-2xl mt-[2.5rem] text-lg',
            password: null
        }
    },
    methods: {
        editUser() {
            axios.put(`/api/alluser/${this.id}/`, {
                first_name: this.datas.first_name,
                last_name: this.datas.last_name,
                email: this.datas.email,
                password: this.datas.password,
                cpassword: this.password,
                is_staff: this.datas.is_staff
            }
                )
                .then((response) => {
                    this.$router.push({ name: 'AdminUsers' })
                })
                .catch((error) => {
                    console.log(error)
                    this.response = error.response.data.message
                })
        },
        getData(id) {
            axios.get(`/api/alluser/${id}`)
            .then((response) => {
                this.datas = response.data
                this.password = response.data.password
                this.dburl = response.data.url
                const storage = getStorage();
                const storageRef = ref(storage, 'images/' + this.datas.url);
                getDownloadURL(storageRef)
                    .then((url) => {
                        this.url = url
                    })
            })
            .catch((error) => {
                console.log(error)
            })
        },
        getImage() {
            this.file = upload.files[0];
            this.url = URL.createObjectURL(this.file);
        },
        async afterComplete(e) {
            this.saving = 1
            this.status = 'Saving...'
            this.buttonClass = 'w-[7.5rem] bg-grey cursor-none text-white py-2 rounded-2xl mt-[2.5rem] text-lg'
            if (this.file) {
                const file = e;
                const re = /(?:\.([^.]+))?$/;
                const ext = re.exec(file.name)[1];
                const fileName = uuid() + '.' + ext ;
                const storage = getStorage();
                const storageRef = ref(storage, 'images/' + fileName);
                await uploadBytesResumable(storageRef, file);
                this.dburl = fileName
            }
            this.editUser()
        },
    },
    created() {
        this.getData(this.id)
    },
    props: {
        sidebarFunction: Function
    },
}
</script>
<style>
body{
    height: auto;
}
</style>