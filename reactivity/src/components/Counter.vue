<script>
import { customRef, reactive, ref, toRefs } from 'vue';

const isemail = (value) => value.includes('@');

export default {
  props: {
    a: { type: Number, default: 0 },
    b: { type: String, default: 'Vue 3!' },
    c: { type: Boolean, default: true },
  },
  setup(props) {
    /* ***** */
    const count = reactive({ value: 0 });

    console.log(count);
    /* ***** */

    /* ***** */
    const counter = ref(10);

    console.log(counter);
    /* ***** */

    /* ***** */
    const { a, b, c } = toRefs(props);

    console.log(a.value);
    console.log(b.value);
    console.log(c.value);
    /* ***** */

    /* ***** */
    const email = customRef((track, trigger) => {
      let value = null;

      return {
        get() {
          track();
          return value;
        },
        set(input) {
          if (isemail(input)) {
            value = input;
            trigger();
          }
        },
      };
    });

    email.value = 'invalid';
    console.log(email.value);
    email.value = 'valid@valid.com';
    console.log(email.value);
    /* ***** */

    return { counter };
  },
}
</script>

<template>
  <div>Hi from Vue 3 {{ counter }}</div>
</template>
