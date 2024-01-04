<template>
  <div class="general-settings">
    <SettingsItemGroup v-for="group in settingGroups" :key="group.Name" :title="group.Label" :description="group.Description" :setting-items="getSettingItemsByGroup(group.Name)">
      <template #setting-item-action--mercadolibre-app-id>
        <v-text-field v-model="appId" :label="`App ID`" hide-details dense />
      </template>
      <template #setting-item-action--mercadolibre-app-url>
        <v-text-field v-model="appUrl" :label="`URL`" hide-details dense />
      </template>
    </SettingsItemGroup>
  </div>
</template>

<script lang="ts">
import { toRefs, ref, computed } from 'vue';
import SettingsItemGroup from './SettingsItemGroup.vue';
import { useSettingsStore } from '../Store/SettingsStore';
import { useTheme } from 'vuetify';
import useSettings from '../Composables/useSettings';

export default {
  components: {
    SettingsItemGroup,
  },
  setup() {
    const settingsStore = useSettingsStore();
    const { getSettingGroupsBySelectedPage: settingGroups, getSelectedSettingPage, getSettingItemsByGroup } = toRefs(settingsStore);
    const theme = useTheme();
    const { settings } = useSettings();
    const appId = computed({
      get: () => {
        return settings.value.mercadoLibreAppId;
      },
      set: (value) => {
        settings.value.mercadoLibreAppId = value.toLowerCase();
      },
    });
    const appUrl = computed({
      get: () => {
        return settings.value.mercadoLibreAppUrl;
      },
      set: (value) => {
        settings.value.mercadoLibreAppUrl = value.toLowerCase();
      },
    });

    return {
      settingPage: getSelectedSettingPage,
      settingGroups,
      getSettingItemsByGroup,
      appId,
      appUrl,
    };
  },
};
</script>

<style lang="scss" scoped></style>
