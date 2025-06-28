<template>
  <div class="setting-item">
    <slot class="setting-item__action-container"></slot>
    <div class="setting-item__description">
      <p class="setting-item__description-title" v-html="label"></p>
      <p class="v-label" v-html="description"></p>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import SettingItem from '../Models/SettingItem';
import { useSettingsStore } from '../Store/SettingsStore';
import { toRefs } from 'vue';
import { computed } from 'vue';

export default {
  props: {
    settingItem: {
      type: Object as PropType<SettingItem>,
      required: true,
    },
  },
  setup(props) {
    const settingStore = useSettingsStore();
    const { searchTerm } = toRefs(settingStore);

    const description = computed<string>(() => highlightText(props.settingItem.Description, searchTerm.value));
    const label = computed<string>(() => highlightText(`${props.settingItem.Label}`, searchTerm.value));

    function highlightText(text: string, searchTerm: string): string {
      if (!searchTerm || !text.toLowerCase().includes(searchTerm)) return text;
      const startIndex = text.toLowerCase().indexOf(searchTerm.toLowerCase());
      const endIndex = startIndex + searchTerm.length;
      return text.substring(0, startIndex) + '<mark>' + text.substring(startIndex, endIndex) + '</mark>' + text.substring(endIndex);
    }

    return {
      description,
      label,
    };
  },
};
</script>

<style lang="scss" scoped>
.setting-item {
  display: flex;
  gap: 30px;
  align-items: center;
}

.setting-item__description {
  width: 60%;

  .setting-item__description-title {
    font-size: 0.85rem;
    font-weight: 600;
  }

  p {
    font-size: 0.8rem;
    display: inline-block;
  }
}

.setting-item__items-container {
  flex-basis: 65%;
}

.setting-item div:first-child {
  max-width: 40%;
}

.setting-item__action-container p {
  display: flex;
}

:deep(.v-label) {
  white-space: pre-wrap;
}
</style>
