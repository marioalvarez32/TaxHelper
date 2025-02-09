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
        SettingGroupName: 'interface-theme',
      },
      {
        Name: 'mercadolibre-app-id',
        Label: 'ID de la aplicación',
        Description: `Este ID te permite interactuar con tu cuenta de MercadoLibre desde la aplicación. Para obtener este ID, crea una aplicación en MercadoLibre y copia el ID de la aplicación`,
        SettingGroupName: 'mercadolibre-settings',
      },
      {
        Name: 'mercadolibre-app-url',
        Label: 'URL de la applicación de MercadoLibre',
        Description: `La URL tiene que ser la misma que se uso para crear la applicación en MercadoLibre`,
        SettingGroupName: 'mercadolibre-settings',
      },
    ],
    searchTerm: '',
    selectedSettingPage: SettingPageType.Interface,
  }),
  getters: {
    getSelectedSettingPage(state): SettingsPage | null {
      const page = state.settingPages.find((settings) => settings.Name == state.selectedSettingPage);
      if (page == undefined) return null;
      return page;
    },
    getSettingGroupsBySelectedPage(state): SettingGroup[] {
      return state.settingGroups.filter((group) => group.SettingPage == state.selectedSettingPage);
    },
    getSettingItemsByGroup: (state) => (groupName: string) => {
      const items = state.settingItems.filter((item) => item.SettingGroupName === groupName);
      if (state.searchTerm == '' || state.searchTerm == null) return items;
      return items.filter((item) => {
        return item.Description.toLowerCase().includes(state.searchTerm.toLowerCase()) || item.Label.toLowerCase().includes(state.searchTerm.toLowerCase());
      });
    },
  },
  actions: {},
});
