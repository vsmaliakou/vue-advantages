<script lang="ts">
import { PropType, defineComponent } from "vue";

export default defineComponent({
  props: {
    message: { type: String, required: true },
    object: {
      type: Object as PropType<{ name: string; username: string }>,
      required: true,
    },
  },
});
</script>

<template>
  <div>{{ object.name }}</div>
</template>
