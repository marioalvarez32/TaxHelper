<template>
  <div>
    <v-navigation-drawer class="settings__navigation">
      <h4>Configuración</h4>
      <v-list density="compact" v-for="settingPage in settingPages" :key="settingPage.Name">
        <v-list-item link active-color="primary" density="compact" :active="settingPage.Name === selectedSettingPage" @click="changeSettingPage(settingPage)">
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
import SettingsPage from '../Models/SettingsPage';

export default {
  setup() {
    const settingsStore = useSettingsStore();
    const { selectedSettingPage, settingPages } = toRefs(settingsStore);

    function changeSettingPage(settingPage: SettingsPage) {
      selectedSettingPage.value = settingPage.Name;
    }
    return {
      settingPages,
      selectedSettingPage,
      changeSettingPage,
    };
  },
};
</script>

<style lang="scss" scoped>
:deep(.v-navigation-drawer__content) {
  margin: 25px;
}
</style>
