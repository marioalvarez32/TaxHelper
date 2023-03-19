<template>
  <div class="setting-item-group">
    <div class="setting-item-group__description">
      <p class="setting-item-group__description-title">{{ title }}</p>
      <p>{{ description }}</p>
    </div>
    <div class="setting-item-group__items-container">
      <slot name="settings"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs } from 'vue';
import { useSettingsStore } from '../Store/SettingsStore';
import SettingsGroup from '../Models/SettingsGroup';
import SettingsItemGroups from '../Models/SettingsItemGroups';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
