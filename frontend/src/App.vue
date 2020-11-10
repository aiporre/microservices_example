<template>
  <div id="app">
    <Header/>
    <div class='parent flex-parent'>
      <div class='child flex-child-left'>
        <Report  v-bind:reports="reports" v-bind:currentReport="currentReport"  />
      </div>
      <div class='child flex-child-right'>
        <Patients v-bind:patients="patients" v-on:view-patient="viewPatient"/>
      </div>
    </div>
  </div>

</template>

<script>
import Patients from "@/components/Patients";
import Header from "@/components/layout/Header";
import Report from "@/components/Report";
// import axios from 'axios';


export default {
  name: 'App',
  components: {
    Report,
    Header,
    Patients
  },
  data() {
    return {
      patients: [
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

      ],
      reports: [
        {
          id: 0,
          image: '../assets/snake.png',
          age: '-',
          name: '-',
          insurrance: '-'
        }
      ],
      currentReport: {id: 0 }// better just in report for now here??
    }
  },
  methods: {
    viewPatient(id) {
      this.patients = this.patients.filter(patient => patient.id !== id)
    }
  },
  // created() {
  //   axios.get('http://localhost/9090:/')
  //       .then(res => this.todos = res.data)
  //       .catch(err => console.log(err));
  // }

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


.parent {
  background: transparent;
  padding: 0rem;
}
.child {
  border: none;
  padding: 1rem;
}

.flex-parent {
  display: flex;
}
.flex-child-left {
  flex: 1.5;
}
.flex-child-right {
  flex: 0.5;
}
</style>
