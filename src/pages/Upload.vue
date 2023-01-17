<template>
    <div class="flex flex-col justify-center my-20 lg:my-[10.75rem] text-center animate-fade-in-down">
        <p class="text-2xl lg:text-[2.5rem] text-second font-semibold"> DOG SKIN DISEASE DETECTION </p>
        <p class="text-sm lg:text-md font-medium py-2 text-sixth"><br>Upload a close-up picture of the affected area of your dog.</p>
        <form class="align-self-center" @submit.prevent="afterComplete(file)">
            <div class="flex flex-col justify-center items-center">
                <div class="my-3 !mt-5 p-3 border-2 rounded-3xl border-first bg-[#FFEFE1] flex w-80 lg:w-[30.5rem] break-words !text-left">
                    <p class="amiko text-first text-sm !text-left font-semibold">
                        <b>NOTE:</b> Please keep in mind that this version is limited to only 10 dog skin diseases such as ringworms, hot spots, folliculitis and other diseases included in the <router-link to="/"><u><b>FAQs.</b></u></router-link>
                        <br><br>Low resolution images or images in poor lighting conditions might not be recognized. Use high resolution pictures for optimal results.
                    </p>
                </div>
            </div>
            <div class="flex flex-col justify-center items-center">
                <div v-if="canvas || video">
                    <div
                        class="flex w-80 lg:w-[30.5rem] h-[3rem] bg-first items-center justify-center mt-[1.75rem] mb-[2.5rem] rounded-2xl hover:!bg-second ease-in-out">
                        <p class="text-white cursor-pointer">
                            No File Selected
                        </p>
                    </div>
                </div>
                <div v-else>
                    <label for="upload">
                        <div
                            class="flex w-80 lg:w-[30.5rem] h-[3rem] bg-first items-center justify-center mt-[1.75rem] mb-[2.5rem] rounded-2xl hover:!bg-second ease-in-out">
                            <p v-if="fileName == null" class="text-white cursor-pointer">
                                No File Selected
                            </p>
                            <p v-else class="text-white">
                                {{ fileName }}
                            </p>
                        </div>
                    </label>
                </div>
                <div v-if="canvas" class="flex w-80 h-80 lg:w-[24.5rem] lg:h-[24.5rem] bg-seventh rounded-[1.5rem] items-center align-self-center justify-center">
                    <img :src="dataUrl"  class="object-cover rounded-[1.5rem]" />                    
                    </div>
                <div v-else-if="video" class="flex w-80 h-80 lg:w-[24.5rem] lg:h-[24.5rem] bg-seventh rounded-[1.5rem] items-center align-self-center justify-center">
                    <video autoplay="true" class="object-cover w-80 h-80 lg:w-[24.5rem] lg:h-[24.5rem] rounded-[1.5rem]" ref="camera" :srcObject.prop="bind"></video>                        
                </div>
                <div v-else>
                    <label for="upload"
                        class="flex w-80 h-80 lg:w-[24.5rem] lg:h-[24.5rem] bg-seventh rounded-[1.5rem] items-center align-self-center justify-center cursor-pointer">
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
                <input type="file" accept="image/*" class="hidden" id="upload" @change="getFileName(e)" />
                <div v-if="video" class="flex justify-between w-80 lg:w-[24.5rem] !mb-5">
                    <button type="button" class="w-[7.5rem] text-first border-[.15rem] border-first py-[.5rem] mx-[1rem] rounded-3xl mt-[2.5rem] text-md hover:!text-second hover:!text-bold hover:!border-third !ease-in-out" @click="useCamera">Cancel</button>
                    <button type="button" class="mt-[2.25rem] w-[7.25rem] border-[.15rem] py-[.5rem] mx-[1rem] rounded-[2.75rem] bg-first text-white align-self-center text-md" @click="captureImage">Capture</button>
                </div>
                <div v-else-if="canvas" class="flex justify-between w-80 lg:w-[24.5rem] !mb-5">
                    <button type="button" class="w-[7.5rem] text-first border-[.15rem] border-first py-[.5rem] mx-[1rem] rounded-3xl mt-[2.5rem] text-md hover:!text-second hover:!text-bold hover:!border-third !ease-in-out" @click="useCamera">Cancel</button>
                    <button :class="submitClass" :disabled="saving"> {{ status }} </button>
                </div>
                <div v-else class="flex justify-between w-80 lg:w-[24.5rem] !mb-5">
                    <button type="button" class="w-[7.5rem] text-first border-[.15rem] border-first py-[.5rem] mx-[1rem] rounded-3xl mt-[2.5rem] text-md hover:!text-second hover:!text-bold hover:!border-third !ease-in-out" @click="useCamera">Use Camera</button>
                    <button :class="submitClass" :disabled="saving"> {{ status }} </button>
                </div>
                <p v-if="error" class="text-red text-lg justify-self-end"> {{ error }}</p>
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
            fileName: null,
            url: null,
            video: false,
            bind: "",
            canvas: false,
            dataUrl: null,
            dburl: null,
            file: null,
            status: "Submit",
            submitClass: "border-[.15rem] mx-[1rem] mt-[2.25rem] w-[7.25rem] py-[.5rem] rounded-[2.75rem] bg-first text-white align-self-center border hover:!bg-second ease-in-out",
            saving: 0,
            error: null,
            stream: null
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
                    this.submitClass = "text-md border-[.15rem] mx-[1rem] mt-[2.25rem] w-[7.25rem] py-[.5rem] rounded-[2.75rem] bg-first text-white align-self-center border hover:!bg-second ease-in-out"
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
            else {
                this.closeCamera()
            }
        },
        async openCamera(){
            const constraints = {
                video: {
                    facingMode: (window.innerWidth < 1024 ? "environment" : "user")
                }
            }
            try {
                this.stream = await navigator.mediaDevices.getUserMedia(constraints);
                this.handleSuccess(this.stream);
            }
            catch(err){
                console.log(err)
            }
        },
        async closeCamera(){
            try {
                this.stream.getTracks().forEach(function(track) {
                    track.stop();
                });
                this.stream == null
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
            this.stream.getTracks().forEach(function(track) {
                track.stop();
            });
            this.stream == null
        },
        async afterComplete(e) {
            this.saving = 1
            this.status = "Detecting..."
            this.submitClass = "text-md mx-[1rem] mt-[2.25rem] w-[7.25rem] py-[.5rem] rounded-[2.75rem] bg-grey text-white align-self-center hover:!bg-second ease-in-out"
            try {
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
            } catch (error) {
                console.log(error)
                this.error = "Image is required."
                this.status = "Submit"
                this.submitClass = "text-md border-[.15rem] mx-[1rem] mt-[2.25rem] w-[7.25rem] py-[.5rem] rounded-[2.75rem] bg-first text-white align-self-center border hover:!bg-second ease-in-out"
                this.saving = 0
            }
        },
    }
}
</script>
