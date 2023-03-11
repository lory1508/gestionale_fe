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

// mocks
import expenses_json from '@/mocks/expenses.json'
import { NDataTable, NDivider, NH1, NText } from 'naive-ui';

const getExpenses = (): Expense[] => {
  return expenses_json.data
};
</script>