<template>
  <NConfigProvider preflight-style-disabled>
  <!-- <NConfigProvider > -->
    <NLoadingBarProvider>
      <NGlobalStyle />
      <NMessageProvider placement="top-right">
        <NDialogProvider>
          <NNotificationProvider>
            <NSpace vertical size="large">
              <div class="flex flex-row">
                <NLayout has-sider>
                  <NLayoutSider
                    bordered
                    collapse-mode="width"
                    :collapsed-width="64"
                    :width="240"
                    :collapsed="collapsed"
                    show-trigger
                    @collapse="collapsed = true"
                    @expand="collapsed = false"
                  >
                    <NavBar :collapsed="collapsed" />
                  </NLayoutSider>
                </NLayout>
                <div class="w-full">
                  <NLayout>
                    <NLayoutContent>
                      <RouterView
                        v-slot="{ Component, route }"
                      >
                        <Component :is="Component" :key="route.path" />
                      </RouterView>
                    </NLayoutContent>
                  </NLayout>
                </div>
              </div>
            </NSpace>
          </NNotificationProvider>
        </NDialogProvider>
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NavBar from "./components/NavBar.vue";
import "./input.css";

import { useStore } from "vuex";
import { computed } from "vue";

// components
import { NLayoutSider, NConfigProvider, NNotificationProvider, NLoadingBarProvider, NLayoutFooter, NLayoutHeader, NGlobalStyle, NMessageProvider, NDialogProvider, NSpace, NLayoutContent } from 'naive-ui'

const store = useStore()
const isLoggedIn = computed(() => {
  return store.getters['user/isLoggedIn']
})

const collapsed = ref(false)

</script>


<style scoped>
.n-layout-header {
  padding: 24px;
}

.n-layout-footer {
  padding: 24px;
}
</style>