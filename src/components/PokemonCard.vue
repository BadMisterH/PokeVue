<script setup>
import colorTypeJs from "../helpers/PokeTypeColor.js";
import { defineProps, ref } from "vue";
import PokemonDetail from "./PokemonDetail.vue";
import { formatPokemonId } from "../helpers/formatPokemonId.js";

const selectedPoke = ref(null);

function closeDetailView() {
  selectedPoke.value = null;
}

const props = defineProps({
  pokemon: Object,
});

// export function formatPokemonId(id) {
//   if (id === undefined || id === null) return "???";
//   return "#" + id.toString().padStart(3, "0");
// }

function handleClick() {
  console.log("Pokemon cliqué")
  selectedPoke.value = props.pokemon; //cliquer sur la carte donc valeur
}

const pokeId = formatPokemonId(props.pokemon?.pokedex_id)

</script>

<template>
  
    <!-- Composant PokemonCard
    
    Ce composant sert de parent (PokemonCard.vue) pour le composant PokemonDetail.
    Il affiche probablement une carte avec des informations basiques sur un Pokémon,
    qui peut être cliquée/étendue pour montrer plus de détails via le composant enfant.
    
    Structure hiérarchique:
    - PokemonCard (ce composant)
      - PokemonDetail (enfant) -->
   

  <PokemonDetail
    :pokemon-test="selectedPoke"
    v-if="selectedPoke"
    :id="pokemon.pokedex_id"
    @close="closeDetailView"
  />

  <li
    @click="handleClick"
    class="px-20 py-10 border-2 rounded-2xl flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition"
  >
    <p>{{ pokeId }}</p>
    <h2 class="text-2xl font-bold">{{ pokemon.name.fr }}</h2>
    <img :src="pokemon.sprites.regular" />
    <div class="flex flex-row gap-1">
      <span
        v-for="typePoke in pokemon.types"
        :key="typePoke.name"
        :class="[
          colorTypeJs(typePoke.name),
          'text-white px-4 py-1 rounded-2xl',
        ]"
      >
        {{ typePoke.name }}
      </span>
    </div>
  </li>
</template>
