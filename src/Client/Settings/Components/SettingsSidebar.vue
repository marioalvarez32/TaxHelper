<template>
  <div>
    <v-navigation-drawer class="settings__navigation">
      <h4>Settings</h4>
      <v-list density="compact" v-for="settingPage in settingPages" :key="settingPage.Name">
        <v-list-item link active-color="primary" density="compact" :active="settingPage.Name === selectedSettingPage">
          <template v-slot:prepend>
            <v-icon :icon="settingPage.Icon"></v-icon>
          </template>
          <v-list-item-title v-text="settingPage.Label"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { toRefs } from 'vue';
import { useSettingsStore } from '../Store/SettingsStore';

export default {
  setup() {
    const settingsStore = useSettingsStore();
    const { selectedSettingPage, settingPages } = toRefs(settingsStore);

    return {
      settingPages,
      selectedSettingPage,
    };
  },
};
</script>

<style lang="scss" scoped>
:deep(.v-navigation-drawer__content) {
  margin: 25px;
}
</style>
