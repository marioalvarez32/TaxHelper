export default class SettingGroup {
  Name: string;
  Label: string;
  Description: string;
  SettingPage: string;


  constructor(name: string, label: string, description: string, settingPage: string) {
    this.Name = name;
    this.Label = label;
    this.Description = description;
    this.SettingPage = settingPage;
  }
}
