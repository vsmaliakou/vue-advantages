<script>
import { provide, reactive, watch } from 'vue';

export default {
  setup() {
    const settings = reactive({
      theme: 'light',
    });

    provide('settings', settings);

    watch(settings, (settings) => {
      console.log(`SettingsProvider: theme has been swithed to ${settings.theme} mode.`);
    });
  }
}
</script>

<template>
  <slot />
</template>
