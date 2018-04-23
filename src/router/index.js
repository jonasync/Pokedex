import Vue from 'vue'
import Router from 'vue-router'
import Pokedek from '../components/Pokedek'
import PokemonPopup from '../components/PokemonPopup'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Pokedek',
      component: Pokedek,
      children: [
        { 
          path: ':id', 
          component: PokemonPopup, 
          name: 'pokemon-popup', 
          props: true 
        }
      ]
    }
  ]
})
