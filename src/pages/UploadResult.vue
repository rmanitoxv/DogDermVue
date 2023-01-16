<template>
    <div class=" my-[10.75rem] animate-fade-in-down">
        <div class="flex-col justify-center text-center animate-fade-in-down">
            <p class="text-2xl sm:text-[2.5rem] text-second font-semibold"> DOG SKIN DISEASE DETECTION </p>
            <p class="text-sm lg:text-md font-medium py-2 text-sixth"><br>Results are in!</p>
            <p v-if="datas.disease != 'Unidentified'" class="text-2xl sm:text-4xl font-semibold italic text-first">{{ datas.disease }} Detected</p>
            <p v-else class="text-2xl sm:text-4xl font-semibold italic text-first">Image is Unidentified</p>
            <div class="hidden sm:flex mt-14 justify-center">
                <div class="flex w-80 h-80 sm:w-96 sm:h-96 bg-seventh rounded-[1.5rem]">
                    <img :src="url" class="object-cover rounded-[1.5rem] w-80 h-80 sm:w-96 sm:h-96" @error="onImgError" @load="onImgLoad"/>
                </div>
                <div v-if="datas.disease != 'Unidentified'" class="ml-20 flex flex-col justify-center items-center w-96 h-96 bg-seventh rounded-[1.5rem] ">
                    <p class="text-3xl w-full z-5">{{ datas.disease }}</p>
                    <img src="/images/map.svg" class="h-[55%] mb-3"/>
                    <router-link to="/clinics"
                        class=" w-auto px-3 text-first border-[.15rem] border-first py-[.35rem] rounded-3xl text-xl transition delay-75 hover:bg-first hover:text-seventh">
                        Locate Nearby Clinics
                    </router-link>
                </div>
            </div>
            <Swiper :slides-per-view="1" :space-between="50" :modules="[Navigation, Pagination, Virtual, Autoplay]"
                    :navigation="{ nextEl: '.nextArrow', prevEl: '.prevArrow' }" autoplay
                    grab-cursor class="w-80 h-80 sm:hidden">
                    <div class="navigation">
                        <div class="nav-indicator text-first prevArrow text-3xl cursor-pointer">
                            <i class="bi bi-chevron-left"></i>
                        </div>
                        <div class="nav-indicator text-first nextArrow text-3xl cursor-pointer">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                    <SwiperSlide class="flex w-80 h-80 sm:w-96 sm:h-96 bg-seventh rounded-[1.5rem]">
                        <img :src="url" class="object-cover rounded-[1.5rem] w-80 h-80 sm:w-96 sm:h-96" @error="onImgError" @load="onImgLoad"/>
                    </SwiperSlide>
                    <SwiperSlide class="flex flex-col justify-center items-center w-96 h-96 bg-seventh rounded-[1.5rem] ">
                        <p class="text-3xl w-full z-5">{{ datas.disease }}</p>
                        <img src="/images/map.svg" class="h-[55%] mb-3"/>
                        <router-link to="/clinics"
                            class=" w-auto px-3 text-first border-[.15rem] border-first py-[.35rem] rounded-3xl text-xl transition delay-75 hover:bg-first hover:text-seventh">
                            Locate Nearby Clinics
                        </router-link>
                    </SwiperSlide>
            </Swiper>
        </div>
        <IndivDiseaseVue v-if="datas.disease != 'Unidentified'" ref="childComponent" />
    </div>
</template>
<script setup>
import { Navigation, Pagination, Virtual, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css';
import 'swiper/css/bundle';
</script>
<script>
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import IndivDiseaseVue from './IndivDisease.vue';
export default {
    data() {
        return {
            data: [
                'Sarcoptic Mange',
                'MRSA',
                'Ringworms',
                'Flea Infestation',
                'Tickborne Disease',
                'Harvest Mites',
                'Yeast Infection',
                'Hot Spots',
                'Folliculitis',
                'Carbuncles'
            ],
            id: this.$route.params.id,
            datas: {},
            url: null
        }
    },
    methods:{
        getResults(){
            axios.get(`/api/results/${this.id}`)
            .then((response) => {
                this.datas = response.data
                const storage = getStorage();
                    const storageRef = ref(storage, 'images/' + this.datas.url);
                    getDownloadURL(storageRef)
                        .then((url) => {
                            this.datas.url = url
                            this.url = url
                        })
                        this.getTreatments()
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                },
        getTreatments(){
            for(let i = 0; i<=8; i++){
                if (this.data[i] == this.datas.disease){
                    axios.get(`/api/diseases/${i+1}`)
                    .then((response) => {
                        this.$refs.childComponent.getData(response.data.id)
                        this.$refs.childComponent.hidden = true
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }
            }
        },
        onImgLoad(){
            this.url = this.datas.url
        },
        onImgError(){
            this.url = `/loading/Loading_Rocket.gif`
        }
    },
    components:{
        IndivDiseaseVue
    },
    created(){
        this.getResults()
        this.url = `/loading/Loading_Rocket.gif`
    }
}

</script>
<style>
.swiper-button-disabled {
    cursor: default;
    opacity: 0;
}

.navigation {
    z-index: 20;
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    top: 50%;
}

</style>
