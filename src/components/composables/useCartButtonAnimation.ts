import { ref } from 'vue';

const animatedButtons = ref<Set<string>>(new Set());
const isNotificationVisible = ref(false);

export function useAnimations() {
  const handleButtonAnimation = (productId: string) => {
    animatedButtons.value.add(productId);
    setTimeout(() => {
      animatedButtons.value.delete(productId);
    }, 3000); // Assuming animation duration is 2 seconds
  };

  const flashNotification = () => {
    isNotificationVisible.value = true;
    setTimeout(() => {
      isNotificationVisible.value = false;
    }, 1000); // Hide after 1 second
  };

  return {
    handleButtonAnimation,
    flashNotification,
    animatedButtons,
    isNotificationVisible
  };
}
