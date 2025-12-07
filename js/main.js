// ============================================================
// MAIN.JS - Lógica principal
// ============================================================

import { buscarDetalhes, buscarFilmes, buscarTendencias } from "./api.js";
import {
  criarCardFilme,
  renderizarDetalhes,
  renderizarFavoritos,
} from "./dom.js";
import { adicionarFavorito, removerFavorito } from "./funcoes.js";

const isPaginaIndex = window.location.pathname.match(/(\/|\/index\.html)$/);
const isPaginaFavoritos = window.location.pathname.includes("favoritos.html");

// ============================================================
// PÁGINA INICIAL
// ============================================================
if (isPaginaIndex) {
  const [
    form,
    input,
    lista,
    trending,
    results,
    detalhesSection,
    detalhesContainer,
  ] = [
    "search-form",
    "query",
    "results",
    "trending-section",
    "results-section",
    "detalhes-section",
    "detalhes-container",
  ].map((id) => document.getElementById(id));

  // Carrega tendências e renderiza hero
  async function carregarTendencias() {
    const trending = await buscarTendencias();
    document.getElementById("hero-carousel").innerHTML = trending
      .map(
        (f, i) => `
      <div class="hero-slide ${
        i === 0 ? "active" : ""
      }" style="background-image: url('https://image.tmdb.org/t/p/original${
          f.backdrop
        }');">
        <div class="hero-content">
          <h1>${f.titulo}</h1>
          <p>${f.sinopse?.substring(0, 150)}...</p>
          <div class="hero-buttons">
            <button class="hero-btn play" data-id="${
              f.id
            }">▶ Assistir Trailer</button>
            <button class="hero-btn plus btn-favoritar" data-id="${
              f.id
            }">+ Favoritar</button>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    // Carrossel automático a cada 6s
    let atual = 0;
    setInterval(() => {
      const slides = document.querySelectorAll(".hero-slide");
      slides.forEach((s) => s.classList.remove("active"));
      slides[(atual = (atual + 1) % slides.length)].classList.add("active");
    }, 6000);

    trending.forEach((f) =>
      criarCardFilme(f, document.getElementById("trending-list"))
    );
  }

  carregarTendencias();

  // Gerencia abertura/fechamento da barra de busca
  const searchForm = document.querySelector(".search-overlay");
  const searchToggle = document.getElementById("search-toggle");
  const searchInput = document.getElementById("query");

  searchToggle?.addEventListener("click", (e) => {
    e.preventDefault();
    searchForm?.classList.toggle("open");
    if (searchForm?.classList.contains("open")) {
      searchInput?.focus();
    }
  });

  // Fechar busca ao clicar fora
  document.addEventListener("click", (e) => {
    if (
      !searchForm?.contains(e.target) &&
      searchForm?.classList.contains("open")
    ) {
      searchForm.classList.remove("open");
    }
  });

  // Busca de filmes
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    trending.classList.add("hidden");
    results.classList.remove("hidden");
    lista.innerHTML = "<p>Carregando...</p>";
    const filmes = await buscarFilmes(input.value.trim());
    lista.innerHTML = "";
    filmes.forEach((f) => criarCardFilme(f, lista));
  });

  // Handler de cliques: trailer, detalhes, favoritar
  document.addEventListener("click", async (e) => {
    const { classList, dataset } = e.target;

    // Trailer
    if (classList.contains("play")) {
      const filme = await buscarDetalhes(dataset.id);
      if (!filme?.trailer) return alert("Trailer não disponível");
      const modal = document.createElement("div");
      modal.id = "trailer-modal";
      modal.innerHTML = `<div><button id="close-trailer">✕ Fechar</button><iframe src="${filme.trailer}" frameborder="0" allowfullscreen></iframe></div>`;
      document.body.appendChild(modal);
      document.getElementById("close-trailer").onclick = () => modal.remove();
      modal.onclick = (e) => e.target === modal && modal.remove();
    }

    // Detalhes
    if (classList.contains("btn-detalhes")) {
      const filme = await buscarDetalhes(
        dataset.id || e.target.getAttribute("data-id")
      );
      if (!filme) return console.error("Filme não encontrado");
      document.querySelector(".hero-container").classList.add("hidden");
      trending.classList.add("hidden");
      results.classList.add("hidden");
      detalhesSection.classList.remove("hidden");
      renderizarDetalhes(filme, detalhesContainer);
    }

    // Favoritar
    if (classList.contains("btn-favoritar")) {
      const filme = await buscarDetalhes(dataset.id);
      adicionarFavorito(filme);
      alert("Adicionado aos favoritos!");
    }
  });
}

// ============================================================
// PÁGINA FAVORITOS
// ============================================================
if (isPaginaFavoritos) {
  const listaFav = document.getElementById("listaFavoritos");
  renderizarFavoritos(listaFav);

  document.addEventListener("click", async (e) => {
    const id = Number(e.target.dataset.id);

    if (e.target.classList.contains("btn-detalhes")) {
      const filme = await buscarDetalhes(id);
      renderizarDetalhes(filme, listaFav);
    }

    if (e.target.classList.contains("btn-remover")) {
      removerFavorito(id);
      renderizarFavoritos(listaFav);
    }
  });
}
