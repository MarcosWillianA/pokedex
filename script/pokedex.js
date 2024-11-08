const pesquisar = document.querySelector('#pesquisar');
const botaoPesquisar = document.querySelector('#botao-pesquisar');
const botaoAnterior = document.querySelector('#botao-anterior');
const botaoProximo = document.querySelector('#botao-proximo');
const pokemonInfo = document.querySelector('#pokemon-info');
const botoesNavegacao = document.querySelector('#botoes-navegacao');
const pokemonImagem = document.querySelector('#pokemon-imagem');
const pokemonNome = document.querySelector('#pokemon-nome');
const pokemonDescricao = document.querySelector('#pokemon-descricao');
const mensagemErro = document.querySelector('#mensagem-erro');
const mensagemLoading = document.querySelector('#mensagem-loading');

let idAtualPokemon = 1;

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
        exibirErro();
    } finally {

    }
} 

const preencherPokemonInfo = (pokemon) => {
    pokemonImagem.src = pokemon['sprites']['versions']['generation-v']['black-white']['animated']['front-default'];
    
}

const exibirLoading = () => {
    mensagemLoading.classList.remove('esconder');
    pokemonInfo.classList.add('esconder');
    mensagemErro.classList.add('erro');
    botoesNavegacao.classList.add('erro');
}

const ocultarLoading = () => {
    mensagemLoading.classList.add('esconder');
}

const exibirErro = () => {
    pokemonNome.textContent = '';
    pokemonDescricao.textContent = '';
    pokemonImagem.src = '';
    mensagemErro.classList.add('esconder');
    pokemonInfo.classList.add('esconder');
    botoesNavegacao.classList.add('esconder');
}

const atualizarNavegacaoBotoes = () => {
    botaoAnterior.disabled = (idAtualPokemon <= 1); 
}

const atualizarBotaoPesquisar = () => {
    botaoPesquisar.disabled = !pesquisar.value.trim();
}

botaoPesquisar.addEventListener('click', () => {
    const query = pesquisar.value.trim().toLowerCase();
    if (query) {
        fetchPokemon(query);
    }
})

pesquisar.addEventListener('input', atualizarBotaoPesquisar);

pesquisar.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        botaoPesquisar.click();
    }
})

botaoAnterior.addEventListener('click', () => {
    if (idAtualPokemon > 1) {
        fetchPokemon(idAtualPokemon - 1);
    }
})

botaoProximo.addEventListener('click', () => {
    fetchPokemon(idAtualPokemon + 1);
})

fetchPokemon(idAtualPokemon); // Carregando o primeiro pokemon com id = 1 por padrão;
atualizarBotaoPesquisar(); //Desabilita o botão de busca