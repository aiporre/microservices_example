<template>
 <div class="patient" v-bind:class="{'is-available':patient.available}">
   <p> <span class="text-patient" > {{patient.name}}</span>
   <button class="del btn" @click="$emit('view-patient', patient.id)" >  <ul>
     <li>
       View
       <span></span><span></span><span></span><span></span>
     </li></ul>
   </button>
   </p>
 </div>
</template>

<script>
export default {
  name: "Patient",
  props: ["patient"]
}
</script>

<style scoped>
  .patient {
    background-color: #cccccc;
    padding: 5px;
    border-bottom: 1px #2c3e50 dotted;
    align-content: flex-end;
  }
  .text-patient{
    text-align: center;
    padding-right: 50px;
    font-size: 15px;
  }
  .is-available {
    text-decoration: line-through;
  }

  .btn {
    background-color: transparent;
    margin: 0;
    border-style:none;
  }

  .btn ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .btn ul li {
    --c: green;
    color: var(--c);
    font-size: 12px;
    border: 0.3em solid var(--c);
    border-radius: 0.5em;
    width: 6em;
    height: 3em;
    text-transform: uppercase;
    font-weight: bold;
    font-family: sans-serif;
    letter-spacing: 0.1em;
    text-align: center;
    line-height: 2.5em;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: 0.5s;
    margin: 1em;
  }

  .btn ul li span {
    position: absolute;
    width: 25%;
    height: 100%;
    background-color: var(--c);
    transform: translateY(150%);
    border-radius: 50%;
    left: calc((var(--n) - 1) * 25%);
    transition: 0.5s;
    transition-delay: calc((var(--n) - 1) * 0.1s);
    z-index: -1;
  }

  .btn ul li:hover {
    color: black;
  }

  .btn ul li:hover span {
    transform: translateY(0) scale(2);
  }

  .btn ul li span:nth-child(1) {
    --n: 1;
  }

  .btn ul li span:nth-child(2) {
    --n: 2;
  }

  .btn ul li span:nth-child(3) {
    --n: 3;
  }

  .btn ul li span:nth-child(4) {
    --n: 4;
  }

</style>