<template>
  <div id="app">
    <Header/>
<!--    <input type="checkbox" v-on:change="MarkComplete" >-->
    <Patients v-bind:patients="patients" v-on:view-patient="viewPatient"/>
  </div>
</template>

<script>
import Patients from "@/components/Patients";
import Header from "@/components/layout/Header";

export default {
  name: 'App',
  components: {
    Header,
    Patients
  },
  data() {
    return{
      patients : [
        {
          id: 0,
          name: 'juan',
          available: false
        },
        {
          id: 1,
          name: 'pedro',
          available: true
        },
        {
          id: 2,
          name: 'mario',
          available: false
        }

      ]
    }
  },
  methods: {
    viewPatient(id){
      this.patients = this.patients.filter(patient => patient.id !== id)
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}


* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}


</style>
