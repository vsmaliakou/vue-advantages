<script>
import SendIcon from "@/components/SendIcon.vue";
import Message from "@/components/Message.vue";
import { nextTick, ref, watch } from "vue";
import { useAuth, useChat } from "@/firebase";

export default {
  components: { SendIcon, Message },
  setup() {
    const { user, isLogin } = useAuth();
    const { messages, sendMessage } = useChat();

    const message = ref("");
    const bottom = ref(null);

    const send = () => {
      sendMessage(message.value);
      message.value = "";
    };

    watch(
      messages,
      () => {
        nextTick(() => {
          bottom.value?.scrollIntoView({ behavior: "smooth" });
        });
      },
      { deep: true },
    );

    return { user, isLogin, messages, message, bottom, send };
  },
};
</script>

<template>
  <div class="container-sm mt-20">
    <div class="mx-5">
      <Message
        v-for="{ id, text, userPhotoURL, userName, userId } in messages"
        :key="id"
        :name="userName"
        :photo="userPhotoURL"
        :sender="userId === user?.id"
      >
        {{ text }}
      </Message>
    </div>
  </div>

  <div ref="bottom" class="mt-20" />

  <div class="bottom">
    <div class="container-sm">
      <form v-if="isLogin" @submit.prevent="send">
        <input v-model="message" placeholder="Message" required />

        <button type="submit">
          <SendIcon />
        </button>
      </form>
    </div>
  </div>
</template>
