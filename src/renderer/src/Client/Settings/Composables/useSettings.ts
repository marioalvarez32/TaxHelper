import { useStorage } from '@vueuse/core';
import { DefaultSettings } from '../Constants/DefaultSettings';

const settings = useStorage('user-settings', DefaultSettings);

export default function useSettings() {
  return {
    settings,
  };
}
