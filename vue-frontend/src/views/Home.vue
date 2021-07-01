<template>
  <div>
    <button @click="start">
      Start Interview
    </button>
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
import { useRouter } from 'vue-router';

export default {
  name: 'Home',
  setup() {
    const router = useRouter();
    const start = () => {
      router.push({ name: 'Share', params: { shareId: nanoid(10) } });
    };
    return { start };
  },
}
</script>
