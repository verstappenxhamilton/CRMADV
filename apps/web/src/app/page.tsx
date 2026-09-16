import React from "react";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", color: "var(--color-text-main)", margin: "0 0 0.5rem 0" }}>
          CRM com Sala Virtual para Escritórios
        </h1>
        <p style={{ color: "var(--color-text-muted)", margin: 0 }}>
          Ambiente operacional de atendimento e triagem para advocacia.
        </p>
      </header>
      <section
        style={{
          backgroundColor: "var(--color-surface)",
          padding: "1.5rem",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--color-border-decorative)",
        }}
      >
        <p style={{ margin: "0 0 1rem 0", color: "var(--color-text-main)" }}>
          Sistema inicializado com sucesso. Status do serviço verificado via health check.
        </p>
        <a
          href="/health/live"
          style={{
            display: "inline-block",
            minHeight: "var(--min-touch-target)",
            padding: "10px 16px",
            backgroundColor: "var(--color-primary)",
            color: "var(--color-primary-fg)",
            borderRadius: "var(--radius-sm)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Verificar /health/live
        </a>
      </section>
    </main>
  );
}
