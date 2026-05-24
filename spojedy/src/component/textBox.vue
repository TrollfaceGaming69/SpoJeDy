<script setup>
defineProps({
  placeholder: {
    type: String,
    default: 'Enter text...'
  },
  width: {
    type: String,
    default: 'w-86'
  },
  height: {
    type: String,
    default: 'h-12.5'
  },
  placeholderSize: {
    type: String,
    default: 'text-[14px]'
  }
});
</script>

<template>
  <input
    type="text"
    :placeholder="placeholder"
    :class="[
      width,
      height,
      `placeholder:${placeholderSize}`,
      'px-2.5 py-2.5 border border-[#3B4B54] placeholder:font-normal placeholder:text-[#94A3B8]',
      'hover:border-green-600 hover:border-2 transition-all duration-220 outline-none w-full'
    ]"
  />
</template>
