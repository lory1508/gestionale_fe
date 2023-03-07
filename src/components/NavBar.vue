<template>
  <NMenu 
    v-model:value="activeKey"
    mode="horizontal"
    :options="menuOptions"
  />
</template>

<script setup lang="ts">
import { h, ref, computed } from 'vue'
import { NMenu } from 'naive-ui';
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'

// Types
import type { MenuOption } from 'naive-ui'
import type { Ref } from 'vue'

const store = useStore()

const login_url = computed(() => {
  return {
    name: store.getters['user/isLoggedIn'] ? 'login' : 'dashboard',
    // params: {
    //   lang: 'en-US'
    // }
    label: () =>
      h(
        store.commit('user/logout'),
        { default: () => store.getters['user/isLoggedIn'] ? 'logout' : 'login' }
      ),
    key: 'login',
  }
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
  login_url.value,
  // {
  //   key: 'divider-1',
  //   type: 'divider',
  //   props: {
  //     style: {
  //       marginLeft: '32px'
  //     }
  //   }
  // },
  // {
  //   label: 'Pinball 1973',
  //   key: 'pinball-1973',
  //   disabled: true,
  //   children: [
  //     {
  //       label: 'Rat',
  //       key: 'rat'
  //     }
  //   ]
  // },
]



</script>