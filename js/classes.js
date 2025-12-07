// ============================================================
// CLASSES.JS - Classe Filme
// ============================================================

export class Filme {
  constructor(
    id,
    titulo,
    poster,
    backdrop,
    nota,
    sinopse,
    trailer = null,
    elenco = [],
    diretor = "Desconhecido"
  ) {
    this.id = id;
    this.titulo = titulo;
    this.poster = poster;
    this.backdrop = backdrop;
    this.nota = nota;
    this.sinopse = sinopse;
    this.trailer = trailer;
    this.elenco = elenco;
    this.diretor = diretor;
  }

  // Gera URL do poster com fallback
  getPosterUrl() {
    return this.poster
      ? `https://image.tmdb.org/t/p/w500${this.poster}`
      : "/assets/sem-imagem.png";
  }

  // Converte para JSON para localStorage
  toJson() {
    return {
      id: this.id,
      titulo: this.titulo,
      poster: this.poster,
      backdrop: this.backdrop,
      nota: this.nota,
      sinopse: this.sinopse,
      trailer: this.trailer,
      elenco: this.elenco,
      diretor: this.diretor,
    };
  }
}
