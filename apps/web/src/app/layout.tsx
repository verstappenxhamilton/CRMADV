import type { Metadata } from "next";
import React from "react";
import "@crmadv/ui/tokens.css";
import "@/lib/env";

export const metadata: Metadata = {
  title: "CRM com Sala Virtual para Escritórios",
  description: "Atendimento inteligente e organização documental para a advocacia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "var(--color-bg-base)",
          color: "var(--color-text-main)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
