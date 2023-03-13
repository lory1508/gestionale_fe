<template>
  <div class="flex flex-row justify-between px-2">
    <TitleAndButton title="Clienti">
      <NButton 
        @click="toggleDrawer"
        type="primary"
        size="large"
        round
        strong
      >
        Aggiungi cliente
      </NButton>
    </TitleAndButton>
  </div>
  <NDivider />
  <div class="flex flex-wrap">
    <div
      v-for="customer in customers"
      :key="customer.license"
      class="w-full lg:w-1/3 p-4"
    >
      <CustomerCard :customer="customer" @delete="getCustomerData" @edit="updateCustomer" />
    </div>
  </div>
  <CustomerDrawer :openDrawer="showDrawer" :updateCustomer="pendingCustomer" @closedDrawer="closeDrawer" @createdCustomer="customerCreated" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// components
import { NButton, NDivider, useMessage } from 'naive-ui';
import TitleAndButton from '@/components/common/TitleAndButton.vue';
import customerCard from '@/components/customer/customerCard.vue';
import customerDrawer from '@/components/customer/customerDrawer.vue';

// types
import Customer from '@/types/customer';

// api
import { getCustomers } from '@/api/customers';

const customers = ref([] as Customer[]);
const showDrawer = ref(false);
const message = useMessage();
const pendingCustomer = ref({} as Customer);

const toggleDrawer = () => {
  showDrawer.value = !showDrawer.value;
}

const closeDrawer = () => {
  pendingCustomer.value = {} as Customer;
  showDrawer.value = false;
}

const customerCreated = async () => {
  try {
    createMessage('Cliente aggiunto con successo', 'success');
    await getCustomerData();
  } catch (err) {
    createMessage('Errore durante l\'aggiunta del cliente', 'error');
  }
}

const updateCustomer = (customer: Customer) => {
  pendingCustomer.value = customer;
  showDrawer.value = true;
}

const getCustomerData = async () => {
  try {
    customers.value = await getCustomers();
  } catch (err) {
    createMessage('Errore durante il recupero dei dati', 'error');
  }
}

const createMessage = (text: string, type: 'success' | 'error') => {
  message({
    type,
    content: text,
    duration: 3000,
    showIcon: true,
    theme: 'light'
  });
}

onMounted(async () => {
  await getCustomerData();
});


</script>