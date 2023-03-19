import { ref } from 'vue';

const isSettingsOpen = ref(false);

export default function useSettingsModal() {
  return {
    isSettingsOpen,
  };
}
