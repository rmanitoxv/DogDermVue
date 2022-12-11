<template>
    <div class="container mx-auto mt-20 mb-40">
        <!-- FIND NEARBY -->
        <div class="my-3">
            <p class="amiko font-thin text-first text-sm tracking-widest">FIND NEARBY</p>
            <p class="amiko font-bold text-2xl">Veterinary Clinics</p>
        </div>

        <div class="grid md:grid-cols-2 gap-2 grid-cols-1 three wide column">
            <form class="!m-0 ui segment large form" @submit.prevent="findCloseByButtonPressed()">
                <div class="ui segment">
                    <!-- LOCATION COORDINATES -->
                    <div class="field">
                        <div class="ui right icon input large">
                            <input type="text" placeholder="Enter your address" v-model="coordinates" />
                            <i class="dot circle link icon" @click="locatorButtonPressed"></i>
                        </div>
                    </div>

                    <!-- SELECT -->
                    <div class="field">
                        <div class="two fields">
                            <div class="field">
                                <select v-model="type">
                                    <option value="veterinary_care">Veterinary Care</option>
                                </select>
                            </div>

                            <div class="field">
                                <select id="radius">
                                    <option value="5">5 KM</option>
                                    <option value="10">10 KM</option>
                                    <option value="15">15 KM</option>
                                    <option value="20">20 KM</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button class="ui button fill-yellow font-semibold">Find Clinic</button>
                </div>
                
                <!-- LIST OF PLACES -->
                <div class="ui segment"  style="max-height:500px;overflow:scroll">
                    <div class="ui divided items">
                        <div class="item" v-for="place in places" :key="place.id">
                            <div class="content">
                                <div class="amiko font-bold text-lg">{{place.name}}</div>
                                <div class="meta">{{place.vicinity}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            
            <div class="ten wide column segment ui !m-0" ref="map">
            </div>
            
        </div>

    </div>
    

    <div class="container mx-auto mb-40">
        <!-- POPULAR CLINICS -->
        <!-- NEED CRUD HERE -->
        <div class="my-3">
            <p class="amiko font-thin text-first text-sm tracking-widest">POPULAR</p>
            <p class="amiko font-bold text-2xl">Veterinary Clinics</p>
        </div>

        <!-- VET INFORMATION -->
        <div v-for="item in clinics">
            <div class="container rounded-lg bg-white my-4 mx-0 drop-shadow-lg flex items-center">
                <!-- IMG -->
                <div class="flex-initial w-45 py-3 px-1">
                    <img class="object-cover rounded-lg w-40 h-40" :src="item.url">
                </div>
                <!-- DETAILS -->
                <div class="flex-initial w-45 py-3 pl-5 inline-block">
                    <p class="amiko font-bold text-lg">{{item.clinic_name}}</p>
                    <ul>
                        <li class="poppins text-sm"><i class='bx bx-location-plus text-first'></i> &nbsp; {{item.clinic_address}}</li>
                        <li class="poppins text-sm"><i class='bx bxs-phone-call text-first'></i> &nbsp; {{item.clinic_mobile}} | {{item.clinic_landline}}</li>
                        <li class="poppins text-sm"><i class='bx bx-envelope text-first'></i> &nbsp; {{item.clinic_email}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export default {
    data() {
        return {
            lat: 0,
            lng: 0,
            type: "veterinary_care",
            radius: "",
            places: [],
            clinics: {},
            markers: [
                [
                    "PETLINK - R.PAPA",
                    14.636930813048608,
                    120.98053919140165,
                    "vet-loc-marker.png"
                ],
                [
                    "BETERINARYO NG TONDO CO.",
                    14.628076606999961,
                    120.97350294232788,
                    "vet-loc-marker.png"
                ],
                [
                    "MT.ZION ANIMAL CLINIC",
                    14.630642723499628,
                    120.97392976240079,
                    "vet-loc-marker.png"
                ],
                [
                    "NORTH BAY VETERINARY CLINIC & PET SUPPLY",
                    14.625592301109746,
                    120.96715440361679,
                    "vet-loc-marker.png"
                ],
                [
                    "PETS AVENUE ANIMAL WELLNESS CENTER",
                    14.602766074471445,
                    121.00966905101234,
                    "vet-loc-marker.png"
                ],
                [
                    "CITIVET VETERINARY CLINIC & PET SUPPLY CO",
                    14.616956460393375,
                    120.99402463188937,
                    "vet-loc-marker.png"
                ],
                [
                    "VITAS VETERINARY INSPECTION BOARD",
                    14.627287793020551,
                    120.96202445718099,
                    "vet-loc-marker.png"
                ],
                [
                    "CAYCO ANIMAL CLINIC",
                    14.60509795506496, 
                    120.99656962273642,
                    "vet-loc-marker.png"
                ],
                [
                    "VET FRONT ANIMAL WELLNESS CENTER",
                    14.616735955018765,
                    120.99130209993999,
                    "vet-loc-marker.png"
                ],
                [
                    "VETCARE PLUS VETERINARY CLINIC",
                    14.610780847677502,
                    120.97515652881145,
                    "vet-loc-marker.png"
                ],
                [
                    "CURA PET ANIMAL CLINIC",
                    14.58185385942606,
                    121.01088339210655,
                    "vet-loc-marker.png"
                ],
                [
                    "SANTA ANA ANIMAL HEALTH CLINIC",
                    14.5823136266778,
                    121.01342271904925,
                    "vet-loc-marker.png"
                ],
                [
                    "DAVID A DELOS TRINOS VETERINARY CLINIC",
                    14.61548106002311,
                    120.97333075582075,
                    "vet-loc-marker.png"
                ],
                [
                    "MINDZ PET VETERINARY SERVICES",
                    14.616068665850529,
                    120.96972171904923,
                    "vet-loc-marker.png"
                ],
                [
                    "TOLENTINOS ANIMAL CLINIC",
                    14.633548130080529,
                    120.97867437301643,
                    "vet-loc-marker.png"
                ],
                [
                    "GREEN CROWN VETERINARY CLINIC",
                    14.576443865263428,
                    121.01148825445321,
                    "vet-loc-marker.png"
                ],
                [
                    "PETCORE ANIMAL CLINIC",
                    14.584042317013353,
                    121.00140946560653,
                    "vet-loc-marker.png"
                ],
                [
                    "HANNA PET WELLNESS CENTER INC",
                    14.567134104619678,
                    121.00209682698359,
                    "vet-loc-marker.png"
                ],
                [
                    "NOMAR ANIMAL CLINIC",
                    14.613830786530714,
                    120.99909537301644,
                    "vet-loc-marker.png"
                ],
                [
                    "THE ANIMAL HOUSE VET CLINIC",
                    14.599799673073766,
                    120.97428209765603,
                    "vet-loc-marker.png"
                ],
                [
                    "FIL-CHINESE VETERINARY SVCS",
                    14.608999074954193,
                    120.97915787301642,
                    "vet-loc-marker.png"
                ],
                [
                    "GOLDWINGS VETERINARY CLINIC",
                    14.61584358662534,
                    120.97050091111487,
                    "vet-loc-marker.png"
                ],
                [
                    "YOUR VETS ANIMAL CLINIC",
                    14.609117394266548,
                    121.0037726441486,
                    "vet-loc-marker.png"
                ],
                [
                    "BMC VETERINARY CLINIC",
                    14.614881541768046,
                    120.96888510181853,
                    "vet-loc-marker.png"
                ],
                [
                    "MANILA VETS ANIMAL CLINIC CO.",
                    14.607154196355271,
                    121.0083082846219,
                    "vet-loc-marker.png"
                ],
                [
                    "DOWNTOWN ANIMAL CLINIC",
                    14.620905340951756,
                    120.97705633851383,
                    "vet-loc-marker.png"
                ],
                [
                    "DAGUPAN VETERINARY CLINIC",
                    14.616015585914177,
                    120.97349577716068,
                    "vet-loc-marker.png"
                ],
                [
                    "PAMPOLINA VETERINARY CLINIC AND GROOMING CENTER",
                    14.567609290635087,
                    120.99423492311043,
                    "vet-loc-marker.png"
                ],
                [
                    "KINGIYAMAN PET CLINIC",
                    14.615279971805675,
                    121.0012785536699,
                    "vet-loc-marker.png"
                ],
                [
                    "PET ACCESS VETERINARY CLINIC CO.",
                    14.603005758703782,
                    121.01393303850716,
                    "vet-loc-marker.png"
                ],
                [
                    "PHILIPPINE SOCIETY FOR THE PREVENTION OF CRUELTY TO ANIMALS INC",
                    14.601976226480554,
                    120.98781190771591,
                    "vet-loc-marker.png"
                ],
                [
                    "PRIMITIVA VETERINARY CLINIC",
                    14.578223124604916, 
                    121.00101089562749,
                    "vet-loc-marker.png"
                ],
                [
                    "WT ANIMAL WELLNESS AND VETERINARY CLINIC",
                    14.611662191206603,
                    121.00569563552321,
                    "vet-loc-marker.png"
                ],
                [
                    "JOSE ABAD SANTOS VET CLINIC",
                    14.61801609903854, 
                    120.97747105046797,
                    "vet-loc-marker.png"
                ],
                [
                    "FURRPET VETERINARY SERVICES",
                    14.603024671703157,
                    120.96226687109395,
                    "vet-loc-marker.png"
                ],
                [
                    "TVC VETERINARY CLINIC SAMPALOC BRANCH",
                    14.611666882301027, 
                    120.99550178462951,
                    "vet-loc-marker.png"
                ],
                [
                    "TVC VETERINARY CLINIC TONDO BRANCH",
                    14.611666882301027,
                    120.99550178462952,
                    "vet-loc-marker.png"
                ],
                [
                    "TAMANI VETERINARY CLINIC",
                    14.617660284209116,
                    120.9727862532989,
                    "vet-loc-marker.png"
                ],
                [
                    "VETZONE ANIMAL CLINIC CO",
                    14.588672149260733,
                    121.02190537292338,
                    "vet-loc-marker.png"
                ],
            ]
        };
    },
    computed: {
        coordinates() {
            return `${this.lat}, ${this.lng}`;
        }
    },
    async mounted() {
        const externalScript = document.createElement('script')
        externalScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCSvvmwaZ3j0VaHbCE2MJZSKxguQRPcS-o')
        document.head.appendChild(externalScript)
    },
    methods: {
        locatorButtonPressed() {
            this.$getLocation({
                enableHighAccuracy: true,
                timeout: Infinity,
                maximumAge: 0
            })
            .then(coordinates => {
                this.lat = coordinates.lat;
                this.lng = coordinates.lng;
            })
            .catch(err => {
                console.log(err)
            })
            // navigator.geolocation.getCurrentPosition(
            //     position => {
            //         console.log(position)
            //         this.lat = position.coords.latitude;
            //         this.lng = position.coords.longitude;
            //     },
            //     error => {
            //         console.log("Error getting location");
            //     }
            // );
        },

        findCloseByButtonPressed() {
            const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.lat},${this.lng}&type=${this.type}&radius=${radius.value * 1000}&key=AIzaSyCSvvmwaZ3j0VaHbCE2MJZSKxguQRPcS-o`;

            axios
                .get(URL)
                .then(response => {
                    this.places = response.data.results;
                    this.addLocationsToGoogleMaps();
                    console.log(URL)
                })
                .catch(error => {
                console.log(error);
            });
        },

        addLocationsToGoogleMaps() {
            var map = new google.maps.Map(this.$refs['map'], {
                zoom: 15,
                center: new google.maps.LatLng(this.lat, this.lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var infowindow = new google.maps.InfoWindow();

            this.markers.forEach(markers => {
                const lat = markers[1];
                const lng = markers[2];

                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    map: map,
                    icon: {
                        url: markers[3],
                        scaledSize: new google.maps.Size(40, 40),
                    }
                });

                google.maps.event.addListener(marker, "click", () => {
                    infowindow.setContent(
                        `<div class="ui header">${markers[0]}`
                    );
                    
                    infowindow.open(map, marker);
                });
            });
            

            // FOR LOOP FOR MARKER LOCATIONS
            // for(let i = 0; i<markers.length; i++) {
            //     const currMarker = markers[i];

            //     const marker = new google.maps.Marker({
            //         position: new google.maps.LatLng(currMarker[1], currMarker[2]),
            //         map: map,
            //         title: currMarker[0],
            //         icon: {
            //             url: currMarker[3],
            //             scaledSize: new google.maps.Size(currMarker[4], currMarker[5]),
            //         }
            //     });

            //     google.maps.event.addListener(marker, "click", () => {
            //         infowindow.setContent(
            //             `<div class="ui header">${place.name}</div><p>${place.vicinity}</p>`
            //         );
                    
            //         infowindow.open(map, marker);
            //     });
            // }
        
            // INFO WINDOW
            // var infowindow1 = new google.maps.infowindow({
            // const infowindow1 = new google.maps.infowindow({
            //     content: currMarker[0],
            // });

            // // OPEN INFO WINDOW
            // markers.addListener("click", () => {
            //     infowindow1.open(map, marker);
            // });

            // markers.setMap(map);
        },
        getClinics() {
            axios.get('/api/clinics/')
                .then((response) => {
                    this.clinics = response.data
                    for (let i=0; i < this.clinics.length; i++){
                        const storage = getStorage();
                        const storageRef = ref(storage, 'images/' + this.clinics[i].url);
                        getDownloadURL(storageRef)
                            .then((url) => {
                                this.clinics[i].url = url
                            })
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        },
    },
    created() {
        this.getClinics()
    }
}

</script>