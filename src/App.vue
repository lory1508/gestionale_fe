<template>
  <NConfigProvider :theme="darkTheme">
  <!-- <NConfigProvider > -->
    <NLoadingBarProvider>
      <NGlobalStyle />
      <NMessageProvider placement="top">
        <NNotificationProvider>
          <div class="min-h-screen">
            <NavBar v-if="isLoggedIn" class="z-50"/>
            <RouterView
              v-slot="{ Component, route }"
              class="container mx-auto mb-4"
            >
              <Component :is="Component" :key="route.path" />
            </RouterView>
          </div>
        </NNotificationProvider>
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import "./input.css";

import { useStore } from "vuex";
import { computed } from "vue";

// components
import { darkTheme, NConfigProvider, NNotificationProvider, NLoadingBarProvider, NCard, NGlobalStyle, NMessageProvider } from 'naive-ui'

const store = useStore()
const isLoggedIn = computed(() => {
  return store.getters['user/isLoggedIn']
})

</script>
