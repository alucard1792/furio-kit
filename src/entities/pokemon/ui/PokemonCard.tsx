import type { PokemonResult } from '../model/types';

interface PokemonCardProps {
  pokemon: PokemonResult;
}

// Server Component — no interactivity; safe to keep as RSC.
export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="rounded border border-gray-200 bg-white p-4 shadow-sm">
      <p className="font-medium text-gray-900">{pokemon.name}</p>
      {/* TODO: render pokemon fields */}
    </div>
  );
}
