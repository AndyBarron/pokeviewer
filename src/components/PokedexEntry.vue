<template>
  <div class="entry">
    <div class="info" :style='{backgroundImage: "url(" + image + ")"}'>
      <h1>{{info.name}}</h1>

      <table class="stats">
        <thead>
          <tr>
            <th>stat</th>
            <th right>value</th>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <stat-row stat='hp' :all='info.stats'></stat-row>
          <stat-row stat='attack' :all='info.stats'></stat-row>
          <stat-row stat='defense' :all='info.stats'></stat-row>
          <stat-row stat='special-attack' :all='info.stats'></stat-row>
          <stat-row stat='special-defense' :all='info.stats'></stat-row>
          <stat-row stat='speed' :all='info.stats'></stat-row>
        </tbody>
      </table>

      <hr>

      <table>
        <thead>
          <th>move</th>
        </thead>
        <tbody>
          <tr v-for='item in info.moves'>
            <td>{{item.move.name}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import StatRow from './StatRow.vue';

export default {
  name: 'pokedex-entry',
  props: ['info'],
  computed: {
    image() {
      // return "http://www.pokestadium.com/sprites/xy/" + this.info.name + ".gif";
      return this.info.sprites.front_default;
    },
  },
  components: {StatRow},
}
</script>

<style scoped>
  .entry {
    display: flex;
    flex-direction: row;
  }
  .info {
    background-repeat: no-repeat;
    background-position: right top;
  }
  *[right] {
    text-align: right;
  }
  .stats thead th {
    border-bottom: 1px solid white;
  }
</style>