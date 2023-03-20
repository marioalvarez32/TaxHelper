import { Component } from 'vue';
import InterfaceSettings from '../Components/InterfaceSettings.vue';

export enum SettingPageType {
  Interface = 'interface',
}
// Define a map of enum keys and Vue component pairs
const componentMap: Record<SettingPageType, Component> = {
  [SettingPageType.Interface]: InterfaceSettings,
};

// Define a function that takes a component type as an argument and returns the corresponding Vue component from the map
export function getSettingPageComponent(type: SettingPageType): Component {
  return componentMap[type];
}
