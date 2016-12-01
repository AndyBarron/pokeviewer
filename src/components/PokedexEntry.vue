<template>
  <div class="entry">
    <div class="info" :style='{backgroundImage: "url(" + image + ")"}'>
      <h1>{{info.name}}</h1>
      <span>
        <template v-for='(type, index) in types'>
          <type-name :name='type.type.name'></type-name><template
            v-if='index == 0 && info.types.length > 1'>, </template>
        </template>
      </span>
      <table class="stats">
        <thead>
          <tr>
            <th>stat</th>
            <th text-right>value</th>
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
    </div>
    <move-table v-bind:moves='info.moves'></move-table>
  </div>
</template>

<script>
import MoveTable from './MoveTable.vue';
import StatRow from './StatRow.vue';
import TypeName from './TypeName.vue';

const METHOD_ORDER = ['level-up', 'machine', 'tutor', 'egg'];

const strcmp = (a, b) => {
  if (a < b)
    return -1;
  else if (a > b)
    return 1;
  else return 0;
}

const movecmp = (a, b) => {
  return strcmp(a.name, b.name);
}

const methodcmp = (a, b) => {
  return (METHOD_ORDER.indexOf(a.name) - METHOD_ORDER.indexOf(b.name)) || a.level - b.level;
}

export default {
  name: 'pokedex-entry',
  props: ['info'],
  computed: {
    image() {
      return this.info.sprites.front_default;
    },
    types() {
      return this.info.types.sort((a, b) => a.slot - b.slot);
    }
  },
  components: {StatRow, MoveTable, TypeName},
}
</script>

<style scoped>
/*  .entry {
    display: flex;
    flex-direction: row;
  }*/
  .entry > * {
/*    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    max-width: 100%;
    width: auto;*/
    width: auto;
  }
  .info {
    background-repeat: no-repeat;
    background-position: right top;
  }
  h1 {
    margin: 0;
  }
</style>