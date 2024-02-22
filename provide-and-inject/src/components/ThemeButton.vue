<script>
import { computed, inject } from 'vue';

export default {
  setup() {
    const settings = inject('settings');
    const oppsiteTheme = computed(() => {
      return settings.theme === 'dark' ? 'light' : 'dark';
    });

    const toggleMode = () => {
      settings.theme = oppsiteTheme.value;
    };

    return { settings, oppsiteTheme, toggleMode };
  }
}
</script>

<template>
  <button
    :class="{ 'dark-mode': settings.theme === 'dark' }"
    @click="toggleMode"
  >
    Switch to {{ oppsiteTheme }} mode
  </button>
</template>

<style scoped>
.dark-mode {
  color: white;
  background-color: black;
}
</style>
