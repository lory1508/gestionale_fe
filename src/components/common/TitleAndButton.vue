<template>
  <div class="flex justify-between mt-4 w-full px-2">
    <div class="flex flex-col">
      <NH1>
        <NText type="primary">{{ title }}</NText>
      </NH1>
      <NText v-if="subtitle">{{ subtitle }}</NText>
    </div>
    <div class="mt-1">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NH1, NText } from 'naive-ui';
import { defineProps } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: false },
})
</script>