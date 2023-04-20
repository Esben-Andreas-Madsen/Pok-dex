import { useState, useEffect } from "react";
import styles from "./pokebox.module.css";

function Pokebox() {
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=20`
      );
      const data = await response.json();
      const pokemonsData = await Promise.all(
        data.results.map(async (pokemonurl) => {
          const response = await fetch(pokemonurl.url);
          return response.json();
        })
      );
      setPokemon(pokemonsData);
      console.log(pokemonsData);
    }

    fetchData();
  }, [page]);

  function handleClick() {
    setPage((prevPage) => prevPage + 20);
  }

  return (
    <>
      <div className={styles.button}>
        <button onClick={handleClick}>Next Page</button>
      </div>
      <div className={styles.pokemonContainer}>
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
    </>
  );
}

export default Pokebox;
