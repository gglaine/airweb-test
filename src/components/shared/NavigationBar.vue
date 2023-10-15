<template>
  <nav class="topnav top-0 mb-4 pl-8 pr-8 pt-4 pb-4 bg-white flex justify-between items-center">
    <!-- Logo -->
    <router-link to="/">
      <div class="flex items-center">
        <img src="DZOLE.svg" alt="Logo" class="h-8 w-42 mr-2" />
      </div>
 
    </router-link>
    <!-- Desktop View Links -->
    <div class="hidden md:flex space-x-4 text-left">
      <router-link to="/contact" class="text-slate-950 font-bold hover:font-bold px-2 py-1 rounded">T-SHIRTS</router-link>
      <router-link to="/about" class="text-slate-950 font-bold hover:bg-orange-600 px-2 py-1 rounded">MUGS</router-link>
      <router-link to="/services" class="text-slate-950 font-bold hover:bg-orange-600 px-2 py-1 rounded">NEW</router-link>
    </div>

    <!-- Icons and Dropdown -->
    <div ref="dropdownWrapper" class="flex items-center">
      <!-- <button @click="toggleDropdown" class="bg-gray-200 mr-2 text-black p-2 rounded">
        {{ currentFlag }} ▼
      </button> -->
      <button @click="goToCart" class="bg-white font-bold text-black p-2 rounded">
        BAG ( {{ totalItems }} )
      </button>

    </div>
       <!-- Mobile View with Hamburger Button -->
       <div class="md:hidden">
      <button @click="showMobileMenu = !showMobileMenu">
        <!-- Replace with your hamburger icon or style it with CSS -->
        <div class="font-bold text-white text-4xl">☰</div>
      </button>
      <div v-if="showMobileMenu" class="absolute top-full left-0 w-full bg-orange-400 mt-0 pt-12 pb-8 text-right pr-4 rounded topstack">
        <router-link to="/contact" class="block py-2 px-4 text-white font-bold hover:bg-orange-600">Contact</router-link>
        <router-link to="/about" class="block py-2 px-4 text-white font-bold hover:bg-orange-600">About</router-link>
        <router-link to="/services" class="block py-2 px-4 text-white font-bold hover:bg-orange-600">Services</router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '../composables/useCart';
// Adjust the path accordingly


export default {
  name: 'Navbar',
  setup() {
    const router = useRouter();
    const { totalItems } = useCart();
    const dropdownRef = ref<HTMLElement | null>(null);
    const dropdownWrapper = ref<HTMLElement | null>(null);
    const showDropdown = ref(false);
    const showMobileMenu = ref(false); // added for mobile menu visibility

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const goToCart = () => {
      router.push('/checkout');
    };

  
    const toggleMobileMenu = () => { // added to toggle mobile menu visibility
      showMobileMenu.value = !showMobileMenu.value;
    };

    const handleClickOutside = (event: Event) => {
      if (dropdownWrapper.value && !dropdownWrapper.value.contains(event.target as Node)) {
        showDropdown.value = false;
      }
    };

    watch(showDropdown, (isDropdownShown) => {
      if (isDropdownShown) {
        document.addEventListener('click', handleClickOutside);
      } else {
        document.removeEventListener('click', handleClickOutside);
      }
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      goToCart,
      totalItems,
      showDropdown,
      toggleDropdown,
      dropdownRef,
      dropdownWrapper,
      showMobileMenu,     // expose the mobile menu visibility ref
      toggleMobileMenu    // expose the function to toggle mobile menu visibility
    };
  }
}
</script>

<style>
.topnav {
  z-index: 1000;
}
.topstack {
  z-index: 2000 !important;
}

.text{
  font-family:'Roboto', sans-serif;
  text-align:center;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  color:#ccc;
}

</style>
