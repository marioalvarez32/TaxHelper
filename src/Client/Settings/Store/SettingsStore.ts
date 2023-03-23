import { defineStore } from 'pinia';
import AppSettings from '../Models/AppSettings';
import SettingsPage from '../Models/SettingsPage';
import SettingGroup from '../Models/SettingGroup';
import SettingItem from '../Models/SettingItem';
import { SettingPageType } from '../Enums/SettingPageType';

interface SettingsStore {
  selectedSettingPage: string;
  settingPages: SettingsPage[];
  settingGroups: SettingGroup[];
  settingItems: SettingItem[];
}

export const useSettingsStore = defineStore('Settings', {
  state: (): SettingsStore => ({
    settingPages: [
      {
        Name: SettingPageType.Interface,
        Label: 'Interface',
        Icon: 'mdi-application-settings-outline',
        Description: 'All settings pertaining to the User Interface.',
      },
    ],
    settingGroups: [
      {
        Name: 'interface-theme',
        Label: 'Application Language',
        Description: 'Change the language for the user interface',
        SettingPage: 'interface',
      },
    ],
    settingItems: [
      {
        Name: 'theme',
        Label: 'Interface Theme',
        Description: 'Select a light or dark theme for the application',
        DefaultValue: 'dark',
        SettingGroupName: 'interface-theme',
      },
    ],
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
      return state.settingItems.filter((item) => item.SettingGroupName === groupName);
    },
  },
  actions: {},
});
