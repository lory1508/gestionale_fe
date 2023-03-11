<template>
  <nav 
    class="sticky top-0 transition duration-300 bg-opacity-30 filter backdrop-blur flex flex-row justify-between items-center pt-2 px-2"
  >
    <NMenu 
      v-model:value="activeKey"
      mode="horizontal"
      :options="menuOptions"
    />
    <NButton 
      v-if="loggedIn"
      @click="logout"
    >
      Logout
    </NButton>
  </nav>
  <NDivider />
</template>

<script setup lang="ts">
import { h, ref, computed, onBeforeMount } from 'vue'
import { NButton, NDivider, NMenu } from 'naive-ui';
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'

// Types
import type { MenuOption } from 'naive-ui'
import type { Ref } from 'vue'
import router from '@/router';

const store = useStore()

const loggedIn = computed(() => {
  return store.getters['user/isLoggedIn']
})

const logout = () => {
  store.dispatch('user/logout')
  router.push({ name: 'login' })
}

const scrolled = ref(false)
onBeforeMount(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 0
  })
})

const activeKey: Ref<string | null> = ref(null)
const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'dashboard',
            // params: {
            //   lang: 'en-US'
            // }
          }
        },
        { default: () => 'Home' }
      ),
    key: 'go-back-home',
  },
]



</script>