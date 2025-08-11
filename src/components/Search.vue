<script setup>
import { ref, computed } from 'vue';
import PokemonCard from './PokemonCard.vue';

const dataInfoInput = ref("")
const selectedType = ref(null)

const props = defineProps({
  pokemonSearch: Array
})

const pokemonTypes = [
  "Normal",
  "Feu",
  "Eau",
  "Électrik",
  "Plante",
  "Glace",
  "Combat",
  "Poison",
  "Sol",
  "Vol",
  "Psy",
  "Insecte",
  "Roche",
  "Spectre",
  "Dragon",
  "Ténèbres",
  "Acier",
  "Fée"
];


function handleChange() {
  // console.log('Type choisi :', selectedType.value);
  console.log(props.pokemonSearch)
  TypeFiltered(props.pokemonSearch.props)
  
}

function TypeFiltered(selectChoose="Fire", propsArrayPoke){
  propsArrayPoke = props.pokemonSearch
  propsArrayPoke.map(ele => {
    const dataTypePoke = ele.types
    TypePokeFiltreredDetail(dataTypePoke)
  })
}

function TypePokeFiltreredDetail(TypePokePokeDetail) {
  TypePokePokeDetail.map(ele => console.log(ele.name))
} //liste les pokemons pour leur types afin de les comparer et de leur donner une liste des poke du type qui correspond

// Computed pour filtrer par type
const filteredPokemonType = computed(() => {
  if (!props.pokemonSearch || !Array.isArray(props.pokemonSearch)) {
    return [];
  }
  
  if (!selectedType.value) {
    return props.pokemonSearch;
  }
  
  return props.pokemonSearch.filter(pokemon =>
    pokemon.types.some(type => type.name === selectedType.value)
  );
})

// Filtrage combiné (nom + type)
const filteredPokemon = computed(() => {
  let filtered = filteredPokemonType.value;
  
  if (dataInfoInput.value) {
    filtered = filtered.filter(pokemon =>
      pokemon.name.fr.toLowerCase().includes(dataInfoInput.value.toLowerCase())
    );
  }
  
  return filtered;
})


</script>

<template>
<input class=" input input-primary" type="text" v-model="dataInfoInput" placeholder="Rechercher un Pokémon..."></input>

<select @change="handleChange" v-model="selectedType" class="select select-primary">
  <option value="">Tous les types</option>
  <option  v-for="type in pokemonTypes" :key="type" :value="type">{{ type }}</option>
</select>

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