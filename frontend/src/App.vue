<template>
  <div id="app">
    <Header/>
    <div class='parent flex-parent'>
      <div class='child flex-child-left'>
        <Report v-bind:report="report" />
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
import axios from 'axios';


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
        // TODO: Hard coded
        {
          id: 1,
          name: 'juan',
          available: false
        },
        {
          id: 2,
          name: 'pedro',
          available: true
        },
        {
          id: 3,
          name: 'mario',
          available: false
        }

      ],
      reports: [
        // TODO: Hard coded...
        {
          id: 0,
          image: '../assets/snake.png',
          age: '-',
          name: '-',
          affiliation: '-'
        },
        {
          id: 1,
          image: '../assets/snake.png',
          age: '50',
          name: 'Juan Perez',
          affiliation: 'TK'
        }
      ],
      report: {
        id: 0,
        image: '../assets/snake.png',
        age: '-',
        name: '-',
        affiliation: '-'
      }
    }
  },
  methods: {
    viewPatient(id) {
      // Searchs the report in the cache "reports"
      const reportSaved = this.reports.filter(p => p.id === id);
      console.log('cached report... ' + JSON.stringify(reportSaved[0]))

      // if report found... use it.
      if (reportSaved.length > 0){
        this.report = reportSaved[0];
      } else{
        // else... obtains report from server
        axios.get(`http://localhost:9091/v1.0/patient/${id}`).then( res => {
          // TODO: add validation

          //response should contain the fields {id: (int), name: (string), image: (bytes string),...
          //                                    age: (string), diagnosis: (string)}
          console.log('Retrieved data...', JSON.stringify(res))
          //TEMPORARY CODE: it should store in cache and return report
          const reportSaved = this.reports.filter(p => p.id === 0);
          this.report = reportSaved[0];
        }).catch(err => console.log(err))
      }
      console.log('final output: ' + JSON.stringify(this.report))

    }
  },
  // created() {
  //  obtains all patients to populate
  //   axios.get('http://localhost/9090/v1.0/patients')
  //       .then(res => this.patients = res.data)
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
  padding: 0px;
}
.child {
  border: none;
  padding: 0px;
}

.flex-parent {
  display: flex;
}
.flex-child-left {
  flex: 1.5;
}
.flex-child-right {
  flex: 0.5;
  background-color: darkgrey;
  border-left: 10px black;
}


</style>
