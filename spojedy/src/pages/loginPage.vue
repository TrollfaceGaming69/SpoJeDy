<script setup>
import { ref } from 'vue';
import primaryButton from '@/component/primaryButton.vue';
import textBox from '@/component/textBox.vue';

const email = ref('');
const password = ref('');

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

const handleSubmit = () => {
  if (validateForm()) {
    console.log('Form is valid', { username: username.value, email: email.value });
  }
};

</script>

<template>
    <div class="bg-black text-white">
        <h1>Login</h1>

        <div v-if="errors.length > 0" class="rounded-2xl border-2 border-red-700 bg-red-200">
            <div v-for="(error, index) in errors" :key="index" class="text-[#ff0000]">
                {{ error }}
            </div>
        </div>

        <div class="register-form">

            <label for="email">Email</label>
            <textBox
                id="email" 
                placeholder="Email"
                v-model="email"
            />

            <label for="pw">Password</label>
            <textBox
                id="pw"
                placeholder="Password"
                v-model="password"
            />

        </div>

        <div class="w-full flex flex-col items-center justify-center mt-5">
            <primaryButton 
                label="Submit"
                @click="handleSubmit"
            />
            <p class="text-center mt-5">Don't have an account? <span class="text-green-600 hover:underline cursor-pointer">Register here</span></p>
        </div>
    </div>
</template>