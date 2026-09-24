"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ?? "Connexion impossible.",
        );
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Une erreur réseau est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link href="/" className="auth-logo">
          PROGRACE <span>360</span>
        </Link>

        <p className="auth-eyebrow">
          ESPACE PERSONNEL
        </p>

        <h1>Bienvenue.</h1>

        <p className="auth-description">
          Connectez-vous à votre espace PROGRACE 360.
        </p>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >
          <label>
            Adresse e-mail

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="vous@exemple.com"
              autoComplete="email"
              required
            />
          </label>

          <label>
            Mot de passe

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading
              ? "Connexion..."
              : "Se connecter →"}
          </button>
        </form>

        <p className="auth-switch">
          Vous n’avez pas encore de compte ?{" "}
          <Link href="/register">
            Créer un compte
          </Link>
        </p>

        <Link href="/" className="auth-back">
          ← Retour à PROGRACE 360
        </Link>
      </section>
    </main>
  );
}
