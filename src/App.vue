<script setup>
import { ref, onMounted } from "vue";
import PokemonAllSearch from "./components/PokemonAllSearch.vue";

const pokemon = ref(null);
const filteredResultRef = ref(null); // Pour stocker tous les Pokémon filtrés
const loading = ref(true);
const error = ref("");
const isActive = ref(false);


async function fetchPokemon() {
  loading.value = true;
  error.value = "";

  try {
    console.log("Début de la requête...");
    const response = await fetch("https://tyradex.vercel.app/api/v1/pokemon", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    const filteredResult = result.filter((ele) => ele.pokedex_id !== 0);
    //filtre est detruit misigno 
    
    // Stocker le résultat filtré pour pouvoir y accéder en dehors de fetchPokemon
    filteredResultRef.value = filteredResult;
    
    // Par défaut, afficher seulement la génération 1
    const gen1PokeAll = filteredResult.filter(pokemon => pokemon.generation === 1);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    isActive.value = true;
    pokemon.value = gen1PokeAll;
  } catch (e) {
    console.error("Erreur complète:", e);
    error.value = e.message;
    pokemon.value = null;
  } finally {
    loading.value = false;
  }
}

// Fonction pour filtrer les Pokémon par génération
const handleSelectGen = (index) => {
  if (!filteredResultRef.value) return []; // Si les données ne sont pas encore chargées
  
  if (index === null || index === undefined) {
    // Si aucune génération n'est sélectionnée, retourner tous les Pokémon
    pokemon.value = filteredResultRef.value;
    return filteredResultRef.value;
  }
  
  const genNumber = index + 1;
  console.log("Filtrage par génération:", genNumber);
  const filteredByGen = filteredResultRef.value.filter(pokemon => pokemon.generation === genNumber);
  
  // Mettre à jour pokemon.value pour que les changements se reflètent dans l'interface
  pokemon.value = filteredByGen;
  
  return filteredByGen;
};

onMounted(fetchPokemon);
</script>

<template>
  <PokemonAllSearch @select-gen="handleSelectGen" :pokemonSearch="pokemon" />
  <div v-if="error" class="text-red-500 p-4">
    <h2>Erreur : {{ error }}</h2>
  </div>
  <div v-else-if="loading === true">
      <div class=" mt-10 animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 border-b-2 m-auto"></div>
  </div>
</template>
