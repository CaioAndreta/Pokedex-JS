const url = "https://pokeapi.co/api/v2/"

async function getPokemonByPage(page) {
    const response = await fetch(url + `pokemon`);
    const data = await response.json();
    console.log(data);
}

getPokemonByPage(1);