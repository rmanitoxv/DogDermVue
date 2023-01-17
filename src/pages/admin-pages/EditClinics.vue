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
                        <label class="text-xl mr-6">
                            Clinic Name:
                        </label>
                        <div class="login__box1 w-[20rem] mt-0">
                            <input type="text" placeholder="Clinic Name" class="login__input" id="clinic_name" v-model="datas.clinic_name">
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-xl mr-6">
                            Address:
                        </label>
                        <div class="login__box1 w-[20rem] mt-0">
                            <input type="text" placeholder="Address" class="login__input" id="clinic_address" v-model="datas.clinic_address">
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-xl mr-6">
                            Mobile:
                        </label>
                        <div class="login__box1 w-[20rem] mt-0">
                            <input type="text" placeholder="Mobile" class="login__input" id="clinic_mobile" v-model="datas.clinic_mobile">
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-xl mr-6">
                            Landline:
                        </label>
                        <div class="login__box1 w-[20rem] mt-0">
                            <input type="text" placeholder="Landline" class="login__input" id="clinic_landline" v-model="datas.clinic_landline">
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-xl mr-6">
                            Email:
                        </label>
                        <div class="login__box1 w-[20rem] mt-0">
                            <input type="text" placeholder="Email" class="login__input" id="clinic_email" v-model="datas.clinic_email">
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-xl mr-6">
                            Hours Open:
                        </label>
                        <div class="login__box1 w-[20rem] mt-0">
                            <input type="text" placeholder="Email" class="login__input" id="clinic_hours" v-model="datas.clinic_hours">
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-xl mr-6">
                            Facebook Link:
                        </label>
                        <div class="login__box1 w-[20rem] mt-0">
                            <input type="text" placeholder="Facebook Link" class="login__input" id="clinic_fb" v-model="datas.clinic_fb">
                        </div>
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
        }
    },
    methods: {
        editClinics() {
            axios.patch(`/api/clinics/${this.id}/`, {
                clinic_name: this.datas.clinic_name,
                clinic_address: this.datas.clinic_address,
                clinic_mobile: this.datas.clinic_mobile,
                clinic_landline: this.datas.clinic_landline,
                clinic_email: this.datas.clinic_email,
                clinic_hours: this.datas.clinic_hours,
                clinic_fb: this.datas.clinic_fb,
                url: this.dburl
            }
                )
                .then((response) => {
                    this.$router.push({ name: 'AdminClinics' })
                })
                .catch((error) => {
                    console.log(error)
                    this.response = error.response.data.message
                    this.saving = 0
                    this.status = 'Edit'
                    this.buttonClass = 'w-[7.5rem] bg-first cursor-none text-white py-2 rounded-2xl mt-[2.5rem] text-lg'
                })
        },
        getData(id) {
            axios.get(`/api/clinics/${id}/`)
            .then((response) => {
                this.datas = response.data
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
            this.editClinics()
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