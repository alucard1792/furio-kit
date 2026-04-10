import { PokemonPage } from '@/views/pokemon';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pokemons | furio-kit',
  description: 'Conoce a todos los pokemones',
};

export default function Page() {
  return <PokemonPage />;
}
