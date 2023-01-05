<template>
    <div>
        <form @submit.prevent="afterComplete(file)">
            <div class="flex sm:flex-row flex-col my-32 justify-center">
                <div class="mb-4 sm:mb-0 sm:w-1/4 w-full flex flex-col justify-center items-center text-center">
                    <div class="sm:block sm:w-auto flex w-9/12 items-center mb-2">
                        <div class="sm:block sm:w-auto w-1/2 flex justify-center">
                            <img v-if="url" :src="url" class="rounded-full w-24 h-24 sm:w-[21.625rem] sm:h-[21.625rem] sm:mb-6 object-cover" />
                            <img v-else src="/images/sample-profile.svg"
                                class="rounded-full w-24 h-24 sm:w-[21.625rem] sm:h-[21.625rem] sm:mb-6 object-cover" />
                        </div>
                        <div class="sm:hidden text-3xl w-full">
                            {{ datas.first_name }} {{ datas.last_name }}
                            <p class="text-grey text-sm">{{ datas.email }}</p>
                        </div>
                    </div>
                    <div class="sm:block flex w-9/12 items-center">
                        <div class="sm:block sm:w-auto w-1/2 flex justify-center">
                            <label class="cursor-pointer" for="upload"
                                :class="labelClass">
                                Upload Image
                            </label>
                            <input type="file" :disabled="validated == 1" id="upload" accept=".jpeg,.jpg,.png,.svg" class="hidden" @input="getImage()" />
                        </div>
                        <div class="w-full">
                        </div>
                    </div>
                </div>
                <div class="sm:w-[40rem] sm:mt-[2.5rem] sm:mx-0 2xs:mx-8 mx-4 xs:mx-16">
                    <div class="flex items-center w-full justify-center">
                        <label class="sm:w-full w-2/5 flex justify-end text-base 2xs:text-lg mr-2 sm:text-2xl sm:mr-6">
                            First Name:
                        </label>
                        <div class="justify-start login__box w-full !mt-0">
                            <input :disabled="validated == 1" type="text" placeholder="First Name" class="login__input capitalize" id="first_name" v-model="datas.first_name">
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-center lg:justify-end">
                        <label class="sm:w-full w-2/5 flex justify-end text-base 2xs:text-lg mr-2 sm:text-2xl sm:mr-6">
                            Last Name:
                        </label>
                        <div class="justify-start login__box w-full !mt-0">
                            <input :disabled="validated == 1" type="text" placeholder="Last Name" class="login__input capitalize" id="last_name" v-model="datas.last_name">
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-center lg:justify-end">
                        <label class="sm:w-full w-2/5 flex justify-end text-base 2xs:text-lg mr-2 sm:text-2xl sm:mr-6">
                            Email:
                        </label>
                        <div class="justify-start login__box w-full !mt-0">
                            <input :disabled="validated == 1" type="text" placeholder="Email" class="login__input" id="email" v-model="datas.email">
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-center lg:justify-end">
                        <label class="sm:w-full w-2/5 flex justify-end text-base 2xs:text-lg mr-2 sm:text-2xl sm:mr-6">
                            Password:
                        </label>
                        <div class="justify-start login__box w-full !mt-0">
                            <input :disabled="validated == 1" type="password" placeholder="Password" class="login__input" id="password">
                        </div>
                    </div>
                    <div class="flex items-center mt-[1rem] justify-center lg:justify-end">
                        <button type="button"
                            class="mr-[1.125rem] w-[7.5rem] text-first border-[.15rem] border-first py-[.35rem] rounded-3xl sm:mt-[2.5rem] mx-2 text-sm sm:text-lg"
                            @click="editProfile()">
                            Edit
                        </button>
                        <button type="button" data-bs-toggle="modal" data-bs-target="#notifModal" :class="buttonClass" :disabled="validated == 1">
                            {{ buttonLabel }}
                        </button>
                    </div>
                    <p v-if="response" :class="responseClass">{{response}}</p>
                </div>
            </div>
            <Modal />
        </form>
    </div>
</template>
<script>
import Modal from './Modal.vue'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from 'uuid';
export default {
    data() {
        return{
            validated: 1,
            datas: {},
            response: null,
            responseClass: null,
            url: null,
            file: null,
            dburl: null,
            isLoading: false,
            labelClass: 'sm:w-[15rem] bg-grey text-white p-2 sm:p-3 rounded-3xl sm:mt-[2.5rem] text-xs sm:text-lg',
            buttonClass: 'w-[7.5rem] bg-grey text-white p-2 rounded-3xl sm:mt-[2.5rem] mx-2 text-sm sm:text-lg',
            buttonLabel: 'Save',
        }
    },
    components: {
        Modal
    },
    created() {
        this.getUserData()
    },
    methods: {
        editProfile() {
            this.validated = !this.validated
            if (this.labelClass == 'sm:w-[15rem] bg-grey text-white p-2 sm:p-3 rounded-3xl sm:mt-[2.5rem] text-xs sm:text-lg'){
                this.labelClass = 'sm:w-[15rem] bg-first text-white p-2 sm:p-3 rounded-3xl sm:mt-[2.5rem] text-xs sm:text-lg cursor-pointer'
                this.buttonClass = "w-[7.5rem] bg-first text-white p-2 rounded-3xl sm:mt-[2.5rem] mx-2 text-sm sm:text-lg"
            }
            else{
                this.labelClass = 'sm:w-[15rem] bg-grey text-white p-2 sm:p-3 rounded-3xl sm:mt-[2.5rem] text-xs sm:text-lg'
                this.buttonClass = "w-[7.5rem] bg-grey text-white p-2 rounded-3xl sm:mt-[2.5rem] mx-2 text-sm sm:text-lg"
            }
        },
        getUserData() {
            axios.get('/api/user/')
                .then((response) => {
                    this.datas = response.data[0]
                    if (this.datas.url){
                        const storage = getStorage();
                        const storageRef = ref(storage, 'images/' + this.datas.url);
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
        },
        saveProfile(id) {
            if (password.value == ''){
                axios.put(`/api/user/${id}/`, {
                    first_name: this.datas.first_name,
                    last_name: this.datas.last_name,
                    email: this.datas.email,
                    url: this.dburl,
                    is_staff: "False"
                })
                    .then((response) => {
                        this.datas = response.data
                        this.validated = 1
                        this.response = "Successfully Saved"
                        this.responseClass = "text-green text-end"
                        this.buttonLabel = 'Save'
                        this.labelClass = 'sm:w-[15rem] bg-grey text-white p-3 rounded-3xl sm:mt-[2.5rem] mx-2 text-sm sm:text-lg'
                    })
                    .catch((error) => {
                        this.buttonLabel = 'Save'
                        this.labelClass = 'sm:w-[15.rem] bg-first text-white p-3 rounded-3xl sm:mt-[2.5rem] mx-2 text-sm sm:text-lg cursor-pointer'
                        this.buttonClass = "w-[7.5rem] bg-first text-white p-2 rounded-3xl sm:mt-[2.5rem] mx-2 text-sm sm:text-lg"
                        this.response = "There was an Error Editing Profile"
                        this.responseClass = "text-red text-end"
                        this.validated=0
                        console.log(error)
                    })
            }
            else{
                axios.put(`/api/user/${id}/`, {
                    first_name: first_name.value,
                    last_name: last_name.value,
                    email: email.value,
                    password: password.value,
                    url: this.dburl
                })
                    .then((response) => {
                        this.datas = response.data
                        this.validated = 1
                        this.response = "Successfully Saved"
                        this.responseClass = "text-green text-end"
                        this.buttonLabel = 'Save'
                        this.labelClass = 'sm:w-[15.rem] bg-grey text-white p-3 rounded-3xl sm:mt-[2.5rem] mx-2 text-sm sm:text-lg'
                    })
                    .catch((error) => {
                        this.buttonLabel = 'Save'
                        this.labelClass = 'w-[15.5rem] bg-first text-white p-3 rounded-3xl sm:mt-[2.5rem] mx-2 text-sm sm:text-lg cursor-pointer'
                        this.buttonClass = "w-[7.5rem] bg-first text-white p-2 rounded-3xl sm:mt-[2.5rem] mx-2 text-sm sm:text-lg"
                        this.response = "There was an Error Editing Profile"
                        this.responseClass = "text-red text-end"
                        console.log(error)
                    })
            }
        },
        async afterComplete(e) {
            this.validated = 1
            this.buttonClass = "w-[7.5rem] bg-grey text-white py-2 rounded-3xl sm:mt-[2.5rem] mx-2 text-sm sm:text-lg"
            this.buttonLabel = 'Saving...'
            if (this.file) {
                this.isLoading = true;
                const file = e;
                const re = /(?:\.([^.]+))?$/;
                const ext = re.exec(file.name)[1];
                const fileName = uuid() + '.' + ext ;
                const storage = getStorage();
                const storageRef = ref(storage, 'images/' + fileName);
                await uploadBytesResumable(storageRef, file);
                this.dburl = fileName
            }
            this.saveProfile(this.datas.id)
        },
        getImage() {
            this.file = upload.files[0];
            this.url = URL.createObjectURL(this.file);
        }
    }
}
</script>