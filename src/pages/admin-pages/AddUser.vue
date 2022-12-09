<template>
    <div>
        <div class="left-10 top-6 absolute flex items-center">
            <button @click="sidebarFunction">
                <img src="/images/list.svg" width="24" class="mr-3" />
            </button>
            <span class="text-2xl text-first barlow">Dog</span>
            <span class="text-2xl text-second barlow">Derma</span>
        </div>
        <form @submit.prevent="afterComplete(file)">
            <div class="flex mt-32 justify-center">
                <div class="ml-[4.5rem] text-center">
                    <img v-if="url" :src="url" class="rounded-full w-[15rem] h-[15rem] object-cover mb-6" />
                    <img v-else src="/images/sample-profile.svg"
                        class="rounded-full w-[15rem] h-[15rem] object-cover mb-6" />
                    <label for="upload"
                        class="w-[12rem] bg-first text-white p-2 rounded-3xl text-lg cursor-pointer">
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
                            <input type="text" placeholder="First Name" class="login__input" id="first_name">
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-2xl mr-6">
                            Last Name:
                        </label>
                        <div class="login__box1 w-[18.75rem] mt-0">
                            <input type="text" placeholder="Last Name" class="login__input" id="last_name">
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-2xl mr-6">
                            Email:
                        </label>
                        <div class="login__box1 w-[18.75rem] mt-0">
                            <input type="text" placeholder="Email" class="login__input" id="email">
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-2xl mr-6">
                            Password:
                        </label>
                        <div class="login__box1 w-[18.75rem] mt-0">
                            <input type="password" placeholder="Password" class="login__input" id="password">
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-2xl mr-6">
                            Role:
                        </label>
                        <select id="role" clas1s="login__box w-[18.75rem] mt-0">
                            <option value="0">User</option>
                            <option value="1">Admin</option>
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
    methods: {
        addUser() {
            axios.post('/api/alluser/', {
                first_name: first_name.value,
                last_name: last_name.value,
                email: email.value,
                password: password.value,
                is_staff: role.value,
                url: this.url
            }
                )
                .then((response) => {
                    this.$router.push({name: 'AdminUsers'})
                })
                .catch((error) => {
                    console.log(error)
                    this.response = error.response.data.message
                    this.saving = 0
                    this.status = 'Save'
                    this.buttonClass = 'w-[7.5rem] bg-first cursor-none text-white py-2 rounded-2xl mt-[2.5rem] text-lg'
                })
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
                this.url = fileName
            }
            this.addUser()
        },
        getImage() {
            this.file = upload.files[0];
            this.url = URL.createObjectURL(this.file);
        },
    },
    props: {
        sidebarFunction: Function
    },
    data() {
        return{
            response: null,
            url: null,
            file: null,
            dburl: null,
            status: 'Add',
            saving: 0,
            buttonClass: 'w-[7.5rem] bg-first text-white py-2 rounded-2xl mt-[2.5rem] text-lg',
            symptoms: []
        }
    }
}
</script>