/*
la forma correcta y recomendada de trabajar con Zod. Se llama composición de schemas y vas de lo más específico (interno) a lo más general (externo).
{
  "count": 1350,
  "next": "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
  "previous": null,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    ...
  ]
}
*/

import { z } from 'zod';

// Schema de validación para un Pokémon individual
export const pokemonTypeSchema = z.object({
  name: z.string(),
  url: z.string(),
});

// Schema de validación para la respuesta completa de la lista de Pokémon
export const pokemonListResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(pokemonTypeSchema), //se define el tipo de dato que va a tener cada elemento del array, en este caso es un PokemonTypeSchema
});

// Tipo TypeScript inferido: { name: string; url: string; }
export type PokemonResult = z.infer<typeof pokemonTypeSchema>;
// Tipo TypeScript inferido: { count: number; next: string | null; previous: string | null; results: PokemonType[]; }
export type PokemonListResponse = z.infer<typeof pokemonListResponseSchema>;
