<template>
  <div>
    <section class="container">
      <div class="row">
        <input class="search" type="text" v-model="filterBy" :placeholder="search_placeholder">
      </div>
      <div :class="['row grid', {left}]">
        <pokemon-card v-for="(pokemon, index) in pokemonFiltered" 
          :pokemon="pokemon" :key="index"
          v-on:eventSetModal="setModal"
        />
      </div>
      <loader v-if="loading"/>
    </section>
    <router-view :pokemon="pokemonModal"/>
  </div>
</template>

<script>
import PokemonCard from './PokemonCard'
import Loader from './Loader'
import getPokemons from '../api'

export default {
  name: 'Pokedek',
  components: {
    PokemonCard,
    Loader
  },
  data () {
    return {
      filterBy: '',
      loading: false,
      next: null,
      pokemons: [],
      pokemonModal: null,
      search_placeholder: 'Filtrar pokemons por nombre...',

      // This is for limit the API queries
      limit: 3,     // Number of pokemon by query
      counter: 1,   // Init queries counter
      loops: 2,     // Number of queries to do
    }
  },
  beforeMount() {
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
    },
    left: function(){
      return this.pokemonFiltered.length <= 2
    }
  },
  methods: {
    getData: function(){
      this.loading = true
      getPokemons( this.next, this.limit )
      .then( request => {
        request.results.forEach(element => {
          this.pokemons.push(element)
        });
        
        if(request.next && this.counter < this.loops){
          this.counter++
          this.next = request.next
          this.getData()
        }else{
          this.loading = false
        }
        this.pokemonModal = this.pokemons[0]
      })
    },
    setModal: function (pokemon) {
      this.pokemonModal = pokemon
    }
  }
}
</script>

<style lang="scss">

// Enter/Leave Components Animations
.fade-enter-active, .fade-leave-active {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-popup-enter-active, .fade-popup-leave-active {
  opacity: 0;
  transform: scale(0, 0) translateY(-500px);
}

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

  &.left {
    justify-content: flex-start;

    .item {
      margin-right: 50px;
    }

  }
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

  @media (max-width: 750px) {
    .grid {
      justify-content: space-between;
    }
  }
</style>
