<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";
import AddItem from "@/components/AddItem.vue";
import ItemList from "@/components/ItemList.vue";
import { useCartStore } from "@/store/cart";

export default defineComponent({
  name: "App",
  components: { Card, AddItem, ItemList },
  setup() {
    const cart = useCartStore();

    return { cart };
  },
});
</script>

<template>
  <div class="container">
    <Card>
      <h4>Add new item</h4>

      <AddItem />
    </Card>

    <Card>
      <h4>Your items {{ cart.itemsCount }}</h4>

      <ItemList />
    </Card>
  </div>
</template>
