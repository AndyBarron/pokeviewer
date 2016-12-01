<template>
  <div>
    <h1>PokéViewer</h1>
  </div>
</template>

<style scoped>
  h1 {
    text-align: center;
  }
</style>

<script>
import PageTitle from '../mixins/PageTitle';
export default {
  name: 'home',
  mixins: [PageTitle],
  data () {
    return {
      title: '',
    };
  },
};
</script>