import "./About.css";

function About() {
  return (
    <main className="about">
      <section className="about__intro">
        <span className="about__eyebrow">
          SOBRE O PROJETO
        </span>

        <h1 className="about__title">
            <span className="hero__title-line">GIRE E</span>
            <span className="hero__title-line">ASSISTA,</span>
            <span className="hero__title-line hero__title-italic">SIMPLES</span>
            <span className="hero__title-line hero__title-last">
              <span className="hero__title-italic">ASSIM</span>
              <span className="hero__smile" aria-hidden="true">
                ☺
              </span>
            </span>
        </h1>

        <p className="about__description">
          O Cineroleta nasceu para facilitar aquela
          decisão que parece simples, mas nem sempre é:
          escolher seu próximo filme.
        </p>
      </section>

      <section className="about__features">
        <article className="about__feature">
          <span className="about__number">01 /</span>

          <h2 className="about__feature-title">
            ESCOLHA SEUS FILTROS.
          </h2>

          <p className="about__feature-text">
            Selecione um gênero, um ano mínimo de
            lançamento e uma nota mínima no TMDB.
          </p>
        </article>

        <article className="about__feature">
          <span className="about__number">02 /</span>

          <h2 className="about__feature-title">
            DEIXE A SORTE AGIR.
          </h2>

          <p className="about__feature-text">
            Gire a roleta e descubra uma sugestão
            de filme de acordo com suas preferências.
          </p>
        </article>

        <article className="about__feature">
          <span className="about__number">03 /</span>

          <h2 className="about__feature-title">
            APERTE O PLAY.
          </h2>

          <p className="about__feature-text">
            Conheça o filme sorteado ou faça uma
            pesquisa para descobrir outros títulos.
          </p>
        </article>
      </section>

      <section className="about__credits">
        <h2 className="about__credits-title">
          SOBRE OS DADOS
          <span className="about__dot">.</span>
        </h2>

        <p className="about__credits-text">
          O Cineroleta utiliza a API do The Movie Database
          (TMDB) para consultar informações sobre filmes,
          incluindo títulos, sinopses, datas de lançamento
          e avaliações.
        </p>

        <p className="about__credits-text">
          Este produto usa a API do TMDB, mas não é
          endossado nem certificado pelo TMDB.
        </p>

        <a
          className="about__link"
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CONHECER O TMDB ↗
        </a>
      </section>
    </main>
  );
}

export default About;