<template>
  <div v-if="settingItems.length > 0" class="setting-item-group">
    <div class="setting-item-group__description">
      <p class="setting-item-group__description-title">{{ title }}</p>
      <p class="v-label">{{ description }}</p>
    </div>
    <div class="setting-item-group__items-container">
      <SettingItem v-for="settingItem in settingItems" :key="settingItem.Name" :setting-item="settingItem">
        <slot class="setting-item__action-container" :name="`setting-item-action--${settingItem.Name}`" />
      </SettingItem>
    </div>
  </div>
</template>

<script lang="ts">
import SettingItemModel from '../Models/SettingItem';
import type { PropType } from 'vue';
import SettingItem from './SettingItem.vue';

export default {
  components: {
    SettingItem,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    settingItems: {
      type: Array as PropType<SettingItemModel[]>,
      default: [],
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.setting-item-group {
  display: flex;
  gap: 30px;
  margin: 25px 0;
  flex-direction: column;
}

.setting-item-group__description {
  flex-basis: 35%;

  .setting-item-group__description-title {
    font-size: 1rem;
    font-weight: 600;
  }
  p {
    font-size: 0.9rem;
  }
}

.setting-item-group__items-container {
  flex-basis: 65%;
}
</style>
