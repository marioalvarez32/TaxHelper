<template>
  <v-layout full-height>
    <SettingsSidebar />
    <SettingsMain />
  </v-layout>
</template>

<script lang="ts">
import SettingsSidebar from './Components/SettingsSidebar.vue';
import SettingsMain from './Components/SettingsMain.vue';

export default {
  components: {
    SettingsSidebar,
    SettingsMain,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
