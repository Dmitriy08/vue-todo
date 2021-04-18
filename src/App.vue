<template>
  <div id="app">
    <Navbar/>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  components: {
    Navbar
  }
}
</script>


<style lang="scss">
#app {

}
</style>
