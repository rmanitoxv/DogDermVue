<template>
    <div class="flex flex-col my-[6.25rem]">
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
                    <div class="shadow-md rounded-full w-[15rem] h-[15rem] mb-6">
                        <img :src="url" class="rounded-full w-[15rem] h-[15rem]"/>
                    </div>
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
                            Disease:
                        </label>
                        <div class="login__box1 w-[30rem] mt-0">
                            <input type="text" placeholder="Disease" class="login__input" id="disease" v-model="datas.disease">
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-xl mr-6">
                            Overview:
                        </label>
                        <div class="login__box1 w-[30rem] mt-0">
                            <textarea placeholder="Overview" class="login__input resize-none" rows="10" id="overview" v-model="datas.overview"></textarea>
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-xl mr-6">
                            Causes:
                        </label>
                        <div class="login__box1 w-[30rem] mt-0">
                            <textarea type="text" placeholder="Causes" class="login__input resize-none" rows="10" id="causes" v-model="datas.causes"></textarea>
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-xl mr-6">
                            Symptoms:
                        </label>
                        <div class="login__box1 w-[30rem] mt-0">
                            <textarea type="text" placeholder="Symptoms" class="login__input resize-none" rows="10" id="symptoms"></textarea>
                        </div>
                    </div>
                    <div v-if="symptoms.length" class="flex mt-5 ml-40 w-[30rem]">
                        Symptoms:
                        <div class="flex flex-wrap">
                            <div v-for="item in symptoms" class="flex flex-wrap border border-grey rounded-full px-3 m-1 text-grey">
                                <button type="button" class="mr-3" @click="removeSymptom(item)"><i class="bi bi-x-lg text-grey"></i></button>{{item}}
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <button type="button" class="w-[10rem] text-first border-[.15rem] border-first py-[.35rem] rounded-2xl mt-3 text-lg" @click="addSymptoms">Add Symptoms</button>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-xl mr-6">
                            Treatment Overview:
                        </label>
                        <div class="login__box1 w-[30rem] mt-0">
                            <textarea type="text" placeholder="Treatment" class="login__input resize-none" rows="10" id="treatment" v-model="datas.treatment"></textarea>
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-xl mr-6">
                            Treatment Processes:
                        </label>
                        <div class="login__box1 w-[30rem] mt-0">
                            <textarea placeholder="Treatments" class="login__input resize-none" rows="3" id="treatments"></textarea>
                        </div>
                    </div>
                    <div v-if="treatments.length" class="flex mt-5 ml-40 w-[30rem]">
                        Treatments:
                        <div v-for="item in treatments" class="flex border border-grey rounded-full px-3 mx-1 text-grey">
                            <button type="button" class="mr-3" @click="removeTreatment(item)"><i class="bi bi-x-lg text-grey"></i></button>{{item}}
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <button type="button" class="w-[10rem] text-first border-[.15rem] border-first py-[.35rem] rounded-2xl mt-3 text-lg" @click="addTreatments">Add Treatment</button>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-xl mr-6">
                            Prevention Overview:
                        </label>
                        <div class="login__box1 w-[30rem] mt-0">
                            <textarea type="text" placeholder="Prevention" class="login__input resize-none" rows="10" id="prevention" v-model="datas.prevention"></textarea>
                        </div>
                    </div>
                    <div class="flex items-center mt-3 justify-end">
                        <label class="text-xl mr-6">
                            Prevention Processes:
                        </label>
                        <div class="login__box1 w-[30rem] mt-0">
                            <textarea placeholder="Preventions" class="login__input resize-none" rows="3" id="preventions"></textarea>
                        </div>
                    </div>
                    <div v-if="preventions.length" class="flex mt-5 ml-40 w-[30rem]">
                        Preventions:
                        <div v-for="item in preventions" class="flex border border-grey rounded-full px-3 mx-1 text-grey">
                            <button type="button" class="mr-3" @click="removeTreatment(item)"><i class="bi bi-x-lg text-grey"></i></button>{{item}}
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <button type="button" class="w-[10rem] text-first border-[.15rem] border-first py-[.35rem] rounded-2xl mt-3 text-lg" @click="addPreventions">Add Prevention</button>
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
            status: 'Edit',
            saving: 0,
            buttonClass: 'w-[7.5rem] bg-first text-white py-2 rounded-2xl mt-[2.5rem] text-lg',
            symptoms: [],
            treatments: [],
            preventions: [],
        }
    },
    methods: {
        editDisease() {
            axios.put(`/api/diseases/${this.id}/`, {
                disease: this.datas.disease,
                overview: this.datas.overview,
                causes: this.datas.causes,
                treatment: this.datas.treatment,
                prevention: this.datas.prevention,
                treatments: JSON.stringify(this.treatments),
                preventions: JSON.stringify(this.preventions),
                url: this.dburl,
                symptoms: JSON.stringify(this.symptoms)
            }
                )
                .then((response) => {
                    this.$router.push({ name: 'AdminDiseases' })
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
            axios.get(`/api/diseases/${id}/`)
            .then((response) => {
                this.datas = response.data
                if(response.data.symptoms){
                    this.symptoms = JSON.parse(response.data.symptoms)
                }
                if(response.data.treatments){
                    this.treatments = JSON.parse(response.data.treatments)
                }
                if(response.data.preventions){
                    this.preventions = JSON.parse(response.data.preventions)
                }
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
        addSymptoms() {
            if (symptoms.value){
                this.symptoms.push(symptoms.value)
                symptoms.value = null
            }
        },
        removeSymptom(e){
            let index = this.symptoms.indexOf(e);
            this.symptoms.splice(index, 1);
        },
        addTreatments() {
            if (treatments.value){
                this.treatments.push(treatments.value)
                treatments.value = null
            }
        },
        removeTreatment(e){
            let index = this.treatments.indexOf(e);
            this.treatments.splice(index, 1);
        },
        addPreventions() {
            if (preventions.value){
                this.preventions.push(preventions.value)
                preventions.value = null
            }
        },
        removePrevention(e){
            let index = this.preventions.indexOf(e);
            this.preventions.splice(index, 1);
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
            this.editDisease()
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