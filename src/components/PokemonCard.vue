<script setup>
import colorTypeJs from "../helpers/PokeTypeColor.js"

const props = defineProps({
  pokemon: Object
})

// Fonction pour formater l'ID avec des zéros au début
function formatPokemonId(id) {
  return "#" + id.toString().padStart(3, '0');
}

const pokeid = formatPokemonId(props.pokemon.pokedex_id)

</script>

<template>
    <li   :class="[
    'px-20 py-10 border-2 rounded-2xl flex flex-col justify-center items-center']">
    
    <p>{{pokeid}}</p>
    <h2 class=" text-2xl font-bold">{{ pokemon.name.fr }}</h2>
        <img :src="pokemon.sprites.regular"></img>
        <!-- afficher juste le span -->
      <div class="flex flex-row gap-1">
          <span v-for="typePoke in pokemon.types" :class="[colorTypeJs(typePoke.name), 'text-white px-4 py-1 rounded-2xl']">
        {{typePoke.name}}
        </span>
      </div>
   
    </li>
</template>
