import type { Metadata } from "next";
import React from "react";

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
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", backgroundColor: "#F8FAFC", color: "#0F172A" }}>
        {children}
      </body>
    </html>
  );
}
