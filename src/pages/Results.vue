<template>
    <div class="flex flex-col justify-center 3xs:mt-20 lg:my-[10.75rem] 3xs:mx-10 sm:mx-20 md:mx-20 lg:mx-60 text-center">
        <p class="text-left font-semibold 3xs:text-3xl lg:text-4xl">Results:</p>
        <div v-for="item in datas" class="shadow-lg w-full my-4 rounded-3xl">
            <ResultsContainer :item="item"/>
        </div>
    </div>
</template>
<script>
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import ResultsContainer from '../components/ResultsContainer.vue'
export default{
    components:{
        ResultsContainer
    },
    methods:{
        getResults(){
            axios.get(`/api/results/`)
            .then((response) => {
                this.datas = response.data
                for(let i=0;i<this.datas.length;i++){
                    const storage = getStorage();
                    const storageRef = ref(storage, 'images/' + this.datas[i].url);
                    getDownloadURL(storageRef)
                    .then((url) => {
                        this.datas[i].url = url
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
        },
    },
    data(){
        return{
            datas: {},
        }
    },
    created(){
        this.getResults()
    },
}
</script>