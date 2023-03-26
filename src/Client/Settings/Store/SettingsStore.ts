import { defineStore } from 'pinia';
import AppSettings from '../Models/AppSettings';
import SettingsPage from '../Models/SettingsPage';
import SettingGroup from '../Models/SettingGroup';
import SettingItem from '../Models/SettingItem';
import { SettingPageType } from '../Enums/SettingPageType';
import InterfaceSettings from '../Components/InterfaceSettings.vue';
import { shallowRef } from 'vue';

interface SettingsStore {
  selectedSettingPage: string;
  settingPages: SettingsPage[];
  settingGroups: SettingGroup[];
  settingItems: SettingItem[];
  searchTerm: string;
}

export const useSettingsStore = defineStore('Settings', {
  state: (): SettingsStore => ({
    settingPages: [
      {
        Name: SettingPageType.Interface,
        Label: 'Interface',
        Icon: 'mdi-application-settings-outline',
        Description: 'All settings pertaining to the User Interface.',
        Component: shallowRef(InterfaceSettings),
      },
      {
        Name: SettingPageType.LanguageAndRegion,
        Label: 'Language & Region',
        Icon: 'mdi-application-settings-outline',
        Description: 'All settings pertaining to the User Interface.',
        Component: shallowRef(InterfaceSettings),
      },
    ],
    settingGroups: [
      {
        Name: 'interface-theme',
        Label: 'Application Theme',
        Description: 'Customize the theme for the user interface',
        SettingPage: SettingPageType.Interface,
      },
      {
        Name: 'language',
        Label: 'Application Language',
        Description: 'Change the language for the user interface',
        SettingPage: SettingPageType.LanguageAndRegion,
      },
    ],
    settingItems: [
      {
        Name: 'theme',
        Label: 'Interface Theme',
        Description: `This setting allows you to change the theme of the app, giving you a different look and feel to the app's interface`,
        DefaultValue: 'dark',
        SettingGroupName: 'interface-theme',
      },
      {
        Name: 'language',
        Label: 'Application Language',
        Description: `Change the language of the app to view the app's content in your preferred language.`,
        DefaultValue: 'en',
        SettingGroupName: 'language',
      },
    ],
    searchTerm: '',
    selectedSettingPage: SettingPageType.Interface,
  }),
  getters: {
    getSelectedSettingPage(state): SettingsPage {
      return state.settingPages.find((settings) => settings.Name == state.selectedSettingPage);
    },
    getSettingGroupsBySelectedPage(state): SettingGroup[] {
      return state.settingGroups.filter((group) => group.SettingPage == state.selectedSettingPage);
    },
    getSettingItemsByGroup: (state) => (groupName) => {
      const items = state.settingItems.filter((item) => item.SettingGroupName === groupName);
      if (state.searchTerm == '' || state.searchTerm == null) return items;
      return items.filter((item) => {
        return item.Description.toLowerCase().includes(state.searchTerm.toLowerCase()) || item.Label.toLowerCase().includes(state.searchTerm.toLowerCase());
      });
    },
  },
  actions: {},
});
