import { onMounted, onUnmounted } from 'vue'

export const useKeyDown = (handler) => {
  onMounted(() => {
    window.addEventListener('keydown', handler);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handler);
  });
};
