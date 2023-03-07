<template>
  <!-- <NConfigProvider :theme="darkTheme"> -->
  <NConfigProvider >
    <NNotificationProvider>
      <div class="h-screen w-screen">
        <NavBar />
        <RouterView
          v-slot="{ Component, route }"
          class="container mx-auto p-2 mb-4"
        >
          <Component :is="Component" :key="route.path" />
        </RouterView>
      </div>
    </NNotificationProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import "./input.css";
// TODO: setup tailwind
// components
import { darkTheme, NConfigProvider, NNotificationProvider } from 'naive-ui'

</script>
