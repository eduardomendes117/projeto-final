// ============================================================
// API.JS - Chamadas à API TMDB
// ============================================================

import { Filme } from "./classes.js";

const API_KEY = "31136051401e402dd0dc8beaf42e7e32";
const BASE_URL = "https://api.themoviedb.org/3";

// Função genérica para chamadas à API
async function fetchAPI(url) {
  try {
    const resp = await fetch(url);
    return await resp.json();
  } catch (err) {
    console.error("Erro API:", err);
    return null;
  }
}

// Cria instância Filme a partir dos dados da API
const criarFilme = (f, trailer = null, elenco = [], diretor = "Desconhecido") =>
  new Filme(
    f.id,
    f.title,
    f.poster_path,
    f.backdrop_path,
    f.vote_average,
    f.overview,
    trailer,
    elenco,
    diretor
  );

// Busca filmes por termo
export async function buscarFilmes(termo) {
  const dados = await fetchAPI(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(
      termo
    )}`
  );
  return dados?.results?.map((f) => criarFilme(f)) || [];
}

// Busca detalhes completos do filme com trailer e elenco
export async function buscarDetalhes(id) {
  const f = await fetchAPI(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits&language=pt-BR`
  );
  if (!f) return null;

  const trailer = f.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const trailerUrl = trailer
    ? `https://www.youtube.com/embed/${trailer.key}`
    : null;
  const elenco = (f.credits?.cast || []).slice(0, 5).map((a) => a.name);
  const diretor =
    f.credits?.crew?.find((p) => p.job === "Director")?.name || "Desconhecido";

  return criarFilme(f, trailerUrl, elenco, diretor);
}

// Busca filmes em tendência
export async function buscarTendencias() {
  const dados = await fetchAPI(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=pt-BR`
  );
  return dados?.results?.slice(0, 20).map((f) => criarFilme(f)) || [];
}