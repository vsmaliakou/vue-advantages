<script>
import SettingsProvider from '@/components/SettingsProvider.vue'
import ThemeButton from '@/components/ThemeButton.vue'

export default {
  name: 'App',
  components: { SettingsProvider, ThemeButton },
}
</script>

<template>
  <SettingsProvider>
    <ThemeButton />
  </SettingsProvider>
</template>
