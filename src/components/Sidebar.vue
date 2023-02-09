<template>
    <v-navigation-drawer absolute border permanent rounded>
        <v-list>
            <v-list-item title="Tax Helper" subtitle="cositas">
                <template v-slot:append>
                    <v-btn size="small" variant="text" icon="mdi-menu-down"></v-btn>
                </template>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list :lines="false" density="compact" nav>
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
                        <v-list-item v-bind="props" :prepend-icon="menuItem.Icon" :active="$route.path === subItem.Path"
                            :title="menuItem.Text"></v-list-item>
                    </template>
                    <v-list-item v-for="(subItem, i) in menuItem.SubItems" :to="subItem.Path" :key="i"
                        :value="subItem.Text" :title="subItem.Text" :prepend-icon="subItem.Icon">
                    </v-list-item>
                </v-list-group>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    setup() {
        const navigationItems = [
            { Text: "Dashboard", Path: "/", Icon: "mdi-home" },
            { Text: "Receipt Reader", Path: "/tools/receipt-reader", Icon: "mdi-file-multiple" }
        ];
        return {
            selectedItem: 1,
            navigationItems,
        }
    },
};
</script>
  
<style lang="scss" scoped>
.sidebar {
    border: 1px solid red;
}
</style>