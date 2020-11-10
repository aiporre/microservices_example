<template>
  <div>
    <div v-bind:key="patient.id" v-for="patient in patients">
      <Patient v-bind:patient="patient" v-on:view-patient="$emit('view-patient', patient.id)"/>
    </div>
  </div>
</template>

<script>
import Patient from "@/components/Patient";
export default {
  name: "Patients",
  components: {Patient},
  props: ["patients"]
}
</script>

<style scoped>

</style>