<template>
  <div class="mercado-tools">
    <div v-if="isTogglingItems" class="mercado-tools__loading-wrapper">
      <v-progress-linear color="indigo" :model-value="pauseProgress" height="50" class="mercado-tools__loading">
        <template v-slot:default="{ value }">
          <div class="mercado-tools__loader-label-container">
            <strong>{{ Math.ceil(value) }}%</strong>
            <p>{{ pauseProgressLabel }}</p>
          </div>
        </template>
      </v-progress-linear>
    </div>
    <v-card elevation="5" rounded="lg" class="mercado-tools_content-container">
      <div class="mercado-tools__tabs">
        <v-tabs v-model="selectedTab" fixed-tabs density="compact" align-tabs="center" bg-color="primary" show-arrows slider-color="teal-lighten-3">
          <v-tab value="pause">Pausar</v-tab>
          <v-tab value="unpause">Despausar</v-tab>
        </v-tabs>
      </div>

      <div class="mercado-tools__content">
        <v-window v-model="selectedTab">
          <v-window-item value="pause">
            <div class="mercado-tools__actions-wrapper">
              <div class="mercado-tools__actions-container">
                <v-text-field label="Token ID" v-model="token" outlined></v-text-field>
                <v-btn @click="fetchAllItems" :disabled="shouldDisableFetchButton" color="primary">Buscar Articulos Activos</v-btn>

                <v-dialog width="750" max-height="750">
                  <template v-slot:activator="{ props }">
                    <div v-if="failedToPause.length > 0" class="mercado-tools__ommitted-items-count" v-bind="props">
                      <div>{{ failedToPause.length }} Articulos no pausados</div>
                      <v-icon icon="mdi-help-circle-outline" color="blue"></v-icon>
                    </div>
                  </template>

                  <template v-slot:default="{ isActive }">
                    <v-card title="Articulos Omitidos">
                      <div class="ommitted-files_table">
                        <v-data-table :headers="headers" :items="failedToPause" items-per-page="25">
                          <template v-slot:item.Price="{ item }"> ${{ item.Price.toFixed(2) }} </template>
                          <template v-slot:item.Thumbnail="{ item }">
                            <v-avatar class="mercado-tools__item-image" size="70px">
                              <v-img :src="item.Thumbnail" />
                            </v-avatar>
                          </template>
                        </v-data-table>
                      </div>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text="Cerrar" variant="tonal" @click="isActive.value = false"></v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>

                <div class="mercado-tools__admin-actions">
                  <v-btn @click="pauseAllListings" :disabled="shouldDisablePauseButton" color="warning">Pausar Articulos Activos</v-btn>
                </div>
              </div>
            </div>

            <div class="mercado-tools__table-wrapper">
              <v-data-table class="mercado-tools__table" :headers="headers" :items="items" items-per-page="25" :loading="isFetchingItems">
                <template v-slot:item.Price="{ item }"> ${{ item.Price.toFixed(2) }} </template>
                <template v-slot:item.Thumbnail="{ item }">
                  <v-avatar class="mercado-tools__item-image" size="70px">
                    <v-img :src="item.Thumbnail" />
                  </v-avatar>
                </template>
              </v-data-table>
            </div>
          </v-window-item>
          <v-window-item value="unpause">
            <v-btn @click="unpauseAllListings" :disabled="!token" color="success">Despausar Listados</v-btn>
            <div class="mercado-tools__table-wrapper">
              <v-data-table class="mercado-tools__table" :headers="headers" :items="pausedItems" items-per-page="25" :loading="isFetchingItems">
                <template v-slot:item.Price="{ item }"> ${{ item.Price ? item.Price.toFixed(2) : '--' }} </template>
                <template v-slot:item.Thumbnail="{ item }">
                  <v-avatar class="mercado-tools__item-image" size="70px">
                    <v-img :src="item.Thumbnail" />
                  </v-avatar>
                </template>
              </v-data-table>
            </div>
          </v-window-item>
        </v-window>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import useSettings from '../Settings/Composables/useSettings';
import { MercadoSellerSearchResponse, MercadoSellerSearchResult } from './Models/MercadoSellerSearchResponse';
import { Ref } from 'vue';
import { useStorage } from '@vueuse/core';
import articulosDeJuan from './articulos de juan.json';

export default {
  components: {},
  setup() {
    const apiLimit = 50;
    const token = ref('');
    const authenticateWithOAuth = async () => {};
    const items = ref<MercadoSellerSearchResult[]>([]);
    const isFetchingItems = ref(false);
    const shouldDisablePauseButton = computed(() => !token.value || isFetchingItems.value || items.value.length === 0);
    const shouldDisableFetchButton = computed(() => !token.value || isFetchingItems.value);
    const pausedItems: Ref<MercadoSellerSearchResult[]> = useStorage('paused-items', [], localStorage, { mergeDefaults: true });
    const failedToPause = ref<MercadoSellerSearchResult[]>([]);
    const pauseProgress = ref(0);
    const pauseProgressLabel = ref('');
    const selectedTab = ref('pause');
    const defaultAwaitTime = 1500;
    const headers = [
      { title: 'ID', key: 'Id' },
      { title: 'Imagen', key: 'Thumbnail' },
      { title: 'Titulo', key: 'Title' },
      { title: 'Precio', key: 'Price' },
      { title: 'Condicion', key: 'Condition' },
      { title: 'Cantidad', key: 'AvailableQuantity' },
    ];

    pausedItems.value = articulosDeJuan.map((item) => new MercadoSellerSearchResult({ id: item }));
    console.log('🚀 ~ file: MercadoTools.vue:128 ~ setup ~ pausedItems.value:', pausedItems.value);

    const isTogglingItems = ref(false);

    async function fetchAllItems() {
      let currentOffset = 0;
      let totalItemsToFetch = 0;
      items.value = [];
      do {
        isFetchingItems.value = true;
        try {
          const response = await fetch(`https://api.mercadolibre.com/sites/MLM/search?nickname=flukezone&offset=${currentOffset}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const parsedData = new MercadoSellerSearchResponse(data);
          totalItemsToFetch = parsedData.Paging.Total;
          items.value.push(...parsedData.Results);
          currentOffset += apiLimit;
        } catch (error) {
          console.error('An error occurred while fetching items:', error);
        }
      } while (totalItemsToFetch > currentOffset);
      isFetchingItems.value = false;
    }

    function downloadItemBackup() {
      // Download a json file wtih an array of all the items' ids.
      const ids = items.value.map((item) => item.Id);
      const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(ids))}`;
      const dlAnchorElem = document.createElement('a');
      dlAnchorElem.setAttribute('href', dataStr);
      dlAnchorElem.setAttribute('download', 'items.json');
      dlAnchorElem.click();
    }

    async function pauseAllListings() {
      isTogglingItems.value = true;
      downloadItemBackup();

      const tempItems = [...items.value];
      do {
        const item = tempItems.pop();
        pauseProgressLabel.value = `Pausando ${item.Title}`;

        ToggleItemStatus(item, 'paused')
          .then(() => {
            // Check if the item is already in the history.
            if (pausedItems.value.find((pausedItem) => pausedItem.Id === item.Id)) {
              return;
            }
            pausedItems.value.push(item);
          })
          .catch((error) => {
            // check if item already exists in the failed to pause.
            if (failedToPause.value.find((failedItem) => failedItem.Id === item.Id)) {
              return;
            }
            failedToPause.value.push(item);
          });
        await delay(defaultAwaitTime);
        pauseProgress.value = (pausedItems.value.length / items.value.length) * 100;
      } while (tempItems.length > 0);
      isTogglingItems.value = false;
      fetchAllItems();
    }

    async function unpauseAllListings() {
      isTogglingItems.value = true;
      const failedToUnpauseItems = [];
      const totalItemsToUnpause = pausedItems.value.length;
      for (let i = 0; i < pausedItems.value.length; i++) {
        const item = pausedItems.value[i];
        pauseProgressLabel.value = `Despausando ${item.Title}`;
        ToggleItemStatus(item, 'active')
          .then(() => {})
          .catch(() => {
            failedToUnpauseItems.push(item);
          });
        await delay(defaultAwaitTime);
        pauseProgress.value = (i / totalItemsToUnpause) * 100;
      }
      isTogglingItems.value = false;
      pausedItems.value = failedToUnpauseItems;
      fetchAllItems();
    }

    async function ToggleItemStatus(item: MercadoSellerSearchResult, status: 'paused' | 'active'): Promise<void> {
      const response = await fetch(`https://api.mercadolibre.com/items/${item.Id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          status,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    return {
      token,
      fetchAllItems,
      headers,
      items,
      isFetchingItems,
      pauseAllListings,
      unpauseAllListings,
      shouldDisablePauseButton,
      shouldDisableFetchButton,
      selectedTab,
      failedToPause,
      pausedItems,
      pauseProgress,
      isTogglingItems,
      pauseProgressLabel,
    };
  },
};
</script>

<style lang="scss" scoped>
.mercado-tools {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.mercado-tools__tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 15px;
  flex-basis: 5%;
}

.mercado-tools__content {
  flex-basis: 95%;
  height: 100%;
}
.mercado-tools_content-container {
  height: 100%;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.mercado-tools__actions-wrapper {
  display: flex;
  flex-direction: column;
}

.mercado-tools__actions-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 25px;
}
.mercado-tools__admin-actions {
  display: flex;
  gap: 25px;
  align-items: flex-end;
  padding: 10px;
}

.mercado-tools__table-wrapper {
  flex-basis: 90%;
  overflow-y: auto;
}

.mercado-tools__item-image {
  margin-top: 5px;
  margin-bottom: 5px;
}

.mercado-tools__table {
  height: 100%;
}

:deep(.v-table) {
  height: 100%;
}

:deep(.v-window) {
  height: 100%;
}

:deep(.v-window-item) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.mercado-tools__ommitted-items-count {
  display: flex;
  gap: 5px;
  align-items: center;
}

.mercado-tools__loading-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
}

.mercado-tools__loading {
  width: 50%;
  height: 50px;
}

.mercado-tools__loader-label-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  p {
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    font-size: 11px;
  }
}
</style>
