const url = "https://pokeapi.co/api/v2/";

function buildPokemonPage(list) {
    const container = document.querySelector(".results-container");
    list.forEach((element) => {
        const linkCard = document.createElement("a");
        const pokemonImage = document.createElement("img");
        const pokemonName = document.createElement("h1");
        const imgPath = `assets/images/${String(getPokemonIdByURL(element.url)).padStart(3, 0)}.png`;
        
        linkCard.classList.add('pokemon-card');
        linkCard.appendChild(pokemonImage);
        linkCard.setAttribute('href', element.url);
        linkCard.appendChild(pokemonName);
        
        pokemonImage.setAttribute('src', imgPath);
        pokemonName.innerText = element.name;

        container.appendChild(linkCard);
    });

}

function getPokemonIdByURL(url) {
    const regex = /pokemon\/(\d+)\//;
    return url.match(regex)[1];
};

async function getPokemonByPageAndNumberOfResults(page, numberOfResults) {
    const response = await fetch(url + `pokemon?offset=${(page - 1)*numberOfResults}&limit=${numberOfResults}`);
    const data = await response.json();
    buildPokemonPage(data.results);
}

getPokemonByPageAndNumberOfResults(1, 20);