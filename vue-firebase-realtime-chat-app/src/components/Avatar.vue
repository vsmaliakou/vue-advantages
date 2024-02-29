<script>
export default {
  props: {
    sc: { type: String, default: "" },
  },
};
</script>

<template>
  <img class="avatar" :src="src" />
</template>
