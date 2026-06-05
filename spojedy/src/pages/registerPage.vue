<script setup>
import { ref } from 'vue';
import primaryButton from '@/component/primaryButton.vue';
import textBox from '@/component/textBox.vue';
import { useRouter } from 'vue-router';
import { authService } from '@/api/authService';
import {assets} from '@/assets/assets';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errors = ref([]);

const navigate = useRouter();

const navigateToLogin = () => {
  navigate.push({ name: "login" });
};

const validateForm = () => {
    errors.value = [];

    if (!username.value || typeof username.value !== 'string') {
        errors.value.push('Username must be a valid string');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value || !emailRegex.test(email.value)) {
        errors.value.push('Email must be valid');
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!password.value || !passwordRegex.test(password.value)) {
        errors.value.push('Password must have combination of letters and numbers with minimum length of 8 characters');
    }

    if (password.value !== confirmPassword.value) {
        errors.value.push('Password confirmation must match password');
    }

    return errors.value.length === 0;
};

const handleSubmit = async () => {
    console.log('Submit button clicked');
    console.log('Form data:', { username: username.value, email: email.value, password: password.value });
    
    if (validateForm()) {
        console.log('Form validation passed');
        const result = await authService.register(username.value, email.value, password.value);
        console.log('API Response:', result);
        
        if (result.ok) {
            navigate.push({ name: "login" });
        } else {
            errors.value = [result.data.message || 'Registration failed'];
        }
    } else {
        console.log('Form validation failed:', errors.value);
    }
};

</script>

<template>
    <div class="bg-black text-white min-h-screen flex items-center justify-center p-6">

        <div class="w-full max-w-100 flex flex-col items-center">

            <h1 class="text-[40px] font-black tracking-tight mb-8 text-center">Register</h1>

            <form @submit.prevent class="w-full flex flex-col gap-4">

                <label for="usn" class="text-sm font-bold tracking-wide">Username</label>
                <textBox id="usn" placeholder="Username" v-model="username" />

                <label for="email" class="text-sm font-bold tracking-wide ">Email</label>
                <textBox id="email" placeholder="Email" v-model="email" />

                <label for="pw" class="text-sm font-bold tracking-wide ">Password</label>
                <textBox id="pw" type="password" placeholder="Password" v-model="password" />

                <label for="cfpw" class="text-sm font-bold tracking-wide">Confirm Password</label>
                <textBox id="cfpw" type="password" placeholder="Password" v-model="confirmPassword" />

            </form>

            <div class="pb-2">
                <p v-if="errors.length > 0" v-for="(error, index) in errors" :key="index"
                    class="text-[#ff0000] text-sm">{{ error }}</p>
            </div>

            <div class="mt-14">
                <primaryButton label="Submit" @click="handleSubmit" />
            </div>

            <div class="text-center mt-8 flex flex-col items-center gap-1">
                <p class="text-zinc-400 text-[15px]">Already have an account?</p>
                <a @click="navigateToLogin" class="text-white font-bold text-[15px] hover:underline tracking-wide hover:text-green-600">
                    Login
                </a>
            </div>
        </div>
    </div>
</template>