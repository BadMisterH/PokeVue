export function formatPokemonId(id) {
  if (id === undefined || id === null) return "???";
  return "#" + id.toString().padStart(3, "0");
}