const COLORS = {fire:       '#FDDFDF',
                grass:      '#DEFDE0',
                eletric:    '#FCF7DE',
                water:      '#DEF3FD',
                ground:     '#f4e7da',
                rock:       '#d5d5d4',
                fairy:      '#fceaff',
                poison:     '#98d7a5',
                bug:        '#f8d5a3',
                dragon:     '#97b3e6',
                psychic:    '#eaeda1',
                flying:     '#F5F5F5',
                fighting:   '#E6E0D4',
                normal:     '#F5F5F5'
                };


let getPokemon = new XMLHttpRequest();
let listagem   = document.getElementById('pokemons');

getPokemon.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=10', true);
getPokemon.send();
getPokemon.onreadystatechange = function(){
    
    if(getPokemon.readyState == 4 && getPokemon.status == 200) 
    {
        let retorno = JSON.parse(getPokemon.responseText);
        retorno     = retorno.results;

        for (let i = 0; i < retorno.length; i++) {

            let pokemon         = document.createElement('li');
            let id              = document.createElement('span');
            let nome_pokemon    = document.createElement('span');

            pokemon.className       = 'pokemon';
            id.className            = 'id';
            nome_pokemon.className  = 'nome_pokemon';

            nome_pokemon.innerText  = retorno[i].name.charAt(0).toUpperCase() + retorno[i].name.slice(1);
            id.innerText            = (i < 9) ? '#0' + (i + 1) : '#' + (i + 1);

            pokemon.setAttribute('onclick', `getStatusPoke(${i + 1})`);

            pokemon.appendChild(id);
            pokemon.appendChild(nome_pokemon);
            listagem.appendChild(pokemon);
        }
    }
}

function getStatusPoke(id){
    getPokemon.open('GET', `https://pokeapi.co/api/v2/pokemon/${id}`, false);
    getPokemon.send();
    if( getPokemon.readyState == 4 && getPokemon.status == 200 ){
        let retorno = JSON.parse(getPokemon.responseText);
        console.log(retorno);

        let img             = document.getElementById('img_pokemon');
        let id_pokemon      = document.getElementById('id-poke');
        let nome_pokemon    = document.getElementById('nome-pokemon');
        let tipo_pokemon    = document.getElementById('type');
        let peso_pokemon    = document.getElementById('value-weight');
        let altura_pokemon  = document.getElementById('value-height');
        let exp_pokemon     = document.getElementById('exp-base');
        let status_pokemon  = document.getElementsByClassName('status');
        let valor_status    = document.getElementsByClassName('valor_status');

        let type            = [];

        for(let i=0; i < retorno.types.length; i++)
        {
            type[i] = retorno.types[i].type.name.charAt(0).toUpperCase() + retorno.types[i].type.name.slice(1);
        }
        type = type.join(" / ");

        for(let i=0; i < retorno.status.length; i++)
        {
            valor_status[i].innerText = retorno.status[i].base_stat;
            status_pokemon[i].appendChild(valor_status[i]);
        }

        id_pokemon.innerText        = (retorno.id < 10) ? pokemon_id.innerText = '0' + retorno.id : pokemon_id.innerText = retorno.id;
        img.src                     = retorno.sprites.front_default;
        nome_pokemon.innerText      = retorno.name.charAt(0).toUpperCase() + retorno.name.slice(1);
        tipo_pokemon.innerText      = type;
        peso_pokemon.innerText      = retorno.weight + 'KG';
        altura_pokemon.innerText    = retorno.height + 'cm';
        exp_pokemon.innerText       = retorno.base_experience;

        

    }
}

const listaPoke = document.querySelectorAll('.pokemon')

listaPoke.forEach(pokemon => {
  pokemon.addEventListener('click', () => {
    let card_pokemon    = document.getElementById('card-pokemon');
    card_pokemon.className = 'open';
  });
});