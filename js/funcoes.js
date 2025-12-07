// ============================================================
// FUNCOES.JS - Gerenciamento de favoritos
// ============================================================

import { Filme } from "./classes.js";

const KEY = "favoritos";

// Carrega favoritos do localStorage e reconstrói como instâncias Filme
export const carregarFavoritos = () =>
  (JSON.parse(localStorage.getItem(KEY)) || []).map(
    (f) =>
      new Filme(
        f.id,
        f.titulo,
        f.poster,
        f.backdrop,
        f.nota,
        f.sinopse,
        f.trailer,
        f.elenco,
        f.diretor
      )
  );

// Adiciona filme aos favoritos (evita duplicatas)
export function adicionarFavorito(filme) {
  const favs = carregarFavoritos();
  if (!favs.some((f) => f.id === filme.id)) {
    favs.push(filme.toJson());
    localStorage.setItem(KEY, JSON.stringify(favs));
  }
}

// Remove filme dos favoritos pelo ID
export const removerFavorito = (id) => {
  const favs = carregarFavoritos().filter((f) => f.id !== id);
  localStorage.setItem(KEY, JSON.stringify(favs.map((f) => f.toJson())));
};
