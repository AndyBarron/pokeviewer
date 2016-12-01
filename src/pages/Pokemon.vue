<template>
  <div>
    <pokedex-entry v-if='info' v-bind:info='info'></pokedex-entry>
    <h1 v-else>loading...</h1>
  </div>
</template>

<script>
import PageTitle from '../mixins/PageTitle';
import PokedexEntry from '../components/PokedexEntry.vue';
import dex from '../pokedex';

const CACHE_SECONDS = 24 * 60 * 60; // one day

export default {
  name: 'pokemon',
  mixins: [PageTitle],
  data () {
    return {
      info: null,
    };
  },
  components: {
    PokedexEntry,
  },
  computed: {
    title: function() {
      return (this.info && this.info.name) || '';
    },
  },
  methods: {
    fetchInfo_: function(id) {
      dex.getPokemonByName(id.toLowerCase()).then((info) => {
        this.info = info;
        window.info = info;
      });
    },
  },
  mounted () {
    const id = this.$route.params.id;
    this.fetchInfo_(id);
  },
  watch: {
    '$route' ($route) {
      const id = $route.params.id;
      this.fetchInfo_(id);
    }
  },
}
</script>
