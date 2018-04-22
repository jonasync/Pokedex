require("babel-polyfill");

// const URL = `https://pokeapi.salestock.net/api/v2/pokemon/`
const URL = `https://pokeapi.co/api/v2/pokemon/`

export default async function getPokemons ( url = '', limit = 1  ) {
  url = ( url )? url : `${URL}?limit=${limit}`;
  let responseJson = null

  if( localStorage.getItem( url ) ){
    responseJson = JSON.parse( localStorage.getItem( url ) )
  }else{
    const response = await fetch( url )
    responseJson = await response.json()
    localStorage.setItem( url, JSON.stringify( responseJson ) );
  }

  responseJson.results = await addPokemonInfo( responseJson.results )
  return responseJson
}

async function addPokemonInfo (array) {
  let output = []
  let pokemonInfoJson = null
  for (const item of array) {
    if( localStorage.getItem( item.url ) ){
      pokemonInfoJson = JSON.parse( localStorage.getItem( item.url ) )
    }else{
      let pokemonInfo = await fetch(item.url)
      pokemonInfoJson = await pokemonInfo.json()
      localStorage.setItem( item.url, JSON.stringify( pokemonInfoJson ) );
    }
    pokemonInfoJson.species.evolves_from_species = await addPokemonEvolution(pokemonInfoJson.species.url)
    output.push( pokemonInfoJson )
  }
  return output
}

async function addPokemonEvolution (url) {
  if( localStorage.getItem( url ) ){
    return JSON.parse( localStorage.getItem( url ) )
  }else{
    let pokenEvo = await fetch(url)
    let pokenEvoJson = await pokenEvo.json()
    localStorage.setItem( url, JSON.stringify(pokenEvoJson.evolves_from_species) );

    return pokenEvoJson.evolves_from_species
  }
}