<template>
  <div class="general-settings">
    <SettingsItemGroup v-for="group in settingGroups" :key="group.Name" :title="group.Label" :description="group.Description" :setting-items="getSettingItemsByGroup(group.Name)">
      <template #setting-item-action--language>
        <v-select item-title="label" item-value="key" label="Language" persistent-hint single-line></v-select>
      </template>
    </SettingsItemGroup>
    flakjsdlkfj
  </div>
</template>

<script lang="ts">
import { toRefs, ref, computed } from 'vue';
import SettingsItemGroup from './SettingsItemGroup.vue';
import SettingItem from './SettingItem.vue';
import { useSettingsStore } from '../Store/SettingsStore';
import { useI18n } from 'vue-i18n';

export default {
  components: {
    SettingsItemGroup,
    SettingItem,
  },
  setup() {
    const settingsStore = useSettingsStore();
    const { getSettingGroupsBySelectedPage: settingGroups, getSelectedSettingPage, getSettingItemsByGroup } = toRefs(settingsStore);
    const { t, locale } = useI18n();
    const languages = [
      { label: 'English', key: 'En' },
      { label: 'Español', key: 'Es' },
    ];

    const currentLanguage = computed({
      get: () => {
        return locale.value;
      },
      set: (value) => {
        locale.value = value;
      },
    });

    return {
      settingPage: getSelectedSettingPage,
      currentLanguage,
      settingGroups,
      getSettingItemsByGroup,
      languages,
    };
  },
};
</script>

<style lang="scss" scoped></style>
