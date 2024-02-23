<script lang="ts">
import { defineComponent } from "vue";
import HeaderLink from "@/components/HeaderLink.vue";

export default defineComponent({
  components: { HeaderLink },
});
</script>

<template>
  <div class="text-center my-3">
    <h4>Cat 🐱 Facts</h4>

    <div class="d-flex justify-content-center">
      <HeaderLink to="/" exact>Home</HeaderLink>

      <HeaderLink to="/facts" exact>List</HeaderLink>
    </div>
  </div>
</template>
