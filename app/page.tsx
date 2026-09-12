const cards = [
  ["💼","Gérer","Optimisez votre activité avec des outils professionnels."],
  ["🎓","Apprendre","Développez vos compétences avec PROGRACE Learning."],
  ["📚","Explorer","Découvrez livres, guides, tutos et ressources."],
  ["🛒","Acheter","Outils, e-books, formations et packs professionnels."]
];

export default function Home() {
  return <main>
    <header className="nav">
      <a className="logo" href="/">✦ PROGRACE 360</a>
      <nav>
        <a href="#solutions">Solutions</a><a href="#learning">Learning</a>
        <a href="#library">Bibliothèque</a><a href="#shop">Boutique</a>
        <a href="#tutos">Tutos</a><a href="#insights">Insights</a>
      </nav>
      <button>🤖 Assistant</button><button className="outline">Mon compte</button>
    </header>

    <section className="hero">
      <div>
        <span className="badge">SOLUTIONS NUMÉRIQUES POUR ENTREPRISE</span>
        <h1>Faites progresser votre entreprise avec le numérique.</h1>
        <p>Des outils professionnels, des ressources, des formations et un accompagnement intelligent réunis dans un seul espace.</p>
        <div className="actions"><button>Découvrir PROGRACE →</button><button className="outline">Explorer les ressources</button></div>
      </div>
      <div className="visual"><div className="orb"/><div className="screen">PROGRACE<br/><b>360</b></div></div>
    </section>

    <section className="section" id="solutions">
      <h2>Une plateforme, quatre portes d’entrée.</h2>
      <p className="muted">Simple pour le visiteur. Puissante à l’intérieur.</p>
      <div className="grid four">{cards.map(([i,t,d])=><article className="card" key={t}><div className="icon">{i}</div><h3>{t}</h3><p>{d}</p><a>Découvrir →</a></article>)}</div>
    </section>

    <section className="section alt">
      <h2>Les univers PROGRACE</h2>
      <div className="grid three">
        <article className="card"><div className="icon">💼</div><h3>Business Manager</h3><p>Produits, stock, ventes, dépenses, clients, fournisseurs et factures.</p></article>
        <article className="card" id="learning"><div className="icon">🌍</div><h3>PROGRACE Learning</h3><p>Anglais 🇺🇸 et français 🇫🇷, niveaux A1 à C2, vocabulaire, écoute, expression orale et progression.</p></article>
        <article className="card" id="tutos"><div className="icon">▶</div><h3>Tutos & Formations</h3><p>Des parcours pratiques pour maîtriser les outils et développer ses compétences.</p></article>
        <article className="card" id="library"><div className="icon">📚</div><h3>Bibliothèque</h3><p>Livres, e-books, guides et ressources gratuites ou premium.</p></article>
        <article className="card" id="shop"><div className="icon">🛒</div><h3>Boutique</h3><p>Outils numériques, documents, formations et packs.</p></article>
        <article className="card"><div className="icon">🤖</div><h3>Assistant PROGRACE</h3><p>Un point d’entrée intelligent pour apprendre, trouver, acheter et obtenir de l’aide.</p></article>
      </div>
    </section>

    <section className="section" id="insights">
      <h2>PROGRACE Insights</h2><p className="muted">Conseils et contenus pour progresser dans le numérique et l’entrepreneuriat.</p>
      <div className="progressCard"><b>🇺🇸 English — B1 Intermediate</b><div className="bar"><span/></div><small>Progression 73% · Vocabulaire 82% · Grammaire 74% · Listening 69% · Speaking 61%</small></div>
    </section>

    <section className="cta"><div><h2>Construisons votre avenir numérique.</h2><p>Entreprendre · Apprendre · Explorer · Acheter</p></div><button>Créer un compte →</button></section>
    <footer>© PROGRACE 360 · Des solutions numériques pour faire progresser votre entreprise.</footer>
  </main>
}
