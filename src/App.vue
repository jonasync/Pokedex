<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <h1>{{ msg }} </h1>
    <section class="container">
      <div class="row">
        <input class="search" type="text" :placeholder="search_placeholder">
      </div>

      <div class="row grid">
        <pokemon-card v-for="(pokemon, index) in pokemons" :pokemon="pokemon" :key="index"></pokemon-card>
      </div>

    </section>
  </div>
</template>

<script>
import PokemonCard from './components/PokemonCard'
import getPokemons from './api'

export default {
  name: 'app',
  components: {
    PokemonCard
  },
  data () {
    return {
      msg: 'Pokedex',
      search_placeholder: 'Filtrar pokemons por nombre...',
      pokemons: [],
      next: null,
      limit: 2
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData: function(){
      getPokemons( this.next, this.limit )
      .then( request => {
        this.pokemons = request.results
        this.next = request.next
      })
    }
  }
}
</script>

<style lang="scss">
body {
  background: #fee445;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin: 2rem;
}

.container {
  width: 80%;
  margin: 0 auto;
}

.row {
  width: 100%;
  display: flex;
}

.grid {
  display: flex;
  flex-wrap: wrap;
}

.item {
  // width: 33%;
  flex-grow: 1;
}

.search {
  font-size: 1rem;
  width: 100%;
  padding: 1rem;
  text-align: center;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
