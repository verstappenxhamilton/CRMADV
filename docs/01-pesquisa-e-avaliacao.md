# Pesquisa e avaliação do plano

## Parecer

O plano anterior tem uma boa base: separar canais, usar estados explícitos, estruturar documentos e apresentar um dossiê ao profissional. A revisão chamada de “padrão ouro” acrescentou ferramentas úteis, mas também promessas sem sustentação e complexidade antes de existir um produto utilizável.

A recomendação é construir um CRM de atendimento jurídico completo por etapas. O primeiro resultado comercial deve ser: **a pessoa pede atendimento, fornece informações e documentos, recebe um próximo passo claro, e o advogado encontra tudo organizado e verificável**.

As escolhas de arquitetura deste pacote são recomendações de engenharia. Os recursos e condições dos fornecedores estão associados às fontes correspondentes. Não foram realizados testes com as quatro chaves, entrevistas de mercado ou benchmarks próprios; as cotas informadas são hipóteses a confirmar no painel de cada projeto.

## O que manter e o que corrigir

| Ponto do plano anterior | Avaliação | Decisão de implementação |
| --- | --- | --- |
| Começar pelo Direito | Bom recorte | Um fluxo jurídico inicial; arquitetura extensível por configurações versionadas |
| Máquina de estados | Boa base para controlar ações | Transições autorizadas pelo backend, estado persistido e versão para evitar conflitos |
| JSON rígido | Ajuda a validar formato | Validar também origem, coerência e campos desconhecidos; JSON válido pode conter fatos errados |
| “Zero alucinação” | Promessa insustentável | Medir erros, exigir evidências e recusar conclusões sem apoio |
| Latência de voz abaixo de 300 ms | Não demonstrada ponta a ponta | Medir do fim da fala ao primeiro áudio em dispositivos e redes reais |
| Live “WebRTC/Gemini” | Mistura protocolo e opções de transporte | A API oficial usa WebSocket; WebRTC requer uma camada adicional |
| Python + FastAPI + LangGraph + Temporal | Sobreposição para o estágio inicial | TypeScript, estados no Postgres e fila durável; reconsiderar orquestrador especializado quando houver necessidade demonstrada |
| Redis/RabbitMQ desde o início | Mais um serviço para operar | Fila Postgres e worker, com repetição segura e idempotência |
| Postgres full-text = BM25 | Incorreto | Busca textual nativa + pgvector; BM25 somente com implementação/extensão explicitamente escolhida |
| Só estruturar documentos de clientes | Restritivo | Estruturar campos e permitir busca no caso; nunca usar o acervo de um cliente na resposta a outro |
| Sempre usar parser multimodal | Pode aumentar custo e erros | Extrair texto digital primeiro; OCR/visão apenas onde necessário |
| “Documento validado” | Confunde leitura com autenticidade | Mostrar “recebido”, “legível”, “dados extraídos” e “revisado pelo advogado” |
| `semana passada` vira uma data exata | Cria precisão inexistente | Guardar expressão original, intervalo possível e necessidade de confirmação |
| `alerta_prescricao: false` por extração | Esconde uma conclusão jurídica | `not_assessed`; datas e regras precisam de versão e validação profissional |
| Cálculo de prescrição apenas por data | Insuficiente | Não liberar cálculo jurídico automático na primeira versão; regras futuras contemplam jurisdição e exceções |
| Viabilidade “alta” por IA | Pode induzir decisão indevida | Resumo fático e divergências; parecer e contratação ficam com o advogado |
| Honorários alterados por comando livre | Útil, mas precisa de controles | Gerar proposta de alteração com valores, destinatário e versão; confirmar antes de enviar |
| Documentos obrigatórios antes de agendar | Pode prejudicar conversão | Permitir agendar com documentos pendentes, conforme configuração do escritório |
| MCP conecta “qualquer coisa” | Protocolo não resolve autorização nem semântica | Conectores explícitos com contratos, escopos e testes; MCP pode ser outra interface futura |
| WhatsApp oficial “sem risco de banimento” | Garantia indevida | API oficial com políticas e limites; suspensão ainda é possível |

As correções de protocolo, busca e esquema apoiam-se nas documentações de [Live API](https://ai.google.dev/gemini-api/docs/live-api), [PostgreSQL](https://www.postgresql.org/docs/current/textsearch-controls.html) e [Structured Outputs](https://ai.google.dev/gemini-api/docs/structured-output).

## Referências de mercado

Esta comparação usa recursos declarados pelos fornecedores, sem assumir que foram testados ou que geram o retorno anunciado.

| Referência | Padrão útil observado | Aplicação no produto |
| --- | --- | --- |
| [Clio Grow](https://www.clio.com/grow/) | Entrada de clientes, formulários, acompanhamento e agendamento | Atendimento já deve produzir um cadastro, responsável e próximo passo |
| [Lawmatics](https://www.lawmatics.com/client-intake) | Fluxos de captação e relacionamento organizados em um CRM jurídico | Automatizações com condição, evento de parada e histórico |
| [Astrea](https://www.aurum.com.br/astrea/) | Integração de processos, tarefas, clientes, documentos e financeiro | Planejar continuidade depois da triagem, sem limitar o produto a um chatbot |
| [WhatsApp Business Platform](https://whatsappbusiness.com/products/platform-pricing/) | Atendimento conversacional associado ao número da empresa | Canal conveniente para continuar um atendimento, com custos e permissões próprios |

O Astrea anunciava seu plano Smart a partir de R$379/mês no anual ou R$439 no mensal na página consultada. É uma referência pontual de um produto de escopo diferente, não uma prova do preço adequado para este CRM. [Astrea](https://www.aurum.com.br/astrea/).

**Hipótese comercial:** o diferencial inicial é reduzir o trabalho entre receber uma mensagem e atender uma pessoa com contexto. Link direto, uso confortável no celular, documentos com evidências e uma caixa de pendências curta são mais relevantes que uma lista extensa de “agentes”.

Antes de consolidar preço e área jurídica, entrevistar 8–12 escritórios e observar, com autorização e anonimização adequada, como atendem hoje. Depois fazer piloto com 3–5 escritórios. Medir conclusão de triagem, tempo de revisão, agendamentos comparecidos e quantas vezes o profissional precisa refazer o trabalho. Esses números são um desenho de validação proposto, não dados de mercado coletados.

## Evidências sobre orquestração

| Fonte | O que investigou | O que aplicar | Limite da evidência |
| --- | --- | --- | --- |
| Chen, Zaharia e Zou, [FrugalGPT](https://arxiv.org/abs/2305.05176), 2023 | Adaptação de prompts, aproximação e cascatas para custo/qualidade | Começar simples e escalar apenas quando a saída não atende aos critérios | Os ganhos do artigo não são uma previsão para estes modelos ou para documentos jurídicos brasileiros |
| Ong et al., [RouteLLM](https://arxiv.org/abs/2406.18665), versão de 2025 / ICLR 2025 | Roteadores treinados com preferências entre modelos fortes e fracos | Comparar roteamento com baselines e calibrar por tarefa | Exige dados; preferência de resposta não equivale a correção jurídica |
| Anthropic, [Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval), 2024 | Contexto nos trechos, busca lexical/semântica e reranking | Preservar título, seção, fonte e contexto ao indexar | Experimento do fornecedor; não demonstra o mesmo ganho com Postgres FTS ou neste domínio |
| Google, [Structured Outputs](https://ai.google.dev/gemini-api/docs/structured-output) | Respostas segundo subconjunto de JSON Schema | Contratos em Zod, campos nulos e validação no servidor | Garantia estrutural não prova verdade do conteúdo |

**Decisão:** roteador determinístico no início. Ele conhece a tarefa, modalidade, dados permitidos, qualidade mínima e orçamento. Uma cascata tem no máximo uma escalada de qualidade. Não executar vários modelos para votar sobre cada mensagem. Roteamento aprendido só entra depois de haver amostra representativa revisada por profissionais e benefício medido.

RAG ajuda a encontrar material; não comprova que o material está correto, atualizado ou que a conclusão decorre dele. A consulta deve devolver uma fonte autorizada e a geração deve conservar sua referência. O profissional precisa abrir o trecho original em um clique.

## Condições dos serviços que afetam o produto

**Google e dados reais.** Os termos diferenciam serviços gratuitos e pagos; no gratuito, o conteúdo pode participar da melhoria dos produtos e há restrição ao envio de informações pessoais, confidenciais ou sensíveis. O tratamento como API paga depende de projeto com faturamento ativo. Isso não elimina obrigações de retenção, contratação e transferência internacional. Também há restrições de idade e uso clínico. [Termos do Gemini, vigentes desde 23/03/2026](https://ai.google.dev/gemini-api/terms).

**Quatro chaves.** O inventário precisa identificar projeto, modelos habilitados e limites efetivos. RPM, TPM e RPD são limites diferentes; gerar novas chaves no mesmo projeto não aumenta capacidade. A rotação serve para gestão de credenciais e distribuição autorizada, nunca para contornar limites. [Rate limits](https://ai.google.dev/gemini-api/docs/rate-limits).

**Antigravity.** Existe um agente oficial na Gemini API, `antigravity-preview-05-2026`. Uma interação pode envolver várias etapas, ferramentas e tokens; não equivale a uma chamada comum de chat. A cota de 100 informada ainda precisa ser confirmada. [Antigravity agent](https://ai.google.dev/gemini-api/docs/antigravity-agent).

**Conectar Google.** Login e acesso à Agenda/Drive são autorizações distintas. Apps externos em modo de teste podem receber refresh tokens com validade de sete dias quando solicitam escopos adicionais. Conectar sem fricção depende também de configurar e publicar corretamente o OAuth. [OAuth 2.0](https://developers.google.com/identity/protocols/oauth2).

**Direito e saúde.** A OAB admite chatbot para comunicação e coleta, preservando a responsabilidade e a atuação pessoal do profissional. A automação administrativa pode ser extensa; parecer, estratégia, prazos e liberação de documentos continuam com responsáveis identificados. Medicina não deve herdar esse fluxo por troca de rótulos: requer avaliação própria de fornecedor, finalidade clínica e normas profissionais. [Provimento 205/2021, anexo](https://www.oab.org.br/leisnormas/legislacao/provimentos/205-2021).

**LGPD.** O projeto deve definir papéis de controlador/operador, finalidade e base legal por tratamento, direitos, segurança, retenção e transferências. Consentimento para usar microfone ou receber WhatsApp não substitui essa definição. A revisão jurídica desses documentos ocorre antes do piloto real. [LGPD, especialmente arts. 6, 7, 11, 18, 33 e 46](https://planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/L13709.htm).

## Vantagem que vale construir

A dificuldade de copiar virá de fluxos validados, qualidade mensurável, integração confiável, histórico organizado e experiência de uso. Prompts isolados são fáceis de reproduzir. Um conjunto de exemplos sintéticos, correções estruturadas, avaliações por tarefa e mecanismos de recuperação melhora o produto a cada uso autorizado, sem compartilhar acervos privados entre clientes.

## Revisão após a crítica externa

Decisão de 13/09/2026: incorporar simplificações de execução e onboarding. As notas, garantia de margem superior a 80%, disposição a pagar e percentuais de preferência por áudio apresentados pela outra IA não vieram acompanhados de dados verificáveis; não são premissas comerciais deste plano. O Pitaco 4 foi excluído desta revisão por orientação do usuário.

| Dica recebida | Avaliação | Ajuste efetivo |
| --- | --- | --- |
| 1 — Reduzir trabalho antes de validar | Faz sentido. O plano já previa demonstrar antes de concluir todos os módulos; faltava tornar as dependências opcionais mais claras | Caminho crítico no README/documento 05; E12 não exige E11; evidência curta e demonstração do dossiê com três advogados usando casos sintéticos |
| 2 — Tirar ClamAV do worker pequeno | Procede; a recomendação oficial para contêiner é 3 GiB mínimos, preferindo 4 GiB, inclusive por picos de atualização | Validação leve + quarentena + scanner HTTPS. ClamAV local deixa o piloto; checar tipo/tamanho sozinho não libera arquivo como livre de malware |
| 3 — Priorizar áudio gravado e WhatsApp | Adotar a ordem como hipótese de produto. Não há evidência apresentada para “90% do valor” nem para afirmar que o público rejeita Live | E17 no piloto; WhatsApp opcional antes de Live. Medir uso, conclusão e demanda; manter voz ao vivo no plano posterior |
| 5 — Tornar Google/Meta opcionais | Procede como decisão de onboarding; o cadastro do SaaS deve entregar valor independentemente de autorizações externas | Agenda interna e arquivos privados por padrão; conectar serviços depois, em Integrações; login Google separado de Agenda/Drive |

O alerta de memória tem base na [documentação do ClamAV](https://docs.clamav.net/manual/Installing/Docker.html). Separar validação de formato, armazenamento restrito e varredura segue as camadas descritas pela [OWASP](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html). O primeiro adaptador remoto tem referência na [API Cloudmersive](https://api.cloudmersive.com/docs/virus.asp); preço, limites e condições do serviço precisam constar da configuração antes de receber arquivos reais.

A crítica ao OAuth precisa de precisão: em app externo `Testing`, refresh tokens de escopos adicionais normalmente expiram em sete dias; escopos básicos de identidade têm exceção. A interface de aviso depende de estado/verificação/escopos, e `drive.file` é classificado como não sensível. Isso justifica separar login e integrações; não implica que todo login Google exija verificação de acesso amplo. [OAuth Google](https://developers.google.com/identity/protocols/oauth2), [estados do app](https://developers.google.com/identity/protocols/oauth2/production-readiness/overview), [escopos Drive](https://developers.google.com/workspace/drive/api/guides/api-specific-auth).

“Demonstrar após E12” significa observar o produto com dados sintéticos. Piloto operacional segue E19/E20 do núcleo, com scanner, acesso, cobrança, recuperação e integrações efetivamente utilizadas conferidos. Adiar complementos não autoriza pular os testes do que será oferecido.

## Referências complementares e rastreabilidade

Consulta realizada em 13/09/2026. Os links ao longo do texto identificam o fornecedor ou os autores. Para páginas sem data editorial clara, vale a data de consulta; as condições devem ser conferidas novamente nos cartões de integração.

| Publicador | Documento | Uso no plano |
| --- | --- | --- |
| Google | [Catálogo Gemini](https://ai.google.dev/gemini-api/docs/models) | IDs candidatos e modalidades |
| Google | [Preços Gemini](https://ai.google.dev/gemini-api/docs/pricing) | Simulação de custos no documento 04 |
| Google | [Embedding 2](https://ai.google.dev/gemini-api/docs/models/gemini-embedding-2) | Dimensão e versão do embedding |
| Google | [Drive: escopos](https://developers.google.com/workspace/drive/api/guides/api-specific-auth) | Acesso restrito por arquivo |
| Google | [Calendar: escopos](https://developers.google.com/workspace/calendar/api/auth) | Permissões da agenda |
| Google | [Tokens efêmeros Live](https://ai.google.dev/gemini-api/docs/live-api/ephemeral-tokens) | Credenciais temporárias |
| Supabase | [Queues](https://supabase.com/docs/guides/queues), [Quickstart](https://supabase.com/docs/guides/queues/quickstart) | Fila Postgres e janela de visibilidade |
| Supabase | [Changelog](https://supabase.com/changelog), [preços](https://supabase.com/pricing) | Compatibilidade e orçamento |
| Next.js | [Instalação](https://nextjs.org/docs/app/getting-started/installation), [deploy](https://nextjs.org/docs/app/getting-started/deploying) | Framework e execução em Node |
| Node.js | [Releases](https://nodejs.org/en/about/previous-releases) | Runtime LTS |
| Stripe | [Webhooks de assinatura](https://docs.stripe.com/billing/subscriptions/webhooks) | Estado de assinatura |
| Meta | [Política de mensagens](https://business.whatsapp.com/policy), [preços](https://whatsappbusiness.com/products/platform-pricing/) | Consentimento, janela de serviço e cobrança |

A documentação de Embedded Signup da Meta respondeu com limitação de acesso durante a consulta. Seus requisitos detalhados de publicação ficam como verificação obrigatória em E23; não foram tratados como integração já validada. O índice `.md` do changelog Supabase não foi acessível; foi consultada a versão HTML oficial.
