<template>
  <div id="app">
    <section class="container">
      <div class="row">
        <input class="search" type="text" v-model="filterBy" :placeholder="search_placeholder">
      </div>

      <div class="row grid">
        <pokemon-card v-for="(pokemon, index) in pokemonFiltered" :pokemon="pokemon" :key="index"></pokemon-card>
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
      search_placeholder: 'Filtrar pokemons por nombre...',
      pokemons: [],
      next: null,
      limit: 5,
      counter: 0,
      filterBy: ''
    }
  },
  created() {
    this.getData()
  },
  computed: {
    pokemonFiltered: function(){
      if( this.filterBy != '' ){
        return this.pokemons.filter( (item) => {
          console.log(item, this.filterBy)
          return item.name.toLowerCase().indexOf( this.filterBy.toLowerCase() ) > -1;
        })
      }else{
        return this.pokemons
      }
    }
  },
  methods: {
    getData: function(){
      getPokemons( this.next, this.limit )
      .then( request => {
        request.results.forEach(element => {
          this.pokemons.push(element)
        });
        
        if(request.next && this.counter < 2){
          this.counter++
          this.next = request.next
          this.getData()
        }
      })
    }
  }
}
</script>

<style lang="scss">

body {
  background: #fee445;
	border: 0;
  margin: 0px;
  padding: 0;
}
#app {
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.container {
  margin: 0 auto;
  width: 80%;
}

.row {
  display: flex;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
}

.search {
  border: 0px;
  box-shadow: 0 0 30px #cab73c;
  font-size: 1.2rem;
  margin: 20px 0 10px;
  padding: 1rem;
  text-align: center;
  width: 100%;

  &::placeholder {
    color: #bdbdbd;
    opacity: 1;
  }
}
</style>
