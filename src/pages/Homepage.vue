<template>
    <div class="relative overflow-hidden w-full h-full from-cyan-500 via-rose-100 to-rose-300">
        <!-- <div class="relative overflow-hidden bg-linear-gradient(to right bottom, rgb(6, 182, 212), rgb(255, 228, 230), rgb(253, 164, 175)) w-full h-full"> -->
        <!-- HOME TOP -->
        <main class="mx-auto mt-10 max-w-7xl px-4 py-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="container mx-auto mt-9 mb-40">
                <div class="lg:-mx-6 lg:flex">          
                    <div class="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6">
                        <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                            <span class="block xl:inline">Welcome to</span>
                            <div class="pt-2 flex">
                                <span class="block xl:inline text-first barlow">Dog</span>
                                <span class="block xl:inline text-second barlow">Derma</span>
                            </div>
                        </h1>
                        <p class="my-4 text-base text-gray-500 sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                            Want to know what skin disease <br> your dog might have? Use the <br> DogDerma today to see the result!</p>
        
                        <div class="md-mx-0 mb-15 mt-5 sm:mt-8 sm:flex-none md:flex-none sm:justify-center lg:justify-start">
                            <div class="md-mx-0 mt-0 sm:mt-0 sm:ml-3">
                                <router-link to="/upload" class="md-mx-0 font-medium py-3 px-10 rounded-3xl text-white hover:text-white button-color">
                                    <span>Try Now!</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="mt-0 object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-42 lg:h-66">
                        <img src="/images/home-dog.svg" alt="">
                    </div>            
                </div>
            </div>

            <div class="container mx-auto mt-9 mb-40">
                <div class="lg:-mx-6 lg:flex">
                    <div class="mt-0 object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-42 lg:h-66">
                        <img src="/images/about-dog.svg" alt="">
                    </div>
                    <div class="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 md:mxauto sm:mx-auto">
                        <p class="amiko font-bold text-1xl text-first tracking-widest mb-3" id="about">ABOUT US</p>
                        <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                            <span class="block xl:inline">What is it <br> about?</span>
                        </h1>
                        <p class="my-4 text-base text-gray-500 sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                            DogDerma is a web-mobile <br> application used to detect a <br> number of dog skin diseases <br> with the use of image classification.</p>
                    </div>
                </div>
            </div>

            <!-- SECTION - FEATURES PART -->
            <section class="mt-24 my-24 mb-20 text-gray-700">
                <div class="text-center mb-10 md:max-w-xl lg:max-w-3xl mx-auto">
                    <p class="amiko font-bold text-1xl text-first tracking-widest" id="features">FEATURES</p>
                    <h3 class="text-3xl font-bold mb-6 text-gray-800">What our web-mobile <br> app does</h3>
                </div>
                
                <div class="grid mt-5 md:grid-cols-3 gap-6 text-center">
                    <!-- FEATURES - VETERINARY CLINICS -->
                    <router-link to="/upload">
                    <div>
                        <div class="block rounded-lg shadow-lg bg-white">
                            <div class="overflow-hidden rounded-t-lg h-28"></div>
                            <div class="w-24 -mt-12 overflow-hidden rounded-full mx-auto bg-white">
                                <img src="/images/detect-diseases-icon.svg" />
                            </div>
                            <div class="!text-second p-6">
                                <h4 class="text-2xl font-semibold mb-4">Detect Diseases</h4>
                                <p class="my-8 h-28">
                                    Identify your dog’s skin disease using image processing.
                                </p>
                            </div>
                        </div>
                    </div>
                    </router-link>
                    
                    <!-- FEATURES - VETERINARY CLINICS -->
                    <router-link to="/clinics">
                    <div>
                        <div class="block rounded-lg shadow-lg bg-white">
                            <div class="overflow-hidden rounded-t-lg h-28"></div>
                            <div class="w-24 -mt-12 overflow-hidden rounded-full mx-auto bg-white">
                                <img src="/images/clinic-icon.svg" />
                            </div>
                            <div class="!text-second p-6">
                                <h4 class="text-2xl font-semibold mb-4">Veterinary Clinics</h4>
                                <p class="!text-second my-8 h-28">
                                    Get referred to a veterinary clinic for dog dermatology near you.
                                </p>
                            </div>
                        </div>
                    </div>
                    </router-link>

                    <!-- FEATURES - INSTANT RESULTS -->
                    <router-link to="/upload">
                    <div>
                        <div class="block rounded-lg shadow-lg bg-white">
                            <div class="overflow-hidden rounded-t-lg h-28"></div>
                            <div class="w-24 -mt-12 overflow-hidden rounded-full mx-auto bg-white">
                                <img src="/images/instant-results-icon.svg" />
                            </div>
                            <div class="!text-second p-6">
                                <h4 class="text-2xl font-semibold mb-4">Instant Result</h4>
                                <p class="my-8 h-28">
                                    Receive  result, treatments and prevention.
                                </p>
                            </div>
                        </div>
                    </div>
                    </router-link>
                </div>
            </section>

            <!-- SECTION - FAQS ACCORDION -->
            <section class="mt-24 my-24 mb-20 text-gray-700">
                <div class="text-center mb-10 md:max-w-xl lg:max-w-3xl mx-auto">
                    <p class="amiko font-bold text-1xl text-first tracking-widest" id="faqs">FREQUENTLY ASKED QUESTIONS</p>
                    <h3 class="text-3xl font-bold mb-6 text-gray-800">Got a question? <br> We have answers!</h3>
                </div>

            <!-- FAQ -->
            <div class="accordion" id="accordionExample">
                    <div class="accordion-item bg-white border-none border-gray-200 shadow-lg">
                        <!-- QUESTION 1 -->
                        <h2 class="accordion-header mb-0 !text-1xl" id="headingOne">
                            <button class="
                            accordion-button
                            collapsed
                            relative
                            flex
                            items-center
                            w-full
                            py-6
                            px-5
                            text-base !text-second font-bold text-left
                            bg-white
                            border-0
                            rounded-none
                            transition
                        " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false"
                                aria-controls="collapseOne">
                                How do you use DogDerma?
                            </button>
                        </h2>
                        <!-- ACCORDION -->
                        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body py-6 px-5">
                                <!-- ANSWER -->
                                <div>First, <rounter-link to="/register">register</rounter-link> an account in order to use DogDerma. Next, go to the <rounter-link to="/register">Upload</rounter-link>. From there, you may upload a photo of the dog’s affected area and submit to see the result.</div>
                            </div>  
                        </div>
                    </div>

                        <!-- QUESTION 2 -->
                        <div class="accordion-item bg-white border-none shadow-lg border-gray-200">
                            <h2 class="accordion-header mb-0" id="headingTwo">
                            <button class="
                                accordion-button
                                collapsed
                                relative
                                flex
                                items-center
                                w-full
                                py-6
                                px-5
                                text-base !text-second font-bold text-left
                                bg-white
                                border-0
                                rounded-none
                                transition
                                focus:outline-none
                            " type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false"
                                aria-controls="collapseTwo">
                                Where are the veterinary clinics located?
                            </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body py-4 px-5">
                                The locations of the clinics are limited to the city of Manila, Metro Manila. The list of registered private and public clinics that have services for dog dermatology were requested from the Business Permits and Licensing Office in the City Government of Manila.
                            </div>
                            </div>
                        </div>
                        
                        <!-- QUESTION 3 -->
                        <div class="accordion-item bg-white border-none shadow-lg border-gray-200">
                            <h2 class="accordion-header mb-0" id="headingThree">
                            <button class="
                                accordion-button
                                collapsed
                                relative
                                flex
                                items-center
                                w-full
                                py-6
                                px-5
                                text-base !text-second font-bold text-left
                                bg-white
                                border-0
                                rounded-none
                                transition
                                focus:outline-none
                            " type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false"
                                aria-controls="collapseThree">
                                Why can't I find clinics in my location outside Manila?
                            </button>
                            </h2>
                            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body py-4 px-5">
                                Due to time constraints of this study, the veterinary clinic results are only limited to registered veterinary clinics within the city of Manila, Metro Manila. If you are outside Manila, nothing will appear on the map. This is also due to the long waiting time per request from any City Government, hence the smaller scope of location.
                            </div>
                            </div>
                        </div>

                        <!-- QUESTION 4 -->
                        <div class="accordion-item bg-white border-none shadow-lg border-gray-200">
                            <h2 class="accordion-header mb-0" id="headingFour">
                            <button class="
                                accordion-button 
                                collapsed
                                relative
                                flex
                                items-center
                                w-full
                                py-6
                                px-5
                                text-base !text-second font-bold text-left
                                bg-white
                                border-0
                                rounded-none
                                transition
                                focus:outline-none
                            " type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false"
                                aria-controls="collapseFour">
                                What dog skin diseases are included in DogDerma?
                            </button>
                            </h2>
                            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body py-4 px-5">
                                DogDerma includes Methicillin-resistant Staphylococcus aureus (MRSA), Ringworms, Sarcoptic Mange, Flea Infestation, Tickborne Disease, Harvest Mites, Yeast Infections, Hot Spot, Folliculitis, and Carbuncles.
                            </div>
                            </div>
                        </div>
                        <!-- QUESTION 4 -->
                        <div class="accordion-item bg-white border-none shadow-lg border-gray-200">
                            <h2 class="accordion-header mb-0" id="headingFive">
                            <button class="
                                accordion-button 
                                collapsed
                                relative
                                flex
                                items-center
                                w-full
                                py-6
                                px-5
                                text-base !text-second font-bold text-left
                                bg-white
                                border-0
                                rounded-none
                                transition
                                focus:outline-none
                            " type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false"
                                aria-controls="collapseFive">
                                Is the information from the articles credible?
                            </button>
                            </h2>
                            <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body py-4 px-5">
                                Yes, all the information from each article was taken from credible online sources and verified with a local veterinary professional along with the pictures. However, for further diagnosis and treatment, we advise you to seek professional help as DogDerma is not a substitute for professional veterinary care.
                            </div>
                            </div>
                        </div>
                </div>
            </section>

            <!-- SECTION - CONTACT US PART -->
            <section class="mt-24 my-24 mb-20 text-gray-700">
                <div class="text-center mb-10 md:max-w-xl lg:max-w-3xl mx-auto">
                    <p class="amiko font-bold text-1xl text-first tracking-widest" id="contact">CONTACT US</p>
                    <h3 class="text-3xl font-bold mb-6 text-gray-800">Question not answered <br> yet? Ask Us!</h3>
                    <p class="my-8 h-28 !text-lg">
                        +63 920 1662 517
                        <br>
                        <span class="!text-xl">dogderma@gmail.com</span>
                        <br><br>
                        Manila, Philippines
                    </p>
                </div>
            </section>
            
            <!-- SECTION - DOG SKIN DISEASES -->
            <section class="mt-24 my-24 mb-20 text-gray-700 visible max-sm:hidden">
                <div class="text-center mb-10 md:max-w-xl lg:max-w-3xl mx-auto">
                    <p class="amiko font-bold text-1xl text-first tracking-widest" id="faqs">DOG SKIN DISEASES</p>
                    <h3 class="text-3xl font-bold mb-6 text-gray-800">Learn about your dog's<br> skin problems!</h3>
                </div>
                <!-- SWIPER -->
                <Swiper :slides-per-view="3" :space-between="50" :modules="[Navigation, Pagination, Virtual, Autoplay]"
                    autoplay :loop="true"
                    grab-cursor class="h-full">
                    <SwiperSlide v-for="items in datas" class="rounded-xl bg-white drop-shadow-lg visible max-sm:hidden">
                        <!-- IMAGE -->
                        <DiseasesContainer :item="items" />
                    </SwiperSlide>
                </Swiper>
            </section>
        </main>
    </div>
</template>
<script setup>
import { Navigation, Pagination, Virtual, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css';
import 'swiper/css/bundle';
</script>
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
