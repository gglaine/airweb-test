<template>
  <div class="w-full pt-10 md:pt-1 pb-1 bg-black text-white text-center font-bold text-sm mt-12 mb-12">
    PAS DE FRAIS DE LIVRAISON SUR LES COMMANDES DE PLUS DE 150 €
  </div>
  <div class="max-w-screen-xl mx-auto relative z-1000 flex md:flex-row">
      <!-- Left Column: Categories -->
      <div class="flex-none md:w-1/4 p-6 hidden">
          <!-- Categories Selection -->
          <div class="flex flex-col mt-2 mb-4 justify-start text-orange font-bold font-Inter">
              <button 
                  @click="selectedCategory = ''" 
                  class="p-1 md:p-2 text-sm text-left md:text-sm hover:bg-slate-200" 
                  :class="{ 'bg-slate-100-500': selectedCategory === '' }"
              >
                  Toutes les catégories
              </button>
              <button 
                  v-for="category in categories" 
                  :key="category.id" 
                  @click="selectedCategory = category.id" 
                  class="md:p-2 text-sm font-light text-left md:text-sm rounded hover:bg-slate-400" 
                  :class="{ 'font-bold': selectedCategory === category.id }"
              >
                  {{ category.label }}
              </button>
          </div>
      </div>
      
      <!-- Right Column: Products -->
      <div class="flex-1 p-4">
          <!-- Search Input -->
          <div class="mb-4">
              <input 
                  v-model="searchTerm" 
                  placeholder="Rechercher des produits" 
                  class="w-full pl-4 py-3 rounded border h-auto mb-4"
              />
          </div>
          
          <!-- Products -->
          <div class="flex flex-wrap gap-4 md:gap-12">
            <div 
                v-for="product in filteredProducts" 
                :key="product.id" 
                class="product-container shadow-md hover:shadow-lg bg-white p-8 text-sm rounded   w-full md:w-1/3"
              >
              <div class="mb-4 flex-shrink-0 relative w-full h-64 rounded overflow-hidden bg-center bg-contain bg-no-repeat "
                  :style="{ backgroundImage: `url(${product.thumbnail_url})` }"
              >
              </div>
              <h2 class="text-md font-bold text-center whitespace-normal mb-1 mt-4 text-black">{{ product.label }}</h2>
              <!-- <p class="text-lg font-bold text-center mb-4 text-gray-800">{{ product.brand }}</p> -->
              <div class="flex flex-col justify-between items-center mt-1 ">
                <h2 class="text-md text-center font-bold text-black mb-4">
                    €{{ product.price / 100 }}
                </h2>
                <button 
                    @click="showLightbox(product)" 
                    :class="{'cart-button': true, 'clicked': animatedButtons.has(product.id)}" 
                    class="quickview-button p-1 rounded text-black text-center font-light text-sm w-full  flex flex-row items-center justify-center transition"
                >
                    <div class="quick opacity-0 text-xs">QUICKVIEW</div>
                </button> 
              </div>
            </div>
          </div>
      </div>
  </div>
  <!-- Lightbox -->

  <div v-if="lightboxProduct" class="fixed top-0 left-0 w-[100vw] p-2 h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="flex bg-white rounded overflow-hidden relative w-full md:max-w-[70vw] p-8">
      <img v-if="lightboxProduct" :src="lightboxProduct.thumbnail_url ? lightboxProduct.thumbnail_url : ''" alt="Selected Product" class="w-1/2">
      <div class="p-8 w-full md:w-1/2 ">
        <h2 class="text-lg font-bold mb-2">{{ lightboxProduct.label }}</h2>
        <p class="mb-2 text-xs">€{{ lightboxProduct.price / 100 }}</p>
            <!-- Color Thumbnails -->
            <p class="mb-2 text-slate-400 text-xs">{{ selectedColor.toUpperCase() }}</p>
            <div class="flex mb-4 space-x-2">
                <button @click="selectedColor = 'white'" :class="{ 'border-black': selectedColor === 'WHITE' }">
                    <div class="w-16 h-16 bg-slate-100"></div>
                </button>
                <button @click="selectedColor = 'black'" :class="{ 'border-black': selectedColor === 'BLACK' }">
                    <div class="w-16 h-16 bg-black"></div>
                </button>
            </div>
        <!-- You can add more product details as required -->
             <!-- Sizes Buttons -->
            <div class="flex mb-4 space-x-2">
              <button 
                v-for="size in possibleSizes"
                :key="size"
                class="bg-slate-100 text-xs hover:bg-slate-500 px-4 py-1 rounded-sm"
                @click="selectedSize = size" 
                :class="{ 
                  'bg-slate-500': selectedSize === size,
                  'opacity-50 cursor-not-allowed': !isSizeAvailable(size)
                }"
                :disabled="!isSizeAvailable(size)"
              >
                {{ size }}
              </button>
            </div>
            <div class="flex mb-4 items-center">
            <!-- <button @click="quantity > 1 ? quantity-- : quantity" class="bg-slate-600 hover:bg-slate-500 px-4 py-1 rounded-sm">-</button> -->
            
            <div class="relative mx-2 flex">
              <!-- Dropdown with quantities -->
              <div class="font-light text-black text-xs mr-2">QTY</div>
              <select v-model="quantity" class="border rounded w-16 text-center appearance-none bg-white cursor-pointer">
                <!-- Assuming a maximum quantity of 10 for demonstration. Adjust as needed -->
                <option v-for="n in 10" :value="n"><span class="font-light text-xs">{{ n }}</span></option>
              </select>
              <!-- Down arrow icon -->
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                ▼
              </div>
            </div>
            <!-- <button @click="quantity++" class="bg-slate-600 rounded hover:bg-slate-500 px-4 py-1">+</button> -->
          </div>
          <div class="flex">
            <button  v-if="canAddToCart" 
            @click="handleAddToCart" 
        class="bg-slate-100 text-xs hover:bg-slate-500 px-4 py-2 rounded-sm mr-2">AJOUTER ></button>
            <button class="bg-slate-100 text-xs hover:bg-slate-500 px-4 py-2 rounded-sm">PAGE PRODUIT ></button>
          </div>
    <div class="border-t border-t-black mt-6 mb-6"></div>
   <div class="text-black text-sm font-light">   
    <div class="mb-2">{{ lightboxProduct.description }}</div>         
    <ul class="list-disc mb-4">
      <li>{{ lightboxProduct.additional_details.shirt_type }}</li>
      <li>{{ lightboxProduct.additional_details.fabric }}</li>
      <li>{{ lightboxProduct.sku }}</li>
    </ul>
    </div>
      </div>
      <button @click="hideLightbox" class="absolute top-2 right-2 p-2 text-black hover:font-bold rounded-full">X</button>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Product, Category } from './types';
import { products as staticProducts, categories as staticCategories } from './data'; 
import {useCart} from './composables/useCart';
import { useAnimations } from './composables/useCartButtonAnimation';

export default defineComponent({
  setup() {
    const router = useRouter();
    const { cart, addToCart, totalItems } = useCart();
    const { animatedButtons, handleButtonAnimation } = useAnimations();
    console.log("Checkout Cart:", cart.value);
    const lightboxProduct = ref<Product | null>(null); 
    // Possible sizes array
const possibleSizes = ref(["S", "M", "L", "XL", "XXL"]);

const isSizeAvailable = (size: string) => {
  if (lightboxProduct.value && lightboxProduct.value.sizes) {
    return lightboxProduct.value.sizes.includes(size);
  }
  return false;
}
    
    const showLightbox = (product: Product) => {
      lightboxProduct.value = product;
    };

    const hideLightbox = () => {
      lightboxProduct.value = null; 
    };

    const canAddToCart = computed(() => {
  return selectedSize.value && selectedColor.value;
});

    const handleAddToCart = () => {
  if (lightboxProduct.value) {
    addToCart(lightboxProduct.value, quantity.value, selectedColor.value, selectedSize.value);
  }
};

    // Assign static data to the reactive references
    const products = ref<Product[]>(staticProducts);
    const categories = ref<Category[]>(staticCategories);
    const searchTerm = ref<string>('');
    const selectedCategory = ref<string>('');
    const selectedSize = ref<string>(''); 
    const selectedColor = ref<string>(''); 
    const quantity = ref<number>(1); 
    
    const filteredProducts = computed(() => {
      return products.value.filter(product => {
        return (!searchTerm.value || product.label.toLowerCase().includes(searchTerm.value.toLowerCase())) &&
               (!selectedCategory.value || product.category_id === selectedCategory.value);
      });
    });

    const proceedToCheckout = () => {
      router.push('/checkout');
    };

    return {
      cart,
      filteredProducts,
      categories,
      totalItems,
      searchTerm,
      selectedCategory,
      addToCart,
      handleAddToCart,
      proceedToCheckout,
      animatedButtons,
      handleButtonAnimation,
      lightboxProduct,
      showLightbox,
      hideLightbox,
      selectedSize,
      quantity,
      selectedColor,
      possibleSizes,
  isSizeAvailable,
  canAddToCart,
    };
  },
});
</script>


<style scoped>
.close-button {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.6); /* semi-transparent black */
  color: black; /* white text */
  border: none;
  border-radius: 50%; /* circular button */
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.3); /* slight shadow for depth */
}
/* Default style for quickview button */
.quickview-button {
    background-color: white;
}

.quick {
    opacity: 0;
    transition: opacity 0.3s ease; /* smooth transition for the text visibility */
}

/* When the product card is hovered, change the button's background and text visibility */
.product-container:hover .quickview-button {
    background-color: lightgrey;
}

.product-container:hover .quick {
    opacity: 1;
    color: black;
}
/* .cart-button {
  position: relative;
  padding: 2em;
  width: 120px;
  height: 40px;
  border: 0;
  outline: none;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  transition: 0.3s ease-in-out;
  overflow: hidden;
} */

.cart-button span {
  position: absolute;
  z-index: 3;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.9em;
  color: #fff;
}

.cart-button span.add-to-cart {
  opacity: 1;
}

.cart-button span.added {
  opacity: 0;
}

.cart-button .cart-icon,
.cart-button .cart-item {
  position: absolute;
  z-index: 2;
  top: 50%;
  transform: translate(-50%, -50%);
}

.cart-button .cart-icon {
  left: -25%;
  font-size: 2em;
}

.cart-button .cart-item {
  left: 52%;
  top: -20%;
  font-size: 1.2em;
}

.cart-button.clicked .cart-icon {
  animation: cart 1.5s ease-in-out forwards;
}

.cart-button.clicked .cart-item {
  animation: box 1.5s ease-in-out forwards;
}

.cart-button.clicked span.add-to-cart {
  animation: add 1.5s ease-in-out forwards;
}

.cart-button.clicked span.added {
  animation: added 1.5s ease-in-out forwards;
}

@keyframes cart {
  0% {
    left: -80%;
  }
  40%, 60% {
    left: 50%;
  }
  100% {
    left: 110%;
  }
}

@keyframes box {
  0%, 40% {
    top: -20%;
  }
  60% {
    top: 40%;
    left: 52%;
  }
  100% {
    top: 40%;
    left: 112%;
  }
}

@keyframes add {
  0% {
    opacity: 1;
  }
  20%, 100% {
    opacity: 0;
  }
}

@keyframes added {
  0%, 80% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>
