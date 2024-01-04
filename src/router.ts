import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

import ReceiptReader from '@/Client/ReceiptReader/ReceiptReader.vue';
import MercadoTools from '@/Client/MercadoTools/MercadoTools.vue';

import Settings from '@/Client/Settings/Settings.vue';

const Home = { template: '<div>Home</div>' };

const routes = [
  { path: '/', component: Home },
  { path: '/tools/receipt-reader', component: ReceiptReader },
  { path: '/tools/mi-tienda-mercado', component: MercadoTools },
  { path: '/settings', component: Settings },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export { router };
