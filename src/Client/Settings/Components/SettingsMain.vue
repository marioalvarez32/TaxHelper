<template>
  <v-main style="min-height: 300px">
    <div class="settings-content">
      <div class="settings-content__header">
        <div class="settings-content__header-container">
          <div>
            <h2>{{ settingPage.Label }} settings</h2>
            <p class="v-label">{{ settingPage.Description }}</p>
          </div>
          <div class="settings-content__header-search-wrapper">
            <v-text-field v-model="searchTerm" class="settings-content__header-search" clearable label="Search" hide-details density="compact" variant="outlined" single-line append-inner-icon="mdi-magnify"></v-text-field>
          </div>
        </div>
      </div>
      <v-divider></v-divider>
      <component v-if="!isLoadingComponent" :is="settingPageComponent"></component>
      <v-overlay v-else persistent :model-value="isLoadingComponent" contained>
        <v-progress-circular :size="75" color="primary" indeterminate></v-progress-circular>
      </v-overlay>
    </div>
  </v-main>
</template>

<script lang="ts">
import { toRefs } from 'vue';
import { useSettingsStore } from '../Store/SettingsStore';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

export default {
  setup() {
    const settingsStore = useSettingsStore();
    const { getSelectedSettingPage: settingPage, searchTerm } = toRefs(settingsStore);
    const isLoadingComponent = ref(false);

    return {
      settingPage,
      searchTerm,
      settingPageComponent: settingPage.value.Component,
      isLoadingComponent,
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
