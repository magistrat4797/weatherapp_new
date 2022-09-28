<template>
  <div class="search-page">
    <Search />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Search from '../components/Search.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'FrontPage',
  components: {
    Search,
  },
});
</script>
