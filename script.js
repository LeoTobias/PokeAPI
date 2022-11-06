let colors = {  Fire:       '#FDDFDF',
                Grass:      '#DEFDE0',
                Eletric:    '#FCF7DE',
                Water:      '#DEF3FD',
                Ground:     '#f4e7da',
                Rock:       '#d5d5d4',
                Fairy:      '#fceaff',
                Poison:     '#98d7a5',
                Bug:        '#f8d5a3',
                Dragon:     '#97b3e6',
                Psychic:    '#eaeda1',
                Flying:     '#F5F5F5',
                Fighting:   '#E6E0D4',
                Normal:     '#F5F5F5'
                };

let card_pokemon    = document.querySelectorAll('.card-pokemon')[0];

console.log(card_pokemon);


let getPokemon = new XMLHttpRequest();
let listagem   = document.getElementById('pokemons');

getPokemon.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=151', true);
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

            pokemon.setAttribute('onclick', `statusPoke(${i + 1})`);

            pokemon.appendChild(id);
            pokemon.appendChild(nome_pokemon);
            listagem.appendChild(pokemon);
        }
    }
}

function statusPoke(id){
    getPokemon.open('GET', `https://pokeapi.co/api/v2/pokemon/${id}`, false);
    getPokemon.send();
    if( getPokemon.readyState == 4 && getPokemon.status == 200 ){
        let retorno = JSON.parse(getPokemon.responseText);

        let img             = document.getElementById('img_pokemon');
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

        let color = colors[type[0]];
        type = type.join(" / ");
        card_pokemon.style.cssText = 'background-color:' + color;

        for(let i=0; i < retorno.stats.length; i++)
        {
            valor_status[i].innerText = retorno.stats[i].base_stat;
            status_pokemon[i].appendChild(valor_status[i]);
        }

        img.src                     = retorno.sprites.front_default;
        nome_pokemon.innerText      = retorno.name.charAt(0).toUpperCase() + retorno.name.slice(1);
        tipo_pokemon.innerText      = type;
        peso_pokemon.innerText      = retorno.weight + 'hg';
        altura_pokemon.innerText    = retorno.height + 'dm';
        exp_pokemon.innerText       = retorno.base_experience;
    }
} 