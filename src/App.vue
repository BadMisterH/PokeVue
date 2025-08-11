<script setup>
import { ref, onMounted } from "vue";
import PokemonCard from './components/PokemonCard.vue'
import Search from "./components/Search.vue";

const pokemon = ref(null);
const loading = ref(true);
const error = ref("");
const isActive = ref(false);

async function fetchPokemon() {
  loading.value = true;
  error.value = "";

  try {
    const response = await fetch(
      "https://tyradex.vercel.app/api/v1/gen/1"
    );
    if (!response.ok) throw new Error("Erreur réseau");
    const result = await response.json();
    await new Promise(resolve => setTimeout(resolve, 2000));
    isActive.value = true
    pokemon.value = result;
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchPokemon);
</script>

<template>
  <Search :pokemonSearch="pokemon"/>
  <div v-if="pokemon">
 
  </div>
  <div v-else> 
    <h2>Chargement...</h2>
  </div>
</template>


