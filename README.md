# CRM com sala virtual para escritórios

O produto recomendado é uma **sala de atendimento que transforma conversas e documentos em trabalho organizado para o advogado**. O escritório recebe um endereço próprio, publica no Instagram ou instala um botão no site, acompanha os atendimentos e revisa um dossiê com as fontes de cada informação.

Este repositório contém a pesquisa, o plano de implementação e a fundação técnica inicial do sistema. A subetapa **E00.1 já foi codificada e validada**; as próximas entregas seguem o plano incremental descrito abaixo. As fontes foram consultadas em 13/09/2026; preços, modelos e permissões precisam ser reconferidos conforme a implementação avançar.

## Decisões principais

| Tema | Decisão |
| --- | --- |
| Primeiro público | Advocacia brasileira, inicialmente escritórios de 1–5 profissionais; primeiro roteiro de triagem trabalhista, sujeito à validação de um advogado |
| Experiência principal | Link `/s/{escritorio}`, abrindo diretamente o atendimento por texto ou voz; sem landing page intermediária |
| UI/UX | Interface clean, componentes compartilhados, texto curto, comportamento responsivo e acessibilidade com critérios verificáveis |
| Distribuição adicional | Widget no canto inferior direito, reutilizando a mesma sala; WhatsApp oficial em uma entrega posterior |
| Stack | Next.js + TypeScript + Supabase + worker Node.js; gateway de transporte adicionado na entrega de voz Live |
| IA | Gemini com roteamento por tarefa, permissões e orçamento; código controla as ações |
| Documentos | Arquivos privados e dados no Supabase; Google Drive como cópia organizada e fonte explicitamente autorizada |
| Proteção de arquivos | Checagens leves no backend, quarentena privada e scanner por serviço HTTPS; ClamAV não roda no worker do piloto |
| Agenda e Google | Agenda interna e arquivos privados funcionam desde o início; login Google, sincronização e Drive são opcionais, com autorizações separadas |
| Receita | Mensalidade por escritório, franquias transparentes e voz com limite de minutos |
| Qualidade | Informação com evidência, campos desconhecidos explícitos, revisão das exceções e decisão jurídica humana |

Quatro chaves só representam quatro conjuntos de cotas se houver projetos e limites independentes efetivamente confirmados. A documentação do Google define cotas por projeto. O serviço gratuito também exige cuidado específico com dados pessoais e sigilosos; o plano reserva esse ambiente para testes sintéticos. [Cotas do Gemini](https://ai.google.dev/gemini-api/docs/rate-limits), [termos do Gemini](https://ai.google.dev/gemini-api/terms).

## Como ler

| Arquivo | Para que serve |
| --- | --- |
| [01 — Pesquisa e avaliação](docs/01-pesquisa-e-avaliacao.md) | Crítica ao plano anterior, referências de mercado e evidências científicas |
| [02 — Produto e experiência](docs/02-produto-e-experiencia.md) | O que construir, jornadas, telas e limites da automação |
| [03 — Arquitetura e contratos](docs/03-arquitetura-e-contratos.md) | Stack, banco, segurança, eventos, APIs e integrações |
| [04 — Pipeline de IA](docs/04-pipeline-de-ia.md) | Modelos, quatro chaves, cotas, documentos, RAG e custos |
| [05 — Cartões de implementação](docs/05-cartoes-de-implementacao.md) | Ordem de execução, tarefas pequenas e critérios de aceite |
| [06 — Instrução para a IA executora](docs/06-instrucao-para-ia-executora.md) | Prompt pronto para a supervisora entregar uma tarefa de cada vez |
| [07 — UI/UX e acessibilidade](docs/07-ui-ux-e-acessibilidade.md) | Padrões visuais, formulários, chat/voz, celular e checklist de aprovação das telas |
| [Configuração ilustrativa](planning/model-registry.example.json) | Catálogo sem segredos e sem integrações habilitadas |
| [Inventário de credenciais](planning/quota-inventory.example.json) | Quatro posições para registrar projetos, condições e cotas reais |

Para entender a proposta, leia este arquivo e o documento 02. Para codificar, siga o documento 05; cada cartão informa quais trechos técnicos ler. Toda entrega de interface também cumpre as regras aplicáveis do documento 07. Não entregue todos os documentos à IA executora em todas as tarefas.

## Entregas do produto

1. **Demonstração:** sala + CRM manual + dados fictícios + IA simulada.
2. **Piloto vendável:** link, texto, mensagens de voz, documentos, dossiê, agenda interna, assinatura, suporte humano e recuperação de falhas. Não depende de conectar Google ou Meta.
3. **Módulos opcionais:** busca no acervo do escritório, Google Agenda, Drive e widget; ativar conforme demanda, sem bloquear o piloto por link.
4. **WhatsApp:** entrada oficial de clientes e comandos autenticados do profissional; prioridade de canal após o piloto, com adesão opcional.
5. **Voz ao vivo:** permanece planejada depois da validação do uso, com orçamento e avaliação próprios. Voz gravada não deve ser anunciada como Live.
6. **CRM ampliado:** propostas, contratos, recebíveis, portal, automações e conectores. Medicina exige projeto de validação separado.

## Caminho crítico até o piloto

**E00–E10 → E12 → E17 → E14.1–E14.2 → E18 → E19 → E20.** Os identificadores dos cartões foram preservados; a ordem numérica não obriga executar módulos opcionais.

Depois de E12, demonstrar o dossiê a três advogados com casos sintéticos e ajustar o fluxo. O uso operacional com clientes começa após E19/E20. E11, E13, E14.3, E15 e E16 são complementos; E23–E25 vêm antes de E21–E22 na prioridade padrão. Preparar requisitos externos cedo, mas não fazer a adesão do escritório depender deles.

Registrar evidência curta por subetapa: resultado, teste relevante, limitação e próxima ação. Reutilizar evidências de componentes inalterados. O plano completo continua disponível como referência, sem exigir implementar os 31 cartões antes da primeira venda.

O objetivo da supervisão é aprovar mudanças pequenas com evidência de funcionamento. O objetivo da auditoria profissional é decidir sobre conteúdo jurídico e resolver informações incertas. São responsabilidades diferentes.

## Primeiro passo de execução

A fundação E00.1 está concluída. A próxima tarefa deve seguir o próximo cartão autorizado no documento 05, preservando a mesma lógica: mudança pequena, teste, evidência e só então avanço para a etapa seguinte.
