<template>
  <id>
    <div class="parent">
      <div class="flex-child-top">
        <table class="report-tb">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Affiliation</th>
          </tr>
          <tr>
            <td id="nameField">{{ report.name}}</td>
            <td id="ageField">{{ report.age}}</td>
            <td id="affiliationField">{{ report.affiliation}}</td>
          </tr>
        </table>
      </div>

      <div class="flex-child-bottom center">
          <img src="../assets/cross.png" class="report-img">
      </div>

    </div>

  </id>
</template>

<script>
// import Patient from "@/components/Patient";

export default {
  name: "Report",
  props: ["report"]

}
</script>

<style scoped>
.report-tb {
  width: 100%;
  text-align: center;
}
.aligner {
  display: flex;
  flex-direction: row;

}
.flex-child-top {
  align-self: flex-start;
  width: 100%;
  height: 100%;
}
.flex-child-bottom {
  align-self: flex-end;
  width: 100%;
  height: 500px;
  height: 500px;
}

.report-img {
  max-width: 100%;
  max-height: 100%;
}

.square {
  height: 75px;
  width: 75px;
}
.center {
  /*margin: auto;*/
  width: 50%;
  /*border: 3px solid green;*/
  padding: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>