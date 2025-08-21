<script setup>
import { ref, defineEmits, computed } from "vue";
import colorTypeJs from "../helpers/PokeTypeColor.js"
import { formatPokemonId } from "../helpers/formatPokemonId.js";

const props = defineProps({
  pokemonTest: Object,
});

const emit = defineEmits(['close'])
const pokemon = ref(null);

function closeCard(){
  emit('close') //on a créer un propriété én plus pour PokemonDetail
}
pokemon.value = props.pokemonTest;
console.log(pokemon)

const idPokedex = formatPokemonId(pokemon.value?.pokedex_id);

const imageSrc = computed(() => {
  return pokemon.value?.sprites?.regular || '/images/default.png';
})

</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div class="px-5 py-5 card bg-base-100 w-96 border-2 border-amber-400 rounded-2xl">
        <button class=" absolute right-5 cursor-pointer" @click="closeCard">Close</button>

      <h2>{{ pokemon?.name?.fr }}</h2>
      {{ idPokedex }}
      <h3>Generation {{ pokemon.generation }}</h3>
      <div class="flex flex-wrap gap2 mt-2">
        <span v-for="pokeOneType in pokemon?.types" :key="pokeOneType.name" :class="[colorTypeJs(pokeOneType.name), 'px-3 rounded-2xl']">
          {{pokeOneType.name}}
        </span>
      </div>
      <img :src="imageSrc" alt="Pokémon"></img>

      <div class="flex flex-col justify-center items-center gap-2">
        <h2 class=" text-2xl">About</h2>
        <div class="grid grid-cols-3 border-2 gap-10">
          <span class=" flex flex-col gap-1"><h3>Weight</h3> <p>{{ pokemon?.weight }}</p></span>
          <span class=" flex flex-col gap-1"><h3>Height</h3> {{ pokemon?.height }}</span>
          <span class=" flex flex-col gap-1"><h3>Moves</h3></span>
        </div>
      </div>
    </div>
  </div>
</template>
