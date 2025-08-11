<script setup>
import { ref, computed } from 'vue';
import PokemonCard from './PokemonCard.vue';

const dataInfoInput = ref("")

const props = defineProps({
  pokemonSearch: Array
})

const filteredPokemon = computed(() => {
  if (!props.pokemonSearch || !Array.isArray(props.pokemonSearch)) {
    return [];
  }
  return props.pokemonSearch.filter(pokemon =>
    pokemon.name.fr.toLowerCase().includes(dataInfoInput.value.toLowerCase())
  );
})


</script>

<template>
<input class=" input input-primary" type="text" v-model="dataInfoInput" placeholder="Rechercher un Pokémon..."></input>

<!-- Affichage avec les cartes Pokémon -->
<div v-if="filteredPokemon.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-[50px]">
  <PokemonCard v-for="pokemon in filteredPokemon" :key="pokemon.name.fr" :pokemon="pokemon" />
</div>

<!-- Message si aucun Pokémon trouvé -->
<div v-else-if="dataInfoInput && filteredPokemon.length === 0" class="text-center p-10">
  <p class="text-lg text-gray-500">Aucun Pokémon trouvé pour "{{ dataInfoInput }}"</p>
</div>

<!-- Message si pas de recherche en cours -->
<div v-else-if="!dataInfoInput" class="text-center p-10">
  <p class="text-lg text-gray-500">Tapez le nom d'un Pokémon pour commencer la recherche</p>
</div>

</template>