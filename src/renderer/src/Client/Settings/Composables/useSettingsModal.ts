import { ref } from 'vue';

const isSettingsOpen = ref(false);

export default function useSettingsModal() {
  return {
    isSettingsOpen,
    toggleSettings,
  };
}

function toggleSettings() {
  isSettingsOpen.value = !isSettingsOpen.value;
}
