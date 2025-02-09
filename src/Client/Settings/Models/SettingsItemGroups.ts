import SettingItem from './SettingItem';

export default class SettingsItemGroups {
  Name: string;
  Label: string;
  Description: string;
  SettingItems: SettingItem[];

  constructor(name: string, label: string, description: string, settingItems: SettingItem[]) {
    this.Name = name;
    this.Label = label;
    this.Description = description;
    this.SettingItems = settingItems;
  }
}