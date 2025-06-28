<template>
	<v-app>
		<v-layout full-height>
			<Sidebar />
			<v-main>
				<router-view />
			</v-main>
		</v-layout>
		<Settings />
	</v-app>
</template>

<script lang="ts">
	import Sidebar from '@/Client/Sidebar/Sidebar.vue';
	import Settings from '@/Client/Settings/Settings.vue';

	export default {
		components: {
			Sidebar,
			Settings,
		},
		setup() {},
	};
</script>

<style lang="scss" scoped></style>
