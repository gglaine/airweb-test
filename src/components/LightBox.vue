<template>
  <div v-if="show" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50">
    <img :src="imgSrc" class="max-w-4/5 max-h-4/5" />
    <button @click="close" class="absolute top-4 right-4 text-white">X</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    show: Boolean,
    imgSrc: String
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
});
</script>
