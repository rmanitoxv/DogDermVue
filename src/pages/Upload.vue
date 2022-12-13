<template>
    <div class="flex flex-col justify-center my-[10.75rem] text-center">
        <p class="text-[2.5rem] text-second font-semibold"> DOG SKIN DISEASE DETECTION </p>
        <p class="text-[0.875rem] font-medium text-sixth">Upload a picture of your dog’s skin.</p>
        <form class="align-self-center" @submit.prevent="afterComplete(file)">
            <div class="flex flex-col justify-center items-center">
                <div v-if="canvas || video">
                    <div
                        class="flex w-[30.5rem] h-[3rem] bg-first items-center justify-center mt-[1.75rem] mb-[2.5rem] rounded-2xl">
                        <p class="text-white cursor-pointer">
                            No File Selected
                        </p>
                    </div>
                </div>
                <div v-else>
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
                </div>
                <div v-if="canvas" class="flex w-[24.5rem] h-[24.5rem] bg-seventh rounded-[1.5rem] items-center align-self-center justify-center">
                    <img :src="dataUrl"  class="object-cover rounded-[1.5rem]" />                    
                    </div>
                <div v-else-if="video" class="flex w-[24.5rem] h-[24.5rem] bg-seventh rounded-[1.5rem] items-center align-self-center justify-center">
                    <video autoplay="true" class="object-cover w-[24.5rem] h-[24.5rem] rounded-[1.5rem]" ref="camera" :srcObject.prop="bind"></video>                        
                </div>
                <div v-else>
                    <label for="upload"
                        class="flex w-[24.5rem] h-[24.5rem] bg-seventh rounded-[1.5rem] items-center align-self-center justify-center cursor-pointer">
                        <div v-if="url">
                            <img :src="url"  class="object-cover w-[24.5rem] h-[24.5rem] rounded-[1.5rem]" />                    
                        </div>
                        <div v-else class="text-[1.5rem] font-medium text-grey">
                            Drop Image Here<br />
                            - or - <br />
                            Click to Upload
                        </div>
                    </label>
                </div>
                <canvas ref="canvas" width="500" height="400"  class="hidden object-cover w-[24.5rem] h-[24.5rem] rounded-[1.5rem]"></canvas>                        
                <input type="file" accept=".jpeg,.jpg,.png,.svg" class="hidden" id="upload" @change="getFileName(e)" />
                <div v-if="video" class="flex justify-between w-[24.5rem]">
                    <button type="button" class="w-[7.5rem] text-first border-[.15rem] border-first py-[.5rem] rounded-3xl mt-[2.5rem] text-lg" @click="useCamera">Cancel</button>
                    <button type="button" class="mt-[2.25rem] w-[7.25rem] py-[1rem] rounded-[2.75rem] bg-first text-white align-self-center" @click="captureImage">Capture</button>
                </div>
                <div v-else-if="canvas" class="flex justify-between w-[24.5rem]">
                    <button type="button" class="w-[7.5rem] text-first border-[.15rem] border-first py-[.5rem] rounded-3xl mt-[2.5rem] text-lg" @click="useCamera">Cancel</button>
                    <button :class="submitClass" :disabled="saving"> {{ status }} </button>
                </div>
                <div v-else class="flex justify-between w-[24.5rem]">
                    <button type="button" class="w-[7.5rem] text-first border-[.15rem] border-first py-[.5rem] rounded-3xl mt-[2.5rem] text-lg" @click="useCamera">Use Camera</button>
                    <button :class="submitClass" :disabled="saving"> {{ status }} </button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import { submit } from "dom7";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from 'uuid';
export default {
    data() {
        return {
            fileName: null,
            url: null,
            video: false,
            bind: "",
            canvas: false,
            dataUrl: null,
            dburl: null,
            file: null,
            status: "Submit",
            submitClass: "mt-[2.25rem] w-[7.25rem] py-[1rem] rounded-[2.75rem] bg-first text-white align-self-center",
            saving: 0
        }
    },
    methods: {
        getFileName(e){
            const file = upload.files[0];
            this.url = URL.createObjectURL(file);
            this.fileName = upload.files.item(0).name
            const reader = new FileReader();
            reader.onloadend = () => {
                this.dataUrl =  reader.result
            };
            reader.readAsDataURL(file);
        },
        uploadImage(){
            this.saving = 1
            this.status = "Detecting..."
            this.submitClass = "mt-[2.25rem] w-[7.25rem] py-[1rem] rounded-[2.75rem] bg-grey text-white align-self-center"
            axios.post("https://rmanitoxv-dogderma.hf.space/run/predict", {
                data: [
                    this.dataUrl
                ]
            })
            .then((response)=>{
                axios.post("/api/results/", {
                    disease: response.data.data[0].label,
                    confidence: response.data.data[0].confidences[0].confidence,
                    url: this.dburl
                })
                .then((response) => {
                    this.$router.push({ name: "UploadResult", params: { id: response.data.id } })
                })
                .catch((error) => {
                    this.saving = 0
                    this.status = "Submit"
                    this.submitClass = "mt-[2.25rem] w-[7.25rem] py-[1rem] rounded-[2.75rem] bg-first text-white align-self-center"
                    console.log(error)
                })
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        useCamera(){
            this.file = null
            this.video = !this.video
            if(this.url){
                this.url = null
                this.dataUrl = null
            }
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
            this.file =  dataURItoBlob(this.dataUrl);
            function dataURItoBlob(dataURI) {
                // convert base64/URLEncoded data component to raw binary data held in a string
                var byteString;
                if (dataURI.split(',')[0].indexOf('base64') >= 0)
                    byteString = atob(dataURI.split(',')[1]);
                else
                    byteString = unescape(dataURI.split(',')[1]);
                // separate out the mime component
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                // write the bytes of the string to a typed array
                var ia = new Uint8Array(byteString.length);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ia], {type:mimeString});
            }
            this.canvas = true
            this.video = false
        },
        async afterComplete(e) {
            let fileName
            let file
            if (this.file){
                file = this.file
                fileName = uuid()

            }
            else{
                file = upload.files[0];
                const re = /(?:\.([^.]+))?$/;
                let ext = re.exec(file.name)[1];
                fileName = uuid() + '.' + ext ;
            }
            const storage = getStorage();
            const storageRef = ref(storage, 'images/' + fileName);
            await uploadBytesResumable(storageRef, file);
            this.dburl = fileName
            this.uploadImage()
        },
    }
}
</script>