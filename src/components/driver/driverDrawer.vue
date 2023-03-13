<template>
  <div>
    <NDrawer v-model:show="showDrawer" placement="bottom" height="75%" @update-show="isClosing">
      <NDrawerContent :title="isEditing ? 'Modifica autista' : 'Aggiungi autista'">
        <div class="flex flex-row justify-center">
          <NForm
            ref="formNewDriver"
            :label-width="100"
            :model="newDriver"
          >
            <NDivider>Anagrafica</NDivider>
            <div class="flex flex-col lg:flex-row gap-8">
              <NFormItem label="Nome">
                <NInput v-model:value="newDriver.name" />
              </NFormItem>
              <NFormItem label="Cognome">
                <NInput v-model:value="newDriver.surname" />
              </NFormItem>
              <NFormItem label="Data assunzione">
                <NDatePicker 
                  v-model:value="newDriver.hiringDate" 
                  :is-date-disabled="disableFutureDate"  
                />
              </NFormItem>
            </div>
            <NDivider>Contratto</NDivider>
            <div class="flex flex-col lg:flex-row gap-8">
              <NFormItem label="Contratto">
                <NCheckbox v-model:checked="newDriver.permanentContract">
                  Tempo indeterminato
                </NCheckbox>
              </NFormItem>
              <NFormItem label="Scadenza">
                <NDatePicker 
                  v-model:value="newDriver.contractExpiration"
                  :is-date-disabled="disablePreviousDate"  
                  :disabled="permanent"
                  clearable
                />
              </NFormItem>
            </div>
            <NDivider>Patente</NDivider>
            <div class="flex flex-col lg:flex-row gap-8">
              <NFormItem label="Numero">
                <NInput v-model:value="newDriver.license" />
              </NFormItem>
              <NFormItem label="Scadenza">
                <NDatePicker 
                  v-model:value="newDriver.licenseExpirationDate" 
                  :is-date-disabled="disablePreviousDate"  
                />
              </NFormItem>
            </div>
          </NForm>
        </div>
        <div class="flex flex-row gap-8 justify-center">
          <NButton
            @click="cancelAddDriver"
            type="error"
            round
            strong
          >
            Annulla
          </NButton>
          <NButton
            v-if="!isEditing"
            @click="addDriver"
            type="primary"
            round
            strong
          >
            Aggiungi
          </NButton>
          <NButton
            v-else
            @click="editDriver"
            type="primary"
            round
            strong
          >
            Aggiungi
          </NButton>
        </div>
      </NDrawerContent>
    </NDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, computed, onBeforeUpdate } from 'vue';

// api
import { createDriver } from '@/api/drivers';

// components
import { NButton, NDrawer, NDrawerContent, NForm, NFormItem, NDatePicker, NCheckbox, NInput, FormInst, NDivider } from 'naive-ui';

// types
import type { Ref } from 'vue';
import Driver from '@/types/driver';

const props = defineProps({
  openDrawer: { type: Boolean, required: true },
  updateDriver: { type: Object as () => Driver, required: false },
})
const emit = defineEmits(['closedDrawer', 'createdDriver'])


watch(() => props.openDrawer, (val) => {
  showDrawer.value = val;
})

const formNewDriver = ref<FormInst | null>(null)
const showDrawer = ref(false);
const newDriver: Ref<Driver> = ref({
  _id: null,
  name: '',
  surname: '',
  hiringDate: null,
  license: '',
  licenseExpirationDate: null,
  permanentContract: 0,
  contractExpiration: null,
})

const isEditing = computed(() => {
  return props.updateDriver ? true : false;
})

const permanent = computed(() => {
  return newDriver.value.permanentContract ? true : false;
})

const cancelAddDriver = () => {
  showDrawer.value = false;
  emit('closedDrawer', false);
}

const disableFutureDate = (ts: number) => {
  return ts > Date.now()
}

const disablePreviousDate = (ts: number) => {
  return ts < Date.now()
}

const addDriver = async () => { 
  try{
    await createDriver(newDriver.value);
    emit('createdDriver', true)
    showDrawer.value = false;
  } catch (err) {
    console.error(err);
    emit('createdDriver', false)
  }
}

const editDriver = async () => { 
  try{
    await createDriver(newDriver.value);
    emit('createdDriver', true)
    showDrawer.value = false;
  } catch (err) {
    console.error(err);
    emit('createdDriver', false)
  }
}

const isClosing = () => {
  emit('closedDrawer', false);
}

onBeforeUpdate(() => {  
  if(props.updateDriver?._id) {
    newDriver.value._id = props.updateDriver._id;
    newDriver.value.name = props.updateDriver.name;
    newDriver.value.surname = props.updateDriver.surname;
    newDriver.value.hiringDate = new Date(props.updateDriver.hiringDate).getTime();    
    newDriver.value.license = props.updateDriver.license;
    newDriver.value.licenseExpirationDate = new Date(props.updateDriver.licenseExpirationDate).getTime(); 
    newDriver.value.permanentContract = props.updateDriver.permanentContract;
    newDriver.value.contractExpiration = props.updateDriver.contractExpiration ? props.updateDriver.contractExpiration : null;
  } else {
    newDriver.value._id = null;
    newDriver.value.name = '';
    newDriver.value.surname = '';
    newDriver.value.hiringDate = null;
    newDriver.value.license = '';
    newDriver.value.licenseExpirationDate = null;
    newDriver.value.permanentContract = 0;
    newDriver.value.contractExpiration = null;
  } 
})

</script>