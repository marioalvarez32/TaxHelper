import { defineStore } from 'pinia';
import AppSettings from '../Models/AppSettings';
import SettingsPage from '../Models/SettingsPage';
import SettingGroup from '../Models/SettingGroup';
import SettingItem from '../Models/SettingItem';
import { SettingPageType } from '../Enums/SettingPageType';

interface SettingsStore {
  userSettings: AppSettings;
  selectedSettingPage: string;
  settingPages: SettingsPage[];
  settingGroups: SettingGroup[];
  settingItems: SettingItem[];
}

export const useSettingsStore = defineStore('Settings', {
  state: (): SettingsStore => ({
    userSettings: {
      // Interface: {
      //   Name: 'interface-settings',
      //   Icon: 'mdi-application-settings-outline',
      //   Label: 'Interface',
      //   Description: 'All settings pertaining to the User Interface.',
      //   SettingsItemGroups: [
      //     {
      //       Name: 'interface-theme',
      //       Label: 'Application Theme',
      //       Description: 'Customize the look and feel of the application',
      //       SettingItems: [
      //         {
      //           Name: 'theme',
      //           Label: 'Interface Theme',
      //           Description: 'Select a light or dark theme for the application',
      //           DefaultValue: 'dark',
      //           Value: 'dark',
      //         },
      //         {
      //           Name: 'navbar-theme',
      //           Label: 'Navigation Bar Color',
      //           Description: 'Select the navigation bar color',
      //           DefaultValue: 'lightGray',
      //           Value: 'lightGray',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // LanguageRegion: {
      //   Name: 'language-region-settings',
      //   Icon: 'mdi-application-settings-outline',
      //   FriendlyName: 'Language & Region',
      //   Label: 'Language & Region',
      //   Description: 'All settings pertaining to the User Interface.',
      //   SettingsItemGroups: [
      //     {
      //       Name: 'language',
      //       Label: 'Application Language',
      //       Description: 'Change the language for the user interface',
      //       SettingItems: [
      //         {
      //           Name: 'language',
      //           Label: 'Language',
      //           Description: 'Stuff',
      //           DefaultValue: 'EN',
      //           Value: 'EN',
      //         },
      //       ],
      //     },
      //   ],
      // },
    },
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
        Name: 'language',
        Label: 'Language',
        Description: 'Stuff',
        DefaultValue: 'EN',
        SettingGroupName: 'interface-theme',
      },
    ],

    /***
     * Array of setting groups.\
     * - This group will filter and get all settings that are part of them.
     * Array of items containing all settings.
     * - Each group will have a parent id to decide where they show up.
     *
     *
     */
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
