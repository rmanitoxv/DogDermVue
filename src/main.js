import './bootstrap';
import { createApp } from 'vue';

import App from './App.vue'
import router from './router.js'
import store from './store.js'

// import * as VueGoogleMaps from 'vue2-google-maps'

// App.use(VueGoogleMaps, {
//     load: {
//     key: AIzaSyCSvvmwaZ3j0VaHbCE2MJZSKxguQRPcS-o,
//     libraries: 'places'
//     }
// });

createApp(App)
    .use(router)
    .use(store)
    .mount("#app")