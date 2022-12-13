<template>
    <div class="container my-20 mx-auto" id="app">
        <!-- MAIN TITLE -->
        <div class="my-3">
            <p class="amiko font-thin text-first text-sm tracking-widest">LEARN MORE ABOUT</p>
            <p class="amiko font-bold text-2xl">Dog Skin Disease</p>
        </div>

        <div v-if="datas" class="grid md:grid-cols-3 gap-7 grid-cols-2">
            <!-- INDIV ARTICLE CONTAINER -->
            <div v-for="items in datas" class="rounded-xl bg-white drop-shadow-lg">
                <!-- IMAGE -->
                <DiseasesContainer :item="items" />
            </div>
        </div>
    </div>
</template>

<script>
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import DiseasesContainer from '../components/DiseasesContainer.vue'
export default {
    data() {
        return {
            datas: null
        }
    },
    components:{
        DiseasesContainer
    },
    methods: {
        getDatas() {
            axios.get('/api/diseases/')
            .then((response) => {
                this.datas = response.data
                for (let i=0; i < response.data.length; i++){
                    this.getUrl(i)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        },
        async getUrl(i) {
            const storage = getStorage();
            const storageRef = ref(storage, 'images/' + this.datas[i].url);
            await getDownloadURL(storageRef)
            .then((url) => {
                this.datas[i].url = url
            })
        }
    },
    created(){
        this.getDatas()
    }
}
</script>