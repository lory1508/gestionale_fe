<template>
  <nav 
    class="sticky top-0 flex flex-col justify-between items-center py-4 px-2 z-50"
  >
    <NMenu 
      v-model:value="activeKey"
      mode="vertical"
      :options="menuOptions"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :expand-icon="expandIcon"
    />
    <NButton 
      v-if="loggedIn"
      @click="logout"
      :render-icon="logoutIcon"
      type="info"
    >
      Logout
    </NButton>
  </nav>
</template>

<script setup lang="ts">
import { h, ref, computed, onBeforeMount, Component, defineProps } from 'vue'
import { NButton, NMenu, NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'

// icons
import { 
  LogOutOutline, 
  HomeOutline,
  PersonOutline, 
  StorefrontOutline,
  CashOutline,
  AlbumsOutline,
  SettingsOutline,
  CarSportOutline,
  PricetagsOutline,
  AirplaneOutline,
  CaretDownOutline,
} from '@vicons/ionicons5'

// Types
import type { MenuOption } from 'naive-ui'
import type { Ref } from 'vue'
import router from '@/router';

const store = useStore()
const props = defineProps({
  collapsed: {
    type: Boolean,
    required: true
  }
})
const loggedIn = computed(() => {
  return store.getters['user/isLoggedIn']
})

const logoutIcon = () => h(LogOutOutline)
const menuIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

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
    label: () => h(RouterLink,{
      to: { name: 'dashboard' }
    },
    { 
      default: () => 'Home' 
    }),
    key: 'go-back-home',
    icon: menuIcon(HomeOutline),
  },
  {
    key: 'divider-1',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px'
      }
    }
  },
  {
    label: () => h(RouterLink,{
      to: { name: 'drivers' }
    },
    { 
      default: () => 'Autisti' 
    }),
    key: 'drivers',
    icon: menuIcon(PersonOutline),
  },
  {
    label: () => h(RouterLink,{
      to: { name: 'customers' }
    },
    { 
      default: () => 'Clienti' 
    }),
    key: 'customers',
    icon: menuIcon(StorefrontOutline),
  },
  {
    label: () => h(RouterLink,{
      to: { name: 'invoices' }
    },
    { 
      default: () => 'Fatture' 
    }),
    key: 'invoices',
    icon: menuIcon(CashOutline),
  },
  {
    label: () => h(RouterLink,{
      to: { name: 'suppliers' }
    },
    { 
      default: () => 'Fornitori' 
    }),
    key: 'suppliers',
    icon: menuIcon(AlbumsOutline),
  },
  {
    label: () => h(RouterLink,{
      to: { name: 'maintenance' }
    },
    { 
      default: () => 'Manutenzione' 
    }),
    key: 'maintenance',
    icon: menuIcon(SettingsOutline),
  },
  {
    label: () => h(RouterLink,{
      to: { name: 'vehicles' }
    },
    { 
      default: () => 'Mezzi' 
    }),
    key: 'vehicles',
    icon: menuIcon(CarSportOutline),
  },
  {
    label: () => h(RouterLink,{
      to: { name: 'expenses' }
    },
    { 
      default: () => 'Spese' 
    }),
    key: 'expenses',
    icon: menuIcon(PricetagsOutline),
  },
  {
    label: () => h(RouterLink,{
      to: { name: 'travels' }
    },
    { 
      default: () => 'Viaggi' 
    }),
    key: 'travels',
    icon: menuIcon(AirplaneOutline),
  },
]

const collapsed = ref(false)

const expandIcon = () => {
  return h(NIcon, null, { default: () => h(CaretDownOutline) })
}


</script>