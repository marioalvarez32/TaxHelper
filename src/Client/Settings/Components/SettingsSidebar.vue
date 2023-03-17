<template>
  <div>
    <v-navigation-drawer class="settings__navigation">
      <h4>Settings</h4>
      <v-list density="compact">
        <v-list-item link active-color="primary" density="compact" :active="userSettings.Interface.Name === selectedSettingGroup">
          <template v-slot:prepend>
            <v-icon :icon="userSettings.Interface.Icon"></v-icon>
          </template>
          <v-list-item-title v-text="userSettings.Interface.Label"></v-list-item-title>
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
    const { userSettings, selectedSettingGroup } = toRefs(settingsStore);

    return {
      userSettings,
      selectedSettingGroup,
    };
  },
};
</script>

<style lang="scss" scoped>
:deep(.v-navigation-drawer__content) {
  margin: 25px;
}
</style>
