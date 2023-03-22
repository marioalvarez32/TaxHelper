<template>
  <v-main style="min-height: 300px">
    <div class="settings-content">
      <div class="settings-content__header">
        <div class="settings-content__header-container">
          <div>
            <h2>{{ settingPage.Label }} settings</h2>
            <p>{{ settingPage.Description }}</p>
          </div>
          <div class="settings-content__header-search-wrapper">
            <v-text-field class="settings-content__header-search" clearable label="Search" hide-details density="compact" variant="outlined" single-line append-inner-icon="mdi-magnify"></v-text-field>
          </div>
        </div>
      </div>
      <v-divider></v-divider>
      <component :is="settingPageComponent"></component>
    </div>
  </v-main>
</template>

<script lang="ts">
import { toRefs } from 'vue';
import { useSettingsStore } from '../Store/SettingsStore';
import { getSettingPageComponent } from '../Enums/SettingPageType';

export default {
  setup() {
    const settingsStore = useSettingsStore();
    const { userSettings, getSelectedSettingPage: settingPage } = toRefs(settingsStore);

    return {
      userSettings,
      settingPage,
      settingPageComponent: getSettingPageComponent(settingPage.value.Name),
    };
  },
};
</script>

<style lang="scss" scoped>
.settings-content {
  display: flex;
  height: 100%;
  margin: 30px;
  flex-direction: column;
}

.settings-content__header {
  display: flex;
  margin-bottom: 15px;
}

.settings-content__header-container {
  display: flex;
  flex-basis: 100%;
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;
}

.settings-content__header-search-wrapper {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
}

.settings-content__header-search {
  min-width: 250px;
}
</style>
