<template>
  <div class="setting-item">
    <div class="setting-item__input">
      <v-switch value="true" label="Theme" inset color="primary" true-value="yes" false-value="no" hide-details></v-switch>
    </div>
    <div class="setting-item__description">
      <p class="setting-item__description-title">{{ title }}</p>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
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
    settingType: {
      type: String,
      required: false,
    },
  },
  setup() {
    return {};
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
