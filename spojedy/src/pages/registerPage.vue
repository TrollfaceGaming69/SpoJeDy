<script setup>
import { ref } from 'vue';
import primaryButton from '@/component/primaryButton.vue';
import textBox from '@/component/textBox.vue';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errors = ref([]);

const validateForm = () => {
  errors.value = [];

  // Validate username
  if (!username.value || typeof username.value !== 'string') {
    errors.value.push('Username must be a valid string');
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value || !emailRegex.test(email.value)) {
    errors.value.push('Email must be valid');
  }

  // Validate password
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!password.value || !passwordRegex.test(password.value)) {
    errors.value.push('Password must have combination of letters and numbers with minimum length of 8 characters');
  }

  // Validate password confirmation
  if (password.value !== confirmPassword.value) {
    errors.value.push('Password confirmation must match password');
  }

  return errors.value.length === 0;
};

const handleSubmit = () => {
  if (validateForm()) {
  }
};

</script>

<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="flex flex-col items-center justify-center p-8 rounded-[20px]">
            <h1 class="text-2xl font-bold mb-2 mt-2">Register</h1>

            <div v-if="errors.length > 0" class="rounded-2xl border-2 border-red-700 bg-red-200">
                <div v-for="(error, index) in errors" :key="index" class="text-[#ff0000] ">
                    {{ error }}
                </div>
            </div>

            <div class="flex flex-col rounded-2xl gap-2 w-full">

                <label for="usn" class="">Username</label>
                <textBox 
                    id="usn"
                    placeholder="Username"
                    v-model="username"
                />

                <label for="email" class="">Email</label>
                <textBox
                    id="email" 
                    placeholder="Email"
                    v-model="email"
                />

                <label for="pw" class="">Password</label>
                <textBox
                    id="pw"
                    placeholder="Password"
                    v-model="password"
                />

                <label for="cfpw" class="">Confirm Password</label>
                <textBox 
                    id="cfpw"
                    placeholder="Password"
                    v-model="confirmPassword"
                />
            </div>

            <div class="w-full flex flex-col items-center justify-center mt-5">
                <primaryButton 
                    label="Submit"
                    @click="handleSubmit"
                />
                <p class="text-center mt-5" onclick="">Already had an account? <span class="text-[#13A4EC] hover:underline cursor-pointer">Login here</span></p>
            </div>
        </div>
    </div>
</template>