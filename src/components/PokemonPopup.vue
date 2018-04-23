<template>
  <transition name="fade-popup">
    <div class="item" v-if="pokemon != null" @click="$router.go(-1)">
      <div class="card-img">
        <img class="picture front_default" :src="pokemon.sprites.front_default" 
          :alt="pokemon.name">
        <div class="id">ID / {{pokemon.id}}</div>
      </div>
      <div class="card-body">
        <h2 class="card-title"> {{ pokemon.name }} </h2>
        <ul>
          <li class="tag" v-for="(tag, i) in pokemon.types" :key="i"> 
            {{ tag.type.name }} 
          </li>
        </ul>
        <div class="evolution" v-if="pokemon.species.evolves_from_species">
          <p>Evoluciona de:</p>
          <h3 class="h3"> {{ pokemon.species.evolves_from_species.name }} </h3>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'pokemon-popup',
  props: {
    pokemon: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>

$primary-color: #000000;
$secondary-color: #795548;

  .item {
    height: 95vh;
    left: 2.5vw;
    position: absolute;
    top: 2.5vh; 
    width: 95vw;
    margin: 0px;
  }
</style>
