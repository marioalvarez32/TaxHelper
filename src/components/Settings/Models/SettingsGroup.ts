import SettingsItemGroups from './SettingsItemGroups';

export default class SettingsGroup {
  Name: string;
  Icon: string;
  FriendlyName: string;
  Label: string;
  Description: string;
  SettingsItemGroups: SettingsItemGroups[];

  constructor(parameters) {}
}
