<template>
    <div class="chart">
        <apexchart type="line" height="532" :options="data[0]" :series="data[1]"></apexchart>
    </div>
</template>

<script setup>

import { computed, ref } from "vue"

const props = defineProps({
    weatherData: ({
        type: Array,
        default: () => []
    }),
    isFahren: ({
        type: Boolean,
        default: true,
    })
})

const data = computed(() => {
    const dataF = ref([])
    const dataC = ref([])
    const xAxisLabels = ref([])
    props.weatherData.map((item, index) => {
        if (index % 3 == 0) {
            dataF.value.push(item.temp_f)
            dataC.value.push(item.temp_c)
            xAxisLabels.value.push(item.time)
        }
    })

    const getLabels = xAxisLabels.value.map((item) => {
        return new Date(item).toLocaleTimeString('en-us', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
        })
    })
    var options = {
        chart: {
            toolbar: {
                show: false
            }
        },
        xaxis: {
            categories: getLabels
        },
        markers: {
            show: true,
            size: 10,
        },
        colors: ['rgba(154, 137, 255, 0.7)'],
        tooltip: {
            enabled: true,
            followCursor: false,
            y: {
                formatter: function (val) {
                    return [props.isFahren ? `${val}&deg;F` : `${val}&deg;C`]
                },
                title: {
                    formatter: () => 'Temperature',
                },
            }
        },
        legend: {
            show: true,
            showForSingleSeries: true,
            horizontalAlign: 'center',
            position: 'top',
            fontSize: '12px',
            fontFamily: 'Inter',
            fontWeight: 400,
            labels: ['yuga'],
            markers: {
                width: 70,
                height: 30,
                radius: 0
            },
            formatter: function () {
                return [`${getDay(props.weatherData[0].time)}'s` + ' Weather']
            }
        },
        yaxis: {
            show: true,
            min: props.isFahren ? 60:15,
            max:props.isFahren ? 110:55,          
            labels: {
                formatter: function (value) {
                    return [getText(value)]
                }
            },
        }


    }
    const getText=(value)=>{
        return props.isFahren ? `${value} °f` : `${value} °c`
    }
    const getDay = (date) => {
        const data = new Date(date).toLocaleDateString('en-us', {
            weekday: 'long'
        })
        const currentDay = new Date().toLocaleDateString('en-us', {
            weekday: 'long'
        })
        if (currentDay === data) {
            return 'Today'
        }
        else {
            return data
        }
    }
    var series = [{
        data: props.isFahren ? dataF.value : dataC.value
    }]
    return [options, series]
})

</script>

<style lang="scss" scoped>
.chart {
    margin-top: 20px;
    border: 1px solid #DDDDDD;
}

::v-deep .apexcharts-legend-series {
    display: flex;
    width: 250px;
    align-items: center;
    justify-content: space-around;

}

::v-deep .apexcharts-legend {
    justify-content: end !important;
}

::v-deep .apexcharts-tooltip-text-y-label {
    font-weight: 400;
    color: #474747;
    // font-family: 'Roboto';
    // font-style: normal;
    font-size: 14px;
}</style>