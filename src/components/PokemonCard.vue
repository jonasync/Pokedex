<template>
  <div class="item">
    <div class="picture">
      <img class="card-img-top" :src="pokemon.image" alt="Card image cap">
      <span>ID / {{pokemon.id}}</span>
    </div>
    <div class="card-body">
      <h5 class="card-title"> {{ pokemon.name }} </h5>
      <ul>
        <li class="tag" v-for="(tag, i) in pokemon.types" :key="i"> {{ tag.name }} </li>
      </ul>
      <div class="evolution" v-if="pokemon.evolution">
        <p>Evoluciona de:</p>
        <h2> {{ pokemon.evolution.name }} </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pokemon-card',
  props: ['pokemon']
}
</script>

<style lang="scss" scoped>

</style>
