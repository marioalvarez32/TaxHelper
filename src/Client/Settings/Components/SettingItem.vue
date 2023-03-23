<template>
  <div class="setting-item">
    <slot class="setting-item__action-container"></slot>
    <div class="setting-item__description">
      <p class="setting-item__description-title">{{ settingItem.Label }}</p>
      <p class="v-label">{{ settingItem.Description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import SettingItem from '../Models/SettingItem';

export default {
  props: {
    settingItem: {
      type: Object as PropType<SettingItem>,
      required: true,
    },
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
  flex-basis: 35%;

  .setting-item__description-title {
    font-size: 0.85rem;
    font-weight: 600;
  }

  p {
    font-size: 0.8rem;
  }
}

.setting-item__items-container {
  flex-basis: 65%;
}
</style>
