<template>
    <div class="flex justify-center items-center h-screen bg-gray-100 pt-32">
      <div class="max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 class="text-2xl font-bold mb-4">{{ pageName }}</h1>
        <p>Email: guillaumelaine2.0@gmailz.com</p>
        <p>Phone: (33) 06-19-40-03-05</p>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const pageName = ref('Contact Us');
  </script>
  