import { useState, useEffect } from "react";
import styles from "./pokebox.module.css";

function Pokebox() {
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [largeImage, setLargeImage] = useState(null);

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
    }

    fetchData();
  }, [page]);

  function handleNextPage() {
    setPage((prevPage) => prevPage + 20);
  }

  function handlePrevPage() {
    setPage((prevPage) => Math.max(0, prevPage - 20));
  }

  function getTypeColor(typeName) {
    switch (typeName) {
      case "fire":
        return "#FF9C54";
      case "water":
        return "#5CAFFF";
      case "grass":
        return "#9BCF9B";
      case "electric":
        return "#FFE24C";
      case "ice":
        return "#7CD4FF";
      case "fighting":
        return "#FF6B6B";
      case "poison":
        return "#AA5DA1";
      case "ground":
        return "#D6B55F";
      case "flying":
        return "#A891FF";
      case "psychic":
        return "#FF6B94";
      case "bug":
        return "#95A43B";
      case "rock":
        return "#C9BB8A";
      case "ghost":
        return "#6D68D6";
      case "dragon":
        return "#8B77FF";
      case "dark":
        return "#6E584C";
      case "steel":
        return "#C9C9C9";
      case "fairy":
        return "#FFA1E8";
      default:
        return "#EDEDED";
    }
  }

  return (
    <>
      <div className={styles.buttonContainer}>
        <button onClick={handlePrevPage} disabled={page === 0}>
          Previous Page
        </button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
      <div className={styles.pokemonContainer}>
        {pokemon.map((pkmn, index) => (
          <div
            key={pkmn.id}
            className={styles.pokebox}
            style={{
              backgroundColor: getTypeColor(pkmn.types[0].type.name),
              border: `2px solid ${getTypeColor(pkmn.types[0].type.name)}`,
            }}
            onClick={() => setLargeImage(pkmn.sprites.other["official-artwork"].front_default)}
          >
            <div className={styles.pokemonImageContainer}>
              <img
                src={pkmn.sprites.front_default}
                alt={pkmn.name}
                className={styles.pokemonImage}
              />
            </div>
            <div className={styles.pokemonInfo}>
            <p>#{page + index + 1}</p>
              <p>{pkmn.name}</p>
              <p>
                {pkmn.types.map((type) => (
                  <div key={type.type.name} className={styles.pokemonType}
                    style={{ backgroundColor: getTypeColor(type.type.name) }}>
                    {type.type.name}
                  </div>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
      {largeImage && (
        <div className={styles.modalContainer} onClick={() => setLargeImage(null)}>
          <img src={largeImage} alt="Large Pokemon" className={styles.modalImage} />
        </div>
      )}
    </>
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
