import { useState, useEffect } from "react";
import styles from "./pokebox.module.css";

function Pokebox() {
  let [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await fetch("https://pokeapi.co/api/v2/pokemon/?limit=" + 20)
      .then((response) => response.json())
      .then((result) => setPokemon(result.results));
  }


  if(pokemon) {
    return (
      <>
        {pokemon.map((pokemon) => (
          <div key={pokemon.id} className={styles.pokebox}>
            <p>#{pokemon.id}</p>
            <p>{pokemon.name}</p>
          </div>
        ))}
      </>
    );
  } else {
    <p>loading</p>
  }
}

export default Pokebox;

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
