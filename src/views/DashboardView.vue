<template>
  <div>
    Dashborad
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { onMounted } from "vue";

const store = useStore();

onMounted(() => {
  console.log("mounted");
  console.log(store);
  
});
</script>