import { useCallback, useEffect, useState } from 'react';
import { PokemonService } from './src/services';

/*
Consuma a API e liste todos os pokemons da consulta do seguinte endpoint. 
https://pokeapi.co/api/v2/pokemon

Você deve exibir, de cada pokémon:
- imagem
- nome
- experiência

Você pode acessar as informações de cada pokemón individualmente em:
https://pokeapi.co/api/v2/pokemon/:id


DICA:
imagem => sprites.front_default
experiência => base_experience

EXTRA: se puder ordene por nome.
*/

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [details, setDetails] = useState([]);
  const setRemoveDuplicate = new Set();

  const filterPokemon = details.filter((x) => {
    const duplicatedPokemon = setRemoveDuplicate.has(x.id);
    setRemoveDuplicate.add(x.id);
    return !duplicatedPokemon;
  }).sort((a,b) => { return a.name.localeCompare(b.name)});

const pokemon = new PokemonService();

  useEffect(() => {
    getAllPokemons();
  }, [])

  useEffect(() => {
    if(pokemons.length) {
      getDetailsPokemon();
    }
  }, [pokemons])

  useEffect(() => {
    pokemonSort()
  }, [])

const pokemonSort = () => {
  details.sort((a,b) => {
    return a.name.localeCompare(b.name)
  })
}
 const getAllPokemons = async () => {
  pokemon.getAllPokemons().then((x) => { 
    setPokemons(x.data.results)
  }).catch((e) => {
    return e.message
  })
}

const getDetailsPokemon = async() => {
  pokemons.forEach((x) => {
    pokemon.getPokemonByUrl(x.url).then((y) => { 
      let pokeData = {
        id: y.data.id,
        name: y.data.name,
        image: y.data.sprites.front_default,
        power: y.data.base_experience
      }
      
      setDetails(details => [...details, pokeData])
    }).catch((e) => {
      return e.message
    })  
})
}

  return (
    <>
      <h3>desafio fernandev</h3>
      <h1>consumir api pokémon</h1>
          <table>
            <thead>
              <tr>
                <th >Image</th>
                <th >Name</th>
                <th >Power</th>
              </tr>
            </thead>
            <tbody>
              {
                filterPokemon.map((x, idx) => {
                  return (
                    <tr key={idx}>
                      <td><img src={x.image} width="100" height="100" /></td>
                      <td>{x.name[0].toUpperCase().concat(x.name.substring(1))}</td>
                      <td>{x.power}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

    </>
  );
}

export default App;
