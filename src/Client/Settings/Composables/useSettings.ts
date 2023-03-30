import { useStorage } from '@vueuse/core';
import { ref } from 'vue';
import { DefaultSettings } from '../Constants/DefaultSettings';

const settings = useStorage('user-settings', DefaultSettings);

export default function useSettings() {
  return {
    settings,
  };
}
