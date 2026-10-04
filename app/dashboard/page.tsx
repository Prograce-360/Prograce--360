import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/src/lib/authentification/session";
export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const fullName =
    [user.firstName, user.lastName]
      .filter(Boolean)
      .join(" ") ||
    user.username ||
    user.email;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f9fc",
        padding: "32px 20px",
        color: "#10233f",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            marginBottom: "32px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                color: "#2563eb",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              PROGRACE 360
            </p>

            <h1
              style={{
                margin: "8px 0 0",
                fontSize: "32px",
                lineHeight: 1.15,
              }}
            >
              Bonjour, {fullName} 👋
            </h1>
          </div>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "11px 18px",
              borderRadius: "12px",
              background: "#ffffff",
              border: "1px solid #dbe3ef",
              color: "#10233f",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Retour à l’accueil
          </Link>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
            marginBottom: "28px",
          }}
        >
          <article
            style={{
              background: "#ffffff",
              border: "1px solid #e5eaf2",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 12px 30px rgba(16, 35, 63, 0.06)",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                marginBottom: "12px",
              }}
            >
              💼
            </div>

            <h2
              style={{
                margin: "0 0 8px",
                fontSize: "20px",
              }}
            >
              Business Manager
            </h2>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                lineHeight: 1.6,
              }}
            >
              Gérez vos activités et vos outils professionnels
              depuis votre espace PROGRACE.
            </p>
          </article>

          <article
            style={{
              background: "#ffffff",
              border: "1px solid #e5eaf2",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 12px 30px rgba(16, 35, 63, 0.06)",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                marginBottom: "12px",
              }}
            >
              📚
            </div>

            <h2
              style={{
                margin: "0 0 8px",
                fontSize: "20px",
              }}
            >
              PROGRACE Learning
            </h2>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                lineHeight: 1.6,
              }}
            >
              Accédez à vos ressources, formations et contenus
              numériques.
            </p>
          </article>

          <article
            style={{
              background: "#ffffff",
              border: "1px solid #e5eaf2",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 12px 30px rgba(16, 35, 63, 0.06)",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                marginBottom: "12px",
              }}
            >
              🛍️
            </div>

            <h2
              style={{
                margin: "0 0 8px",
                fontSize: "20px",
              }}
            >
              Boutique
            </h2>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                lineHeight: 1.6,
              }}
            >
              Retrouvez vos produits et services numériques
              PROGRACE.
            </p>
          </article>
        </section>

        <section
          style={{
            background:
              "linear-gradient(135deg, #0f4cdb, #2563eb)",
            color: "#ffffff",
            borderRadius: "24px",
            padding: "32px",
            boxShadow: "0 18px 45px rgba(37, 99, 235, 0.22)",
          }}
        >
          <p
            style={{
              margin: "0 0 8px",
              opacity: 0.8,
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Votre espace personnel
          </p>

          <h2
            style={{
              margin: "0 0 12px",
              fontSize: "28px",
            }}
          >
            Bienvenue dans PROGRACE 360.
          </h2>

          <p
            style={{
              margin: 0,
              maxWidth: "700px",
              lineHeight: 1.7,
              opacity: 0.92,
            }}
          >
            Votre espace évoluera progressivement pour réunir
            vos outils professionnels, vos ressources et les
            services numériques PROGRACE au même endroit.
          </p>
        </section>
      </div>
    </main>
  );
}
