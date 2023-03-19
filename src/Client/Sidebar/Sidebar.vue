<template>
  <div class="sidebar">
    <v-navigation-drawer elevation="10" permanent expand-on-hover rail rail-width="60">
      <v-list :lines="false" density="default" nav class="sidebar__nav-list">
        <template v-for="(menuItem, i) in navigationItems" :key="i">
          <v-list-item :to="menuItem.Path" :active="$route.path === menuItem.Path" active-color="primary">
            <template v-slot:prepend>
              <v-icon size="30" :icon="menuItem.Icon"></v-icon>
            </template>
            <v-list-item-title v-text="menuItem.Text"></v-list-item-title>
          </v-list-item>
        </template>
        <div class="sidebar__setting-icon-wrapper">
          <v-list-item link active-color="primary" @click="toggleSettings">
            <template v-slot:prepend>
              <v-icon size="30" :icon="settingNav.Icon"></v-icon>
            </template>
            <v-list-item-title v-text="settingNav.Text"></v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import useSettingsModal from '../Settings/Composables/useSettingsModal';

export default {
  setup() {
    const navigationItems = [
      { Text: 'Dashboard', Path: '/', Icon: 'mdi-home' },
      {
        Text: 'Receipt Reader',
        Path: '/tools/receipt-reader',
        Icon: 'mdi-file-multiple',
      },
    ];
    const settingNav = { Text: 'Settings', Path: '/settings', Icon: 'mdi-cog' };
    const { toggleSettings } = useSettingsModal();

    return {
      selectedItem: 1,
      navigationItems,
      settingNav,
      toggleSettings,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
}

:deep(.v-navigation-drawer) {
  background-color: rgb(var(--v-theme-sidebarBackground));
  font-weight: 200;
  border-right: none;
}

:deep(.v-navigation-drawer__content) {
  margin-top: 50px;
}

:deep(.v-list-item-title) {
  margin: 0;
  line-height: 30px;
  font-size: 15px;
  position: relative;
  display: block;
  height: auto;
  white-space: nowrap;
}

:deep(.v-list.v-list--nav) {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 5px;
}

:deep(.v-list-item__prepend > .v-icon) {
  margin-inline-end: 20px;
}

.sidebar__setting-icon-wrapper {
  display: flex;
  align-items: flex-end;
  height: 100%;
}
</style>
