<template>
  <v-table density="compact" fixed-header>
    <thead>
      <tr>
        <th class="text-left">Nombre del archivo</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="file in fileNames" :key="file">
        <td>{{ file }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  fileNames: {
    type: Array as PropType<string[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
