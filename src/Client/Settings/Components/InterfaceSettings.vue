<template>
  <div class="general-settings">
    <SettingsItemGroup v-for="group in settingGroups" :key="group.Name" :title="group.Label" :description="group.Description" :setting-items="getSettingItemsByGroup(group.Name)">
      <template #setting-item-action--theme>
        <v-switch v-model="currentTheme" :label="`Modo: ${themeLabel}`" inset true-value="Light" false-value="Dark" hide-details />
      </template>
    </SettingsItemGroup>
  </div>
</template>

<script lang="ts">
import { toRefs, ref, computed } from 'vue';
import SettingsItemGroup from './SettingsItemGroup.vue';
import { useSettingsStore } from '../Store/SettingsStore';
import { useTheme } from 'vuetify';

export default {
  components: {
    SettingsItemGroup,
  },
  setup() {
    const settingsStore = useSettingsStore();
    const { getSettingGroupsBySelectedPage: settingGroups, getSelectedSettingPage, getSettingItemsByGroup } = toRefs(settingsStore);
    const theme = useTheme();

    const currentTheme = computed({
      get: () => {
        return theme.global.name.value.charAt(0).toUpperCase() + theme.global.name.value.slice(1);
      },
      set: (value) => {
        theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
      },
    });

    const themeLabel = computed(() => (currentTheme.value.toLowerCase() == 'dark' ? 'Oscuro' : 'Claro'));

    return {
      settingPage: getSelectedSettingPage,
      currentTheme,
      settingGroups,
      getSettingItemsByGroup,
      themeLabel,
    };
  },
};
</script>

<style lang="scss" scoped></style>
