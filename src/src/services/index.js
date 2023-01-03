import axios from "axios";

const baseUrl = `https://pokeapi.co/api/v2/pokemon`;

class PokemonService {
    async getAllPokemons() {
        try {
            const response = await axios.get(baseUrl);

            return response

        } catch (e) {
            return e
        }
    }

    async getPokemonByUrl(url) {
        try {
            const response = await axios.get(`${url}`);

            return response
        } catch (e) {
            return e
        }
    }
}

export { PokemonService }