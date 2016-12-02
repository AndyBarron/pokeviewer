<template>
  <table>
    <thead>
      <tr>
        <th>move</th>
        <th>learned</th>
        <th>details</th>
      </tr>
    </thead>
    <tbody>
      <move-row v-for='move in validMoves' v-bind:move='move'></move-row>
    </tbody>
  </table>
</template>

<script>
import MoveRow from './MoveRow.vue';

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
  name: 'move-table',
  props: ['moves'],
  computed: {
    validMoves() {
      const items = [];
      for (let moveInfo of this.moves) {
        // console.log(moveInfo);
        const moveName = moveInfo.move.name;
        const methods = [];
        for (let details of moveInfo.version_group_details) {
          if (details.version_group.name == 'omega-ruby-alpha-sapphire') {
            let methodName = details.move_learn_method.name;
            let level = details.level_learned_at;
            let description = level ? `level ${level}` : methodName;
            methods.push({name: methodName, level, description})
            // let method = details.move_learn_method.name;
            // let level = details.level_learned_at;
            // let description = level ? `level ${level}` : method;
            // let name = moveInfo.move.name;
            // items.push({name, method, level, description});
          }
        }
        methods.sort(methodcmp);
        if (methods.length) {
          items.push({name: moveName, description: methods.map(m => m.description).join(', ')});
        }
      }
      window.items = items;
      return items.sort(movecmp);
    },
  },
  components: {MoveRow}
}

</script>