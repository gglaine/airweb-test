<template>
  <div id="app" class="flex flex-col min-h-screen bg-white">
    <NavigationBar class="fixed top-0  w-full" />
    
    <div class="flex-grow pt-4 md:pt-16 pb-16 overflow-auto"> <!-- adjust padding as needed -->
      <router-view v-slot="{ Component }">
        <!-- <transition name="fade" mode="out-in"> -->
          <component :is="Component" />
        <!-- </transition> -->
      </router-view>
    </div>
    
    <FooterBar class="w-full"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from 'vue';
import NavigationBar from './components/shared/NavigationBar.vue'; // Adjust the path to match your file structure
import FooterBar from './components/shared/FooterBar.vue';
import { CartItem } from './components/composables/useCart'; // Adjust the path to match your file structure


export default defineComponent({
  components: {
    NavigationBar,
    FooterBar
  },
  setup() {
    const cart = ref<CartItem[]>([]);
    
    // Provide the cart state for child components to inject
    provide('cart', cart);

    return {
      cart
    };
  },
});
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 330ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
