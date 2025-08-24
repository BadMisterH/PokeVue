<script setup>
import { ref, computed } from 'vue';
import PokemonCard from './PokemonCard.vue';
import PokemonDetail from './PokemonDetail.vue';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-vue-next';

const dataInfoInput = ref("")
const selectedType = ref(null)
const pokemonList = ref([])
const currentIndex = ref(0)
const showDetailModal = ref(false)

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

// Liste filtrée finale qu'on utilisera pour la navigation
const filteredFinalList = computed(() => {
  return filteredPokemon.value;
});

// Pokémon courant basé sur l'index actuel
const currentPokemon = computed(() => {
  if (filteredFinalList.value && filteredFinalList.value.length > 0) {
    return filteredFinalList.value[currentIndex.value];
  }
  return null;
});

// Fonctions de navigation
function prevPokemon() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}

function nextPokemon() {
  if (currentIndex.value < filteredFinalList.value.length - 1) {
    currentIndex.value++;
  }
}

// Fonction pour ouvrir le détail d'un Pokémon
function openPokemonDetail(pokemon) {
  // Trouver l'index du Pokémon cliqué dans la liste filtrée
  const index = filteredFinalList.value.findIndex(p => p.pokedex_id === pokemon.pokedex_id);
  if (index !== -1) {
    currentIndex.value = index;
  }
  showDetailModal.value = true;
}

// Fonction pour fermer le modal
function closeDetail() {
  showDetailModal.value = false;
}

function handleChange() {
  TypeFiltered(props.pokemonSearch, selectedType.value)
}

function TypeFiltered(pokemonList, selectChoose){
  const filteredPokemons = pokemonList.filter(pokemon => {
    // On récupère la liste des types (ex: ["Feu", "Vol"])
    return pokemon.types.some(type => PokemonType(type) === selectChoose);
  });

  return filteredPokemons;
}

const PokemonType = (eleTypePoke) => {
  switch (eleTypePoke) {
    case "Feu":
    case "Eau":
    case "Plante":
      return eleTypePoke;
    default:
      return null;
  }
};



//liste les pokemons pour leur types afin de les comparer et de leur donner une liste des poke du type qui correspond
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
  <option value="" name="Tous les types">Tous les types</option>
  <option  v-for="type in pokemonTypes" :key="type" :value="type">{{ type }}</option>
</select>

<!-- Affichage avec les cartes Pokémon -->
<div v-if="filteredPokemon.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-[50px]">
  <PokemonCard 
    v-for="pokemon in filteredPokemon" 
    :key="pokemon.name.fr" 
    :pokemon="pokemon" 
    @select-pokemon-click="openPokemonDetail(pokemon)"
    
  />
</div>

<!-- Message si aucun Pokémon trouvé -->
<div v-else-if="dataInfoInput && filteredPokemon.length === 0" class="text-center p-10">
  <p class="text-lg text-gray-500">Aucun Pokémon trouvé pour "{{ dataInfoInput }}"</p>
</div>

<!-- Message si pas de recherche en cours -->
<div v-else-if="!dataInfoInput" class="text-center p-10">
  <p class="text-lg text-gray-500">Tapez le nom d'un Pokémon pour commencer la recherche</p>
</div>

<!-- Modal avec les détails du Pokémon et les flèches de navigation -->
<div v-if="showDetailModal && currentPokemon" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
  <div class="relative bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
    <!-- Le détail du Pokémon -->
    <PokemonDetail :pokemonTest="currentPokemon" @close="closeDetail" />
    
    <!-- Les boutons de navigation -->
    <div class="flex justify-between items-center mt-4 px-4">
      <button 
        @click="prevPokemon" 
        :class="['flex items-center justify-center p-2 rounded-full', currentIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-800 hover:bg-gray-100']"
        :disabled="currentIndex === 0"
      >
        <ArrowBigLeft size="30" />
      </button>
      <span class="text-lg font-medium">{{ currentIndex + 1 }} / {{ filteredFinalList.length }}</span>
      <button 
        @click="nextPokemon" 
        :class="['flex items-center justify-center p-2 rounded-full', currentIndex === filteredFinalList.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-800 hover:bg-gray-100']"
        :disabled="currentIndex === filteredFinalList.length - 1"
      >
        <ArrowBigRight size="30" />
      </button>
    </div>
  </div>
</div>

</template>