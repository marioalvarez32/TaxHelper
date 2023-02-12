<template>
  <v-layout full-height>
    <Sidebar />
    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<script>
import { onMounted } from 'vue';
import Sidebar from './components/Sidebar.vue';

export default {
  components: {
    Sidebar
  },
  setup () {
  }
};
</script>

<style lang="scss" scoped>
.app__container {}
</style>
