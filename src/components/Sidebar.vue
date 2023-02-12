<template>
    <div class="sidebar">
        <v-navigation-drawer permanent rounded="lg" rail elevation="5">
            <v-list :lines="false" density="compact" nav class="sidebar__nav-list">
                <template v-for="(menuItem, i) in navigationItems" :key="i">
                    <v-list-item v-if="!menuItem.SubItems" :to="menuItem.Path" :active="$route.path === menuItem.Path"
                        active-color="primary">
                        <template v-slot:prepend>
                            <v-icon :icon="menuItem.Icon"></v-icon>
                        </template>

                        <v-list-item-title v-text="menuItem.Text"></v-list-item-title>
                    </v-list-item>
                    <v-list-group v-else value="Tools">
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" :prepend-icon="menuItem.Icon"
                                :active="$route.path === subItem.Path" :title="menuItem.Text"></v-list-item>
                        </template>
                        <v-list-item v-for="(subItem, i) in menuItem.SubItems" :to="subItem.Path" :key="i"
                            :value="subItem.Text" :title="subItem.Text" :prepend-icon="subItem.Icon">
                        </v-list-item>
                    </v-list-group>
                </template>
                <div class="sidebar__setting-icon-wrapper">
                    <v-list-item :to="settingNav.Path" :active="$route.path === settingNav.Path" active-color="primary">
                        <template v-slot:prepend>
                            <v-icon :icon="settingNav.Icon"></v-icon>
                        </template>

                        <v-list-item-title v-text="settingNav.Text"></v-list-item-title>
                    </v-list-item>
                </div>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
  setup () {
    const navigationItems = [
      { Text: 'Dashboard', Path: '/', Icon: 'mdi-home' },
      { Text: 'Receipt Reader', Path: '/tools/receipt-reader', Icon: 'mdi-file-multiple' }

    ];
    const settingNav = { Text: 'Settings', Path: '/settings', Icon: 'mdi-cog' };
    return {
      selectedItem: 1,
      navigationItems,
      settingNav
    };
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
    margin-right: 20px;
}

:deep(.v-navigation-drawer) {
    left: 20px !important;
    top: 30px !important;
    height: calc(100% - 60px) !important;
}

:deep(.v-navigation-drawer__content) {
    margin-top: 50px
}

:deep(.v-list.v-list--nav) {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.sidebar__setting-icon-wrapper {
    display: flex;
    align-items: flex-end;
    height: 100%;
}
</style>
