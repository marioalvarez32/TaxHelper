<template>
  <div class="general-settings">
    <SettingsItemGroup title="Theme" description="Personalize your experience by selecting a different color or selecting a dark or light theme.">
      <template #settings>
        <SettingItem settingType="predefined-color-selection" title="Application Theme" description="Select a dark or light theme">
          <template #action>
            <v-switch v-model="currentTheme" :label="`Theme: ${currentTheme}`" inset color="primary" true-value="Light" false-value="Dark" hide-details />
          </template>
        </SettingItem>
      </template>
    </SettingsItemGroup>
  </div>
</template>

<script lang="ts">
import { toRefs, ref, computed } from 'vue';
import SettingsItemGroup from './SettingsItemGroup.vue';
import SettingItem from './SettingItem.vue';
import SettingsGroup from '../Models/SettingsGroup';
import { useSettingsStore } from '../Store/SettingsStore';
import { useTheme } from 'vuetify';

export default {
  components: {
    SettingsItemGroup,
    SettingItem,
  },
  setup() {
    const settingsStore = useSettingsStore();
    const { userSettings, selectedSettingGroup, getSelectedSettingGroup: settings, getSelectedSettingPageComponent } = toRefs(settingsStore);
    const theme = useTheme();

    const currentTheme = computed({
      get: () => {
        return theme.global.name.value.charAt(0).toUpperCase() + theme.global.name.value.slice(1);
      },
      set: (value) => {
        theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
      },
    });

    return {
      settings,
      currentTheme,
    };
  },
};
</script>

<style lang="scss" scoped></style>
