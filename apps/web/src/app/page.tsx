import React from "react";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", color: "#0F172A", margin: "0 0 0.5rem 0" }}>
          CRM com Sala Virtual para Escritórios
        </h1>
        <p style={{ color: "#475569", margin: 0 }}>
          Ambiente operacional de atendimento e triagem para advocacia.
        </p>
      </header>
      <section style={{ backgroundColor: "#FFFFFF", padding: "1.5rem", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
        <p style={{ margin: "0 0 1rem 0", color: "#0F172A" }}>
          Sistema inicializado com sucesso. Status do serviço verificado via health check.
        </p>
        <a
          href="/health/live"
          style={{
            display: "inline-block",
            padding: "10px 16px",
            backgroundColor: "#1D4ED8",
            color: "#FFFFFF",
            borderRadius: "6px",
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
