<template>
  <div class="receipt-reader__table-container">
    <v-overlay persistent :model-value="isExportingData" contained>
      <v-progress-circular :size="75" color="primary" indeterminate></v-progress-circular>
    </v-overlay>
    <v-table v-if="selectedTableView == 'default'" density="compact" fixed-header>
      <thead>
        <tr>
          <th class="text-left">Issuer</th>
          <th class="text-left">Issuer RFC</th>
          <th class="text-left">Receiver</th>
          <th class="text-left">Sub Total</th>
          <th class="text-left">Total</th>
          <th class="text-left">Tax Amount</th>
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
          <th class="text-left">Issuer</th>
          <th class="text-left">Issuer RFC</th>
          <th class="text-left"># of Receipts</th>
          <th class="text-left">Sub Total</th>
          <th class="text-left">Total</th>
          <th class="text-left">Tax Amount</th>
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

<style lang="scss" scoped></style>
