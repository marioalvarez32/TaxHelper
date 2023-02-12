import './style.css';
import './samples/node-api';

import { router } from './router';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { vuetify } from './vuetify';

import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

// Plugins
app.use(router);
app.use(pinia);
app.use(vuetify);

void app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  });
