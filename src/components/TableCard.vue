<template>
  <div class="TableCard">
    <md-table>
      <md-table-row class="headerRow">
        <md-table-head class="dateHeader" >{{ getDay(props.hour[0].time)}}</md-table-head>
        <md-table-head>Icon</md-table-head>
        <md-table-head>Temp</md-table-head>
        <md-table-head>Wind</md-table-head>
        <md-table-head>Precip.</md-table-head>
        <md-table-head>Cloud</md-table-head>
        <md-table-head>Humidity</md-table-head>
        <md-table-head>Pressure</md-table-head>
      </md-table-row>
      <template v-for="(hour, index) in props.hour">
        <md-table-row :key="index" v-if="index % 3 == 0">
          <md-table-cell class="dateCol">{{ getTime(hour.time) }}</md-table-cell>
          <md-table-cell>
            <img :src="hour.condition.icon" alt="" srcset="">
          </md-table-cell>
          <md-table-cell>{{ isFahren ? `${hour.temp_f}&deg;F` : `${hour.temp_c}&deg;C` }}</md-table-cell>
          <md-table-cell>{{ isFahren ? `${hour.wind_mph} mph` : `${hour.wind_kph} kmph` }}</md-table-cell>
          <md-table-cell>{{ isFahren ? `${hour.precip_in} in` : `${hour.precip_mm} mm` }}</md-table-cell>
          <md-table-cell>{{ hour.cloud }}%</md-table-cell>
          <md-table-cell>{{ hour.humidity }}%</md-table-cell>
          <md-table-cell>{{ isFahren ? `${hour.pressure_in} in` : `${hour.pressure_mb} mb` }}</md-table-cell>
        </md-table-row>
      </template>

    </md-table>
  </div>
</template>
  

<script setup>
import { computed } from "vue"


const props = defineProps({
  hour: {
    type: Array,
    default: () => []
  },
  isFahren: {
    type: Boolean,
    default: true
  }
})

const getDay=(ti)=>{
  return new Date(ti).toLocaleDateString('en-us', {
  day: '2-digit',
  weekday: 'long'
  })
}

const getTime = (time) => {
  const times = new Date(time).toLocaleTimeString('en-us', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
  })
  return times
}

const date=(time)=>{
  console.log(time)
  // const [date]=props.hour.time.split(" ")
  return new Date(date).toLocaleDateString('en-us', {
  day: '2-digit',
  weekday: 'long'
  })
}
</script>

<style lang="scss" scoped>
.TableCard{
  margin-top: 20px;
}
.headerRow {
  height: 84px;
  background: #F1F1F1;
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-color: #DDDDDD;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.1);
  border-radius: 2px 4px 0px 0px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px !important;
  color: #000000 !important;
}

.dateCol {
  width: 130px;
  background: #F1F1F1;
  border-left: 1px solid #DDDDDD;
  border-radius: 2px 0px 0px 4px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500 !important;
  font-size: 14px;
  color: #000000 ;
}
.dateHeader{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #000000 !important;
}

::v-deep .md-table-head-label {
  color: #000000;
 
}
::v-deep .md-table-cell-container{
  font-family: 'Inter';
  font-style: normal;
  font-size: 14px;
  color: #000000;
}

</style>