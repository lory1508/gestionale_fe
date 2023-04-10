<template>
  <div class="shadow-lg duration-200 
              hover:scale-110 hover:shadow-emerald-100">
    <NCard>
      <div>
        <NH2>{{ customer.ragioneSociale }}</NH2>
      </div>
      <NDivider />
      <div class="flex flex-col gap-4">
        <NText>
          P. IVA: <NTag type="info">{{ customer.pIva }}</NTag>
        </NText>
        <NText>
          Data inizio collaborazione: <NTag> {{ formattedDate(customer.dataInizioCollaborazione) }}</NTag>
        </NText>
        <NCard>
          <div class="flex flex-col">
            <NH3>Contatto</NH3>
            <NText><strong>Nome:</strong> {{ customer.contatto }}</NText>
            <NText><strong>Telefono:</strong> <a :href="`tel:${customer.numeroTelefono}`">{{ customer.numeroTelefono }}</a></NText>
          </div>
        </NCard>
        <div class="grid grid-cols-2 gap-4">
          <NButton 
            type="primary"
            round
            strong
            @click="handleEdit"
          >
            Modifica
          </NButton>
          <NButton 
            type="error"
            round
            strong
            @click="handleDelete"
          >
            Elimina
          </NButton>
        </div>
      </div>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { formattedDate } from '@/utils/utils';

// types
import Customer from '@/types/customer';

// api
import { deleteCustomer } from '@/api/customers';

// components
import { NButton, NCard, NDivider, NH2, NH3, NTag, NText, useMessage, useDialog } from 'naive-ui';

const props = defineProps({
  customer: {
    type: Object as () => Customer,
    required: true
  }
})

const emit = defineEmits(['delete', 'edit']);

const message = useMessage();
const dialog = useDialog();

const deleteCustomerMethod = async () => {
  const status = await deleteCustomer(props.customer._id);
  if(status === 200) {
    message.success('Autista cancellato',{ duration: 5000 })
  } else {
    message.error('Si è verificato un errore durante la cancellazione dell\'autista',{ duration: 5000 })
  }
  emit('delete');
}

const handleDelete = () => {
  dialog.error({
    title: 'Conferma cancellazione',
    content: `Sei sicuro di voler cancellare il cliente ${props.customer.ragioneSociale}? Questa azione è irreversibile.`,
    positiveText: 'Conferma',
    negativeText: 'Annulla',
    onPositiveClick: () => {
      deleteCustomerMethod();
    }
  })
}

const handleEdit = () => {
  emit('edit', props.customer);
}
</script>