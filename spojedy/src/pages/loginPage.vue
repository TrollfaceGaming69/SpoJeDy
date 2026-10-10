<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import primaryButton from '@/component/primaryButton.vue';
import textBox from '@/component/textBox.vue';
import { authService } from '@/api/authService';

const navigate = useRouter();

const isLogin = ref(true);

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errors = ref([]);

const toggleAuthMode = ()=>{
  isLogin.value = !isLogin.value;
  errors.value = [];
  password.value = '';
  confirmPassword.value = '';
};

const validateForm = ()=>{
  errors.value = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value || !emailRegex.test(email.value)) {
    errors.value.push('Email must be valid');
  }

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!password.value || !passwordRegex.test(password.value)) {
    errors.value.push('Password must have combination of letters and numbers with minimum length of 8 characters');
  }

  if (!isLogin.value) {
    if (!username.value || typeof username.value !== 'string') {
      errors.value.push('Username must be a valid string');
    }

    if (password.value !== confirmPassword.value) {
      errors.value.push('Password confirmation must match password');
    }
  }

  return errors.value.length === 0;
};

const handleSubmit = async () => {
  if(!validateForm()) return;

  if (isLogin.value) {
    const result = await authService.login(email.value, password.value);
    if (result.ok) {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("username", result.data.username);
      navigate.push({ name: "home" });
    } else {
      errors.value = [result.data?.message || 'Login failed'];
    }
  } else {
    const result = await authService.register(username.value, email.value, password.value);
    if (result.ok) {
      isLogin.value = true;
      errors.value = [];
      password.value = '';
      confirmPassword.value = '';
    } else {
      errors.value = [result.data?.message || 'Registration failed'];
    }
  }
}
</script>

<template>
<div class="bg-black text-white min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-100 flex flex-col items-center">

      <h1 class="text-[40px] font-black tracking-tight mb-8 text-center">
        {{ isLogin ? 'Login' : 'Register' }}
      </h1>

      <form @submit.prevent="handleSubmit" class="w-full flex flex-col gap-4">
        <template v-if="!isLogin">
          <label for="usn" class="text-sm font-bold tracking-wide">Username</label>
          <textBox id="usn" placeholder="Username" v-model="username" />
        </template>

        <label for="email" class="text-sm font-bold tracking-wide">Email</label>
        <textBox id="email" placeholder="Email" v-model="email" />

        <label for="pw" class="text-sm font-bold tracking-wide">Password</label>
        <textBox id="pw" type="password" placeholder="Password" v-model="password" />

        <template v-if="!isLogin">
          <label for="cfpw" class="text-sm font-bold tracking-wide">Confirm Password</label>
          <textBox id="cfpw" type="password" placeholder="Password" v-model="confirmPassword" />
        </template>
      </form>

      <div class="pb-2 mt-4">
        <p v-for="(error, index) in errors" :key="index" class="text-[#ff0000] text-sm">
          {{ error }}
        </p>
      </div>

      <div class="mt-8">
        <primaryButton label="Submit" @click="handleSubmit" />
      </div>

      <div class="text-center mt-8 flex flex-col items-center gap-1">
        <p class="text-zinc-400 text-[15px]">
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
        </p>
        <button 
          type="button"
          @click="toggleAuthMode" 
          class="text-white font-bold text-[15px] hover:underline tracking-wide hover:text-green-600 cursor-pointer bg-transparent border-none p-0"
        >
          {{ isLogin ? 'Sign up' : 'Login' }}
        </button>
      </div>

    </div>
  </div>
</template>