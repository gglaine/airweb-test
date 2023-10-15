<template>
  <div class="bg-gray-100 top-24 p-4 flex justify-end flex-col md:flex-row mt-8 max-w-screen-xl mx-auto">
    <div class="p-8 m-4 border rounded shadow-lg bg-white mb-4 md:mb-0">
      <h2 class="text-xl mb-4 font-bold">PANIER</h2> 

      <!-- Updated Cart Display -->
      <div v-for="cartItem in cart" :key="cartItem.product.id" class="mb-2 flex justify-between items-center">
        <div>
          <span>{{ cartItem.product.label }}{{ cartItem.quantity > 1 ? ` (${cartItem.quantity})` : '' }}:</span>
          <span>{{ (cartItem.product.price * cartItem.quantity) / 100 }} €</span>
        </div>
      </div>
      <div v-if="!cart.length">
   <p>Your cart IZZ empty.</p>
</div>
      
      <div class="flex font-bold justify-between text-lg">    
        <div>Total:</div> <div>{{ total }} €</div>
      </div>
      <button class="bg-green-500 text-white p-2 rounded mt-4 mb-4">PAYER</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useCart } from './composables/useCart';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  setup() {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
    const { t } = useI18n();
    console.log("Checkout Page Cart:", cart.value);

    // Updated Total Computation
    const total = computed(() => {
      return cart.value.reduce((sum, cartItem) => sum + (cartItem.product.price * cartItem.quantity) / 100, 0);
    });

    return {
      cart,
      total,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      t
    };
  },
});
</script>
