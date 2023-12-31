<template>
  <div class="receipt-reader__table-container">
    <v-overlay persistent :model-value="isExportingData" contained>
      <v-progress-circular :size="75" color="primary" indeterminate></v-progress-circular>
    </v-overlay>
    <v-table v-if="selectedTableView == 'default'" density="compact" fixed-header>
      <thead>
        <tr>
          <th class="text-left">Emisor</th>
          <th class="text-left">RFC Emisor</th>
          <th class="text-left">Receptor</th>
          <th class="text-left">Subtotal</th>
          <th class="text-left">Total</th>
          <th class="text-left">Impuestos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in addedReceipts" :key="file.UUID">
          <td>{{ file.IssuerName }}</td>
          <td>{{ file.IssuerRfc }}</td>
          <td>{{ file.ReceiverName }}</td>
          <td>{{ formatter.format(file.SubTotal) }}</td>
          <td>{{ formatter.format(file.Total) }}</td>
          <td>{{ formatter.format(file.TaxAmount) }}</td>
        </tr>
      </tbody>
    </v-table>
    <v-table v-if="selectedTableView == 'grouped-by-issuer-RFC'" density="compact" fixed-header>
      <thead>
        <tr>
          <th class="text-left">Emisor</th>
          <th class="text-left">RFC Emisor</th>
          <th class="text-left">Nº de Recibos</th>
          <th class="text-left">Subtotal</th>
          <th class="text-left">Total</th>
          <th class="text-left">Impuestos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in receiptsByIssuerRFC" :key="group.Key">
          <td>{{ group.IssuerName }}</td>
          <td>{{ group.IssuerRfc }}</td>
          <td>{{ group.Receipts.length }}</td>
          <td>{{ formatter.format(group.SubTotal) }}</td>
          <td>{{ formatter.format(group.Total) }}</td>
          <td>{{ formatter.format(group.TaxAmount) }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import ReceiptType from '../Models/ReceiptType';
import { PropType } from 'vue';
import ReceiptsGrouped from '../Models/ReceiptsGrouped';

export default {
  components: {},
  props: {
    addedReceipts: {
      type: Array as PropType<ReceiptType[]>,
      default: [],
    },
    isExportingData: {
      type: Boolean,
      default: false,
    },
    selectedTableView: {
      type: String,
      default: 'default',
    },
  },
  setup(props) {
    const receiptsByIssuerRFC = computed<ReceiptsGrouped[]>(() => groupBy(Array.from(props.addedReceipts), 'IssuerRfc'));

    function groupBy(array, key) {
      return array.reduce((result, obj: ReceiptType) => {
        if (!result[obj[key]]) {
          result[obj[key]] = new ReceiptsGrouped(obj);
        }
        const group = result[obj[key]];
        group.Key = key;
        group.SubTotal += obj.SubTotal;
        group.Total += obj.Total;
        group.TaxAmount += obj.TaxAmount;
        group.Receipts.push(obj);
        return result;
      }, {});
    }

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return {
      receiptsByIssuerRFC,
      formatter,
    };
  },
};
</script>

<style lang="scss" scoped>
:deep(.v-theme--dark tbody tr:nth-of-type(odd)) {
  background-color: rgba(255, 255, 255, 0.05);
}

:deep(.v-theme--light tbody tr:nth-of-type(odd)) {
  background-color: rgba(0, 0, 0, 0.05);
}

:deep(.v-table tbody tr:hover) {
  background-color: rgba(var(--v-theme-primary), 0.2);
}
</style>
