<script>
import { ref } from 'vue';

export default {
  setup() {
    return { toggle: ref(false), toggle2: ref(false) };
  },
}
</script>

<template>
  <div class="card">
    Component A
    <button @click="toggle = !toggle">Toggle</button>
    <button @click="toggle2 = !toggle2">Toggle2</button>

    <teleport v-if="toggle" to="#endofbody">
      <p>Text from Component A</p>
    </teleport>

    <teleport v-if="toggle2" to="#endofbody">
      <p>Second text from Component A</p>
    </teleport>
  </div>
</template>

<style scoped>
.card {
  border: 2px solid green;
}
</style>
