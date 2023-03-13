<template>
  <div>
    <NH1>
      <NText type="primary">
        Dashboard
      </NText>
    </NH1>
    <NDivider />
    <!-- <NDataTable
      :columns="columns"
      :dataSource="getExpenses()"
      :rowKey="rowKey"
      :pagination="pagination"
    /> -->
  </div>
</template>

<script setup lang="ts">
// import Expense from '@/types/expense';
import { onMounted } from 'vue';
import api from '@/http-common';

import { getCustomers } from '@/api/customers';

// mocks
// import expenses_json from '@/mocks/expenses.json'
import { NDivider, NH1, NText } from 'naive-ui';

// const columns: createColumns({
//   play (row: Song) {
//     message.info(`Play ${row.title}`)
//   }
// }),

// const getExpenses = (): Expense[] => {
//   return expenses_json.data
// };

onMounted( async () => {
  const customers = await getCustomers();
  console.log(customers);
});
</script>