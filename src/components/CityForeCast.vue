    <template>
        <div class="container">
            <div class="cityDetails">
                <div>
                    <span class="cityName">{{ weatherData.location.name }} Weather Forecast</span> <span class="regionName">{{
                        weatherData.location.region }}, {{ weatherData.location.country }}</span>
                </div>
                <div class="tabs">
                    <button :class="isFahren ? 'active' :'' "  class="Fahren" @click="isFahren = true">&deg;F </button>
                    <button class="celcious" @click="isFahren = false">&deg;C</button>
                </div>
            </div>
            <div class="cityCard">
                <div class="top-section">
                    <div class="first">
                        <img :src="current.condition.icon" alt="currentDay">
                        <div class="currentDay">
                            <h1>{{ isFahren ? `${current.temp_f} &deg;F` : `${current.temp_c} &deg;C` }} &nbsp;{{ date }}</h1>
                            <p>{{ current.condition.text }}</p>
                        </div>
                    </div>
                    <div class="second">
                        <div>
                            <p>Wind</p>
                            <p>{{ isFahren ? `${current.wind_mph} mph` : `${current.wind_kph} Kmph` }} </p>
                        </div>
                        <div>
                            <p>Precip</p>
                            <p>{{ isFahren ? `${current.precip_in} in` : `${current.precip_mm} mm` }} </p>
                        </div>
                        <div>
                            <p>Pressure</p>
                            <p>{{ isFahren ? `${current.pressure_in} in` : `${current.pressure_mb} mb` }}</p>
                        </div>
                    </div>
                </div>
                <div class="bottom-section">
                    <div class="singleCard" v-for="(data, index) in forecastData" :key="data.date">
                        <div v-if="index != 0">
                            <img :src="data.day.condition.icon" alt="">
                            <p>
                                {{ getDate(data.date) }}
                            </p>
                            <p>{{ isFahren ? `${data.day.avgtemp_f} &deg;F` : `${data.day.avgtemp_c} &deg;C` }}</p>
                            <p>{{ data.day.condition.text }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <TodaysWeatherCard v-if="props.weatherData" :weatherData="props.weatherData" :isFahren="isFahren" />
            <div class="actions-card">
                <div class="dayWiseBtns">
                    <button  v-for="(day, index) in forecastData" :key="index" @click="getDayWiseData(day,index)" :class="activeIndex===index ? 'active' : ''"
                    >{{ index != 0 ? getDate(day.date) : 'Today' }}</button>
                </div>
                <div class="actionBtns">
                        <button :class="isTable ? 'active' :'' " @click="isTable=true">
                            <img :src="table" alt="table.svg">
                        </button>
                        <button  @click="isTable=false">
                        <img :src="map" alt="table.svg">
                        </button>
                </div>
            </div>
            <TableCard v-if="isTable" :hour="dayData" :isFahren="isFahren"/>
            <GraphCard v-if="!isTable" :weatherData="dayData" :isFahren="isFahren"/>
        </div>
    </template>

    <script setup>
    import { computed, ref } from "vue"
    import TodaysWeatherCard from "./TodaysWeatherCard.vue";
    import map from '../assets/map.svg'
    import table from '../assets/table.svg'
    import TableCard from "./TableCard.vue";
    import GraphCard from "./GraphCard.vue";



    const isFahren = ref(true)
    const isTable=ref(true)
    const props = defineProps({
        weatherData: {
            type: Object,
            default: () => { }
        }
    })
    const current = computed(() => {
        return props.weatherData.current
    })
    const forecastData = computed(() => {
        return props.weatherData.forecast.forecastday
    })

    const getDate = (date) => {
        const data = new Date(date)
        return data.toLocaleDateString('en-us', {
            weekday: 'long'
        })
    }

    const date = new Date().toLocaleDateString('en-us', {
        weekday: 'long'
    }
    )

    const dayData=ref(props.weatherData.forecast.forecastday[0].hour)
    let activeIndex = ref(0);
    const dayDate=ref()
    const getDayWiseData =(day,index)=>{
        activeIndex.value = index;
        dayData.value=day.hour
    }
    </script>

<style lang="scss" scoped>
    .container {

        width: 1040px;

        .cityDetails {
            margin: 20px 0px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .cityName {
                color: #444444;
                font-size: 24px;
                font-weight: 500;
                font-family: 'Inter';
                font-style: normal;
            }

            .regionName {
                color: #979797;
                font-size: 16px;
                font-weight: 500;
                font-family: 'Inter';
                font-style: normal;
            }

            .tabs {
                display: flex;

                button {
                    width: 36px;
                    height: 32px;
                    font-family: 'Roboto';
                    font-style: normal;
                    font-size: 14px;
                    font-weight: 600;
                    color: #64748B;
                    border: 1px solid #979797;
                    cursor: pointer;
                }

                .Fahren {
                    border-radius: 5px 0px 0px 5px;

                }

                .celcious {
                    border-radius: 0px 5px 5px 0px;
                }

                button:focus {
                    background-color: #D8ECFF;
                    color: #000000;
                }
            }
        }

        .cityCard {
            height: 384px;
            width: 1040px;
            border-radius: 16px;
            color: white;
            background: linear-gradient(to right, #1E3C72, #2A5298);

            .top-section {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-evenly;
                padding-top: 5%;

                .first {
                    display: flex;
                    align-items: center;
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 14px;
                    color: #F8FAFC;
                }

                .second {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 300px;
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 14px;
                    color: rgba(248, 250, 252, 0.7);
                }

                img {
                    height: 96px;
                    width: 96px;
                    object-fit: cover;
                }

                .currentDay {
                    h1 {
                        font-family: 'Inter';
                        font-style: normal;
                        font-weight: 500;
                        font-size: 40px;
                    }

                    p {
                        font-family: 'Inter';
                        font-style: normal;
                        font-weight: 400;
                        font-size: 14px;
                        margin-top: -25px;
                    }
                }
            }

            .bottom-section {
                display: flex;
                align-items: center;
                justify-content: space-evenly;
                padding-top: 3%;

                .singleCard {

                    img {
                        width: 60px;
                        height: 60px;
                        object-fit: cover;
                        margin-bottom: 20px;
                    }

                    p {
                        font-family: 'Inter';
                        font-style: normal;
                        font-weight: 400;
                        font-size: 14px;
                        color: rgba(248, 250, 252, 0.7);
                        margin-top: -8px;
                    }
                }
            }
        }



        .actions-card {
            display: flex;
            justify-content: space-between;
            margin-top: 50px;
            align-items: center;


            .dayWiseBtns {
                display: flex;
                align-items: center;
                // justify-content: space-between;
                button {
                    width: auto;
                    height: 38px;
                    border: 1px solid #ADC3E9;
                    background: #FFFFFF;
                    padding: 8px 13px;
                    cursor: pointer;
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    color: #637381;
                }

                // button:focus {
                //     background: #D8ECFF;
                // }
                button:first-child {
                    border-radius: 4px 0px 0px 4px;
                    
                }
                button:last-child {
                    border-radius: 0px 4px 4px 0px;
                }
            }

            .actionBtns {
                display: flex;
                align-items: center;
                button {
                    border: 1px solid #ADC3E9;
                    cursor: pointer;
                    padding: 8px 13px;
                    width: 50px;
                    height: 40px;   
                }
                button:first-child{
                    border-radius: 4px 0px 0px 4px;  
                }     
                button:last-child{
                    border-radius: 0px 4px 4px 0px;
                }
                button:focus{
                    background: #D8ECFF;
                }

            }
        }
      
    }
    .active{
            background: #D8ECFF !important;
        }
    </style>