<template>
  <NMenu 
    v-model:value="activeKey"
    mode="horizontal"
    :options="menuOptions"
  />
  <NButton 
    v-if="loggedIn"
    type="primary" 
    @click="logout"
  >
    Logout
  </NButton>
</template>

<script setup lang="ts">
import { h, ref, computed } from 'vue'
import { NButton, NMenu } from 'naive-ui';
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