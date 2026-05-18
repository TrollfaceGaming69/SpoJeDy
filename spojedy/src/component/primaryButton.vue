<script setup>
defineProps({
  label: {
    type: String,
    default: 'Click Me'
  },
  width: {
    type: String,
    default: 'w-30' 
  },
  height: {
    type: String,
    default: 'h-11'
  },
  textSize: {
    type: String,
    default: 'text-base'
  }
});
</script>

<template>
    <button 
    :class="[
      width, 
      height, 
      textSize,
      'bg-green-600 font-semibold rounded-full text-black transition-all duration-220',
      'hover:bg-transparent hover:border-[2.8px] hover:border-green-600 hover:text-green-600'
    ]"
  >
    {{ label }}
  </button>
</template>