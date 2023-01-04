<template>
    <div>
        <button 
            @click="$router.push({ name: 'IndivDisease', params: { id: item.id } })">
            <!-- w-96 h-60 originally  -->
            <img class="object-cover rounded-t-lg w-96 h-60 max-sm:h-max max-sm:w-max" :src=url  @error="onImgError" @load="onImgLoad"/>
        </button>
        <!-- ARTICLE INFO CONTAINER -->
        <div class="px-7 py-5">
            <button 
                @click="$router.push({ name: 'IndivDisease', params: { id: item.id } })" class="text-start text-lg font-semibold mb-2">
                {{item.disease}}
            </button>
            <p class="poppins text-sm mb-3 text-sixth">
                {{item.overview}}
            </p>
            <button 
                @click="$router.push({ name: 'IndivDisease', params: { id: item.id } })" class="poppins font-semibold text-sm text-white bg-first hover:bg-second rounded-full py-2 px-3 hover:text-white w-auto">Read
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
            url: null,
            random: null
        }
    },
    methods: {
        onImgLoad(){
            this.url = this.item.url
        },
        onImgError(){
            this.url = `loading/${this.random}.gif`
        }
    },
    created() {
        this.random = Math.floor(Math.random() * 4)
        this.url = `loading/${this.random}.gif`
    }
}
</script>