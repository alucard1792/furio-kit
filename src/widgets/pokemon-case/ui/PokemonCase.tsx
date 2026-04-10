// Importamos la función de la API y el componente visual desde la entidad
import { getPokemons, PokemonCard } from '@/entities/pokemon';

// ¡Nota que la función del componente tiene la palabra 'async'!
export async function PokemonCase() {
  // 1. Pedimos los datos al servidor (esto ocurre antes de que el usuario vea la página)
  const data = await getPokemons();

  // 2. Renderizamos la lista de pokemones usando el array 'results'
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Pokédex</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.results.map((pokemon) => (
          // Le pasamos el objeto completo 'pokemon' a tu tarjeta
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </section>
  );
}
