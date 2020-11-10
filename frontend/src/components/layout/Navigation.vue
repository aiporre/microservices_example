<template>
 <div>
   <Navigation> {{ msg}}}</Navigation>
 </div>
</template>

<script>
export default {
  name: "Navigation",
  data(){
    return {
      msg: "Patient report"
    }
  }
}
</script>

<style scoped>

</style>