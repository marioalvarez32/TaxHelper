<template>
  <div class="receipt-reader__container">
    <div class="receipt-reader__content">
      <v-card elevation="5" rounded="lg" class="receipt-reader__card receipt-reader__input-form">
        <div class="receipt-reader__load-directory-content">
          <div class="receipt-reader__load-directory">
            <v-overlay persistent :model-value="isLoading" contained>
              <v-progress-circular :size="75" color="primary" indeterminate></v-progress-circular>
            </v-overlay>
            <h3>Cargar archivos XML</h3>
            <v-btn color="primary" @click="openDirectoyDialog" class="text-capitalize"> Seleccionar carpeta </v-btn>
            <h4>Carpeta seleccionada:</h4>
            {{ selectedFileDirectory }}
          </div>
          <div class="receipt-reader__directory-data">
            <div class="receipt-reader__files-table">
              <FileNameTable :file-names="filesInDirectory" />
            </div>
            <v-btn :disabled="filesInDirectory.length <= 0 || isExportingData" color="primary" @click="readFiles"> Cargar recibos </v-btn>
          </div>
        </div>
      </v-card>
      <v-card elevation="5" rounded="lg" class="receipt-reader__card receipt-reader__input-data">
        <div class="receipt-reader__data-container">
          <h3>
            Subtotal <span>{{ formatToCurrency(receiptsSubTotal) }}</span>
          </h3>
          <h3>
            Total de impuestos <span>{{ formatToCurrency(receiptsTaxTotal) }}</span>
          </h3>
          <h3>
            Total <span>{{ formatToCurrency(receiptsTotalAmount) }}</span>
          </h3>
          <h3>
            Recibos leídos: <span>{{ addedReceipts.length }}</span>
          </h3>
        </div>
      </v-card>
      <div class="table-header">
        <div class="table-header__left">
          <v-select v-model="selectedTableView" :items="tableViews" single-line item-title="label" item-value="view" label="Select" prepend-inner-icon="mdi-format-list-bulleted" density="compact" variant="solo" hide-details></v-select>
        </div>

        <v-dialog width="500" max-height="500">
          <template v-slot:activator="{ props }">
            <div v-if="ommittedFiles.length > 0" class="table-header__ommitted-files-container" v-bind="props">
              <div>{{ ommittedFiles.length }}Recibos omitidos</div>
              <v-icon icon="mdi-help-circle-outline" color="blue"></v-icon>
            </div>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Archivos Omitidos">
              <div class="ommitted-files_table">
                <FileNameTable :file-names="ommittedFiles" />
              </div>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="Cerrar" variant="tonal" @click="isActive.value = false"></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>

        <div class="table-header__right">
          <fieldset class="receipt-reader__table-actions">
            <v-btn :disabled="addedReceipts.length <= 0 || selectedTableView != 'default'" class="table__button" color="blue-grey" size="small" prepend-icon="mdi-export" @click="exportTableToExcel">Exportar</v-btn>
          </fieldset>
        </div>
      </div>
      <v-card elevation="5" class="table-container">
        <div rounded="lg" class="receipt-reader__card receipt-reader__table">
          <ReceiptsTable :added-receipts="addedReceipts" :isExportingData="isExportingData" :selected-table-view="selectedTableView" />
        </div>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { readXmlDirectory, readXmlFiles } from './Services/FileService';
import useIsLoading from './Composables/IsLoading';
import ReceiptType from '@/Client/ReceiptReader/Models/ReceiptType';
import { exportReceiptDataToExcel } from './Services/ReceiptReaderService';
const { ipcRenderer } = require('electron');
import ReceiptsTable from './Components/ReceiptsTable.vue';
import FileNameTable from './Components/FileNameTable.vue';

export default defineComponent({
  props: {},
  components: {
    ReceiptsTable,
    FileNameTable,
  },
  setup() {
    const selectedFileDirectory = ref('');
    const filesInDirectory = ref<string[]>([]);
    const addedReceipts = ref<ReceiptType[]>([]);
    const receiptsTotalAmount = computed<number>(() => addedReceipts.value.reduce((acc, receipt) => acc + receipt.Total, 0));
    const receiptsSubTotal = computed<number>(() => addedReceipts.value.reduce((acc, receipt) => acc + receipt.SubTotal, 0));
    const receiptsTaxTotal = computed<number>(() => addedReceipts.value.reduce((acc, receipt) => acc + receipt.TaxAmount, 0));
    const ommittedFiles = ref<string[]>([]);

    const tableViews = [
      { view: 'default', label: 'Vista de recibos' },
      { view: 'grouped-by-issuer-RFC', label: 'Agrupados por RFC del emisor' },
    ];
    const selectedTableView = ref('default');
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
        .then((result) => {
          addReceipts(result.ReceiptsRead);
          ommittedFiles.value = result.FilesOmmited;
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
      ommittedFiles.value = [];
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
      tableViews,
      selectedTableView,
      ommittedFiles,
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

.table-header {
  grid-row: 6 / span 1;
  grid-column: 1 / span 12;
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.table-container {
  grid-row: 7 / span 8;
  grid-column: 1 / span 12;
  height: 100%;
  overflow: hidden;

  .table-header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .table__button {
      font-size: 10px;
    }
  }
  .receipt-reader__table {
    height: 100%;
  }
  .receipt-reader__table-container {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    height: 100%;
  }
  :deep(.receipt-reader__table-container .v-table) {
    height: 100%;
    width: 100%;
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
  border-color: rgba(var(--v-theme-on-background), var(--v-border-opacity));
}

.ommitted-files_table {
  padding: 10px;
  border: 1px solid;
  border-color: rgba(var(--v-theme-on-background), var(--v-border-opacity));
  overflow-y: auto;
}

.table-header__ommitted-files-container {
  justify-content: center;
  display: flex;
  gap: 2px;
  cursor: pointer;
}
</style>
