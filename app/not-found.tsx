import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section">
      <div className="container narrow">
        <div className="card center">
          <span className="eyebrow">PROGRACE 360</span>
          <h1>Cette page n’existe pas.</h1>
          <p>La page recherchée est introuvable. Revenez à l’accueil pour continuer votre parcours.</p>
          <Link className="button primary" href="/">Retour à l’accueil</Link>
        </div>
      </div>
    </main>
  );
}
