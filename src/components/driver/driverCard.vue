<template>
  <NCard
    bordered
    shadow="lg"
  >
    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-4 mb-0">
        <div class="mt-5">
          <NIconWrapper :size="50" :border-radius="100">
            <NIcon :size="36" color="white">
              <Person />
            </NIcon>
          </NIconWrapper>
        </div>
        <div class="flex flex-col gap-0">
          <NH2>{{ driver.name }} {{ driver.surname }}</NH2>
          <NTag :type=" driver.permanentContract ? 'success' : 'warning'"> {{ contract(driver) }} </NTag>
        </div>
      </div>
      <NDivider />
      <NText>
        <strong>Data assunzione:</strong> {{ formattedDate(driver.hiringDate) }}
      </NText>
      <NCard title="Patente" size="small">
        <div class="flex flex-col">
          <NText>
            Numero: <NTag type="info" :bordered="false"> {{ driver.license }} </NTag>
          </NText>
          <NText>
            Scadenza: {{ formattedDate(driver.licenseExpirationDate) }}
          </NText>
        </div>
      </NCard>
      <div class="flex flex-col gap-4">
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
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { Person } from '@vicons/ionicons5';

// types
import Driver from '@/types/driver';

// api
import { deleteDriver } from '@/api/drivers';

// components
import { NButton, NCard, NDivider, NH2, NTag, NText, NIcon, NIconWrapper, NDialog, useMessage, useDialog } from 'naive-ui';
import { Value } from 'naive-ui/es/date-picker/src/interface';

const props = defineProps({
  driver: {
    type: Object as () => Driver,
    required: true
  }
})

const emit = defineEmits(['delete', 'edit']);

const message = useMessage();
const dialog = useDialog();

const contract = (driver: Driver) => {
  return driver.permanentContract ? 'Tempo Indeterminato' : 'Tempo Determinato';
}

const formattedDate = (date: Value | null | undefined) => {
  if (!date) return '';
  const dateObj = new Date(date.toString());
  return dateObj.toLocaleDateString();
}

const deleteDriverMethod = async () => {
  const res = await deleteDriver(props.driver._id);
  if(res.status === 200) {
    message.success('Autista cancellato',{ duration: 5000 })
  } else {
    message.error('Si è verificato un errore durante la cancellazione dell\'autista',{ duration: 5000 })
  }
  emit('delete');
}

const handleDelete = () => {
  dialog.error({
    title: 'Conferma cancellazione',
    content: `Sei sicuro di voler cancellare l'autista ${props.driver.name} ${props.driver.surname}? Questa azione è irreversibile.`,
    positiveText: 'Conferma',
    negativeText: 'Annulla',
    onPositiveClick: () => {
      deleteDriverMethod();
    }
  })
}

const handleEdit = () => {
  emit('edit', props.driver);
}
</script>