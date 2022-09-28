<template>
  <section class="search-sec">
    <div class="wrapper">
      <div class="row">
        <div class="title-col col text-centered">
          <h1>Welcome to the weather application! ⛅</h1>
          <p>
            Сheck the current weather and get a six days forecast for location
            by entering it in the input and clicking the search button
          </p>
        </div>
      </div>
    </div>
    <div class="wrapper -sm">
      <div class="row">
        <div class="search-col col">
          <div class="search-box">
            <input
              type="text"
              class="search-bar"
              placeholder="Location"
              v-model="query"
              v-on:keyup.enter="goToResult"
            />
            <router-link
              :to="{ name: 'Weather', params: { query: query } }"
              class="btn-search"
            >
              <i class="fas fa-search"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      query: '',
    };
  },
  methods: {
    goToResult() {
      this.$router.push({ name: 'Weather', params: { query: this.query } });
    },
  },
};
</script>

<style lang="stylus">
@import "../styles/colors.styl"

searchClass = 'search'

.{searchClass}
  &-box
    position: relative

.btn-search
  font-size 16px
  display flex
  width 40px
  height 45px
  line-height 45px
  position absolute
  right 0
  top 50%
  transform translateY(-50%)
  align-items center
  justify-content center
  color $theme-color-1
</style>
