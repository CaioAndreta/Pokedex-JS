const url = "https://pokeapi.co/api/v2/";
const pokemonImgURL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
let nextPageURL;
const params = new URLSearchParams(window.location.search);

function showSpinner() {
  console.log('mostrou')
  const spinner = document.querySelector(".lds-ring");
  spinner.style.display = 'block';
}

function hideSpinner() {
  console.log('escondeu')
  const spinner = document.querySelector(".lds-ring");
  spinner.style.display = 'none';
}

function buildPokemonPage(data) {
  showSpinner();
  const results = data.results;
  const container = document.querySelector(".results-container");

  nextPageURL = data.next;
  results.forEach((element) => {
    const pokemonId = getPokemonIdByURL(element.url);
    const linkCard = document.createElement("a");
    const pokemonImage = document.createElement("img");
    const pokemonName = document.createElement("h1");
    const imgPath = pokemonImgURL + pokemonId + ".png";

    linkCard.classList.add("pokemon-card");
    linkCard.appendChild(pokemonImage);
    linkCard.setAttribute("href", `pokemon-details.html?id=${pokemonId}`);
    linkCard.appendChild(pokemonName);

    pokemonImage.setAttribute("src", imgPath);
    pokemonImage.setAttribute("loading", "lazy");
    pokemonName.innerText = element.name;

    container.appendChild(linkCard);
  });

  hideSpinner();
}

function getPokemonIdByURL(url) {
  const regex = /pokemon\/(\d+)\//;
  return url.match(regex)[1];
}

async function getPokemonByNumberOfResults(numberOfResults) {
  const response = await fetch(url + `pokemon?limit=${numberOfResults}`);
  const data = await response.json();
  console.log(data);
  buildPokemonPage(data);
}

async function loadMorePokemon(url) {
  const response = await fetch(url);
  const data = await response.json();
  buildPokemonPage(data);
}

