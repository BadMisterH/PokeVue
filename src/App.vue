<script setup>
import { ref, onMounted } from "vue";
import PokemonCard from "./components/PokemonCard.vue";
import Search from "./components/Search.vue";

const pokemon = ref(null);
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

    const gen1PokeAll = filteredResult.filter((pokemon) => {
      return pokemon.pokedex_id <= 3;
    });

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

onMounted(fetchPokemon);
</script>

<template>
  <Search :pokemonSearch="pokemon" />
  <div v-if="error" class="text-red-500 p-4">
    <h2>Erreur : {{ error }}</h2>
  </div>
  <div v-else-if="pokemon"></div>
  <div v-else>
    <h2>Chargement...</h2>
  </div>
</template>
