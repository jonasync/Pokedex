<template>
  <div class="item">
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
</template>

<script>
export default {
  name: 'pokemon-card',
  props: ['pokemon']
}
</script>

<style lang="scss" scoped>

$primary-color: #000000;
$secondary-color: #795548;

  .item {
    background-color: #fff;
    box-shadow: 0 0 30px #cab73c;
    float: left;
    height: 270px;
    margin: 20px 0;
    width: 30%;

    .card-img {
      align-content: center;
      background-color: #d8d8d8;
      display: flex;
      height: 120px;
      justify-content: center;
      position: relative;
      width: 100%;

      img{
        align-self: center;
      }

      .id {
        background-color: #bbbbbb;
        bottom: 0px;
        color: $secondary-color;
        font-size: .8rem;
        font-weight: bold;
        left: 0;
        line-height: .8rem;
        padding: 5px;
        position: absolute;
        width: 50px;
      }
    }

    .card-body {
      text-align: left;
      padding: 15px 20px;

      h2{
        font-size: 1.4rem;
        font-weight: bold;
        margin: 0px;
        text-transform: capitalize;
      }
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;

        li.tag {
          border: 1px solid #cecece;
          border-radius: 5px;
          color: $secondary-color;
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 500;
          margin-right: 5px;
          padding: 3px;
          text-transform: uppercase;
        }
      }

      .evolution {
        border-left: 4px solid $secondary-color;
        line-height: 22px;
        margin-top: 10px;
        padding-left: 5px;

        p {
          margin: 3px 0 0;
          color: $secondary-color;
        }
        h3 {
          font-size: 1.4rem;
          margin: 0px;
          font-weight: normal;
        }
      }
    }
  }
</style>
