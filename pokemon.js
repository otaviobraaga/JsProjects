URL_POKEMON = 'https://pokeapi.co/api/v2/pokemon/'
URL_GEN = 'https://pokeapi.co/api/v2/pokemon-species/'
CORS_URL = 'https://cors-anywhere.herokuapp.com/'

document.querySelector("#search").addEventListener("click", getPokemon);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
  return string.toLowerCase();
}

function parse_types(){


}

function corsUrl(url) {
  return new URL(url, CORS_URL);
}

function getData() {
  let name_field = document.querySelector("#pokemonName");

  if (!name_field)
    return;

  let name = lowerCaseName(name_field.value);
  const poke_url = new URL(name, URL_POKEMON);
  const gen_url = new URL(name, URL_GEN);

  let poke = fetch(corsUrl(poke_url)).then((response) => response.json());
  let gen = fetch(corsUrl(gen_url)).then((response) => response.json());

  return Promise.all([poke, gen]).then((data) => {
    let poke = data[0];
    let gen = data[1];

    return {
      id: poke.id,
      name: poke.name,
      weight: poke.weight,
      height: poke.height,
      artwork: poke.sprites.other["official-artwork"].front_default,
      types: poke.types.map((slot) => slot.type.name),
      gen: gen.generation.name
    }
  });
}


function getPokemon(e) {
  let data = getData();

  if (!data)
    return;

  data.then((data) => {
    document.querySelector(".pokemonBox").innerHTML = `
<div>
  <img
    src="${data.artwork}"
    alt="Pokemon name"
  />
</div>
<div class="pokemonInfos">
  <h1>${capitalizeFirstLetter(data.name)}</h3>
  <p>Peso: ${data.weight}</p>
  <p>Altura: ${data.height}</p>
  <p>Geração: ${data.gen}</p>
  <P>Tipo: ${capitalizeFirstLetter(data.types.join(', '))}
  <p>Numero: ${data.id}</p>
</div>`;
    console.log(data);
  });

   /*.catch((err) => {
      document.querySelector(".pokemonBox").innerHTML = `
  <h4>Pokemon não encontrado!</h4>
  `;
      console.log("Pokemon não encontrado!", err);
    });

  e.preventDefault();*/
}
