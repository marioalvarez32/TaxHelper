<template>
	<v-main style="min-height: 300px">
		<div class="settings-content">
			<div class="settings-content__header">
				<div class="settings-content__header-container">
					<div>
						<h2>{{ selectedSettingPage?.Label }}</h2>
						<p class="v-label">{{ selectedSettingPage?.Description }}</p>
					</div>
					<div class="settings-content__header-search-wrapper">
						<v-text-field
							v-model="searchTerm"
							class="settings-content__header-search"
							clearable
							label="Buscar"
							hide-details
							density="compact"
							variant="outlined"
							single-line
							append-inner-icon="mdi-magnify"
						></v-text-field>
					</div>
				</div>
			</div>
			<v-divider></v-divider>
			<component v-if="settingPageComponent" :is="settingPageComponent"></component>
			<v-overlay v-else persistent contained>
				<v-progress-circular :size="75" color="primary" indeterminate></v-progress-circular>
			</v-overlay>
		</div>
	</v-main>
</template>

<script lang="ts">
	import { toRefs } from 'vue';
	import { useSettingsStore } from '../Store/SettingsStore';
	import { ref } from 'vue';
	import { SettingPageType } from '../Enums/SettingPageType';
	import { defineAsyncComponent } from 'vue';
	import { computed } from 'vue';

	export default {
		components: {},
		setup() {
			const settingsStore = useSettingsStore();
			const { getSelectedSettingPage: selectedSettingPage, searchTerm } = toRefs(settingsStore);
			const isLoadingComponent = ref(false);

			const settingPageComponent = computed(() => {
				/**
				 * Would have loved to do this in a different way but importing this in the same component avoids rendering issues.
				 */
				switch (selectedSettingPage.value?.Name) {
					case SettingPageType.Interface:
						return defineAsyncComponent(() => import('./InterfaceSettings.vue'));
				}
			});

			return {
				selectedSettingPage,
				searchTerm,
				settingPageComponent,
				isLoadingComponent,
			};
		},
	};
</script>

<style lang="scss" scoped>
	.settings-content {
		display: flex;
		height: 100%;
		margin: 30px;
		flex-direction: column;
	}

	.settings-content__header {
		display: flex;
		margin-bottom: 15px;
	}

	.settings-content__header-container {
		display: flex;
		flex-basis: 100%;
		justify-content: space-between;
		flex-direction: column;
		gap: 10px;
	}

	.settings-content__header-search-wrapper {
		display: flex;
		align-items: flex-end;
		flex-direction: column;
	}

	.settings-content__header-search {
		min-width: 250px;
	}
</style>
