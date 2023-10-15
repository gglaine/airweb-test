import { ref, computed } from 'vue';
import { Product } from '../types';

export interface CartItem {
  product: Product;
  quantity: number;
  color: string;
  size: string;
}


const cartItems = ref<CartItem[]>([]);

export function useCart() {

  const findCartItem = (product: Product) => {
    return cartItems.value.find(item => item.product.id === product.id);
  };

  const addToCart = (product: Product, quantity: number, color: string, size: string) => {
    console.log("addToCart method called with:", product, quantity, color, size);
    const existingCartItem = findCartItem(product);

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      cartItems.value.push({ product, quantity, color, size });

    }
    console.log("Current Cart:", cartItems.value);
  };

  const increaseQuantity = (product: Product) => {
    const existingCartItem = findCartItem(product);
    if (existingCartItem) {
      existingCartItem.quantity++;
    }
  };

  const decreaseQuantity = (product: Product) => {
    const existingCartItem = findCartItem(product);
    if (existingCartItem && existingCartItem.quantity > 1) {
      existingCartItem.quantity--;
    }
  };

  const removeFromCart = (product: Product) => {
    const index = cartItems.value.findIndex(item => item.product.id === product.id);
    if (index > -1) {
      cartItems.value.splice(index, 1);
    }
  };

  const totalItemsInCart = computed(() => {
    return cartItems.value.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
  });

  return {
    cart: cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalItems: totalItemsInCart
  };
}
