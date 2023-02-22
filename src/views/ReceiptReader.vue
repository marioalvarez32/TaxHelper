<template>
  <div class="receipt-reader__container">
    <div class="receipt-reader__content">
      <v-card elevation="5" class="receipt-reader__card receipt-reader__input-form">
        <div class="receipt-reader__load-directory-content">
          <div class="receipt-reader__load-directory">
            <v-overlay :model-value="isLoading" contained>
              <v-progress-circular :size="75" color="primary" indeterminate></v-progress-circular>
            </v-overlay>
            <h3>Load Directory</h3>
            <v-btn color="primary" @click="openDirectoyDialog"> Select directory </v-btn>
            <h4>Selected Directory:</h4>
            {{ selectedFileDirectory }}
          </div>
          <div class="receipt-reader__directory-data">
            <div class="receipt-reader__files-table">
              <v-table density="compact" fixed-header>
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
      <v-card elevation="5" class="receipt-reader__card receipt-reader__input-data">
        <div class="receipt-reader__data-container">
          <h3>
            SubTotal <span>{{ formatToCurrency(receiptsSubTotal) }}</span>
          </h3>
          <h3>
            Total Tax Amount <span>{{ formatToCurrency(receiptsTaxTotal) }}</span>
          </h3>
          <h3>
            Total <span>{{ formatToCurrency(receiptsTotalAmount) }}</span>
          </h3>
          <h3>
            Total receipts read: <span>{{ addedReceipts.length }}</span>
          </h3>
        </div>
      </v-card>
      <v-card elevation="5" class="receipt-reader__card receipt-reader__table">
        <div class="receipt-reader__table-container">
          <v-overlay :model-value="isExportingData" contained>
            <v-progress-circular :size="75" color="primary" indeterminate></v-progress-circular>
          </v-overlay>
          <v-table density="compact" fixed-header>
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

          <fieldset class="receipt-reader__table-actions" :disabled="addedReceipts.length <= 0">
            <v-btn color="primary" @click="exportTableToExcel"> Export </v-btn>
            <v-btn color="secondary" @click="clearReceiptsTable"> Clear </v-btn>
          </fieldset>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { readXmlDirectory, readXmlFiles } from '../services/FileService';
import useIsLoading from '../components/ReceiptReader/composables/isLoading';
import ReceiptType from '../components/models/ReceiptType';
import { exportReceiptDataToExcel } from '../components/ReceiptReader/Services/ReceiptReaderService';
const { ipcRenderer } = require('electron');

export default defineComponent({
  props: {},
  setup() {
    const selectedFileDirectory = ref('');
    const filesInDirectory = ref<string[]>([]);
    const addedReceipts = ref<ReceiptType[]>([]);
    const receiptsTotalAmount = computed<number>(() => addedReceipts.value.reduce((acc, receipt) => acc + receipt.Total, 0));
    const receiptsSubTotal = computed<number>(() => addedReceipts.value.reduce((acc, receipt) => acc + receipt.SubTotal, 0));
    const receiptsTaxTotal = computed<number>(() => addedReceipts.value.reduce((acc, receipt) => acc + receipt.TaxAmount, 0));

    const isExportingData = ref(false);
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
      receipts.forEach((receipt) => {
        if (isReceiptAdded(receipt.UUID)) return;
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

    function clearReceiptsTable() {
      addedReceipts.value = [];
    }

    function exportTableToExcel() {
      let filePath = null;
      ipcRenderer
        .invoke('showSaveFileDialog', 'Hello from the renderer!')
        .then((result) => {
          if (result.canceled) return;
          filePath = result.filePath;
          isExportingData.value = true;
          exportReceiptDataToExcel(addedReceipts.value, filePath)
            .catch((err) => {
              console.log(err);
            })
            .finally(() => (isExportingData.value = false));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return {
      openDirectoyDialog,
      selectedFileDirectory,
      readFiles,
      filesInDirectory,
      isLoading,
      addedReceipts,
      receiptsTotalAmount,
      receiptsSubTotal,
      receiptsTaxTotal,
      formatToCurrency,
      clearReceiptsTable,
      isExportingData,
      exportTableToExcel,
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
  grid-template-rows: repeat(12, 1fr);
  grid-template-columns: repeat(12, 1fr);
}

.receipt-reader__card {
  width: 100%;
  position: relative;
}

.receipt-reader__load-directory {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 25px;
  flex-basis: 40%;
}

.receipt-reader__directory-data {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  flex-basis: 60%;
}

.receipt-reader__load-directory-content {
  height: 100%;
  padding: 20px;
  display: flex;
  position: relative;
}

.receipt-reader__input-form {
  grid-row: 1 / span 5;
  grid-column: 1 / span 8;
}

.receipt-reader__input-data {
  grid-row: 1 / span 5;
  grid-column: 9 / span 4;
}

.receipt-reader__table {
  grid-row: 6 / span 8;
  grid-column: 1 / span 12;
  height: 100%;
  overflow: hidden;
  display: flex;

  .receipt-reader__table-container {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
  }
  :deep(.receipt-reader__table-container .v-table) {
    width: 100%;
    border: 1px solid;
    border-color: rgba(var(--v-theme-borderColor), var(--v-border-opacity));
    flex-basis: 90%;
    overflow: auto;
  }
  :deep(.receipt-reader__table-container .v-table .v-table__wrapper) {
    width: 100%;
  }

  .receipt-reader__table-actions {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    align-items: center;
    flex-basis: 10%;
    margin: 0 25px;
    border: none;
  }
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
  flex-grow: 1;
  width: 100%;
  border: 1px solid;
  border-color: rgba(var(--v-theme-borderColor), var(--v-border-opacity));
}
</style>
