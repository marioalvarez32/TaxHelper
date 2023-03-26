<template>
  <div class="general-settings">
    <SettingsItemGroup v-for="group in settingGroups" :key="group.Name" :title="group.Label" :description="group.Description" :setting-items="getSettingItemsByGroup(group.Name)">
      <template #setting-item-action--language>
        <v-select v-model="currentLanguage" item-title="label" item-value="key" label="Language" :items="languages" persistent-hint single-line></v-select>
      </template>
    </SettingsItemGroup>
  </div>
</template>

<script lang="ts">
import { toRefs, ref, computed } from 'vue';
import SettingsItemGroup from './SettingsItemGroup.vue';
import { useSettingsStore } from '../Store/SettingsStore';
import { useTranslation } from 'i18next-vue';

export default {
  components: {
    SettingsItemGroup,
  },
  setup() {
    const settingsStore = useSettingsStore();
    const { getSettingGroupsBySelectedPage: settingGroups, getSelectedSettingPage, getSettingItemsByGroup } = toRefs(settingsStore);
    const { t, i18next } = useTranslation();

    const languages = [
      { label: 'English', key: 'en' },
      { label: 'Español', key: 'es' },
    ];

    const currentLanguage = computed({
      get: () => {
        return i18next.language;
      },
      set: (value) => {
        i18next.changeLanguage(value);
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
