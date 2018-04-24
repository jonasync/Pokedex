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

      // Esto es para limitar el numero de peticiones que se hace al API.
      limit: 2,     // Numero de pokemos por petición
      counter: 1,   // Contador
      loops: 15     // Numero de peticiones a realizar
    }
  },
  beforeMount() {
    console.info(`Mostrando solo ${this.limit*this.loops} pokemons. Tardarán en aparecer todas algo más de 70 segundos.`)
    this.getData()
  },
  computed: {
    pokemonFiltered: function(){
      if( this.filterBy != '' ){
        return this.pokemons.filter( (item) => {
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
.grow-enter-active, .grow-leave-active {
  opacity: 0;
  transform: scale(0);
}
.fade-popup-enter-active, .fade-popup-leave-active {
  opacity: 0;
  transform: translateX(50px);
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

#app::before, #app::after {
  content: "";
  background-color: black;
  display: block;
  height: 100px;
  left: -50px;
  width: 100px;
  z-index: -1;
  position: fixed;
  top: -50px;
  transform: rotate(45deg);
}

#app::after {
  left: inherit;
  right: -50px;
}

.container {
  margin: 0 auto;
  width: 80%;
}

.container::before,
.container::after {
  content: "";
  background-color: red;
  border-radius: 50%;
  bottom: -60px;
  display: block;
  height: 120px;
  left: -60px;
  position: fixed;
  width: 120px;
  z-index: -1;
}
.container::after {
  left: inherit;
  right: -60px;
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
