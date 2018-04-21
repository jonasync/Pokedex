require("babel-polyfill");

const URL = `http://pokeapi.salestock.net/api/v2/pokemon/`

export default async function getPokemons ( url = null, limit = 2  ) {
  url = (url != null)? url : `${URL}?limit=${limit}`;
  console.log(url)

  const response = await fetch( url )
  let responseJson = await response.json()
  responseJson.results = await addPokemonInfo( responseJson.results )
  return responseJson
}

async function addPokemonInfo (array) {
  let output = []
  for (const item of array) {
    let pokemonInfo = await fetch(item.url)
    let pokemonInfoJson = await pokemonInfo.json()
    pokemonInfoJson.species.evolves_from_species = await addPokemonEvolution(pokemonInfoJson.species.url)
    output.push( pokemonInfoJson )
  }
  return output
}

async function addPokemonEvolution (url) {
  let pokenEvo = await fetch(url)
  let pokenEvoJson = await pokenEvo.json()
  return pokenEvoJson.evolves_from_species
}