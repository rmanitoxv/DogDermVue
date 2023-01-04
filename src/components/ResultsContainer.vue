<template>
    <div class="flex item items-center mx-4 my-4 sm:mx-28 sm:my-7 text-left">
        <div class="">
            <div class="h-28 w-20 sm:h-48 sm:w-48">
                <img :src="url" class="rounded-xl h-28 w-20 sm:h-48 sm:w-48 object-cover" @error="onImgError" @load="onImgLoad"/>
            </div>
        </div>
        <div class="mx-4 sm:mx-16">

        </div>
        <div class="">
            <p class="font-bold text-sm sm:text-xl">Date: <span class="text-grey font-medium">{{ convertTimeStamp(item.created_at) }}</span></p>
            <p class="font-bold text-sm sm:text-xl">Skin Disease Detected: <span class="text-grey font-medium">{{ item.disease }}</span></p>
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
            url: this.item.url,
            random: null
        }
    },
    methods: {
        onImgLoad(){
            this.url = this.item.url
        },
        onImgError(){
            this.url = `loading/${this.random}.gif`
        },
        convertTimeStamp: function(isoDate) {
            let options = { year: 'numeric', month: 'long', day: 'numeric' };
            let today  = new Date(isoDate);
            return today.toLocaleDateString("en-US", options);
        },
    },
    created() {
        this.random = Math.floor(Math.random() * 4)
        this.url = `loading/${this.random}.gif`
    }
}
</script>