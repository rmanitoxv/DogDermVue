<template>
    <div class="container mx-auto mt-20 mb-40">
        <!-- FIND NEARBY -->
        <div class="my-3">
            <p class="amiko font-thin text-first text-sm tracking-widest">FIND NEARBY</p>
            <p class="amiko font-bold text-2xl">Veterinary Clinics</p>
        </div>

        <div class="grid md:grid-cols-2 gap-2 grid-cols-1 three wide column">
            <form class="!m-0 ui segment large form" @submit.prevent="addLocationsToGoogleMaps()">
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
                                    <option :value=2>2 KM</option>
                                    <option :value=4>4 KM</option>
                                    <option :value=6>6 KM</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button class="ui button fill-yellow font-semibold">Find Clinic</button>
                </div>
                
                <!-- LIST OF PLACES -->
                <div class="ui segment"  style="max-height:500px;overflow:scroll">
                    <div v-if="sidebar" class="ui divided items">
                        <div class="item !flex !flex-col">
                            <div v-for="place in markers" class="content">
                                <div v-if="calcCrow(lat, lng, place.x, place.y) < radius" class="pt-4 amiko font-bold text-lg">{{place.name}}</div>
                                <div v-if="calcCrow(lat, lng, place.x, place.y) < radius" class="!pb-4 meta">{{place.address}}</div>
                                <hr v-if="calcCrow(lat, lng, place.x, place.y) < radius" class="w-full"/>
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
            radius: null,
            places: [],
            clinics: {},
            sidebar: false,
            markers: [
                {
                    "name": "PETLINK - R.PAPA",
                    "x": 14.636930813048608,
                    "y": 120.98053919140165,
                    "icon": "vet-loc-marker.png",
                    "address": "3432 Arsenio Herrera St, Tondo, Manila, Metro Manila"
                },
                {
                    "name": "BETERINARYO NG TONDO CO.",
                    "x": 14.628076606999961,
                    "y": 120.97350294232788,
                    "icon": "vet-loc-marker.png",
                    "address": "2508 Juan Luna St, Tondo, Manila, Metro Manila"
                },
                {
                    "name": "MT.ZION ANIMAL CLINIC",
                    "x": 14.630642723499628,
                    "y": 120.97392976240079,
                    "icon": "vet-loc-marker.png",
                    "address": "2707 B Manotoc St, Tondo, Manila, Metro Manila"
                },
                {
                    "name": "NORTH BAY VETERINARY CLINIC & PET SUPPLY",
                    "x": 14.625592301109746,
                    "y": 120.96715440361679,
                    "icon": "vet-loc-marker.png",
                    "address": "434 Honorio Lopez Blvd.corner Fidel St., Brgy 148, Zone 13, Tondo, Manila"
                },
                {
                    "name": "PETS AVENUE ANIMAL WELLNESS CENTER",
                    "x": 14.602766074471445,
                    "y": 121.00966905101234,
                    "icon": "vet-loc-marker.png",
                    "address": "3574 Buenos Aires St. cor. Altura St. Sampaloc, Manila, Philippines"
                },
                {
                    "name": "CITIVET VETERINARY CLINIC & PET SUPPLY CO",
                    "x": 14.616956460393375,
                    "y": 120.99402463188937,
                    "icon": "vet-loc-marker.png",
                    "address": "1913 Dapitan St, Sampaloc, Manila, 1008 Metro Manila"
                },
                {
                    "name": "VITAS VETERINARY INSPECTION BOARD",
                    "x": 14.627287793020551,
                    "y": 120.96202445718099,
                    "icon": "vet-loc-marker.png",
                    "address": "2403 Vitas St, 101 Tondo Vitas St, 101 Tondo, Manila, 1012 Metro Manila"
                },
                {
                    "name": "VET FRONT ANIMAL WELLNESS CENTER",
                    "x": 14.616735955018765,
                    "y": 120.99130209993999,
                    "icon": "vet-loc-marker.png",
                    "address": "1764 Laong Laan Rd, Sampaloc, Manila, 1008 Metro Manila"
                },
                {
                    "name": "SANTA ANA ANIMAL HEALTH CLINIC",
                    "x": 14.5823136266778,
                    "y": 121.01342271904925,
                    "icon": "vet-loc-marker.png",
                    "address": "2403 Vitas St, 101 Tondo Vitas St, 101 Tondo, Manila, 1012 Metro Manila"
                },
                {
                    "name": "TOLENTINOS ANIMAL CLINIC",
                    "x": 14.633548130080529,
                    "y": 120.97867437301643,
                    "icon": "vet-loc-marker.png",
                    "address": "Hermosa Arcade Center, 3067 Molave St, Tondo, Manila, 1013 Metro Manila"
                },
                {
                    "name": "PETCORE ANIMAL CLINIC",
                    "x": 14.584042317013353,
                    "y": 121.00140946560653,
                    "icon": "vet-loc-marker.png",
                    "address": "Unit 1, Clean Fuel Gasoline Station, 1883 Pres, Quirino Ave, Pandacan, Manila"
                },
                {
                    "name": "HANNA PET WELLNESS CENTER INC",
                    "x": 14.567134104619678,
                    "y": 121.00209682698359,
                    "icon": "vet-loc-marker.png",
                    "address": "1266 P. Ocampo St., corner G. del Pilar St., 756, Manila, 1110 Metro Manila"
                },
                {
                    "name": "NOMAR ANIMAL CLINIC",
                    "x": 14.613830786530714,
                    "y": 120.99909537301644,
                    "icon": "vet-loc-marker.png",
                    "address": "1984, S.H. Loyola, corner Maceda St, Sampaloc, Manila, 1008 Metro Manila"
                },
                {
                    "name": "THE ANIMAL HOUSE VET CLINIC",
                    "x": 14.599799673073766,
                    "y": 120.97428209765603,
                    "icon": "vet-loc-marker.png",
                    "address": "AH Binondo 599 Quintin Paredes"
                },
                {
                    "name": "GOLDWINGS VETERINARY CLINIC",
                    "x": 14.61584358662534,
                    "y": 120.97050091111487,
                    "icon": "vet-loc-marker.png",
                    "address": "1601 Juan Luna St, Tondo, Manila, Metro Manila"
                },
                {
                    "name": "PAMPOLINA VETERINARY CLINIC AND GROOMING CENTER",
                    "x": 14.567609290635087,
                    "y": 120.99423492311043,
                    "icon": "vet-loc-marker.png",
                    "address": "2380 Leon Guinto St, Malate, Manila, 1004 Metro Manila"
                },
                {
                    "name": "KINGIYAMAN PET CLINIC",
                    "x": 14.615279971805675,
                    "y": 121.0012785536699,
                    "icon": "vet-loc-marker.png",
                    "address": "856 Sto Tomas St., 529, Maynila, 1008 Kalakhang Maynila"
                },
                {
                    "name": "PET ACCESS VETERINARY CLINIC CO.",
                    "x": 14.603005758703782,
                    "y": 121.01393303850716,
                    "icon": "vet-loc-marker.png",
                    "address": "3946 Magsaysay Blvd, Santa Mesa, Manila, Metro Manila"
                },
                {
                    "name": "PHILIPPINE SOCIETY FOR THE PREVENTION OF CRUELTY TO ANIMALS INC",
                    "x": 14.601976226480554,
                    "y": 120.98781190771591,
                    "icon": "vet-loc-marker.png",
                    "address": "Philippine Society for the Prevention of Cruelty to Animals @ 2044 C.M. Recto Ave.,Quiapo Manila "
                },
                {
                    "name": "WT ANIMAL WELLNESS AND VETERINARY CLINIC",
                    "x": 14.611662191206603,
                    "y": 121.00569563552321,
                    "icon": "vet-loc-marker.png",
                    "address": "1971 Gerardo Tuazon St. Sampaloc (beside I Love Milktea), Manila, Philippines"
                },
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
        addLocationsToGoogleMaps() {
            var map = new google.maps.Map(this.$refs['map'], {
                zoom: 15,
                center: new google.maps.LatLng(this.lat, this.lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var infowindow = new google.maps.InfoWindow();

            this.markers.forEach(markers => {
                this.radius = radius.value
                const lat = markers.x;
                const lng = markers.y;
                const distance = this.calcCrow(this.lat, this.lng, lat, lng)
                console.log(markers.name, distance, radius.value)
                if (distance < radius.value){
                    let marker = new google.maps.Marker({
                        position: new google.maps.LatLng(lat, lng),
                        map: map,
                        icon: {
                            url: markers.icon,
                            scaledSize: new google.maps.Size(40, 40),
                        }
                    });

                    google.maps.event.addListener(marker, "click", () => {
                        infowindow.setContent(
                            `<div class="ui header">${markers.name}</div><p>${markers.address}`
                        );
                        
                        infowindow.open(map, marker);
                    });
                }
            });
            this.sidebar = true

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
        calcCrow(lat1, lon1, lat2, lon2) {
            let R = 6371; // km
            let dLat = this.toRad(lat2-lat1);
            let dLon = this.toRad(lon2-lon1);
            lat1 = this.toRad(lat1);
            lat2 = this.toRad(lat2);

            let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            let d = R * c;
            return d;
        },
        toRad(Value){
            return Value * Math.PI / 180;
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