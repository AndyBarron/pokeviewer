<template>
  <span :class='name'>{{name}}</span>
</template>

<script>
export default {
  name: 'type-name',
  props: ['name'],
};
</script>

<style scoped>
.poison {
  color: purple;
}
.grass {
  color: green;
}
.electric {
  color: yellow;
}
.psychic {
  color: pink;
}
.steel {
  color: gray;
}
</style>