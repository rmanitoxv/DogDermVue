<template>
    <div class="flex-col justify-center my-[10.75rem] text-center">
        <p class="text-[2.5rem] text-second font-semibold"> DOG SKIN DISEASE DETECTION </p>
        <p class="text-[0.875rem] font-medium text-sixth">Results are in!</p>
        <p class="text-4xl font-semibold italic text-first">{{ datas.disease }} Detected</p>
        <div class="flex mt-14 justify-center">
            <div class="flex w-[24.5rem] h-[24.5rem] bg-seventh rounded-[1.5rem] mr-[6.5rem]">
                <img :src="datas.url" class="object-cover rounded-[1.5rem] w-[24.5rem] h-[24.5rem]" />
            </div>
            <div class="w-[24.5rem] h-[24.5rem] bg-seventh rounded-[1.5rem] relative">
                <p class="text-3xl top-4 absolute w-full z-5">{{ datas.disease }}</p>
                <Swiper :slides-per-view="1" :space-between="50" :modules="[Navigation, Pagination, Virtual, Autoplay]"
                    :navigation="{ nextEl: '.nextArrow', prevEl: '.prevArrow' }" :pagination="{ clickable: true }" autoplay
                    grab-cursor class="object-cover w-[24.5rem] h-[24.5rem]">
                    <div class="navigation">
                        <div class="nav-indicator prevArrow text-3xl cursor-pointer">
                            <i class="bi bi-chevron-left"></i>
                        </div>
                        <div class="nav-indicator nextArrow text-3xl cursor-pointer">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                    <SwiperSlide class="relative">
                        <div class="absolute w-full top-[40%]">
                            <p class="text-6xl mb-1"> {{ datas.confidence }}% </p>
                            <p class="text-grey"> {{ datas.disease }} </p>
                        </div>
                        <div class="flex items-center justify-center h-full text-">
                            <circle-progress :percent="datas.confidence " :viewport="true" fill-color="#112B3C" empty-color="#ECF1F8"
                                :size="225" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide class="flex flex-col items-center justify-center">
                        <img src="/images/map.svg" class="h-[55%] mb-3"/>
                        <router-link to="/clinics"
                            class="w-auto px-3 text-first border-[.15rem] border-first py-[.35rem] rounded-3xl text-xl mb-[-2rem] transition delay-75 hover:bg-first hover:text-seventh">
                            Locate Nearby Clinics
                        </router-link>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
        <IndivDiseaseVue ref="childComponent" />
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
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
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
                'Hotspots',
                'Folliculitis'
            ],
            id: this.$route.params.id,
            datas: {},
        }
    },
    methods:{
        getResults(){
            axios.get(`/api/results/${this.id}`)
            .then((response) => {
                this.datas = response.data
                this.datas.confidence = this.datas.confidence.toFixed(2) * 100
                const storage = getStorage();
                    const storageRef = ref(storage, 'images/' + this.datas.url);
                    getDownloadURL(storageRef)
                        .then((url) => {
                            this.datas.url = url
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
        }
    },
    components() {
        IndivDiseaseVue,
        { CircleProgress }
    },
    created(){
        this.getResults()
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
