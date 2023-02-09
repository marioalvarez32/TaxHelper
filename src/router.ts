import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import ReceiptReader from '@/views/ReceiptReader.vue';

const Home = { template: '<div>Home</div>' }


const routes = [
  { path: '/', component: Home },
  { path: '/tools/receipt-reader', component: ReceiptReader },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})


export {
  router,
};