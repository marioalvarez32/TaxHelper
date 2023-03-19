<template>
  <v-dialog v-model="isSettingsOpen" width="800" persistent>
    <v-layout full-height>
      <SettingsSidebar />
      <SettingsMain />
    </v-layout>
  </v-dialog>
</template>

<script lang="ts">
import SettingsSidebar from './Components/SettingsSidebar.vue';
import SettingsMain from './Components/SettingsMain.vue';
import useSettingsModal from './Composables/useSettingsModal';

export default {
  components: {
    SettingsSidebar,
    SettingsMain,
  },
  setup() {
    const { isSettingsOpen } = useSettingsModal();
    return {
      isSettingsOpen,
    };
  },
};
</script>

<style lang="scss" scoped></style>
