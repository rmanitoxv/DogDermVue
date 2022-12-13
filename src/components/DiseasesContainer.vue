<template>
    <div>
        <button 
            @click="$router.push({ name: 'IndivDisease', params: { id: item.id } })">
            <img class="object-cover rounded-t-lg w-96 h-60" :src=url alt="" @error="onImgError" @load="onImgLoad"/>
        </button>
        <!-- ARTICLE INFO CONTAINER -->
        <div class="p-4">
            <button 
                @click="$router.push({ name: 'IndivDisease', params: { id: item.id } })" class="text-start">
                {{item.disease}}
            </button>
            <p class="poppins text-sm mb-3 text-sixth">
                {{item.overview}}
            </p>
            <button 
                @click="$router.push({ name: 'IndivDisease', params: { id: item.id } })" class="poppins font-semibold text-sm bg-first hover:bg-second rounded-full py-2 px-3 hover:text-white w-40">Read
                    More <i class='bx bx-right-arrow-alt align-middle'></i>
            </button>
        </div>
    </div>
</template>
<script>
export default{
    props:{
        item: Object
    },
    data() {
        return{
            url: "/images/loading-gif.gif"
        }
    },
    methods: {
        onImgLoad(){
            this.url = this.item.url
        },
        onImgError(){
            this.url = "/images/loading-gif.gif"
        }
    },
}
</script>