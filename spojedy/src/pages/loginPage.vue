<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import primaryButton from '@/component/primaryButton.vue';
import textBox from '@/component/textBox.vue';
import { authService } from '@/api/authService';

const navigate = useRouter();

const email = ref('');
const password = ref('');
const errors = ref([]);

const validateForm = () => {
  errors.value = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value || !emailRegex.test(email.value)) {
    errors.value.push('Email must be valid');
  }

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!password.value || !passwordRegex.test(password.value)) {
    errors.value.push('Password must have combination of letters and numbers with minimum length of 8 characters');
  }

  return errors.value.length === 0;
};

const handleSubmit = async () => {
  if (validateForm()) {
    const result = await authService.login(email.value, password.value);

    if (result.ok) {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("username", result.data.username);
      navigate.push({ name: "home" });
    } else {
      errors.value = [result.data.message || 'Login failed'];
    }
  }
};

const navigateToRegister = () => {
  navigate.push({ name: 'register' });
};

</script>

<template>
  <div class="bg-black text-white min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-100 flex flex-col items-center">

      <h1 class="text-[40px] font-black tracking-tight mb-8 text-center">Login</h1>

      <form action="" class="w-full flex flex-col gap-4 mb-4">
          <label for="email" class="text-sm font-bold tracking-wide ">Email</label>
          <textBox id="email" placeholder="Email" v-model="email" />

          <label for="pw" class="text-sm font-bold tracking-wide ">Password</label>
          <textBox id="pw" placeholder="Password" v-model="password" />
      </form>

      <div class="pb-2">
      <p v-if="errors.length > 0" v-for="(error, index) in errors" :key="index" class="text-[#ff0000] text-sm">{{ error }}</p>
      </div>

      <div class="mt-14">
          <primaryButton label="Submit" @click="handleSubmit" />
      </div>
      
      

      <div class="text-center mt-8 flex flex-col items-center gap-1">
            <p class="text-zinc-400 text-[15px]">Don't have an account?</p>
            <a @click="navigateToRegister" class="text-white font-bold text-[15px] hover:underline tracking-wide hover:text-green-600 cursor-pointer">
                Sign up
            </a>
        </div>
    </div>
  </div>
</template>