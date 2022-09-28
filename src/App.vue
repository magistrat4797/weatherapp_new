<template>
  <div id="app">
    <div class="page-wrap">
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from './components/Footer.vue';

export default {
  name: 'app',
  components: { Footer },
};
</script>
