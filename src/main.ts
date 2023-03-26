import './style.css';

import { router } from './router';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { vuetify } from './vuetify';
import { localization } from './localization';

import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

// Plugins
app.use(router);
app.use(pinia);
app.use(vuetify);
app.use(localization);

void app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*');
});
