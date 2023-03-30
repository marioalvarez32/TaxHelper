import { defineStore } from 'pinia';
import SettingsPage from '../Models/SettingsPage';
import SettingGroup from '../Models/SettingGroup';
import SettingItem from '../Models/SettingItem';
import { SettingPageType } from '../Enums/SettingPageType';

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
        Label: 'Interfaz',
        Icon: 'mdi-application-settings-outline',
        Description: 'Todas las opciones de configuración de la Interfaz de usuario',
      },
    ],
    settingGroups: [
      {
        Name: 'interface-theme',
        Label: 'Tema de la aplicación',
        Description: 'Personaliza el tema de la interfaz de usuario',
        SettingPage: SettingPageType.Interface,
      },
    ],
    settingItems: [
      {
        Name: 'theme',
        Label: 'Tema de Interfaz',
        Description: `Este ajuste te permite cambiar el tema de la aplicación, dándole una apariencia y sensación diferentes a la interfaz de la aplicación`,
        DefaultValue: 'dark',
        SettingGroupName: 'interface-theme',
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
