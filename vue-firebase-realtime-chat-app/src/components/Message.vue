<script>
import Avatar from "@/components/Avatar.vue";

export default {
  components: { Avatar },
  props: {
    name: { type: String, default: "" },
    photo: { type: String, default: "" },
    sender: { type: Boolean, default: false },
  },
};
</script>

<template>
  <div class="message">
    <span v-if="!sender">{{ name }}</span>

    <div class="flex" :class="sender ? 'flex-row-reverse' : ''">
      <Avatar class="mt-1" :src="photo" />

      <div class="text w-3/4" :class="sender ? 'bg-green-800' : 'bg-gray-700'">
        <slot />
      </div>
    </div>
  </div>
</template>
