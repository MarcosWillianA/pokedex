const pesquisar = document.querySelector('#pesquisar');
const botaoPesquisar = document.querySelector('#botao-pesquisar');
const botaoAnterior = document.querySelector('#botao-anterior');
const botaoProximo = document.querySelector('#botao-proximo');
const pokemonInfo = document.querySelector('#pokemon-info');
const botoesNavegacao = document.querySelector('#botoes-navegacao');
const pokemonImagem = document.querySelector('pokemon-imagem');
const pokemonNome = document.querySelector('#pokemon-nome');
const pokemonDescricao = document.querySelector('#pokemonDescricao');
const mensagemErro = document.querySelector('#mensagem-erro');
const mensagemLoading = document.querySelector('#mensagem-loading');

let idPokemonAtual = 1;

const fetchPokemon = async (identificadorPokemon) => {
    exibirLoading();
    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${identificadorPokemon}`); 
        if (!resposta.ok) throw new Error('404 NOT FOUND - Pokémon não encontrado!');
        const pokemon = await resposta.json();
        preencherPokemonInfo(pokemon);
        mensagemErro.classList.add('esconder');
        pokemonInfo.classList.remove('esconder');
        botoesNavegacao.classList.remove('esconder');
    } catch (error) {
        exibirerro();
    } finally {

    }
} 

const exibirLoading = () => {
    mensagemLoading.classList.remove('esconder');
    pokemonInfo.classList.add('esconder');
    mensagemErro.classList.add('erro');
    botoesNavegacao.classList.add('erro');
}

const exibirErro = () => {
    pokemonNome.textContent = '';
    pokemonDescricao.textContent = '';
    pokemonImagem.src = '';
    mensagemErro.classList.add('esconder');
    pokemonInfo.classList.add('esconder');
    botoesNavegacao.classList.add('esconder');
}
