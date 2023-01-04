<template>
    <div class="container flex gap-8 mx-auto mt-20 md:px-20 w-auto">
        <!-- STICKY SIDEBAR -->
        <aside v-if="!hidden" class="top-25 left-96 self-start w-40 hidden md:block flex-initial">
            <!-- ON THIS PAGE LINKS -->
            <label class="amiko text-first font-semibold text-xl">On this page</label>
            <ul class="text-base underline-offset-4">
                <li><a href="#overview"><i class='bx bx-chevron-right'></i>Overview</a></li>
                <li><a href="#pictures"><i class='bx bx-chevron-right'></i>Pictures</a></li>
                <li><a href="#causes-symptoms"><i class='bx bx-chevron-right'></i>Symptoms</a></li>
                <li><a href="#management-treatment"><i class='bx bx-chevron-right'></i>Treatment</a></li>
                <li><a href="#prevention"><i class='bx bx-chevron-right'></i>Prevention</a></li>
            </ul>
        </aside>
        <!-- MAIN CONTENT -->
        <main class="flex-initial w-full">
            <div class="rounded-xl bg-white md:drop-shadow-lg md:py-20 md:px-12 mx-0">
                <!-- DISEASE DESCRIPTION -->
                <h2 class="amiko text-second font-bold text-5xl mb-6" id="overview">{{ datas.disease }}</h2>
                <div class="desc-container">
                    {{ datas.overview }}
                </div>
                <!-- PICTURES -->
                <div class="pictures-container" id="pictures">
                    <p class="text-first text-sm">*Warning: graphic images ahead.</p>
                </div>
                <div class="accordion mt-2 mb-8" id="accordionExample">
                    <div class="accordion-item !bg-[#FFEFE1] !rounded-3xl">
                        <h2 class="accordion-header mb-0 " id="headingOne">
                            <button class="
                            accordion-button
                            collapsed
                            relative
                            flex
                            items-center
                            w-full
                            py-4
                            px-5
                            !rounded-3xl
                            text-2xl !text-grey font-bold text-left
                            border-0
                            !bg-[#FFEFE1]
                            transition
                            !shadow-none
                        " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false"
                                aria-controls="collapseOne">
                                Sample Pictures of {{ datas.disease }}
                            </button>
                        </h2>
                        <!-- ACCORDION -->
                        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body py-4 px-5">
                                <div class="grid md:grid-cols-3 grid-cols-2 gap-3">
                                    <!-- IMG -->
                                    <div><img class="object-cover h-48 w-48" :src="datas.url"></div>
                                    <div v-for="n in 8"><img class="object-fill h-48 w-48" :src="`/diseases/${datas.disease}/${n}.png`"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- CAUSES AND SYMPTOMS -->
                <h3 class="amiko text-blue font-bold text-2xl mt-4 mb-2" id="causes-symptoms"><i
                        class='bx bx-search align-middle'></i> CAUSES AND SYMPTOMS</h3>
                <!-- causes -->
                <label class="amiko text-third font-semibold text-xl my-2">Causes</label>
                <div class="desc-container">
                    {{ datas.causes }}
                </div>
                <!-- symptoms -->
                <label class="amiko text-third font-semibold text-xl mt-2">Symptoms</label>
                <div>
                    <ul v-for="item in symptoms">
                        <li class="ml-5 mb-2"><span class="text-xl">&#x2022;</span> {{item}}</li>
                    </ul>
                </div>
                <!-- DISCLAIMER -->
                <div class="my-10 p-6 border-2 rounded-3xl border-first bg-[#FFEFE1]">
                    <p class="amiko text-first text-xl font-bold">
                        DISCLAIMER:
                    </p>
                    <p class="amiko text-first text-sm font-semibold">
                        This article can provide general information about different types of skin diseases in dogs, but it is not a substitute for professional veterinary care.
                    </p>
                    <p class="amiko text-first text-sm font-semibold">
                        If you have any concerns about your dog's health, it's always best to consult with a veterinarian who can examine your pet in person and provide a proper diagnosis and treatment plan.
                    </p>
                </div>
                <!-- MANAGEMENT AND TREATMENT -->
                <h3 class="amiko text-blue font-bold text-2xl mb-5" id="management-treatment"><i
                        class='bx bx-plus-medical align-middle'></i> MANAGEMENT AND TREATMENT</h3>
                <div class="desc-container">
                    {{ datas.treatment }}
                </div>
                <div class="desc-container">
                    <ul v-for="item in treatments">
                        <li class="ml-6 mb-3"><span class="text-xl">&#x2022;</span> {{item}}</li>
                    </ul>
                </div>
                <!-- PREVENTION -->
                <h3 class="amiko text-blue font-bold text-2xl my-2" id="prevention"><i
                        class='bx bxs-hand align-middle'></i> PREVENTION</h3>
                <div class="desc-container">
                    {{ datas.prevention }}
                </div>
                <div class="desc-container">
                    <ul v-for="item in preventions">
                        <li class="ml-6 mb-3"><span class="text-xl">&#x2022;</span> {{item}}</li>
                    </ul>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export default {
    data() {
        return {
            id: this.$route.params.id,
            datas: {},
            symptoms: null,
            hidden: false,
            images: null,
        }
    },
    methods: {
        getData(id) {
            console.log(this.count)
            axios.get(`/api/diseases/${id}`)
                .then((response) => {
                    this.datas = response.data
                    const storage = getStorage();
                    const storageRef = ref(storage, 'images/' + this.datas.url);
                    getDownloadURL(storageRef)
                        .then((url) => {
                            this.datas.url = url
                        })
                    if (response.data.symptoms){
                        this.symptoms = JSON.parse(this.datas.symptoms)
                    }
                    if (response.data.treatments){
                        this.treatments = JSON.parse(this.datas.treatments)
                    }
                    if (response.data.preventions){
                        this.preventions = JSON.parse(this.datas.preventions)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
    mounted() {
        this.getData(this.id)
    }
}
</script>