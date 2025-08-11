// Fonction JS classique
export default function colorTypeJs(type) {
  switch (type.toLowerCase()) {
    case "eau":
      return "bg-blue-400";
    case "feu":
      return "bg-red-500";
    case "plante":
      return "bg-green-500";
    case "électrik":
      return "bg-yellow-400";
    case "psy":
      return "bg-pink-400";
    case "glace":
      return "bg-cyan-300";
    case "dragon":
      return "bg-purple-600";
    case "ténèbres":
      return "bg-gray-800";
    case "fée":
      return "bg-pink-300";
    case "normal":
      return "bg-gray-400";
    case "combat":
      return "bg-red-700";
    case "poison":
      return "bg-purple-500";
    case "sol":
      return "bg-yellow-600";
    case "vol":
      return "bg-blue-300";
    case "insecte":
      return "bg-green-400";
    case "roche":
      return "bg-yellow-800";
    case "spectre":
      return "bg-indigo-600";
    case "acier":
      return "bg-gray-500";
    default:
      return "bg-gray-300";
  }
}
