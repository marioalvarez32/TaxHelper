<template>
  <div class="general-settings">
    <SettingsItemGroup title="Theme" description="Personalize your experience by selecting a different color or selecting a dark or light theme.">
      <template #settings>
        <SettingItem settingType="predefined-color-selection" title="Application Theme" description="Select a dark or light theme" />
      </template>
    </SettingsItemGroup>
  </div>
</template>

<script lang="ts">
import { toRefs } from 'vue';
import SettingsItemGroup from './SettingsItemGroup.vue';
import SettingItem from './SettingItem.vue';
import SettingsGroup from '../Models/SettingsGroup';
import { useSettingsStore } from '../Store/SettingsStore';

export default {
  components: {
    SettingsItemGroup,
    SettingItem,
  },
  setup() {
    const settingsStore = useSettingsStore();
    const { userSettings, selectedSettingGroup, getSelectedSettingGroup: settings, getSelectedSettingPageComponent } = toRefs(settingsStore);
    return {
      settings,
    };
  },
};
</script>

<style lang="scss" scoped></style>
