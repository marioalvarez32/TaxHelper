<template>
  <v-app>
    <v-layout full-height>
      <Sidebar />
      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import Sidebar from './components/Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
  setup() {},
};
</script>

<style lang="scss" scoped></style>
