<template>
  <div id="app">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import '../public/style.css';
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: { Navbar },
};
</script>