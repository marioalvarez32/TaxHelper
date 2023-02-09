<template>
  <v-app theme="dark">
    <Sidebar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { onMounted } from "vue";
import Sidebar from './components/Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
  setup() {
  },
};
</script>

<style lang="scss" scoped>
.app__container {}
</style>
