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

export default {
  name: 'app',
  components: {
    PokemonCard
  },
  data () {
    return {
      msg: 'Pokedex',
      search_placeholder: 'Filtrar pokemons por nombre...',
      pokemons: [
        {
          name: 'Bulbasaur',
          image: 'http://lorempixel.com/48/48/people/1/',
          id: 1,
          types: [
            {
              name: 'poison'
            },
            {
              name: 'grass'
            },
          ]
        },
        {
          name: 'Ivysaur',
          image: 'http://lorempixel.com/48/48/people/2/',
          id: 1,
          types: [
            {
              name: 'poison'
            },
            {
              name: 'grass'
            },
          ],
          evolution: {
            name: 'Bulbasaur'
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss">

body {
  background-color: #fee445;
}
#app {
  font-family: Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
