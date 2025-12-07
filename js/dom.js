// ============================================================
// DOM.JS - Renderização de elementos
// ============================================================

import { carregarFavoritos } from "./funcoes.js";

// Cria card do filme
export const criarCardFilme = (filme, container, modoFavoritos = false) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <img src="${filme.getPosterUrl()}" alt="${filme.titulo}">
    <h3>${filme.titulo}</h3>
    <div class="card-actions">
      <button class="btn-detalhes" data-id="${filme.id}">Detalhes</button>
      ${
        modoFavoritos
          ? `<button class="btn-remover" data-id="${filme.id}">Remover</button>`
          : `<button class="btn-favoritar" data-id="${filme.id}">⭐ Favoritar</button>`
      }
    </div>
  `;
  container.appendChild(card);
};

// Renderiza página de detalhes do filme
export function renderizarDetalhes(filme, container) {
  const elencoHTML =
    Array.isArray(filme.elenco) && filme.elenco.length > 0
      ? filme.elenco.map((a) => `<li>${a}</li>`).join("")
      : "<li>Elenco não disponível</li>";

  container.innerHTML = `
    <div class="detalhes-filme">
      <button id="btn-voltar">← Voltar</button>
      <h2>${filme.titulo || "Título não disponível"}</h2>
      <img src="${filme.getPosterUrl()}" alt="${filme.titulo}">
      <p>⭐ ${(filme.nota || 0).toFixed(1)}</p>
      <h3>Diretor</h3>
      <p>${filme.diretor || "Desconhecido"}</p>
      <h3>Elenco</h3>
      <ul class="elenco-list">${elencoHTML}</ul>
      ${
        filme.trailer
          ? `<iframe  src="${filme.trailer}" frameborder="0" allowfullscreen></iframe>`
          : "<p>Trailer não disponível.</p>"
      }
    </div>
  `;

  document.getElementById("btn-voltar")?.addEventListener("click", () => {
    document.querySelector(".hero-container")?.classList.remove("hidden");
    document.getElementById("detalhes-section")?.classList.add("hidden");
    document.getElementById("trending-section")?.classList.remove("hidden");
  });
}

// Renderiza lista de favoritos
export const renderizarFavoritos = (container) => {
  container.innerHTML = "";
  carregarFavoritos().forEach((f) => criarCardFilme(f, container, true));
};
