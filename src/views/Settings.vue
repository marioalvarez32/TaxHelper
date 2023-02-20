<template>
  <v-layout full-height>
    <SettingsSidebar />
    <SettingsMain />
  </v-layout>
</template>

<script lang="ts">
import SettingsSidebar from '@/components/Settings/SettingsSidebar.vue';
import SettingsMain from '../components/Settings/SettingsMain.vue';

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
