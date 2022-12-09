<template>
    <div class="flex flex-col justify-center mt-[10.75rem] text-center">
        <p class="text-[2.5rem] text-second font-semibold"> SKIN DISEASE DETECTION </p>
        <p class="text-[0.875rem] font-medium text-sixth">Upload a picture of your dog’s skin.</p>
        <form class="align-self-center" @submit.prevent="uploadImage">
            <div class="flex flex-col justify-center items-center">
                <label for="upload">
                    <div
                        class="flex w-[30.5rem] h-[3rem] bg-first items-center justify-center mt-[1.75rem] mb-[2.5rem] rounded-2xl">
                        <p v-if="fileName == null" class="text-white cursor-pointer">
                            No File Selected
                        </p>
                        <p v-else class="text-white">
                            {{ fileName }}
                        </p>
                    </div>
                </label>
                <label for="upload"
                    class="flex w-[24.5rem] h-[24.5rem] bg-seventh rounded-[1.5rem] items-center align-self-center justify-center cursor-pointer">
                    <div v-if="url">
                        <img :src="url"  class="object-cover w-[24.5rem] h-[24.5rem] rounded-[1.5rem]" />                    
                    </div>
                    <div v-else-if="canvas">
                        <img :src="dataUrl"  class="object-cover rounded-[1.5rem]" />                    
                    </div>
                    <div v-else-if="video">
                        <video autoplay="true" class="object-cover w-[24.5rem] h-[24.5rem] rounded-[1.5rem]" ref="camera" :srcObject.prop="bind"></video>                        
                    </div>
                    <div v-else class="text-[1.5rem] font-medium text-grey">
                        Drop Image Here<br />
                        - or - <br />
                        Click to Upload
                    </div>
                    <canvas ref="canvas" width="500" height="400"  class="hidden object-cover w-[24.5rem] h-[24.5rem] rounded-[1.5rem]"></canvas>                        
                </label>
                <input type="file" accept=".jpeg,.jpg,.png,.svg" class="hidden" id="upload" @input="getFileName()" />
                <div v-if="video" class="flex justify-between w-[24.5rem]">
                    <button type="button" class="w-[7.5rem] text-first border-[.15rem] border-first py-[.5rem] rounded-3xl mt-[2.5rem] text-lg" @click="useCamera">Cancel</button>
                    <button type="button" class="mt-[2.25rem] w-[7.25rem] py-[1rem] rounded-[2.75rem] bg-first text-white align-self-center" @click="captureImage">Capture</button>
                </div>
                <div v-else-if="canvas" class="flex justify-between w-[24.5rem]">
                    <button type="button" class="w-[7.5rem] text-first border-[.15rem] border-first py-[.5rem] rounded-3xl mt-[2.5rem] text-lg" @click="useCamera">Cancel</button>
                    <button class="mt-[2.25rem] w-[7.25rem] py-[1rem] rounded-[2.75rem] bg-first text-white align-self-center">Submit</button>
                </div>
                <div v-else class="flex justify-between w-[24.5rem]">
                    <button type="button" class="w-[7.5rem] text-first border-[.15rem] border-first py-[.5rem] rounded-3xl mt-[2.5rem] text-lg" @click="useCamera">Use Camera</button>
                    <button class="mt-[2.25rem] w-[7.25rem] py-[1rem] rounded-[2.75rem] bg-first text-white align-self-center">Submit</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            fileName: null,
            url: null,
            video: false,
            bind: "",
            canvas: false,
            dataUrl: null,
        }
    },
    methods: {
        getFileName(){
            const file = upload.files[0];
            this.url = URL.createObjectURL(file);
            this.fileName = upload.files.item(0).name
        },
        uploadImage(){
            this.$router.push({name: "UploadResult"})
        },
        useCamera(){
            this.video = !this.video
            if(this.canvas){
                this.canvas = false
            }
            if(this.video){
                this.openCamera()
            }
        },
        async openCamera(){
            try {
                const stream = await navigator.mediaDevices.getUserMedia({video: true});
                this.handleSuccess(stream);
            }
            catch(err){
                console.log(err)
            }
        },
        handleSuccess(stream){
            window.stream = stream;
            this.bind = stream;
        },
        captureImage(){
            let self = this
            const context = self.$refs.canvas.getContext('2d')
            context.drawImage(self.$refs.camera, 0, 0, 500, 400)
            this.dataUrl = self.$refs.canvas.toDataURL("image/png")
            this.canvas = true
            this.video = false
        },
    }
}
</script>