# Registro de versões — E00

Este projeto usa duas camadas de controle de versão:

1. `package.json`: declara versões mínimas/compatíveis (por exemplo `^5.8.2`).
2. `pnpm-lock.yaml`: fixa a versão exata realmente instalada e deve ser versionado junto com o código.

A reprodutibilidade estrita vem do `pnpm-lock.yaml` com `pnpm install --frozen-lockfile`, e não dos intervalos semver declarados isoladamente.

| Ferramenta / Pacote | Declaração no projeto | Versão resolvida no lock atual | Finalidade |
| --- | --- | --- | --- |
| Node.js | `>=24.0.0` | ambiente validado com Node 24 | Runtime unificado para web, APIs e futuros workers |
| pnpm | `12.4.1` | `12.4.1` | Gerenciador de dependências e orquestrador do monorepo |
| TypeScript | `^5.8.2` | `5.9.3` | Compilador tipado com `strict: true` |
| Next.js | `16.3.5` | `16.3.5` | Framework Web (App Router) |
| React | `19.3.0` | `19.3.0` | Biblioteca de interface |
| React DOM | `19.3.0` | `19.3.0` | Renderizador DOM |
| Zod | `^3.24.2` | `3.25.76` | Validação de contratos e ambiente |
| Vitest | `^3.0.7` | `3.2.7` | Testes unitários e de integração |

Não alterar o `pnpm-lock.yaml` manualmente. Atualizações de dependência devem ser deliberadas e acompanhadas por `pnpm check` e `pnpm build`.

*Registro revisado em 16/09/2026 após code review da fundação E00.1.*
