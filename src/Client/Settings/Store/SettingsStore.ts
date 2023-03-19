import { defineStore } from 'pinia';
import AppSettings from '../Models/AppSettings';
import SettingsGroup from '../Models/SettingsGroup';
import InterfaceSettings from '../Components/InterfaceSettings.vue';
import { Component } from 'vue';

interface SettingsStore {
  userSettings: AppSettings;
  selectedSettingGroup: string;
}
export const useSettingsStore = defineStore('Settings', {
  state: (): SettingsStore => ({
    userSettings: {
      Interface: {
        Name: 'interface-settings',
        Icon: 'mdi-application-settings-outline',
        FriendlyName: 'Interface',
        Label: 'Interface',
        Description: 'All settings pertaining to the User Interface.',
        SettingsItemGroups: [
          {
            Name: 'interface-theme',
            Label: 'Application Theme',
            Description: 'Customize the look and feel of the application',
            SettingItems: [
              {
                Name: 'theme',
                Label: 'Interface Theme',
                Description: 'Select a light or dark theme for the application',
                DefaultValue: 'dark',
                Value: 'dark',
              },
              {
                Name: 'navbar-theme',
                Label: 'Navigation Bar Color',
                Description: 'Select the navigation bar color',
                DefaultValue: 'lightGray',
                Value: 'lightGray',
              },
            ],
          },
        ],
      },
      LanguageRegion: {
        Name: 'language-region-settings',
        Icon: 'mdi-application-settings-outline',
        FriendlyName: 'Language & Region',
        Label: 'Language & Region',
        Description: 'All settings pertaining to the User Interface.',
        SettingsItemGroups: [
          {
            Name: 'language',
            Label: 'Application Language',
            Description: 'Change the language for the user interface',
            SettingItems: [
              {
                Name: 'language',
                Label: 'Language',
                Description: 'Stuff',
                DefaultValue: 'EN',
                Value: 'EN',
              },
            ],
          },
        ],
      },
    },
    selectedSettingGroup: 'interface-settings',
  }),
  getters: {
    getSelectedSettingGroup(state): SettingsGroup {
      switch (state.selectedSettingGroup) {
        case state.userSettings.Interface.Name:
        default:
          return state.userSettings.Interface;
      }
    },
    getSelectedSettingPageComponent(state): Component {
      switch (state.selectedSettingGroup) {
        case state.userSettings.Interface.Name:
        default:
          return InterfaceSettings;
      }
    },
  },
  actions: {},
});
