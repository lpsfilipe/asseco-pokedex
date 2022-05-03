'use strict'

const pokemonListUrl = "https://pokeapi.co/api/v2/pokemon?limit=150";
const container = document.querySelector('.poke__cont');
const myBtn = document.querySelector('.btn__search');
const mySearch = document.querySelector('.search__In');

//console.log('123');

// fazer render do poke pretendido
const renderPoke = function (poke) {
    const html = `
        <div class="poke__obj">
            <p class="poke__name"> ${poke.name} </p>
            <img class="poke__img" src="${poke.img}" />
        </div>
    `;
    // insert in the DOM
    container.insertAdjacentHTML('beforeend', html);
};

// fazer pedido API p/ ter imagem e finalmente renderizar o poke
const getImg = function (poke) {
    return fetch(poke.url)
        .then(response => {
            // console.log(response.body);

            // define our personalized error
            if (!response.ok) {
                alert('Erro a obter imagem do pokemon');
            }
            return response.json();
        })
        .then(data => {
            // console.log(data.sprites.front_default);
            // define poke's image as the one give by the API
            poke.img = data.sprites.front_default;
            renderPoke(poke);
        });
}

// fazer pedido inicial
const pedido = function () {
    return fetch(pokemonListUrl)
        .then(response => {
            // console.log(response);

            // define our personalized error
            if (!response.ok) {
                alert('Erro a efetuar o pedido hhtp');
            }
            return response.json();
        })
        .then(data => {
            const poke = data.results[0];
            // buscar imagem e renderizar todos os pokemons obtidos
            data.results.forEach((el, i) => {
                getImg(el);
            });

            return poke;
        })

}


// realizar pedido inicial
pedido();

// TENTATIVA de implemetar butão de search
myBtn.addEventListener("click", function () {
    container.innerHTML = '';
    const wanted = mySearch.ariaValueMax;
    console.log(wanted);
    // fazer novo pedido
    pedido();
});