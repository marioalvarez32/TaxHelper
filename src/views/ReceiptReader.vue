<template>
  <div class="receipt-reader__container">
    <div class="receipt-reader__content">
      <v-card elevation="5" color="grey-darken-4" class="receipt-reader__card receipt-reader__input-form">
        <div class="receipt-reader__card-content">
          <div class="receipt-reader__load-directory">
            <v-overlay :model-value="isLoading" contained>
              <v-progress-circular :size="75" color="primary" indeterminate></v-progress-circular>
            </v-overlay>
            <h3>Load Directory</h3>
            <v-btn color="primary" @click="openDirectoyDialog"> Select directory </v-btn>
            <h4>Selected Directory:</h4>
            {{ selectedFileDirectory }}
          </div>
          <div class="receipt-reader__scan-directory">
            <div class="receipt-reader__files-table">
              <v-table theme="dark" density="compact" fixed-header>
                <thead>
                  <tr>
                    <th class="text-left">File name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="file in filesInDirectory" :key="file">
                    <td>{{ file }}</td>
                  </tr>
                </tbody>
              </v-table>
            </div>
            <v-btn :disabled="filesInDirectory.length <= 0" color="primary" @click="readFiles"> Read XML receipts </v-btn>
          </div>
        </div>
      </v-card>
      <v-card elevation="5" color="grey-darken-4" class="receipt-reader__card receipt-reader__input-data">
        <div class="receipt-reader__data-container">
          <h2>
            SubTotal <span>{{ formatToCurrency(receiptsSubTotal) }}</span>
          </h2>
          <h2>
            Total Tax Amount <span>{{ formatToCurrency(receiptsTaxTotal) }}</span>
          </h2>
          <h2>
            Total <span>{{ formatToCurrency(receiptsTotal) }}</span>
          </h2>
          <h2>
            Total receipts read: <span>{{ addedReceipts.length }}</span>
          </h2>
        </div>
      </v-card>
      <v-card elevation="5" color="grey-darken-4" class="receipt-reader__card receipt-reader__table">
        <div class="receipt-reader__receipts-table">
          <v-table theme="dark" density="compact" fixed-header>
            <thead>
              <tr>
                <th class="text-left">Receipt ID</th>
                <th class="text-left">Issuer</th>
                <th class="text-left">Receiver</th>
                <th class="text-left">Sub Total</th>
                <th class="text-left">Total</th>
                <th class="text-left">Tax Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="file in addedReceipts" :key="file.UUID">
                <td>{{ file.UUID }}</td>
                <td>{{ file.IssuerName }}</td>
                <td>{{ file.ReceiverName }}</td>
                <td>${{ file.SubTotal }}</td>
                <td>${{ file.Total }}</td>
                <td>${{ file.TaxAmount }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { readXmlDirectory, readXmlFiles } from '../services/FileService';
import useIsLoading from '../components/ReceiptReader/composables/isLoading';
import ReceiptType from '../components/models/ReceiptType';
import { filter } from 'minimatch';
const { ipcRenderer } = require('electron');

export default defineComponent({
  props: {},
  setup() {
    const selectedFileDirectory = ref('');
    const filesInDirectory = ref<string[]>([]);
    const addedReceipts = ref<ReceiptType[]>([]);
    const receiptsTotal = ref<number>(0);
    const receiptsSubTotal = ref<number>(0);
    const receiptsTaxTotal = ref<number>(0);

    const { isLoading } = useIsLoading();
    function openDirectoyDialog() {
      ipcRenderer
        .invoke('showSelectDirectoryDialog', 'Hello from the renderer!')
        .then((result) => {
          if (result.canceled) return;
          selectedFileDirectory.value = result.filePaths[0];
          scanDirectory();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function scanDirectory() {
      isLoading.value = true;
      readXmlDirectory(selectedFileDirectory.value, 'xml')
        .then((files) => {
          filesInDirectory.value = files;
        })
        .finally(() => (isLoading.value = false));
    }

    function readFiles() {
      isLoading.value = true;
      readXmlFiles(selectedFileDirectory.value, filesInDirectory.value)
        .then((files: ReceiptType[]) => {
          addReceipts(files);
        })
        .finally(() => (isLoading.value = false));
    }

    function addReceipts(receipts: ReceiptType[]) {
      receipts
        .filter((receipt) => true)
        .forEach((receipt) => {
          receiptsTotal.value += receipt.Total;
          receiptsSubTotal.value += receipt.SubTotal;
          receiptsTaxTotal.value += receipt.TaxAmount;
          addedReceipts.value.push(receipt);
        });

      filesInDirectory.value = [];
    }

    function isReceiptAdded(uuid: string) {
      return addedReceipts.value.findIndex((receipt) => receipt.UUID == uuid) != -1;
    }

    function formatToCurrency(number: number) {
      return `${number.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    return {
      openDirectoyDialog,
      selectedFileDirectory,
      readFiles,
      filesInDirectory,
      isLoading,
      addedReceipts,
      receiptsTotal,
      receiptsSubTotal,
      receiptsTaxTotal,
      formatToCurrency,
    };
  },
});
</script>

<style lang="scss" scoped>
.receipt-reader__container {
  margin: 10px 30px;
  height: calc(100% - 10px);
  display: flex;
}

.receipt-reader__content {
  display: grid;
  gap: 15px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
}

.receipt-reader__card {
  width: 100%;
  position: relative;
}

.receipt-reader__load-directory {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
}

.receipt-reader__scan-directory {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 2;
  gap: 20px;
}

.receipt-reader__card-content {
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.receipt-reader__input-form {
  grid-row: 1 / span 4;
  grid-column: 1 / span 6;
}

.receipt-reader__input-data {
  grid-row: 1 / span 4;
  grid-column: 7 / span 6;
}

.receipt-reader__table {
  grid-row: 5 / span 8;
  grid-column: 1 / span 12;
  height: 100%;
  overflow: hidden;
  display: flex;
}

.v-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}

.receipt-reader__data-container {
  padding: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
}

.receipt-reader__files-table {
  height: 100px;
  overflow-y: auto;
  flex-grow: 3;
}

.receipt-reader__receipts-table {
  flex-grow: 1;
}

:deep(.receipt-reader__receipts-table .v-table) {
  width: 100%;
  height: 100%;
}
:deep(.receipt-reader__receipts-table .v-table .v-table__wrapper) {
  width: 100%;
  height: 100%;
}
</style>
