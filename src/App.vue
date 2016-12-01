<template>
  <div id="app">
    <nav><router-link to='/'>PokéViewer</router-link></nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style scoped>
nav {
  padding: 1em;
  background-color: #444;
}
main {
  padding: 1em;
}
a:link, a:hover, a:active, a:visited {
  color: white;
  text-decoration: none;
}
</style>