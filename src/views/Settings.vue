<template>
  <v-layout full-height>
    <SettingsSidebar />
    <v-main style="min-height: 300px"></v-main>
  </v-layout>
</template>

<script lang="ts">
import SettingsSidebar from '@/components/Settings/SettingsSidebar.vue';

export default {
  components: {
    SettingsSidebar,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
