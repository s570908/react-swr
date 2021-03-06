import React from "react";
import useSWR, { useSWRPages } from "swr";
import { Pokemon } from "./components/Pokemon";

export const usePagination = (path) => {
  const { pages, isLoadingMore, loadMore, isReachingEnd } = useSWRPages(
    "pokemon-page",
    ({ offset, withSWR }) => {
      console.log("pages", pages);
      const url = offset || `https://pokeapi.co/api/v2${path}`;
      const { data: result, error } = withSWR(useSWR(url));

      if (error) return <h1>Something went wrong!</h1>;
      if (!result) return <h1>Loading...</h1>;

      return result.results.map((pokemon) => (
        <Pokemon key={pokemon.name} pokemon={pokemon} />
      ));
    },
    (SWR) => SWR.data.next,

    []
  );

  return { pages, isLoadingMore, loadMore, isReachingEnd };
};
