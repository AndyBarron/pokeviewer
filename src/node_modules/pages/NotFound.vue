<template>
  <div>
    <h1>PokéViewer used 404!</h1>
    <p>But it failed...</p>
    <p>
      <router-link to='/'>Return home</router-link>
    </p>
  </div>
</template>

<style scoped>
div {
  text-align: center;
}
</style>

<script>
export default {
  name: 'not-found',
};
</script>