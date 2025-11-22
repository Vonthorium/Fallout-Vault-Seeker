let cardContainer = document.querySelector(".card-container");
let searchInput = document.querySelector(".search input");

let data = [];

// Função para carregar os dados do JSON uma vez
async function loadData() {
    try {
        let response = await fetch("data/data.json");
        data = await response.json();
        renderCards(data); // Renderiza todos os cards inicialmente
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

// Função para iniciar a busca
function startSearch() {
    let searchTerm = searchInput.value.toLowerCase();

    if (searchTerm.trim() === "") {
        renderCards(data); // Se a busca estiver vazia, mostra todos os vaults
        return;
    }

    let filteredData = data.filter(vault => {
        return (
            vault.nome.toLowerCase().includes(searchTerm) ||
            vault.titulo.toLowerCase().includes(searchTerm) ||
            vault.localizacao.toLowerCase().includes(searchTerm) ||
            vault.faccao.toLowerCase().includes(searchTerm) ||
            vault.objetivo.toLowerCase().includes(searchTerm) ||
            vault.descricao.toLowerCase().includes(searchTerm)
        );
    });

    renderCards(filteredData);
}

// Função para renderizar os cards
function renderCards(cardsToRender) {
    cardContainer.innerHTML = ""; // Limpa o container antes de renderizar
    for (let dado of cardsToRender) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome} (${dado.titulo})</h2>
        <p>Ano de abertura do vault - ${dado.anoabertura}</p>
        <p>Localização - ${dado.localizacao}</p>
        <p>Facção - ${dado.faccao}</p>
        <p>Objetivo - ${dado.objetivo}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba Mais</a>  
        `;
        cardContainer.appendChild(article);
    }
}

// Adiciona um listener para a tecla "Enter" no campo de busca
searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        startSearch();
    }
});

// Carrega os dados quando a página é carregada
window.onload = loadData;






