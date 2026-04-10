import { Suspense } from 'react';
import { PokemonCase } from '@/widgets/pokemon-case'; // Ajusta el nombre según lo que exportaste

export function PokemonPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-600">
        Lista de Pokémon
      </h1>
      <Suspense
        fallback={
          <p className="text-center text-gray-500">Cargando la Pokédex...</p>
        }
      >
        <PokemonCase />
      </Suspense>
    </main>
  );
}
