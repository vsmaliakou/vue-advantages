<script lang="ts">
import { useCartStore } from "@/store/cart";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const cart = useCartStore();

    return { cart };
  },
});
</script>

<template>
  <div class="row my-1" v-for="item in cart.items" :key="item.name">
    <div class="col">
      <a :href="item.url">
        <h5>{{ item.name }}</h5>
      </a>
    </div>

    <div class="cols col-auto">
      <button class="btn btn-danger" @click="cart.removeItem(item)">
        Remove
      </button>
    </div>
  </div>
</template>
