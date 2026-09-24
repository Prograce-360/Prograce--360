"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ??
            "Création du compte impossible.",
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
      <section className="auth-card auth-card-wide">
        <Link href="/" className="auth-logo">
          PROGRACE <span>360</span>
        </Link>

        <p className="auth-eyebrow">NOUVEL ESPACE</p>

        <h1>Créer votre compte.</h1>

        <p className="auth-description">
          Rejoignez l’écosystème numérique PROGRACE 360.
        </p>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >
          <div className="auth-row">
            <label>
              Prénom

              <input
                value={form.firstName}
                onChange={(event) =>
                  update(
                    "firstName",
                    event.target.value,
                  )
                }
                placeholder="Votre prénom"
                required
              />
            </label>

            <label>
              Nom

              <input
                value={form.lastName}
                onChange={(event) =>
                  update(
                    "lastName",
                    event.target.value,
                  )
                }
                placeholder="Votre nom"
              />
            </label>
          </div>

          <label>
            Nom d'utilisateur

            <input
              value={form.username}
              onChange={(event) =>
                update(
                  "username",
                  event.target.value,
                )
              }
              placeholder="prograce_user"
            />
          </label>

          <label>
            Adresse e-mail

            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                update(
                  "email",
                  event.target.value,
                )
              }
              placeholder="vous@example.com"
              required
            />
          </label>

          <label>
            Mot de passe

            <input
              type="password"
              value={form.password}
              onChange={(event) =>
                update(
                  "password",
                  event.target.value,
                )
              }
              placeholder="Minimum 8 caractères"
              minLength={8}
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
              ? "Création..."
              : "Créer mon compte →"}
          </button>
        </form>

        <p className="auth-switch">
          Vous avez déjà un compte?{" "}
          <Link href="/login">
            Se connecter
          </Link>
        </p>

        <Link href="/" className="auth-back">
          ← Retour à PROGRACE 360
        </Link>
      </section>
    </main>
  );
}
