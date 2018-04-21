<template>
  <div class="item">
    <div class="picture">
      <img class="card-img-top" :src="pokemon.sprites.front_default" alt="Card image cap">
      <span>ID / {{pokemon.id}}</span>
    </div>
    <div class="card-body">
      <h5 class="card-title"> {{ pokemon.name }} </h5>
      <ul>
        <li class="tag" v-for="(tag, i) in pokemon.types" :key="i"> {{ tag.type.name }} </li>
      </ul>
      <div class="evolution" v-if="pokemon.species.evolves_from_species">
        <p>Evoluciona de:</p>
        <h2> {{ pokemon.species.evolves_from_species.name }} </h2>
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

<style scoped>

</style>
