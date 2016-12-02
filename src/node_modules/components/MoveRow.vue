<template>
  <tr>
    <td>{{move.name}}</td>
    <td>{{move.description}}</td>
    <template v-if='info'>
      <td>{{description}}</td>
    </template>
    <template v-if='!info'>
      <td text-loading>Loading...</td>
    </template>
  </tr>
</template>

<script>
import dex from '../pokedex';

export default {
  name: 'move-row',
  props: ['move'],
  mounted() {
    this.fetchInfo_(this.move.name);
  },
  methods: {
    fetchInfo_: function(name) {
      this.info = null;
      dex.getMoveByName(name).then((info) => {
        this.info = info;
      });
    },
  },
  watch: {
    move(move) {
      this.fetchInfo_(move.name);
    },
  },
  data() {
    return {info: null};
  },
  computed: {
    description() {
      return this.info.flavor_text_entries.find(entry => entry.language.name == 'en').flavor_text;
    }
  },
}
</script>