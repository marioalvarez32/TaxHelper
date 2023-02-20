<template>
  <div>
    <v-navigation-drawer class="settings__navigation">
      <h4>Settings</h4>
      <v-list density="compact">
        <v-list-item active-color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-palette"></v-icon>
          </template>

          <v-list-item-title v-text="`Interface`"></v-list-item-title>
        </v-list-item>
        <v-list-item active-color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-palette"></v-icon>
          </template>

          <v-list-item-title v-text="`Interface`"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
:deep(.v-navigation-drawer__content) {
  margin: 25px;
}
</style>
