<script setup>
import colorTypeJs from "../helpers/PokeTypeColor.js";
import { defineProps, defineEmits, computed } from "vue";
import { formatPokemonId } from "../helpers/formatPokemonId.js";

// Le détail est maintenant géré par le composant parent

const props = defineProps({
  pokemon: Object,
});

// export function formatPokemonId(id) {
//   if (id === undefined || id === null) return "???";
//   return "#" + id.toString().padStart(3, "0");
// }
 
const emit = defineEmits(['select-pokemon-click']);

function handleClick() {
  // Émettre un événement pour le parent au lieu d'afficher le détail ici
  emit('select-pokemon-click', props.pokemon);
}

const pokeId = formatPokemonId(props.pokemon?.pokedex_id)

const pokeTypeImg = props.pokemon?.types;

pokeTypeImg.forEach((ele) => {
  console.log(ele.image)
})

const imageSrcType = (img) => {
  return img || '/images/default.png';
}


</script>

<template>
  
    <!-- Composant PokemonCard
    
    Ce composant sert de parent (PokemonCard.vue) pour le composant PokemonDetail.
    Il affiche probablement une carte avec des informations basiques sur un Pokémon,
    qui peut être cliquée/étendue pour montrer plus de détails via le composant enfant.
    
    Structure hiérarchique:
    - PokemonCard (ce composant)
      - PokemonDetail (enfant) -->
   

  <!-- Le modal PokemonDetail est maintenant géré par le composant parent -->

  <li
    @click="handleClick"
    class="px-20 py-10 border-2 rounded-2xl flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition"
  >
    <p>{{ pokeId }}</p>
    <h2 class="text-2xl font-bold">{{ pokemon.name.fr }}</h2>
    <img :src="pokemon.sprites.regular" class=" mb-5"/>
    <div class="flex flex-row gap-2">
      <span
        v-for="typePoke in pokemon.types"
        :key="typePoke.name"
        :class="[
          colorTypeJs(typePoke.name),
          'text-white px-4 py-1 rounded-2xl text-center mb-1',
        ]"
      >
        {{ typePoke.name }}
        <img :src="imageSrcType(typePoke.image)" class=" w-10 h-10 mt-2 m-auto"></img>
      </span>
    </div>
  </li>
</template>
