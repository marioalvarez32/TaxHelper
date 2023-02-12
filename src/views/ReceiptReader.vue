<template>
  <div class="receipt-reader__container">
    <div class="receipt-reader__content">
      <v-card elevation="5" color="grey-darken-4" title="Load directory"
        class="receipt-reader__card receipt-reader__input-form">
        <v-file-input label="File input"></v-file-input>
      </v-card>
      <v-card elevation="5" color="grey-darken-4" class="receipt-reader__card receipt-reader__input-data">
        <input type="file" id="dirs" />
      </v-card>
      <v-card elevation="5" color="grey-darken-4" class="receipt-reader__card receipt-reader__table">
        <v-btn variant="outlined" @click="openDirectoyDialog">
          Button
        </v-btn>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref } from 'vue'
const { ipcRenderer } = require('electron')

export default defineComponent({
  props: {
  },
  setup() {
    const selectedFileDirectory = ref(null);

    function openDirectoyDialog() {
      ipcRenderer.invoke('showSelectDirectoryDialog', 'Hello from the renderer!')
        .then((result) => {
          if (result.canceled) return
          selectedFileDirectory.value = result.filePaths[0];
          scanDirectory();
        })
        .catch(err => {
          console.log(err);
        })
    }

    function scanDirectory() {
      console.log('SCANNING');
    }

    return {
      openDirectoyDialog
    }
  }
})
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
}
</style>
