<template>
  <div>
    <NH1>
      <NText type="primary">
        Dashboard
      </NText>
    </NH1>
    <NDivider />
    <NDataTable
      :columns="columns"
      :dataSource="getExpenses()"
      :rowKey="rowKey"
      :pagination="pagination"
    />
  </div>
</template>

<script setup lang="ts">
import Expense from '@/types/expense';
import { onMounted } from 'vue';
import api from '@/http-common';

// mocks
import expenses_json from '@/mocks/expenses.json'
import { NDataTable, NDivider, NH1, NText } from 'naive-ui';

// const columns: createColumns({
//   play (row: Song) {
//     message.info(`Play ${row.title}`)
//   }
// }),

const getCustomers = async () => {
  const response = await api.get('/customers');
  return response.data;
};

const getExpenses = (): Expense[] => {
  return expenses_json.data
};

onMounted( async () => {
  const customers = await getCustomers();
  console.log(customers);
});
</script>