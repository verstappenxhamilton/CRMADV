# Pré-Requisitos e Configurações Externas

Este documento rastreia os serviços e credenciais externas necessárias para cada fase do projeto. Nenhuma credencial deve ser gravada neste arquivo; utilize referências a segredos de ambiente (`.env`).

## 1. Núcleo e Piloto Vendável

| Serviço | Finalidade | Status / Requisito | Cartão |
| --- | --- | --- | --- |
| **Supabase** | Banco Postgres, Auth, Storage privado e Filas (`pgmq`) | Instância local (Docker) para dev; projeto de homologação/produção em E20 | E01, E02, E05, E07 |
| **Google Cloud / Gemini API** | Modelos Gemini Flash Lite, Flash e Embedding 2 | Projeto Google Cloud com faturamento ativo para dados reais; limites e cotas por projeto | E08, E09, E10 |
| **Malware Scanner (HTTPS)** | Varredura de arquivos (referência: Cloudmersive) | Chave de API de servidor, contrato de retenção e limite de chamadas configurado | E07, E19, E20 |
| **Stripe** | Cobrança de assinatura SaaS do escritório | Conta Stripe em modo de teste; Webhook signing secret | E18 |
| **Resend** | Envio de e-mails transacionais e convites | Domínio verificado e API key | E01, E18 |

## 2. Módulos Opcionais e Complementares

| Serviço | Finalidade | Requisitos de Publicação | Cartão |
| --- | --- | --- | --- |
| **Google Workspace OAuth** | Sincronização de Agenda e cópias no Drive | App Google Cloud configurado com consentimento incremental; escopos restritos a `calendar.app.created`, `calendar.freebusy` e `drive.file` | E13, E14.3, E15 |
| **Meta WhatsApp Cloud API** | Canal oficial de atendimento WhatsApp | Conta Meta Business verificada, número empresarial exclusivo e templates aprovados | E23, E24, E25 |
| **Gemini Live API** | Voz bidirecional em tempo real | Modelo Live verificado em português, medição de TPM e gateway WebSocket Node | E21, E22 |

*Atualizado durante a execução do cartão E00.*
