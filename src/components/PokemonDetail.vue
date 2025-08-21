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

const resultTalent = pokemon.value?.talents.map((talentUnique) => {
   return talentUnique.name
})

const functionStatsCustomPoke = (value) => {
  const maxStat = 255; 
  return (value / maxStat) * 100; // donne un pourcentage
};

const resultDataStats = Object.entries(pokemon.value?.stats || {})


for (let i = 0; i<resultDataStats.length; i++){
  resultDataStats[i].forEach(ele => console.log(ele))
}


const functionStatsCustom = (stats) => {
  switch(stats){
    case 'hp':
      return Math.round(functionStatsCustomPoke(pokemon.value?.stats?.hp));
    case "atk":
      return Math.round(functionStatsCustomPoke(pokemon.value?.stats?.atk));
    case "def":
      return Math.round(functionStatsCustomPoke(pokemon.value?.stats?.def));
    case "spe_def":
      return Math.round(functionStatsCustomPoke(pokemon.value?.stats?.def));
    case "spe_atk":
      return Math.round(functionStatsCustomPoke(pokemon.value?.stats?.spe_atk));
    case "vit":
      return Math.round(functionStatsCustomPoke(pokemon.value?.stats?.vit));
    default:
      return 0
  }
}


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
        <div class="grid grid-cols-3 gap-10 text-center">
          <span class=" flex flex-col gap-1"><h3>Weight</h3> <p>{{ pokemon?.weight }}</p></span>
          <span class=" flex flex-col gap-1"><h3>Height</h3> <p>{{ pokemon?.height }}</p></span>
          <span class=" flex flex-col gap-1"><h3>Talents</h3> <p>{{ resultTalent.slice(0, 2).join(', ')}}</p></span>
        </div>
      </div>

<div v-for="[statName, statValue] in resultDataStats" :key="statName" class="mb-2">
  <p>{{ statName }} : {{ statValue }}</p>
  
  <!-- Conteneur de la barre -->
  <div class="bg-gray-300 h-3 rounded w-full">
    <!-- Barre de progression -->
    <div
      class="bg-green-600 h-3 rounded"
      :style="{ width: functionStatsCustom(statName) + '%' }"
    ></div>
  </div>
</div>


    </div>
  </div>
</template>
