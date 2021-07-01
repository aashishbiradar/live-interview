<template>
  <div class="home">
    <div>
      <h1 class="start-msg">Let's Start Coding Live!</h1>
    </div>
    <div>
      <button
        class="startBtn primary-btn"
        @click="start">
        START
      </button>
    </div>
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

<style scoped>
.home {
  height: 100vh;
  width: 100vw;
  background-color: #000;
  text-align: center;
}
.startBtn {
  height: 60px;
  width: 180px;
  font-size: 20px;
  border-radius: 30px;
}

.start-msg {
  margin: 0;
  padding: 200px 0 65px;
  color: #fff;
  font-size: 60px;
}
</style>
