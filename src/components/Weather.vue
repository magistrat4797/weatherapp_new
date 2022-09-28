<template>
  <section class="weather-sec">
    <div class="wrapper">
      <header class="row">
        <div class="title-col col text-centered">
          <div class="title-box" v-if="typeof weather.main != 'undefined'">
            <h1>{{ weather.name }}, {{ weather.sys.country }}</h1>
            <span class="date">{{ dateBuilder }}</span>
          </div>
          <div class="title-box" v-if="weather.cod == 404">
            <h1>
              Oops not a valid location ... Please enter a valid location 😊
            </h1>
          </div>
          <div
            class="title-box"
            v-if="typeof weather.main == 'undefined' && weather.cod != 404"
          >
            <h1>Oops, it seems you didn't enter the location 😔</h1>
          </div>
        </div>
      </header>
      <div class="row" v-if="typeof weather.main != 'undefined'">
        <div class="weather-col col">
          <div class="weather-app">
            <div class="weather-box">
              <div class="weather-top-info">
                <div class="clouds-level">
                  <span class="icon"><i class="fas fa-cloud"></i></span>
                  {{ weather.clouds.all }}%
                </div>
                <div class="wind-speed">
                  <span class="icon"><i class="fas fa-wind"></i></span>
                  {{ weather.wind.speed }}m/s
                  <span class="wind-dir">{{
                    windDirection(weather.wind.deg)
                  }}</span>
                </div>
                <div class="humidity">
                  <span class="icon"><i class="fas fa-tint"></i></span>
                  {{ weather.main.humidity }}%
                </div>
              </div>
              <div class="weather-main-info">
                <div class="temp-box">
                  <div class="temp-main">
                    {{ Math.round(weather.main.temp) }}
                  </div>
                  <div class="temp-inner-box">
                    <div class="temp-sign">°C</div>
                    <div class="temp-max">
                      <span class="icon"
                        ><i class="fas fa-long-arrow-alt-up"></i
                      ></span>
                      {{ Math.round(weather.main.temp_max) }}°
                    </div>
                    <div class="temp-min">
                      <span class="icon"
                        ><i class="fas fa-long-arrow-alt-down"></i
                      ></span>
                      {{ Math.round(weather.main.temp_min) }}°
                    </div>
                  </div>
                </div>
                <div class="weather-desc">
                  {{ weather.weather[0].description }}
                </div>
                <div class="weather-icon">
                  <img
                    :src="
                      'http://openweathermap.org/img/wn/' +
                      weather.weather[0].icon +
                      '@4x.png'
                    "
                  />
                </div>
              </div>
              <div class="weather-extra-info">
                <div>
                  Feels like:
                  <span>{{ Math.round(weather.main.feels_like) }}°C</span>
                </div>
                <div>
                  Sunrise: <span>{{ UnixTimestamp(weather.sys.sunrise) }}</span>
                </div>
                <div>
                  Sunset: <span>{{ UnixTimestamp(weather.sys.sunset) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="forecast-col col">
          <div class="row">
            <div
              class="forecast-item-col col"
              v-for="day in forecastDays"
              :key="day"
            >
              <div class="forecast-box">
                <div class="forecast-date">
                  {{ UnixDays(forecast.daily[day].dt) }}
                </div>
                <div class="forecast-temp">
                  {{ Math.round(forecast.daily[day].temp.day) }}°C
                </div>
                <div class="forecast-icon">
                  <img
                    :src="
                      'http://openweathermap.org/img/wn/' +
                      forecast.daily[day].weather[0].icon +
                      '@2x.png'
                    "
                  />
                </div>
                <div class="forecast-extra-info">
                  <div>
                    Feels like:
                    <b
                      >{{ Math.round(forecast.daily[day].feels_like.day) }}°C</b
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="actions-col col text-centered">
          <router-link :to="{ name: 'FrontPage' }" class="btn btn-default">
            Back to search
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Weather',
  props: ['query'],
  data() {
    return {
      api_key: '027ee07fafd9a678d925c3a9220c1289',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      forecastDays: 6,
      weather: {},
      forecast: {},
    };
  },
  computed: {
    dateBuilder() {
      const d = new Date();
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const day = days[d.getDay()];
      const date = d.getDate();
      const month = months[d.getMonth()];
      const year = d.getFullYear();
      return `${day} ${date}, ${month} ${year}`;
    },
  },
  methods: {
    fetchWeather() {
      fetch(
        `${this.url_base}weather?q=${this.query}&units=metric&appid=${this.api_key}`,
      )
        .then(response => response.json())
        .then(this.setCurrentWeather)
        .catch((error) => {
          console.log(error);
        });
    },
    setCurrentWeather(results) {
      this.weather = results;

      fetch(
        `${this.url_base}onecall?lat=${this.weather.coord.lat}&lon=${this.weather.coord.lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${this.api_key}`,
      )
        .then(response => response.json())
        .then(this.setForecast)
        .catch((error) => {
          console.log(error);
        });
    },
    setForecast(results) {
      this.forecast = results;
    },
    UnixTimestamp(t) {
      const date = new Date(t * 1000);
      const hr = date.getHours();
      const m = `0${date.getMinutes()}`;
      const s = `0${date.getSeconds()}`;
      return `${hr}:${m.substr(-2)}:${s.substr(-2)}`;
    },
    UnixDays(t) {
      const d = new Date(t * 1000);
      const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const day = days[d.getDay()];
      const date = d.getDate();
      const month = months[d.getMonth()];
      return `${day} ${date}, ${month}`;
    },
    windDirection(dir) {
      if (dir <= 45 || dir > 315) {
        return 'North';
      }
      if (dir > 45 && dir <= 135) {
        return 'East';
      }
      if (dir > 135 && dir <= 225) {
        return 'South';
      }
      if (dir > 225 && dir <= 315) {
        return 'West';
      }
      return false;
    },
  },
  created() {
    this.fetchWeather();
  },
};
</script>

<style lang="stylus" scoped>
@import "../styles/colors.styl"

.weather,
.forecast
  &-box
    box-shadow 0 19px 38px rgba(0, 0, 0, 0.25), 0 4px 12px rgba(0, 0, 0, 0.25)
    border-radius 7px
    backdrop-filter blur(8px)

.weather
  &-col
    margin-bottom 20px
    @media (min-width: 1024px)
      margin-bottom 40px
      max-width 350px
  &-box
    display block
    text-align center
    margin 0 auto
    padding 30px 20px

  &-top-info
    display flex
    align-items center
    font-size 18px
    justify-content space-between
    margin-bottom 10px
    padding-bottom 20px
    > div
      display flex
      align-items center
      > .icon
        opacity .7
        margin-right 10px
  &-extra-info
    font-size 18px
    > div
      &:not(:last-child)
        margin-bottom 5px
      > span
        font-weight 700
  &-desc
    font-size 18px

.forecast
  &-box
    display flex
    flex-direction column
    align-items center
    justify-content center
    padding 20px
    height 100%
  &-col
    display flex
    margin-bottom 20px
    @media (min-width: 1024px)
      margin-bottom 40px
      max-width calc(100% - 350px)

  &-item-col
    margin-bottom 20px
    @media (min-width: 480px)
        max-width 50%
    @media (min-width: 768px)
        max-width 33.33334%
    @media (min-width: 1024px)
        max-width 33.33334%
        min-height calc(50% - 10px)
  &-date
      font-size 18px
      margin-bottom 10px
  &-temp
      font-size 30px
      font-weight 700

.wind
  &-speed
    position relative
  &-dir
    position absolute
    font-size 14px
    top 100%
    height 20px
    width 100%

.temp
  &-box
    display flex
    justify-content center
    align-items center
    margin-bottom 10px
  &-main
    font-size 130px
    line-height 1
  &-sign
    font-size 40px
    margin-bottom 5px
  &-min,
  &-max
    display flex
    align-items center
    font-size 20px
    > .icon
      opacity .7
      margin-right 5px
</style>
