<template>
  <footer class="footer-sec">
    <div class="wrapper">
      <div class="row">
        <div class="footer-col col">
          <div class="footer-text">© <b>Ioann Sulyma</b> 2022</div>
          <div class="footer-social">
            <a href="https://github.com/magistrat4797" target="_blank">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/isulyma/" target="_blank">
              <i class="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped lang="stylus">
@import "../styles/colors.styl"

footerClass = 'footer'

.{footerClass}
  &-sec
    display block
    width 100%
  &-col
    text-align center
  &-text
    margin-bottom 5px
  &-social a
    padding 0 5px
    font-size 20px
</style>
