<template>
  <div id="app" >
    <div class="search-container">
      <input placeholder="Please Enter City Name, US Zip Code, Canada Postal Code, UK PostCode, ip, metar, etc."
        type="text" v-model="searchQuery" @input="getSearchSuggestions">
      <ul class="mapBoxContainer" v-if="mapBoxSearchResults">
        <p v-if="searchError">Sorry, something went wrong, please try again.</p>
        <p v-if="!searchError && mapBoxSearchResults.length === 0">No results match your query, try a different term.
        </p>
        <template v-else>
          <li v-for="searchResult in mapBoxSearchResults" :key="searchResult.id" class="suggested"
            @click="getCityWeatherData(searchResult.place_name)">
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
      <div class="loader" v-if="getData"></div>
      <div class="errMsg" v-if="FetchErrorMessage && !CityweatherData">{{ FetchErrorMessage }}</div>
    </div>
    <CityForeCast v-if="CityweatherData" :weatherData="CityweatherData" />
  </div>
</template>

<script setup>

import { onMounted, ref } from 'vue'
import axios from "axios"
import CityForeCast from './components/CityForeCast.vue';

const searchQuery = ref('')
const mapboxAPIKey = "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";
const mapBoxSearchResults = ref(null)
const queryTimeout = ref(null)
const searchError = ref(null)
const getData = ref(false)
const CityweatherData = ref()


const getSearchSuggestions = async () => {
  clearTimeout(queryTimeout.value)
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`);
        mapBoxSearchResults.value = result.data.features
      }
      catch {
        searchError.value = true
      }
      return;
    }
    mapBoxSearchResults.value = null;
  }, 300)
}
onMounted(() => {
  getCityWeatherData('hyderabad')
})

const FetchErrorMessage = ref(null)
const getCityWeatherData = async (searchResult) => {
  getData.value = true
  searchQuery.value = ''
  mapBoxSearchResults.value = null;
  const [city] = searchResult.split(",");
  console.log(searchResult)
  try {
      const weatherData = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=7b410ee496cd47768ca120311231206&q=${city}&days=7&aqi=no&alerts=no`)
      console.log(weatherData.data)
      getData.value = false
      CityweatherData.value = weatherData.data

  }
  catch (err) {
    FetchErrorMessage.value = err.message
    console.log(err.message)
    getData.value = false
  }

}



</script>

<style lang="scss">
#app {
  margin: 5% 13%;
  height: 100%;
  widows: 1040px;
}

#app {
  width: 1040px;

  .search-container {
    input {
      width: 1040px;
      padding: 15px;
      border: 1px solid #CBD5E1;
      color: #8D9AA9;
      font-size: 14px;
      outline: none;
    }

    ::placeholder {
      color: #8D9AA9;
      font-size: 14px;
    }
  }

  .mapBoxContainer {
    position: absolute;
    background-color: rgb(254, 254, 254);
    color: #8D9AA9;
    width: 90%;
    --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    padding: 8px 4px;
    top: 120px;
    list-style-type: none;

    .suggested {
      padding: 8px 0px;
      cursor: pointer;
    }
  }
}

.loader {
  border: 16px solid #f3f3f3;
  /* Light grey */
  border-top: 16px solid #8D9AA9;
  /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  margin: auto 45%;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.errMsg {
  color: red;
  font-size: 20px;
  text-align: center;
  padding: 18px 8px;
}</style>
