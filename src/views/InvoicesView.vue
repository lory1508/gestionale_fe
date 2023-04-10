<template>
  <div>
    <TitleAndButton title="Fatture">
        <!-- @click="toggleDrawer" -->
      <NButton 
        type="primary"
        size="large"
        round
        strong
      >
        Aggiungi fattura
      </NButton>
    </TitleAndButton>
  </div>
  <NDivider />
  <div class="flex flex-col gap-4">
    <FiltersComp />
    <NDataTable
      :columns="columns"
      :data="data"
      striped
    />
  </div>
</template>

<script setup lang="ts">
// vue
import { onMounted, ref, h } from 'vue';

// types
import Invoice from '@/types/invoice';

// components
import TitleAndButton from '@/components/common/TitleAndButton.vue';
import { NButton, NCollapse, NCollapseItem, NDataTable,  NDivider, NTag } from 'naive-ui';

// api
import { getInvoices } from '@/api/invoices';
import { getCustomer } from '@/api/customers';
import FiltersComp from '@/components/invoice/FiltersComp.vue';

// data
const data = ref([]);
const invoices = ref([] as Invoice[]);
const columns = [
  {
    title: 'Numero',
    key: 'invoiceNumber',
  },
  {
    title: 'Importo',
    key: 'amount',
  },
  {
    title: 'Data',
    key: 'date',
  },
  {
    title: 'Cliente',
    key: 'customer',
  },
  {
    title: 'Pagata',
    key: 'paid',
      render (row) {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: row.paid ? 'success' : 'error',
              bordered: false
            },
            {
              default: () => row.paid ? 'Pagata' : 'Non pagata'
            }
          )
      }
  },
  {
    title: '',
    key: 'actions',
    render (row) {
      return h(
        NButton,
        {
          strong: true,
          type: 'info',
          size: 'small',
          onClick: () => editInvoice(row)
        },
        { default: () => 'Modifica' }
      )
    }
  },
  {
    title: '',
    key: 'actions',
    render (row) {
      return h(
        NButton,
        {
          strong: true,
          type: 'error',
          size: 'small',
          onClick: () => deleteInvoice(row)
        },
        { default: () => 'Cancella' }
      )
    }
  }
]

// methods
const setTableData = async () => {
  invoices.value = await getInvoices();
  
  invoices.value.forEach(async invoice => {
    
    const tmp_invoice = {
      invoiceId: invoice._id,
      invoiceNumber: invoice.invoiceNumber,
      amount: invoice.amount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }),
      date: new Date(invoice.date).toLocaleDateString('it-IT'),
      customer: invoice.customer.ragioneSociale,
      paid: invoice.paid
    };
    data.value.push(tmp_invoice);
  });
}

const editInvoice = (invoice: Invoice) => {
  console.log(invoice);
}

const deleteInvoice = (invoice: Invoice) => {
  console.log(invoice);
}

onMounted( async () => {
  await setTableData();
});
</script>