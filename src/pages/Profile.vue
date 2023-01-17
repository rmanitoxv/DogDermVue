<template>
    <div class="animate-fade-in-down">
        <div class="flex sm:flex-row flex-col my-32 justify-center">
            <div class="mb-4 sm:mb-0 sm:w-1/4 w-full flex flex-col justify-center items-center text-center">
                <div class="sm:block sm:w-auto flex w-9/12 items-center mb-2">
                    <div class="sm:block sm:w-auto w-1/2 flex justify-center">
                        <img v-if="url" :src="url"
                            class="rounded-full w-24 h-24 sm:w-[21.625rem] sm:h-[21.625rem] sm:mb-6 object-cover" />
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
                        <form @submit.prevent="afterComplete(file)">
                            <input type="file" id="upload" accept="image/*" class="hidden" @input="getImage()" />
                            <label v-if="!changedImage" for="upload"
                                class="sm:w-[15rem] bg-first text-white p-2 sm:p-3 rounded-3xl sm:mt-[2.5rem] text-xs sm:text-lg cursor-pointer hover:!bg-second ease-in-out">
                                &nbsp; Upload Image &nbsp;
                            </label>
                            <button v-else
                                class="w-[7.5rem] bg-first text-white p-2 rounded-3xl mx-2 text-sm sm:text-lg"
                                data-bs-toggle="modal" data-bs-target="#notifModal">Save</button>
                        </form>
                    </div>
                    <div class="w-full">
                    </div>
                </div>
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
                                <p class="text-xl !mb-0 font-bold">{{ response }}</p>
                                <button @click="passorfail" data-bs-dismiss="modal"
                                    class="w-[7.5rem] bg-first text-white p-2 rounded-3xl mt-[2.5rem] mx-2 text-sm sm:text-lg">
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sm:w-[40rem] sm:mt-[2.5rem] sm:mx-0 2xs:mx-8 mx-4 xs:mx-16">
                <div class="flex items-center w-full justify-center">
                    <label class="sm:w-full w-2/5 flex justify-end text-base 2xs:text-lg mr-2 sm:text-2xl sm:mr-6">
                        First Name:
                    </label>
                    <div class="justify-start login__box2 w-full !mt-0">
                        <input disabled type="text" placeholder="First Name" class="login__input capitalize"
                            id="first_name" v-model="datas.first_name">
                    </div>
                </div>
                <div class="flex items-center mt-3 justify-center lg:justify-end">
                    <label class="sm:w-full w-2/5 flex justify-end text-base 2xs:text-lg mr-2 sm:text-2xl sm:mr-6">
                        Last Name:
                    </label>
                    <div class="justify-start login__box2 w-full !mt-0">
                        <input disabled type="text" placeholder="Last Name" class="login__input capitalize"
                            id="last_name" v-model="datas.last_name">
                    </div>
                </div>
                <div class="flex items-center mt-3 justify-center lg:justify-end">
                    <label class="sm:w-full w-2/5 flex justify-end text-base 2xs:text-lg mr-2 sm:text-2xl sm:mr-6">
                        Email:
                    </label>
                    <div class="justify-start login__box2 w-full !mt-0">
                        <input disabled type="text" placeholder="Email" class="login__input" id="email"
                            v-model="datas.email">
                    </div>
                </div>
                <div class="flex items-center mt-[1rem] justify-center lg:justify-end">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#notifModal1"
                        class="sm:w-[15rem] bg-first text-white p-2 sm:p-3 rounded-3xl sm:mt-[2.5rem] text-xs sm:text-lg cursor-pointer hover:!bg-second ease-in-out">
                        Change Password
                    </button>
                </div>
            </div>
        </div>
        <div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto !pr-0"
            id="notifModal1" tabindex="-1" aria-labelledby="notifModalLabel" aria-hidden="true">
            <div class="modal-dialog relative w-auto pointer-events-none">
                <div
                    class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-3xl outline-none text-current">
                    <div v-if="changingPassword" class="m-8">
                        <p class="text-xl !mb-0 font-bold hover:!bg-second ease-in-out "> Change Password </p>
                        <div class="modal-body relative !mt-0 mb-4 text-grey">
                            Type your New and Old Password.
                        </div>
                        <form @submit.prevent="saveProfile(datas.id)">
                            <div class="flex items-center mr-8 mb-4">
                                <label class="sm:w-full w-2/5 flex justify-end text-sm 2xs:text-base mr-2 sm:text-md">
                                    Old Password:
                                </label>
                                <div class="justify-start pass__box w-full !mt-0">
                                    <input :type="oPassType" placeholder="Password" class="login__input"
                                        v-model="opassword">
                                    <button type="button" @click="showOPass()"> <i :class="oPassClass"></i> </button>
                                </div>
                            </div>
                            <div class="flex items-center mr-8 mb-4">
                                <label class="sm:w-full w-2/5 flex justify-end text-sm 2xs:text-base mr-2 sm:text-md">
                                    New Password:
                                </label>
                                <div class="justify-start pass__box w-full !mt-0">
                                    <input :type="nPassType" placeholder="Password" class="login__input"
                                        v-model="npassword">
                                    <button type="button" @click="showNPass()"> <i :class="nPassClass"></i> </button>
                                </div>
                            </div>
                            <div class="flex items-center mr-8">
                                <label class="sm:w-full w-2/5 flex justify-end text-sm 2xs:text-base mr-2 sm:text-md">
                                    Re-type New Password:
                                </label>
                                <div class="justify-start pass__box w-full !mt-0">
                                    <input :type="rnPassType" placeholder="Password" class="login__input"
                                        v-model="rnpassword">
                                    <button type="button" @click="showRNPass()"> <i :class="rnPassClass"></i> </button>
                                </div>
                            </div>
                            <div class="flex w-full justify-end">
                                <button type="button"
                                    class="mr-[1.125rem] w-[7.5rem] text-first border-[.15rem] border-first py-[.35rem] rounded-3xl mt-[2.5rem] mx-2 text-sm sm:text-lg hover:!text-second hover:!text-bold hover:!border-third !ease-in-out"
                                    data-bs-dismiss="modal">
                                    Cancel
                                </button>
                                <button
                                    class="w-[7.5rem] bg-first text-white p-2 rounded-3xl mt-[2.5rem] mx-2 text-sm sm:text-lg hover:!bg-second ease-in-out">
                                    Save
                                </button>
                            </div>

                        </form>
                    </div>
                    <div v-else-if="isLoading" class="m-8">
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
                        <p class="text-xl text-center !mb-0 font-bold"><span :class="responseClass">{{ response }}</span></p>
                        <button v-if="isError" @click="passorfail"
                            class="w-[7.5rem] bg-first text-white p-2 rounded-3xl mt-[2.5rem] mx-2 text-sm sm:text-lg">
                            Try Again
                        </button>
                        <button v-else @click="passorfail" data-bs-dismiss="modal"
                            class="w-[7.5rem] bg-first text-white p-2 rounded-3xl mt-[2.5rem] mx-2 text-sm sm:text-lg">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Modal from './Modal.vue'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from 'uuid';
export default {
    data() {
        return {
            datas: {},
            response: null,
            responseClass: null,
            url: null,
            file: null,
            dburl: null,
            isLoading: false,
            opassword: null,
            npassword: null,
            rnpassword: null,
            changedImage: false,
            loading: true,
            changingPassword: true,
            oPassClass: "login__icon bi bi-eye",
            nPassClass: "login__icon bi bi-eye",
            rnPassClass: "login__icon bi bi-eye",
            oPassType: "password",
            nPassType: "password",
            rnPassType: "password",
            isError: false
        }
    },
    components: {
        Modal
    },
    created() {
        this.getUserData()
    },
    methods: {
        getUserData() {
            axios.get('/api/user/')
                .then((response) => {
                    this.datas = response.data[0]
                    this.password = this.datas.password
                    if (this.datas.url) {
                        const storage = getStorage();
                        const storageRef = ref(storage, 'images/' + this.datas.url);
                        getDownloadURL(storageRef)
                            .then((url) => {
                                this.url = url
                                this.changedImage = false
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
            if (this.npassword == null) {
                axios.put(`/api/user/${id}/`, {
                    first_name: this.datas.first_name,
                    last_name: this.datas.last_name,  
                    cpassword: this.datas.password,
                    password: this.datas.password
                })
                    .then((response) => {
                        this.response = "Successfully Saved"
                        this.responseClass = "text-green text-end"
                        this.loading = false
                        this.changedImage = false
                    })
                    .catch((error) => {
                        this.response = "There was an Error Editing Profile"
                        this.responseClass = "text-red text-end"
                        this.loading = false
                        this.changedImage = false
                    })
            }
            else {
                this.isLoading = true
                this.changingPassword = false
                if(this.npassword == this.rnpassword ){
                    axios.put(`/api/user/${id}/`, {
                        first_name: first_name.value,
                        last_name: last_name.value,
                        email: email.value,
                        is_staff: "False",
                        password: this.npassword,
                        cpassword: this.opassword
                    })
                        .then((response) => {
                            if (response.data.message == "Error"){
                                this.response = "Old Password is Incorrect"
                                this.responseClass = "text-red text-end"
                                this.isError = true
                            }
                            else{
                                this.response = "Successfully Saved"
                                this.responseClass = "text-green text-end"
                                this.isError = false
                            }
                            this.isLoading = false
                        })
                        .catch((error) => {
                            this.response = "There was an Error Editing Profile"
                            this.responseClass = "text-red text-end"
                            this.isError = true
                            this.isLoading = false
                        })
                }
                else{
                    this.response = "New Password and Re-typed Password do not match"
                    this.responseClass = "text-red text-end"
                    this.isError = true
                    this.isLoading = false
                }
            }
        },
        passorfail(){
            this.opassword = null
            this.npassword = null
            this.rnpassword = null
            this.changingPassword = true
        },
        async afterComplete(e) {
            if (this.file) {
                this.isLoading = true;
                const file = e;
                const re = /(?:\.([^.]+))?$/;
                const ext = re.exec(file.name)[1];
                const fileName = uuid() + '.' + ext;
                const storage = getStorage();
                const storageRef = ref(storage, 'images/' + fileName);
                await uploadBytesResumable(storageRef, file);
                this.dburl = fileName
            }
            else {
                this.dburl = this.datas.url
            }
            this.saveProfile(this.datas.id)
        },
        getImage() {
            this.file = upload.files[0];
            this.url = URL.createObjectURL(this.file);
        },
        showOPass(){
            if (this.oPassType == "password") {
                this.oPassType = "text"
                this.oPassClass = "login__icon bi bi-eye-slash"
            }
            else {
                this.oPassType = "password"
                this.oPassClass = "login__icon bi bi-eye"
            }
        },
        showNPass(){
            if (this.nPassType == "password") {
                this.nPassType = "text"
                this.nPassClass = "login__icon bi bi-eye-slash"
            }
            else {
                this.nPassType = "password"
                this.nPassClass = "login__icon bi bi-eye"
            }
        },
        showRNPass(){
            if (this.rnPassType == "password") {
                this.rnPassType = "text"
                this.rnPassClass = "login__icon bi bi-eye-slash"
            }
            else {
                this.rnPassType = "password"
                this.rnPassClass = "login__icon bi bi-eye"
            }
        },
    },
    watch: {
        file(to, from) {
            this.loading = true
            this.changedImage = true
        }
    }
}
</script>
