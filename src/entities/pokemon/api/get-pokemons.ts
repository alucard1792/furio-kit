import { pokemonListResponseSchema } from '../model/types';

export async function getPokemons(limit = 20, offset = 0) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch pokemons');
  }

  const data = await res.json();

  // ¡Aquí ocurre la magia! Validamos con zod que la respuesta de pokedex
  // sea exactamente lo que esperamos antes de retornarla.
  return pokemonListResponseSchema.parse(data);
}