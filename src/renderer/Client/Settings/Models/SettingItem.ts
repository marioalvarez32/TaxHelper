export default class SettingItem {
  Name: string;
  Label: string;
  Description: string;
  SettingGroupName: string;

  constructor(name: string, label: string, description: string, settingGroupName: string) {
    this.Name = name;
    this.Label = label;
    this.Description = description;
    this.SettingGroupName = settingGroupName;
  }
}
