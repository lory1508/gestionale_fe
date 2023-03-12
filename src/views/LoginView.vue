<template>
  <div class="justify-center flex flex-row pt-20">
    <NCard class="flex flex-row justify-center items-center w-1/2" >
      <div class="p-4">
        <NGradientText type="success">Login</NGradientText>
        <p class="text-gray-500">Please login to continue</p>
      </div>
      <div class="p-4 flex flex-col gap-2">
        <NInput 
          placeholder="Email" 
          name="email"
          v-model:value="email"
          @keyup.enter="login"
          round 
        />
        <NInput 
          placeholder="Password" 
          type="password" 
          show-password-on="click" 
          name="password"
          v-model:value="password"
          @keyup.enter="login"
          round 
        />
      </div>
      <div class="p-4">
        <NButton @click="login" round>Login</NButton>
      </div>
      <NAlert 
        v-if="failedLogin"
        title="Login failed" 
        type="error"
        bordered
      >
        User not found or password incorrect
      </NAlert>
    </NCard>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import {Md5} from 'ts-md5';
import { useRouter } from 'vue-router'
import api from '@/http-common'

// components
import { NButton, NCard, NGradientText, NInput, NAlert } from 'naive-ui'

// types
import User from '@/types/user'

const router = useRouter()
const store = useStore()

const logged = ref(false) as { value: boolean }
const failedLogin = ref(false) as { value: boolean }
const email = ref('');
const password = ref('');

const login = async (): Promise<void> => {
  failedLogin.value = false;
  const password_md5 = Md5.hashStr(password.value)
  const response = await api.post('/users/login', {
    email: email.value,
    password_md5: password_md5
  });
  if (response.data.success) {
    logged.value = true;
    const user = response.data.user as User
    store.commit('user/login', user)
    router.push({ path: '/dashboard' })
  } else {
    failedLogin.value = true;
    logged.value = false;
  }
};

// const login = (): void => {
//   failedLogin.value = false
//   const user = getUserByEmail(email.value)
//   if (user) {
//     const password_md5 = Md5.hashStr(password.value)
//     logged.value = user.password_md5 === password_md5
//     if(logged.value) {
//       logged.value = true
//       user.logged = true
//       store.commit('user/login', user)
//       router.push({ name: 'dashboard' })
//     } else {
//       failedLogin.value = true
//       logged.value = false
//     }
//   }
// };

</script>

<style scoped>
.n-gradient-text {
  font-size: 36px;
}
</style>