<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const name = ref("");
    const email = ref("");
    const submitDisabled = computed(() => {
      return name.value.length === 0 || email.value.length === 0;
    });

    const submit = () => {
      const customer = {
        name: name.value,
        email: email.value,
      };

      store.commit("customers/add", customer);

      name.value = "";
      email.value = "";
    };

    return { name, email, submit, submitDisabled };
  },
};
</script>

<template>
  <div class="card card-body">
    <form @submit.prevent="submit">
      <div class="form-group input-group-sm">
        <label for="name">Name</label>

        <input
          v-model="name"
          class="form-control"
          id="name"
          placeholder="Enter name"
        />
      </div>

      <div class="form-group input-group-sm">
        <label for="email">Email</label>

        <input
          v-model="email"
          class="form-control"
          id="email"
          placeholder="Enter email"
        />
      </div>

      <div class="form-group input-group-sm">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>
