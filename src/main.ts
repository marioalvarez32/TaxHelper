import './style.css';

import { router } from './router';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { vuetify } from './vuetify';
import './localization';
import I18NextVue from 'i18next-vue';
import i18next from 'i18next';

import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

// Plugins
app.use(router);
app.use(pinia);
app.use(vuetify);
app.use(I18NextVue, { i18next });

void app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*');
});
