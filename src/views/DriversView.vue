<template>
  <div class="flex flex-row justify-between px-2">
    <TitleAndButton title="Autisti">
      <NButton 
        @click="toggleDrawer"
        type="primary"
        size="large"
        round
        strong
      >
        Aggiungi autista
      </NButton>
    </TitleAndButton>
  </div>
  <NDivider />
  <div class="flex flex-wrap">
    <div
      v-for="driver in drivers"
      :key="driver.license"
      class="w-full lg:w-1/3 p-6"
    >
      <DriverCard :driver="driver" @delete="getDriversData" @edit="updateDriver" />
    </div>
  </div>
  <DriverDrawer :openDrawer="showDrawer" :updateDriver="pendingDriver" @closedDrawer="closeDrawer" @createdDriver="driverCreated" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getDrivers } from '@/api/drivers';

// types
import Driver from '@/types/driver';

// components
import { NButton, NDivider, useMessage } from 'naive-ui';
import DriverDrawer from '/src/components/driver/driverDrawer.vue';
import DriverCard from '/src/components/driver/driverCard.vue';
import TitleAndButton from '@/components/common/TitleAndButton.vue';

const drivers = ref([] as Driver[]);
const showDrawer = ref(false);
const pendingDriver = ref({} as Driver);
const message = useMessage();

const toggleDrawer = () => {
  showDrawer.value = !showDrawer.value;
}

const closeDrawer = () => {
  pendingDriver.value = {} as Driver;
  showDrawer.value = false;
}

const createMessage = (text: string, type: string) => {
  if(type === 'success')
    message.success(text,{ duration: 5000 })
  else if(type === 'error') 
    message.error(text,{ duration: 5000 })
  else 
    message.info(text, { duration: 5000 })
}

const driverCreated = async () => {
  try {
    createMessage('Autista aggiunto con successo', 'success');
    await getDriversData();
  } catch (err) {
    createMessage('Errore durante l\'aggiunta dell\'autista', 'error');
    console.error(err);
  }
}

const getDriversData = async () => {
  try{
    drivers.value = await getDrivers();
  } catch (err) {
    console.error(err);
  }
}

const updateDriver = async (driver: Driver) => {
  try{
    pendingDriver.value = driver;
    toggleDrawer();
  } catch (err) {
    console.error(err);
  }
}

onMounted( async () => {
  try{
    await getDriversData();
  } catch (err) {
    console.error(err);
  }
});
</script>