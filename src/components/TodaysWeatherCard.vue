<template>
    <div class="weather-card">
        <h2>Today's Weather in {{ weatherData.location.name }}</h2>
        <div class="todayDetails">
            <div class="first">
                <div class="sun">
                    <div>
                        <p>Sunrise</p>
                        <p>{{ AstroData.sunrise }}</p>
                    </div>
                    <div class="sunset">
                        <p>Sunset</p>
                        <p>{{ AstroData.sunset }}</p>
                    </div>
                </div>
                <div class="moon">
                    <div>
                        <p>Moonrise</p>
                        <p>{{ AstroData.moonrise }}</p>
                    </div>
                    <div class="sunset">
                        <p>Moonset</p>
                        {{ AstroData.moonset }}
                    </div>
                </div>
            </div>
            <div class="second">
                <div>
                    <p>Max.</p>
                    <p>{{ isFahren ? `${TodaysTemp.maxtemp_f} &deg;F` : `${TodaysTemp.maxtemp_c} &deg;C` }} </p>
                </div>
                <div>
                    <p>Min.</p>
                    <p>{{ isFahren ? `${TodaysTemp.mintemp_f} &deg;F` : `${TodaysTemp.mintemp_c} &deg;C` }} </p>
                </div>

                <div>
                    <p>Avg.</p>
                    <p>{{ isFahren ? `${TodaysTemp.avgtemp_f} &deg;F` : `${TodaysTemp.avgtemp_c} &deg;C` }} </p>
                </div>

                <div>
                    <p>Precip.</p>
                    <p>{{ isFahren ? `${TodaysTemp.totalprecip_in} in` : `${TodaysTemp.totalprecip_mm} mb` }}</p>
                </div>
                <div>
                    <p>Max.Wind</p>
                    <p>{{ isFahren ? `${TodaysTemp.maxwind_mph} mph` : `${TodaysTemp.maxwind_kph} kph` }}</p>
                </div>
            </div>
        </div>
       
    </div>
</template>

<script setup>
import { computed } from "vue"


const props = defineProps({
    weatherData: {
        type: Object,
        default: () => { }
    },
    isFahren: {
        type: Boolean,
        default: false
    }
})
const AstroData = computed(() => {
    return props.weatherData.forecast.forecastday[0].astro
})
const TodaysTemp = computed(() => {
    return props.weatherData.forecast.forecastday[0].day
})
// const sunriseData=computed((forecastData.day.date))



// const 

</script>

<style lang="scss" scoped>
.weather-card {
    h2 {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        color: #444444;
        margin: 30px 0px;
    }

    .todayDetails {
        display: flex;
        justify-content: space-around;
        border: 1px solid #DDDDDD;
        border-radius: 4px;
        height: 92px;
    }
}

.first {
    display: flex;
    width: 400px;
    justify-content: space-around;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #444444;
    .sun, .moon {

        width: 150px;
        div {
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
    }
    .sunset{
        margin-top: -20px;
    }
}

.second {
    display: flex;
    width: 400px;
    justify-content: space-around;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #444444;
}</style>