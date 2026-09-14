# Cartões de implementação supervisionada

## Como executar

Cada cartão é uma entrega verificável. A supervisora escolhe o cartão e entrega à IA executora somente suas dependências e os trechos de especificação relevantes. **Executar uma subetapa por vez**, mesmo quando um cartão tiver três subetapas. Não transformar “fazer o CRM” em um único prompt.

Estado inicial de todos os cartões: **não iniciado**. A pesquisa e os documentos deste repositório são a preparação, não a evidência de que o software funciona.

Regra de tamanho: buscar alterações em até seis arquivos de implementação por subetapa, além de testes, lockfile, migração e tipos gerados. Se ultrapassar isso por mudança de responsabilidade, a supervisora divide o trabalho. Não diminuir segurança ou esconder testes para caber no limite.

Antes de alterar: conferir `git status`, ler instruções locais aplicáveis e preservar mudanças alheias. Ao terminar: registrar os arquivos alterados, comandos/resultados, demonstração e limitações em `docs/evidence/E00.1.md`, por exemplo. Nunca anexar dados pessoais ou segredos às evidências.

Evidência deve ser curta: resultado, comando e resultado real, limitação e próximo passo, geralmente em até 20 linhas, com links para relatórios/capturas quando necessários. Não copiar a especificação para cada relatório. Reutilizar verificação de componentes inalterados e executar novamente só o que a mudança, uma falha ou uma integração nova justificarem.

**Regra transversal de UI/UX:** toda subetapa que cria ou altera interface cumpre o [documento 07](07-ui-ux-e-acessibilidade.md), conforme a tabela “Leitura por cartão”, e registra o checklist UX11 aplicável. Isso já faz parte do aceite, mesmo quando o cartão não o repete. Reutilizar `packages/ui`; tratar estados e acessibilidade na própria entrega, sem deixar todo o trabalho para E19. Em tarefa exclusivamente de backend, não acrescentar testes de tela sem relação com a mudança.

## Caminho crítico e módulos opcionais

| Ordem | Cartões | Resultado observável |
| --- | --- | --- |
| 1 | E00–E06 | Sala por link e CRM manual funcionam com casos fictícios |
| 2 | E07–E10 → E12 | Conversa e documentos viram dossiê com fontes; demonstrar a três advogados com casos sintéticos |
| 3 | E17 → E14.1–E14.2 → E18 | Áudio gravado, agenda interna e assinatura em ambiente de teste |
| 4 | E19 → E20 | Qualidade, scanner configurado, recuperação e operação conferidas; piloto autorizado |
| Complementos | E11; E13 → E14.3/E15; E16 | Busca no acervo, Google, Drive e widget conforme demanda, sem bloquear o link |
| Canal seguinte | E23 → E24 → E25 | WhatsApp oficial opcional para escritórios interessados |
| Live posterior | E21 → E22 | Voz ao vivo após evidência de demanda, capacidade e qualidade |
| Ampliação | E26–E30, respeitando suas dependências | Contratos, financeiro, portal, automações e conectores |

IDs foram mantidos para preservar referências. E14.1–E14.2 são a agenda interna; E14.3 é exclusivamente o conector Google e exige E13. E11 não é dependência do dossiê inicial. Em tarefas apenas do núcleo, não instalar nem construir módulos opcionais. Requisitos externos podem ser pesquisados cedo; conexão do usuário acontece depois, se ele escolher.

## Comandos que E00 deve criar

| Comando na raiz | Contrato esperado |
| --- | --- |
| `pnpm dev` | Inicia a web local |
| `pnpm dev:worker` | Inicia worker separado, encerrável sem perder jobs |
| `pnpm build` | Compila aplicações e pacotes |
| `pnpm lint` / `pnpm typecheck` | Verificações estáticas |
| `pnpm test:unit` | Regras puras e validadores, sem APIs externas |
| `pnpm test:db` | Testes reais do Postgres/RLS no ambiente local |
| `pnpm test:integration` | Banco + aplicações com fornecedores simulados |
| `pnpm test:e2e` | Jornada de navegador com Playwright |
| `pnpm test:evals` | Corpus sintético, saída estruturada por caso/modelo |
| `pnpm check` | Lint, tipos e testes unitários |

Os comandos ainda não existem. E00 implementa cada script e documenta pré-requisitos; não criar script que apenas retorna sucesso. Suites futuras podem iniciar com poucos testes reais; não dizer que uma suite inexistente passou. Comandos da CLI Supabase são descobertos por `--help`, e a versão usada é registrada.

## Portas de aprovação

| Porta | Responsável pela revisão | Evidência mínima |
| --- | --- | --- |
| Fundação | Supervisora | E00–E05; testes de acesso, concorrência e retomada |
| Valor local | Supervisora + advogado revisor do roteiro | E06–E10 e E12; atendimento sintético vira dossiê verificável; demonstração com três advogados |
| Piloto | Supervisora + responsável pelo produto | Núcleo até E12, E17, E14.1–E14.2, E18–E20; contas, scanner, assinatura, restauração e jornada real controlada |
| Complemento opcional | Supervisora | Cartão do módulo, permissões e teste de integração com o núcleo; nova funcionalidade só entra após aceite próprio |
| Live | Supervisora | E21–E22; voz medida, identidade, orçamento e falhas testados |
| WhatsApp | Supervisora | E23–E25; assinatura de webhook, onboarding e comandos protegidos |
| CRM ampliado | Supervisora por módulo | E26–E30; cada jornada funciona sem ações fictícias |

Mudanças em RLS, privilégios, cotas, OAuth, cobrança, assinatura de webhook e aprovação de conteúdo recebem revisão direta da supervisora. A IA executora pode implementá-las em partes, mas não flexibiliza os critérios. A aprovação técnica da supervisora não substitui a revisão de conteúdo jurídico ou a autorização de despesas/contas.

## E00 — Preparar um projeto reproduzível

**Depende:** nenhum. **Ler:** documento 03, stack e estrutura. **Caminhos:** raiz, `apps/`, `packages/`, `scripts/`, CI.

1. Conferir runtime e versões oficiais; registrar versões exatas em `planning/versions.lock.md`. Criar workspace, TypeScript strict, lint, manifests e lockfile. Implementar páginas mínimas e `/health/live`.
2. Criar infraestrutura de testes, script local de banco e `.env.example` sem valores. Definir `MOCK_PROVIDERS=true` somente fora de produção. Produção deve recusar inicialização em modo mock.
3. Criar CI com instalação congelada, lint, tipos e build; documentar comandos em Windows/PowerShell e Linux. Abrir lista de pré-requisitos externos em `planning/external-setup.md`: scanner e cobrança para o piloto; OAuth/WhatsApp como complementos. Não implementar conectores nessa subetapa.

**Aceite:** clone limpo instala e compila; web abre; nenhum segredo no bundle. **Verificar:** `pnpm check`, `pnpm build`, um teste de saúde HTTP. **Entrega:** instruções locais e versões fixadas.

## E01 — Login e estrutura de escritórios

**Depende:** E00. **Ler:** 02, pessoas/onboarding; 03, dados/autorização. **Caminhos:** auth web, db, migrações.

1. Criar `tenants`, `memberships`, `rooms` e fluxo transacional de criação do escritório. Seed com dois escritórios fictícios.
2. Implementar login/logout por e-mail; Google é alternativa opcional de identidade quando configurado, sem pedir escopos de Agenda/Drive. Verificar sessão no servidor. Convite precisa token de uso único e expiração.
3. Implementar seleção de escritório e estados “sem acesso”, “convite expirado” e “conta sem escritório”. Não usar o e-mail enviado pelo cliente como identidade.

**Aceite:** dois usuários entram e veem somente suas associações; convite repetido não duplica membro. **Verificar:** `test:db`, `test:integration`, E2E de login/logout. Google real pode permanecer desabilitado até configurar OAuth; não simular conexão em produção.

## E02 — Isolamento e permissões como fundação

**Depende:** E01. **Ler:** 03, autorização/modelo de dados. **Caminhos:** db, contratos de acesso, migrações/testes SQL.

1. Criar contatos/casos/acesso ao caso/documentos mínimos, FKs compostas e políticas por membro e papel. Aplicar grants explícitos; tabelas futuras seguem o mesmo padrão.
2. Criar helpers de autorização e um único módulo de cliente privilegiado para servidor. Impedir importação pelo frontend e expor somente operações restritas.
3. Testar usuário de outro tenant, assistente sem caso atribuído, visitante, membro revogado, mudança de tenant em UPDATE, views/RPCs e Storage.

**Aceite:** acesso indevido é negado pelo backend/banco, inclusive via requisição direta. **Verificar:** `test:db` e `test:integration`; revisão da supervisora de SQL e privilégios. **Proibido:** resolver falha desligando RLS ou usando chave privilegiada em todo CRUD.

## E03 — CRM manual utilizável

**Depende:** E02. **Ler:** 02, telas; 07, padrão comum e UX07. **Caminhos:** features CRM, `packages/ui`, domínio, db.

1. Implementar cadastro/edição de contato e caso, responsável, fase, notas e tarefa com vencimento. Paginar listas; registrar mudanças.
2. Implementar Hoje, Atendimentos e detalhe do caso com estados vazio/carregando/erro, reutilizando os tokens e componentes de `packages/ui`. Kanban é opcional de visualização; todas as ações existem por botão/menu.
3. Implementar busca autorizada, filtros e conflito de edição por versão. Consolidar componentes visuais e evidências do checklist UX11 antes de novas telas.

**Aceite:** um profissional organiza manualmente um atendimento completo. **Verificar:** E2E em 390 px e desktop, permissão por caso e rejeição de atualização obsoleta. Não criar testes que só repitam classes CSS.

## E04 — Contratos e máquina de estados

**Depende:** E03. **Ler:** 03, estado/eventos; 04, fatos. **Caminhos:** `packages/contracts`, `packages/domain`.

1. Criar esquemas de mensagem, fatos, ações e eventos versionados.
2. Implementar função pura `transition(state, event, context)` com transições explícitas e distinção entre coleta, fase comercial e agendamento.
3. Criar roteiro trabalhista sintético inicial com dados desconhecidos, documentos pendentes, correção de resposta e encaminhamento humano. Conteúdo precisa revisão profissional antes do piloto.

**Aceite:** mesma entrada produz mesma transição; agenda pode existir com documento pendente; função não chama IA. **Verificar:** testes de tabela para transições válidas/inválidas, data relativa e handoff.

## E05 — Fila e execução recuperável

**Depende:** E04. **Ler:** 03, eventos/fila. **Caminhos:** worker, db, migrações.

1. Habilitar pgmq e criar filas registradas, outbox e job_runs, sem expor consumidor ao navegador. Enfileiramento e evento na mesma transação do negócio.
2. Implementar worker com janela de visibilidade, encerramento limpo, repetição limitada e fila de falha.
3. Implementar idempotência por consumidor, resultado externo incerto e reconciliação simulada; impedir turno simultâneo na mesma conversa.

**Aceite:** matar worker após efeito externo e reiniciar não duplica a operação simulada. **Verificar:** integração com banco real e simulação das quedas antes/depois de persistir, além de dois workers concorrentes.

## E06 — Sala pública por link

**Depende:** E05. **Ler:** 02, sala; 03, APIs públicas/sessões. **Caminhos:** sala web, rotas públicas, contratos.

1. Implementar `/s/{slug}`, publicação da sala e dados públicos mínimos. Slug inexistente ou não publicado não revela dados internos.
2. Implementar sessão pública, rate limit, persistência de mensagem e consulta do resultado. Resposta simulada passa pela mesma FSM/fila.
3. Implementar resumo do próximo passo, atendimento humano e pausa do bot. Token só autoriza sua conversa; refresh não recupera histórico por telefone não verificado.

**Aceite:** visitante sem cadastro abre link e vira atendimento no CRM. **Verificar:** duplicata de envio, perda de rede, sessão expirada, dois visitantes e bot pausado pelo profissional.

## E07 — Receber documentos com segurança

**Depende:** E06. **Ler:** 03, arquivos/operação. **Caminhos:** upload, Storage, worker documental.

1. Implementar autorização de upload, confirmação do objeto, hash e versão; buckets privados.
2. Implementar quarentena, checagens de bytes/MIME/tamanho e contrato `MalwareScanner` por HTTPS do documento 03, com adaptador Cloudmersive e modo sintético de desenvolvimento. Não instalar ClamAV no worker. Validar resposta, versão/hash, concorrência e orçamento; falha conserva quarentena.
3. Implementar checklist, estado de verificação e visualização/download autorizados somente após `clean`; descartar rejeitados pela política. Registrar requisitos do serviço e evidência da varredura; configuração real pode ser concluída antes de E19/E20, sem liberar arquivos reais em modo simulado.

**Aceite:** PDF/JPEG/PNG permitidos são recebidos; incompatível/grande é recusado com mensagem útil; só arquivo aprovado tecnicamente segue para o pipeline. **Verificar:** arquivo renomeado, URL de outro caso, upload interrompido, duplicata, hash alterado, detecção simulada, 429, resposta inválida e scanner indisponível. Conferir negação de acesso direto à quarentena. A validação real do serviço é obrigatória antes do piloto documental.

## E08 — Inventário, adaptador Gemini e cotas

**Depende:** E05. **Ler:** 04, catálogo/roteador/cotas; JSONs em planning. **Caminhos:** ai, db e worker.

1. Implementar esquema de registro de credencial/projeto/modelo e importação manual de cotas; desconhecido permanece desabilitado. Conferir IDs e capacidades com amostra sintética mínima quando as credenciais estiverem configuradas. Não exibir valores secretos em relatórios.
2. Implementar reserva atômica e conciliação. Identificar múltiplas chaves do mesmo projeto e limites compartilhados; testar janelas, fusos, timeouts e orçamento.
3. Implementar adaptador Gemini simulado/real e roteador com até três tentativas totais, uma escalada e circuito de falha. Rotas de produção recusam credenciais de teste.

**Aceite:** cem reservas paralelas para dez vagas concedem dez; duas chaves no mesmo projeto compartilham limite; 429 não produz rotação infinita. **Verificar:** `test:db`, `test:integration` e revisão direta da supervisora. Consultar credenciais reais somente no ambiente de execução autorizado; nenhum teste exige consumir toda a cota.

## E09 — Atendimento por texto com IA

**Depende:** E06, E08. **Ler:** 04, roteador/fatos/avaliação. **Caminhos:** ai/prompts, fluxo de atendimento.

1. Criar prompts versionados e esquema de extração/resposta; uma pergunta por vez. Ações são propostas tipadas.
2. Validar referências, nulos, datas relativas e versão da conversa antes de gravar. Implementar resposta fixa de contingência.
3. Integrar à sala e medir tokens por atendimento. Usar corpus sintético de desenvolvimento; reservar os exemplos de teste final.

**Aceite:** triagem vira caso estruturado sem inventar datas; pergunta jurídica fora de escopo vai ao profissional. **Verificar:** injeção de prompt, contexto de outro cliente, cota esgotada e resposta antiga chegando depois de uma correção.

## E10 — Extração documental e divergências

**Depende:** E07, E08, E09. **Ler:** 04, documentos. **Caminhos:** worker documental, ai/extraction, contratos de fatos.

1. Extrair texto de PDF digital e preservar página; identificar páginas que precisam visão. Implementar adaptador visual com teto por documento.
2. Extrair campos com origem; comparar relato/documento por significado e unidade. Conservar divergências, sem “corrigir” o relato silenciosamente.
3. Expor legibilidade, evidências e pendências no caso. Uma falha parcial conserva os resultados válidos e permite nova versão.

**Aceite:** salário-base diferente de remuneração não gera conclusão automática; documento ilegível pede reenvio. **Verificar:** 30 documentos sintéticos, tabelas, datas ambíguas, campos ausentes e PDF com instrução maliciosa.

## E11 — Acervo autorizado e busca híbrida, opcional

**Depende:** E10. **Ler:** 04, RAG. **Caminhos:** db/search, worker/indexing, ai/retrieval.

1. Criar acervos público/interno/privado com publicação explícita; chunking e metadados de fonte.
2. Implementar embedding 768, FTS e fusão de ranking; consultas com mesmo modelo/espaço. Falha no embedding mantém busca lexical.
3. Expor fontes recuperadas e indexação pendente; cache isolado e invalidação por versão.

**Aceite:** consulta nunca recupera dados de outro tenant ou caso sem acesso. **Verificar:** busca lexical por identificador, paráfrase semântica, acervo vazio, fonte revogada e migração de espaço de embedding. Registrar recall sobre amostra conhecida, sem usar nota do gerador como único critério.

## E12 — Dossiê e revisão com fontes

**Depende:** E10. **Ler:** 02, dossiê; 03, aprovações. **Caminhos:** review UI, domínio, db.

1. Gerar snapshot a partir dos fatos, mensagens e documentos do caso, com fontes diretas e pendências. Definir hash de conteúdo e versão. Funcionar com E11 desabilitado; não exigir embeddings para abrir a fonte de um fato.
2. Construir revisão lado a lado no desktop/abas no celular. Clique na referência abre página/trecho existente.
3. Aprovar ou corrigir snapshot com papel profissional; nova evidência invalida o uso da aprovação anterior para novo conteúdo.

**Aceite:** advogado encontra a origem de qualquer fato crítico e sabe qual versão aprovou, inclusive sem acervo vetorizado. **Verificar:** duas revisões simultâneas, novo documento após aprovação, fonte excluída e tentativa de aprovação por assistente. Demonstrar a três advogados com casos sintéticos; registrar dificuldades e corrigir o fluxo antes de ampliar módulos. Esse marco não libera uso operacional com clientes antes de E19/E20.

## E13 — Conectar Google corretamente, opcional

**Depende:** E01, E05. **Ler:** 03, OAuth/Google. **Caminhos:** integrações Google, settings, segredos.

1. Em Mais → Integrações, configurar início/callback OAuth incremental com vínculo seguro à sessão, estado de uso único e escopos mínimos. Separar conexão de Agenda, Drive e login; ausência de conexão não bloqueia publicar sala.
2. Criptografar tokens, renovar com trava e preservar refresh token quando callback não devolver outro. Mostrar conexão parcial ou revogada.
3. Documentar domínio, URIs de retorno, consentimento, política de privacidade e requisitos de publicação/verificação por escopo. Testar o cenário de refresh token de sete dias em app externo Testing e distinguir o login básico. Teste externo não deve ser anunciado como conexão permanente.

**Aceite:** usuário conecta, nega uma permissão, revoga e reconecta sem perda de dados. **Verificar:** CSRF, state repetido, callback de outro tenant, token expirado e logs sem segredo. Registrar pendências do provedor sem falsificar aprovação externa.

## E14 — Agenda interna e sincronização opcional

**Depende:** E14.1 exige E05/E06; E14.2 exige E14.1; E14.3 exige E14.2/E13. **Ler:** 03, Agenda. **Caminhos:** domínio/booking, db, agenda UI; integração/calendar somente na subetapa 3.

1. Implementar agenda interna, regras de horários/fuso, bloqueios e sugestões a partir do Postgres. `calendar_mode=internal` é padrão; não chamar Google.
2. Implementar reserva transacional, confirmação explícita, cancelamento e reagendamento com idempotência e proteção contra sobreposição. Separar confirmação de sincronização; modo interno confirma com `sync_status=not_applicable`.
3. **Opcional, após E13:** adicionar modo Google, consulta free/busy, ID determinístico e reconciliação; lidar com timeout e eventos alterados externamente. Não migrar reservas antigas nem trocar para modo interno silenciosamente. Esta subetapa não bloqueia E19/E20 do núcleo.

**Aceite do núcleo:** reservar/reagendar/cancelar sem Google; duas solicitações para o mesmo intervalo não viram duas reservas. **Verificar:** concorrência, intervalos adjacentes, dois fusos e horário de verão de outra região. **Aceite adicional de E14.3:** timeout não duplica evento; alteração manual externa, revogação e troca de modo não criam confirmação falsa nem liberam intervalo incerto.

## E15 — Cópia organizada no Drive, opcional

**Depende:** E07, E13. **Ler:** 03, Drive. **Caminhos:** integration/drive, worker, configuração.

1. Criar pasta autorizada e cópia de arquivos por ID/hash, preservando original privado.
2. Implementar estados pendente/copied/failed e repetição segura, com identificador de correlação no Drive.
3. Implementar seleção explícita de fonte existente, reconexão, arquivo removido externamente e exclusão conforme política.

**Aceite:** documento pode ser consultado no CRM mesmo com Drive temporariamente fora; nenhum arquivo ganha link público. **Verificar:** scope parcial, pasta sem acesso, upload incerto e duplicata de job.

## E16 — Widget incorporável, opcional

**Depende:** E06. **Ler:** 02, widget. **Caminhos:** script público versionado, embed route e UI.

1. Criar loader pequeno com iframe; apenas slug/identificador público em atributos.
2. Implementar abertura/fechamento, foco, mobile e `postMessage` restrito a eventos de tamanho/estado, com origem exata e esquema validado.
3. Implementar allowlist de domínios, instruções de CSP e opção nova aba; não depender de cookies de terceiros.

**Aceite:** a mesma conversa funciona em duas páginas hospedeiras autorizadas e não contamina CSS. **Verificar:** origem proibida, mensagem forjada, teclado, teclado virtual e iframe bloqueado. Não prometer instalação em plataformas que não aceitam incorporação.

## E17 — Áudio gravado no atendimento

**Depende:** E07, E09. **Prioridade:** primeiro piloto, antes de Live. **Ler:** 02, sala; 04, voz. **Caminhos:** áudio UI, worker/media, ai/transcription.

1. Capturar áudio após ação explícita; detectar formato suportado pelo navegador e aplicar teto de 2 min. Fixar allowlist de MIME/extensões realmente testadas em Safari/Android e no scanner; aplicar quarentena/varredura de E07 antes da transcrição.
2. Transcrever por adaptador aprovado, guardar transcrição com vínculo ao áudio e encaminhar ao mesmo fluxo de texto. Não inferir diagnóstico, emoção ou credibilidade pelo tom.
3. Exibir transcrição, permitir corrigir antes de confirmar dados críticos, descartar áudio conforme retenção e oferecer texto em falhas.

**Aceite:** áudio vira informação no CRM com origem; visitante entende que é mensagem gravada. **Verificar:** Safari/Android, microfone negado, silêncio, interrupção, arquivo inválido e mensagem duplicada.

## E18 — Assinatura e controle de uso

**Depende:** E01, E08. **Ler:** 02, assinatura; 03, Stripe; 04, custos. **Caminhos:** billing, usage, settings.

1. Definir em configuração um plano do piloto, preço em ambiente de teste, usuários/armazenamento/atendimentos e minutos. Criar checkout e portal hospedados.
2. Implementar webhooks assinados, deduplicação, reconciliação e estados de assinatura; não confiar no redirect do navegador.
3. Implementar contadores, avisos, teto rígido de consumo, carência e cancelamento sem exclusão imediata. Gerar simulação de margem com/sem promoção.

**Aceite:** pagamento simulado libera direito correto; evento atrasado não ressuscita assinatura cancelada; custo nunca depende de valor enviado pelo cliente. **Verificar:** assinatura falsa, evento repetido/fora de ordem, saldo insuficiente e dois consumos concorrentes. Preço comercial e cobrança real exigem configuração autorizada do responsável.

## E19 — Qualidade e recuperação do piloto

**Depende:** E12, E14.1, E14.2, E17, E18. E11, E13, E14.3, E15 e E16 só entram se habilitados nesta versão. **Ler:** 03, operação; 04, avaliação; 07, UX10–UX11. **Caminhos:** testes, CI, operação e documentação.

1. Completar os 120 cenários do núcleo e executar comparação dos modelos/roteador sem contaminar o conjunto final. Registrar abstenção, correções, fontes, custos e latência. Módulos opcionais mantêm avaliações próprias; não exigir Google/Live desabilitados para aprovar o núcleo.
2. Testar restauração do banco e objetos, exclusão/exportação, retenção, falha de worker, fornecedor indisponível e revogação de usuário.
3. Consolidar UX11 nos fluxos principais e reaproveitar evidências válidas: mobile/desktop, teclado, zoom, leitor de tela, Playwright/axe e usabilidade. Conferir a jornada sem Google/Meta/widget/acervo, varredura real em arquivos sintéticos controlados, bloqueio quando scanner falha, segredos/logs e alertas. Corrigir problemas que bloqueiam jornada ou isolamento.

**Aceite:** critérios do documento 04 atingidos ou recurso problemático explicitamente desabilitado; nenhum defeito crítico de acesso/ações em aberto. **Verificar:** suites pertinentes, E2E completo e ensaio de restauração com tempos medidos. A supervisora confere evidências; não aceitar “parece funcionar”.

## E20 — Publicar e operar o piloto

**Depende:** E19. **Ler:** 03, hospedagem/operação; lista externa de E00. **Caminhos:** deploy, runbooks e configuração de produção.

1. Preparar infraestrutura declarativa da web e worker, migração com backup, health checks e rollback de aplicação. Confirmar que a imagem do worker não contém ClamAV; configurar o scanner remoto e medir memória/latência até banco e serviços do núcleo. Google não é pré-requisito.
2. Configurar contas, faturamento e tratamento permitido de dados; validar contrato, avisos, finalidade, retenção e procedimentos com responsável. Não converter conta gratuita em paga sem autorização financeira existente.
3. Publicar versão aprovada, fazer smoke test com dado sintético e iniciar 3–5 escritórios autorizados. Medir uso/erros/revisão durante o piloto e disponibilizar canal humano de suporte.

**Aceite:** link público, texto/áudio, documentos verificados, dossiê, agenda interna e assinatura funcionam sem Google/Meta; incidente/restauração são executáveis. Complementos só aparecem como ativos se realmente habilitados e testados. **Verificar:** jornada sintética completa em produção e alarmes. Não alterar cobrança real ou disparar mensagens reais para pessoas de teste sem autorização.

## E21 — Validar modelos e capacidade de voz Live

**Depende:** E08, E17. **Prioridade padrão:** após validar o piloto e a demanda dos canais, normalmente depois de E23–E25. Estudo antecipado sintético só se houver motivo registrado pela supervisora, sem bloquear o núcleo. **Ler:** 04, captura/voz. **Caminhos:** `experiments/voice`, avaliações e inventário.

1. Associar as cotas confirmadas da captura — RPM/RPD ilimitados, TPM de 1M/65K/20K/20K — a projeto, tier e IDs. Confirmar restrições de sessão e preço; não considerar quatro conjuntos por haver quatro chaves.
2. Comparar 2.5 Native Audio, candidato principal, e o ID correspondente ao 3 Flash Live em 30 cenários de português. Prova temporária pode usar token efêmero; medir uso real e não apenas a conexão.
3. Registrar p50/p95, tokens/minuto, interrupção, dados críticos e custo. Comparar com transcrição + resposta validada se necessário. Emitir decisão sobre modelo e limites.

**Aceite:** modelo escolhido por evidência e orçamento; ausência de ID/cota fica explícita, sem alias inventado. **Verificar:** teste em celular/navegador embutido e reconexão; relatório de elegibilidade da rota. Este cartão não publica Live.

## E22 — Entregar conversa por voz ao vivo

**Depende:** E21, E20. **Ler:** 04, gateway. **Caminhos:** `apps/voice-gateway`, UI de voz, adaptador Live e deploy.

1. Criar gateway de transporte Node com WSS, autenticação curta, limite de frames/bytes/tempo e reserva de orçamento. Integrar ao executor de ferramentas existente, sem duplicar regras.
2. Implementar captura/reprodução, interrupção, transcrição de origem confiável, aviso de tempo, encerramento servidor e retomada em texto. Pausar voz automática ao assumir atendimento humano.
3. Instrumentar sessões e publicar por feature flag para escritórios elegíveis. Recibo textual confirma ações persistidas; fala do modelo não confirma operação por si só.

**Aceite:** cliente adulterado não ultrapassa limite nem executa ferramenta proibida; sessão termina no servidor e orçamento é conciliado. **Verificar:** negação de permissão, sessão de outro tenant, reconexão, áudio após fim e cota durante chamada. Se a qualidade falhar, conservar texto/áudio gravado e corrigir antes de ativar Live.

## E23 — WhatsApp oficial para clientes

**Depende:** E05, E09, E17. **Prioridade padrão:** canal opcional após o piloto, antes de Live; implantação comercial exige E25. **Ler:** 03, conectores/WhatsApp. **Caminhos:** WhatsApp adapter, webhooks e worker.

1. Conferir documentação e condições atuais da Meta, acesso à Cloud API, aplicativo/empresa, número e caminhos de onboarding comercial. Implementar primeiro com número de teste autorizado.
2. Validar webhook pelo corpo original/assinatura; resolver tenant por conexão confiável; deduplicar e processar texto, áudio e documento no mesmo domínio.
3. Implementar envio com janela de serviço, templates/consentimento e retorno humano; estado incerto precisa reconciliação.

**Aceite:** mensagem/áudio/anexo criam um atendimento coerente, sem duplicar lead por retry. **Verificar:** webhook falso, payload fora de ordem, mídia expirada, contato que cancela permissão e envio fora de janela. Não usar automação de WhatsApp Web ou Evolution como atalho.

## E24 — Comandos do profissional pelo WhatsApp

**Depende:** E23, E12. **Ler:** 02, automação; 03, comandos. **Caminhos:** staff bindings, command executor e painel.

1. Vincular profissional por desafio iniciado no painel autenticado. Revogar por membro/conexão; distinguir número do cliente e do funcionário.
2. Implementar comandos curtos: listar pendências, abrir resumo seguro e pedir documento aprovado. Linguagem natural gera proposta tipada com versão.
3. Para honorários, contratação ou liberação de documento, mostrar objeto/destinatário/valor e exigir confirmação vinculada ao snapshot; operação sensível usa painel autenticado quando definido.

**Aceite:** “Aprovar 1042” não age sobre caso errado nem versão alterada. **Verificar:** mensagem encaminhada, número não vinculado, membro revogado, nonce repetido e comando antigo. Notificação não carrega dossiê completo desnecessariamente.

## E25 — Onboarding e operação de WhatsApp por escritório

**Depende:** E20, E23, E24. **Ler:** 03, conectores. **Caminhos:** settings/WhatsApp, onboarding e operação.

1. Implementar em Integrações o fluxo comercial de conexão aprovado pela Meta, incluindo Embedded Signup quando aplicável; registrar dependências externas e estado real da autorização. O escritório pode ignorar esta etapa e continuar usando o link sem avisos de cadastro incompleto.
2. Isolar números/contas/templates/custos por conexão, mostrar saúde e permitir revogação. Prever indisponibilidade e suporte.
3. Testar com dois escritórios e finalizar documentação de instalação, uso e custos. Se usar um parceiro oficial por decisão comercial, conservar o mesmo contrato do adaptador.

**Aceite:** um escritório não precisa receber credenciais de outro nem editar código para conectar; confirmação externa pendente aparece como pendente. **Verificar:** troca de número, revogação, templates rejeitados e falha temporária do provedor. Não anunciar ligação telefônica WhatsApp quando só houver mensagens de áudio.

## E26 — Propostas e contratos

**Depende:** E12, E18. **Ler:** 02, CRM ampliado; 03, aprovações. **Caminhos:** proposals/contracts, templates e revisão.

1. Implementar proposta com serviços, valores, condições e versão; cálculos em código, dados do escritório e cliente verificados.
2. Implementar templates aprovados, exportação de documento, revisão e registro da versão enviada. Aceite não reutiliza aprovação de outra versão.
3. Registrar documentos assinados recebidos e situação do contrato com evidência; assinatura eletrônica automática depende do conector específico de E30.

**Aceite:** proposta aprovada gera contrato com os mesmos valores e fontes; alteração reabre revisão. **Verificar:** moeda/centavos, campos faltantes, permissão, versão obsoleta e arquivo exportado. Upload de arquivo assinado não deve ser rotulado como assinatura digital verificada pelo sistema.

## E27 — Financeiro do escritório

**Depende:** E26. **Ler:** 02, distinção financeira. **Caminhos:** receivables, CRM financial views e domínio monetário.

1. Criar parcelas, recebíveis, pagamentos registrados, despesas básicas e vínculo ao caso; sem confundir com a assinatura SaaS.
2. Implementar baixa/reversão auditada, vencimento e saldo. Não movimentar dinheiro do cliente nem custodiar valores.
3. Implementar relatório/exportação e conferência de totais; integração bancária/cobrança externa entra por contrato posterior.

**Aceite:** total previsto, recebido e pendente reconciliam; pagamento duplicado não duplica receita. **Verificar:** parcelamento com arredondamento, cancelamento, estorno, permissões e filtro de período/fuso.

## E28 — Automações administrativas configuráveis

**Depende:** E05, E14.2, E23, E26. **Ler:** 02, automação; 03, eventos. **Caminhos:** automation rules e worker.

1. Implementar regras declarativas sem código arbitrário: evento, condições, atraso, ação aprovada e limites.
2. Entregar três receitas: pedir documento faltante, lembrar compromisso e criar tarefa após aprovação de contrato.
3. Implementar dry run, histórico, cancelamento por resposta/revogação/fechamento e limite por pessoa. Regra alterada não reaproveita autorização de envio incompatível.

**Aceite:** uma resposta do cliente cancela o lembrete pendente; nenhum loop gera mensagens em sequência. **Verificar:** job atrasado, evento repetido, opt-out, mudança de horário e documento entregue antes do envio.

## E29 — Portal e portabilidade

**Depende:** E12, E26, E27. **Ler:** 02, cliente; 03, autorização/retenção. **Caminhos:** portal, export/import e privacy jobs.

1. Implementar acesso de cliente verificado e conteúdo explicitamente publicado pelo escritório; notas internas ficam privadas.
2. Implementar exportação de cadastros/arquivos e importação CSV com validação, prévia e deduplicação. Proteger CSV contra fórmulas injetadas.
3. Implementar pedidos de correção/exclusão, retenção aplicável e relatório de remoção dos derivados. Revogar links/sessões de cliente.

**Aceite:** cliente vê somente seu acervo publicado e consegue apresentar pedido de dados. **Verificar:** enumeração de IDs, contato compartilhado, coluna malformada, importação duplicada e remoção de índice/cache/cópia autorizada.

## E30 — Conectores e novos segmentos

**Depende:** E25–E29. **Ler:** 03, contratos; 01, limites de expansão. **Caminhos:** integrações, OpenAPI e pacotes de segmento.

1. Publicar contrato OpenAPI das operações externas aprovadas, chaves escopadas e webhooks assinados; teste de conformidade reutilizável. Não expor todo CRUD interno por padrão.
2. A supervisora especifica um conector de cada vez — assinatura eletrônica, calendário Microsoft ou CRM existente — com fornecedor, operação, escopos, preço/contrato e casos de teste antes de entregar à IA executora. Sem essa ficha, o executor implementa apenas a interface já definida, não inventa uma conexão funcional.
3. Extrair o roteiro jurídico em pacote versionado com esquema, checklist, FAQ publicada, regras de encaminhamento, prompts e avaliações. Outra área jurídica usa outro pacote. Medicina permanece desabilitada até avaliação específica de finalidade, fornecedor, dados e normas profissionais.

**Aceite:** a primeira integração escolhida passa pelo teste de contrato e por uma jornada real autorizada. “Pronto para integrar” deve distinguir adaptador disponível de conector instalado/operante. **Verificar:** assinatura inválida, revogação, versão incompatível e isolamento de dados.

## Sequência e estimativa

Seguir o caminho crítico no início deste documento: E00–E10 → E12 → E17 → E14.1–E14.2 → E18 → E19 → E20. Complementos têm aceite independente; WhatsApp precede Live na prioridade padrão. E11, Google, Drive e widget não são requisitos de primeira venda. A preparação documental externa pode ser antecipada; a implementação só entra quando priorizada. Isso não autoriza agentes paralelos automaticamente.

Reestimar prazo após E03 e após a demonstração de E12, usando tempo observado por subetapa, correções e espera externa. As faixas anteriores de semanas e as estimativas da crítica não são compromissos nem resultados medidos. O objetivo imediato é concluir e demonstrar o próximo fluxo útil. Um executor menos capaz ou ausência de revisor pode aumentar a duração; contar cartões aprovados e tarefas concluídas, não páginas produzidas.

Configurações ainda necessárias para operar, que não impedem o trabalho local: mapeamento das quatro chaves para projetos, modelos/cotas efetivos, contas de produção, scanner ativo, orçamento, domínio, responsável jurídico pelo roteiro, política de dados e preço do piloto. OAuth de Agenda/Drive e Meta são requisitos dos módulos opcionais. A captura de voz e seus cabeçalhos já estão incorporados; não pedir os mesmos dados novamente.
