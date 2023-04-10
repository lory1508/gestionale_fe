<template>
  <div>
    <NDrawer v-model:show="showDrawer" placement="bottom" height="75%" @update-show="isClosing">
      <NDrawerContent :title="isEditing ? 'Modifica autista' : 'Aggiungi autista'">
        <div class="flex flex-row justify-center">
          <NForm
            ref="formNewCustomer"
            :label-width="100"
            :model="newCustomer"
          >
            <NDivider>Anagrafica</NDivider>
            <div class="flex flex-col lg:flex-row gap-8">
              <NFormItem label="Ragione sociale">
                <NInput v-model:value="newCustomer.ragioneSociale" />
              </NFormItem>
              <NFormItem label="P. IVA">
                <NInput v-model:value="newCustomer.pIva" />
              </NFormItem>
              <NFormItem label="Inizio collaborazione">
                <NDatePicker 
                  v-model:value="newCustomer.dataInizioCollaborazione" 
                />
              </NFormItem>
            </div>
            <NDivider>Contatto</NDivider>
            <div class="flex flex-col lg:flex-row gap-8">
              <NFormItem label="Nome contatto">
                <NInput v-model:value="newCustomer.contatto" />
              </NFormItem>
              <NFormItem label="Telefono">
                <NInput v-model:value="newCustomer.numeroTelefono" />
              </NFormItem>
            </div>
          </NForm>
        </div>
        <div class="flex flex-row gap-8 justify-center">
          <NButton
            @click="cancelAddCustomer"
            type="error"
            round
            strong
          >
            Annulla
          </NButton>
          <NButton
            v-if="!isEditing"
            @click="addCustomer"
            type="primary"
            round
            strong
          >
            Aggiungi
          </NButton>
          <NButton
            v-else
            @click="editCustomer"
            type="primary"
            round
            strong
          >
            Modifica
          </NButton>
        </div>
      </NDrawerContent>
    </NDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, computed, onBeforeUpdate } from 'vue';

// api
import { createCustomer, updateCustomer } from '@/api/customers';

// components
import { NButton, NDrawer, NDrawerContent, NForm, NFormItem, NDatePicker, NInput, FormInst, NDivider } from 'naive-ui';

// types
import type { Ref } from 'vue';
import Customer from '@/types/customer';

const props = defineProps({
  openDrawer: { type: Boolean, required: true },
  updateCustomer: { type: Object as () => Customer, required: false },
})
const emit = defineEmits(['closedDrawer', 'createdCustomer'])


watch(() => props.openDrawer, (val) => {
  showDrawer.value = val;
})

const formNewCustomer = ref<FormInst | null>(null)
const showDrawer = ref(false);
const newCustomer: Ref<Customer> = ref({
  _id: null,
  ragioneSociale: '',
  pIva: '',
  contatto: null,
  numeroTelefono: '',
  dataInizioCollaborazione: null,
})

const isEditing = computed(() => {
  return props.updateCustomer?._id ? true : false;
})

const cancelAddCustomer = () => {
  showDrawer.value = false;
  emit('closedDrawer', false);
}

const addCustomer = async () => { 
  try{
    await createCustomer(newCustomer.value);
    emit('createdCustomer', true)
    showDrawer.value = false;
  } catch (err) {
    console.error(err);
    emit('createdCustomer', false)
  }
}

const editCustomer = async () => { 
  try{
    await updateCustomer(newCustomer.value);
    emit('createdCustomer', true)
    showDrawer.value = false;
  } catch (err) {
    console.error(err);
    emit('createdCustomer', false)
  }
}

const isClosing = () => {
  emit('closedDrawer', false);
}

onBeforeUpdate(() => {  
  if(props.updateCustomer?._id) {
    newCustomer.value._id = props.updateCustomer._id;
    newCustomer.value.ragioneSociale = props.updateCustomer.ragioneSociale;
    newCustomer.value.pIva = props.updateCustomer.pIva;
    newCustomer.value.contatto = props.updateCustomer.contatto;   
    newCustomer.value.numeroTelefono = props.updateCustomer.numeroTelefono;
    newCustomer.value.dataInizioCollaborazione = new Date(props.updateCustomer.dataInizioCollaborazione).getTime();
  } else {
    newCustomer.value._id = null;
    newCustomer.value.ragioneSociale = '';
    newCustomer.value.pIva = '';
    newCustomer.value.contatto = null;
    newCustomer.value.numeroTelefono = '';
    newCustomer.value.dataInizioCollaborazione = null;
  } 
})

</script>