<script>
import { getUser, updateUser } from '@/firebase'
import { computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const userId = computed(() => route.params.id)

    const form = reactive({ name: '', email: '' })

    const update = async () => {
      await updateUser(userId.value, { ...form })
      router.push('/')
      form.name = ''
      form.email = ''
    }

    onMounted(async () => {
      const user = await getUser(userId.value)

      form.name = user.name
      form.email = user.email
    })

    return { form, update }
  }
}
</script>

<template>
  <div class="card card-body mt-2">
    <h3>Edit users</h3>

    <form @submit.prevent="update">
      <div class="form-group">
        <label>Name</label>

        <input v-model="form.name" class="form-control" required />
      </div>

      <div class="form-group mt-3">
        <label>Email</label>

        <input
          v-model="form.email"
          type="email"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary mt-3">Update</button>
    </form>
  </div>
</template>
