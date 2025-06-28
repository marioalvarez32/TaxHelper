import { SettingPageType } from '../Enums/SettingPageType';

export default class SettingsPage {
  Name: SettingPageType;
  Label: string;
  Icon: string;
  Description: string;

  constructor(name: SettingPageType, label: string, icon: string, description: string) {
    this.Name = name;
    this.Label = label;
    this.Icon = icon;
    this.Description = description;
  }
}