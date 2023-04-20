import React, { useState, useEffect } from "react";
import styles from "./pokebox.module.css";

function Pokebox() {
  let [pokemon, setPokemon] = useState(null);
  let [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      let data = await response.json();
      let promises = data.results.map(async (result) => {
        let pokemonResponse = await fetch(result.url);
        return pokemonResponse.json();
      });
      const pokemonData = await Promise.all(promises);
      setPokemon(pokemonData);
    }

    fetchData();
  }, [page]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="poke-container">
      {pokemon.map((pkmn) => (
        <div key={pkmn.id} className={styles.pokebox}>
          <p>#{pkmn.id}</p>
          <p>{pkmn.name}</p>
          <p>
            Type: {pkmn.types[0].type.name} {pkmn.types[1]?.type.name}
          </p>
          <img src={pkmn.sprites.front_default} alt="pokemon" />
        </div>
      ))}
    </div>
  );
}

export default Pokebox;


/* import { useState, useEffect } from "react";
import styles from "./pokebox.module.css";

function Pokebox() {
  let [pokemon, setPokemon] = useState(null);
  let [page, setPage] = useState(0);

  useEffect(() => {
    let pokemonsData = [];

    async function fetchData() {
      await fetch("https://pokeapi.co/api/v2/pokemon?limit=" + 20)
        .then((response) => response.json())
        .then(function (allpokemonurl) {
          allpokemonurl.results.forEach(function (pokemonurl) {
            fetchPokemonData(pokemonurl);
          });
        });

      async function fetchPokemonData(pokemonurl) {
        await fetch(pokemonurl.url)
          .then((response) => response.json())
          .then((pkmn) => pokemonsData.push(pkmn));
      }
      setPokemon(pokemonsData);
    }

    fetchData();
    setPage(2);
    console.log(pokemon);
  }, [page]);
  

  return (
    <>
      {pokemon.map((pkmn) => (
        <div key={pkmn.id}>
          <p>#{pkmn.id}</p>
          <p>{pkmn.name}</p>
          <p>
            Type: {pkmn.types[0].type.name} {pkmn.types[1]?.type.name}
          </p>
          <img src={pkmn.sprites.front_default} alt="pokemon" />
        </div>
      ))}
    </>
  );
}

export default Pokebox; */





/* import { useState, useEffect } from "react";
import styles from "./pokebox.module.css";

function Pokebox() {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/1"
        );

      const data = await response.json();
      setPokemon(data);
    }
    fetchData();
  }, []);

  return pokemon ? (
    <div className={styles.pokebox}>
      <div>
        <p>#{pokemon.id}</p>
        <p>{pokemon.name}</p>
        <p>
          Type: {pokemon.types[0].type.name} {pokemon.types[1]?.type.name}
        </p>
      </div>
      <img src={pokemon.sprites.front_default} alt="pokemon" />
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default Pokebox; */
