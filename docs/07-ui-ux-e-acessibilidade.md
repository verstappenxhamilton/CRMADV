# UI/UX e acessibilidade — contrato de implementação

Objetivo: uma interface clean, intuitiva e profissional, em que a pessoa reconheça o próximo passo, conclua a tarefa e entenda o resultado. Este documento detalha a [experiência do produto](02-produto-e-experiencia.md) e integra o aceite dos [cartões de implementação](05-cartoes-de-implementacao.md).

As regras abaixo são decisões deste produto, informadas pelas fontes indicadas, consultadas em **13/09/2026**. A referência de acessibilidade é **WCAG 2.2 nível AA**; cores, medidas de layout e densidade são escolhas de projeto. A aplicação ainda precisa ser implementada e avaliada: este plano não certifica conformidade. [Padrão WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## UX01 — Hierarquia e navegação

- Cada tela tem título claro, uma tarefa prioritária e uma ação principal em destaque. Ações secundárias usam menos ênfase. Na escolha inicial entre texto e voz, as duas opções têm peso equivalente.
- Manter **Hoje / Atendimentos / Clientes / Agenda / Mais**, com rótulos visíveis e indicação da seção atual. O nome do escritório ativo permanece identificável; trocar de escritório limpa a seleção do caso e carrega o contexto autorizado.
- Hoje mostra pendências acionáveis, retornos e agenda; no máximo três indicadores. Listas e tabelas organizam trabalho repetido; usar cartões apenas quando houver um grupo real de informações.
- Exibir primeiro o essencial e revelar detalhes por expansão ou página própria. Ações frequentes, pendências e contato humano continuam fáceis de encontrar. Ícones, menus de reticências e tooltips não substituem rótulos essenciais.
- Preservar filtros e posição da lista ao voltar de um atendimento. Busca, filtro e ordenação têm estados visíveis; oferecer **Limpar filtros** quando afetarem os resultados. Persistir apenas preferências não sensíveis no navegador.
- Não lançar um tour obrigatório. O primeiro estado vazio ensina a próxima ação; a ajuda contextual fica junto da tarefa.

## UX02 — Sistema visual único

Centralizar os tokens em `packages/ui/src/tokens.css` e componentes em `packages/ui/src/`. Tailwind e shadcn/ui continuam sendo a base definida. A IA executora reutiliza componentes; alterações no padrão acontecem no componente compartilhado. Usar uma única família de ícones, com importação individual.

| Token / elemento | Decisão inicial |
| --- | --- |
| Fundo / superfície | `#F8FAFC` / `#FFFFFF` |
| Texto principal / secundário | `#0F172A` / `#475569` |
| Ação / link | `#1D4ED8`; botão preenchido com texto branco; link em parágrafo também sublinhado |
| Separador decorativo | `#E2E8F0`; não usar como único contorno identificável de campo |
| Contorno de campo | `#64748B` sobre branco ou fundo base |
| Erro / sucesso / atenção | `#B91C1C` / `#166534` / `#92400E`, acompanhados de texto; conferir o contraste em cada fundo |
| Tipografia | Fonte de sistema; corpo e campos 16 px / entrelinha 1,5; metadados 14 px; títulos 20–28 px e peso 600 |
| Espaçamento | Escala de 4, 8, 12, 16, 24 e 32 px; margem lateral mínima de 16 px no celular |
| Controles | Área interativa projetada de pelo menos 44×44 CSS px para botões e controles; ícone pode ser menor, sem sobrepor outro alvo |
| Forma e profundidade | Cantos de 8–12 px; sombras discretas em sobreposições; agrupamento por espaço e alinhamento |
| Movimento | Transições curtas, 120–200 ms, quando ajudarem a perceber uma mudança; respeitar `prefers-reduced-motion` |

O padrão de 44×44 é uma escolha mais confortável deste produto. O critério AA 2.5.8 estabelece 24×24 CSS px, com exceções previstas; não apresentar 44×44 como o mínimo normativo AA. Links dentro de frases seguem as condições específicas da norma. [W3C — tamanho de alvos](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

Aplicar contraste de pelo menos **4,5:1 ao texto comum**; a exceção de **3:1** se aplica ao texto grande conforme a definição da WCAG. Conferir inclusive placeholders e texto secundário. [W3C — contraste de texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

Informação visual necessária para identificar controles e seus estados exige **3:1 contra cores adjacentes**, conforme as condições do critério. O separador claro não serve como único indicador de um campo. Anel de foco deve continuar perceptível em botões preenchidos, fundos brancos e sobreposições. [W3C — contraste de componentes](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

A marca do escritório pode personalizar nome, logo e áreas de identidade. Cores customizadas passam pela mesma verificação antes da publicação. A primeira versão usa tema claro; não duplicar o trabalho com tema escuro antes de validar essa experiência.

## UX03 — Layout responsivo

| Largura disponível | Comportamento inicial |
| --- | --- |
| Abaixo de 768 px | Uma coluna; navegação compacta com rótulos; revisão em abas Resumo / Fontes / Histórico |
| 768–1023 px | Navegação compacta; conteúdo principal ganha espaço; detalhes abrem quando solicitados |
| A partir de 1024 px | Barra lateral; revisão em duas colunas somente se cada painel tiver pelo menos 360 px úteis |

Os limites são pontos de partida. Se o conteúdo não couber, antecipar a mudança de layout; nunca reduzir texto para forçar duas colunas. Não renderizar duas navegações equivalentes simultaneamente na árvore de acessibilidade.

Conteúdo comum deve se reorganizar em **320 CSS px**, sem perda de informação ou rolagem horizontal da página; testar também uma janela de 1280 px com zoom de 400%. Tabelas realmente bidimensionais e o visualizador de documento podem ter rolagem própria, acessível por teclado, preservando as ações ao redor. [W3C — reorganização do conteúdo](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

Chat, widget e formulários respeitam teclado virtual e áreas seguras do aparelho. O campo ativo e o botão necessário à tarefa permanecem alcançáveis. Elementos fixos não cobrem mensagens, erros nem o foco. Textos longos quebram linha; nome completo, valor e data críticos podem ser consultados integralmente.

## UX04 — Formulários e onboarding

- Perguntar apenas o necessário ao passo atual. Na sala, uma pergunta por vez; no painel, agrupar campos relacionados para o profissional trabalhar com rapidez.
- Campo tem rótulo persistente, indicação de opcional quando aplicável e exemplo só se necessário. Placeholder não faz o papel do rótulo. Associar ajuda e erro ao campo; usar `autocomplete`, `inputmode` e tipo de entrada adequados.
- Aceitar nomes com acentos, apóstrofos e espaços. Normalizar telefone e moeda sem apagar o que foi digitado durante a edição. Exibir datas em formato brasileiro e explicitar o fuso em agendamentos; data relativa ou ambígua precisa confirmação.
- Validar ao **Continuar / Salvar**, preservando as entradas. Mostrar mensagem junto do campo e, em formulário, resumo dos erros com links e foco no resumo. Não marcar um campo como errado antes de a pessoa terminar de preenchê-lo. Mensagens devem dizer como corrigir. [GOV.UK — recuperação de erros](https://design-system.service.gov.uk/patterns/validation/).
- Evitar botão desabilitado sem explicação. Deixar a pessoa tentar enviar e mostrar o que falta; desabilitar temporariamente quando a operação já estiver sendo enviada, com estado perceptível. A validação do servidor continua obrigatória.
- Onboarding tem progresso por etapas, possibilidade de voltar e rascunho salvo no servidor. O objetivo é testar, publicar e copiar o link usando agenda interna e arquivos privados. Não pedir novamente informação disponível e confirmada; Google/Meta não entram como etapas obrigatórias.
- Em **Mais → Integrações**, Agenda Google, Drive e WhatsApp são escolhas separadas, exibidas apenas quando seus módulos estiverem disponíveis. “Não conectado” é estado normal; não usar aviso vermelho ou cadastro incompleto para pressionar a conexão. Explicar o benefício e a permissão antes do consentimento externo. Login Google não ativa essas integrações.
- Login permite gerenciadores de senha, colar códigos e alternativas acessíveis ao mecanismo de autenticação. Não criar desafios de memorização como única entrada. Essa direção segue os critérios de entrada redundante e autenticação acessível da [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## UX05 — Estados e recuperação

Cada tela implementa os estados aplicáveis junto com o caminho principal. Não inventar barras de progresso, tempo restante ou confirmação de efeito externo.

| Estado | O que a pessoa vê | Ação disponível |
| --- | --- | --- |
| Primeiro uso | Explicação curta do que aparecerá ali | Criar primeiro atendimento ou testar sala |
| Busca vazia | “Nenhum atendimento com esses filtros” | Limpar filtros |
| Carregando | Estrutura estável e indicação curta na região afetada | Continuar nas regiões disponíveis |
| Enviando / processando | Diferenciar envio do arquivo, recebimento e análise | Acompanhar; cancelar apenas se houver operação de cancelamento real |
| Salvo | “Salvo” após confirmação do backend | Continuar a tarefa |
| Sem conexão | “Sem conexão. Esta mensagem ainda não foi enviada” | Tentar novamente, conservando o rascunho em memória |
| Erro recuperável | O que falhou e como tentar de novo | Repetir com a mesma identidade da operação, sem duplicar |
| Sessão expirada / permissão revogada | Explicação de acesso e caminho de reconexão | Entrar novamente ou solicitar acesso |
| Integração indisponível | Identificar Agenda ou Drive afetado, sem apagar o estado interno | Reconectar ou continuar com a alternativa interna |
| Resultado externo incerto | “Estamos verificando a confirmação” | Acompanhar a reconciliação; não reenviar uma segunda reserva |

Confirmação transitória pode usar um aviso discreto. Erro que exige ação, pendência e situação de agendamento continuam visíveis no contexto; não depender de um toast que desaparece. Atualizações assíncronas devem ser anunciadas sem mover o foco: usar regiões de status adequadas, evitando alertas a cada atualização. [W3C — mensagens de estado](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html).

Agenda interna confirma a reserva sem esperar Google. Quando sincronização já estiver ativada, indisponibilidade mantém o estado pendente; a interface não promete confirmação nem troca de modo silenciosamente. Arquivo em quarentena mostra **Verificação pendente**, sem botão para ignorar a varredura ou abrir o original; scanner concluído e legibilidade são estados diferentes.

Preservar rascunho não autoriza gravar conversas ou documentos em `localStorage`. Reutilizar a sessão e a persistência autorizadas no documento 03; deixar claro quando a informação ainda não foi salva. Revogação de acesso remove conteúdo privado da tela.

## UX06 — Chat, voz e widget

- Sala abre diretamente no atendimento, com identidade do escritório, identificação de assistente virtual e contato humano. Não bloquear o início com cadastro ou apresentação comercial.
- Texto fica disponível em todos os modos. A pergunta pode oferecer botões, seletor de horário ou upload quando isso reduzir esforço; a pessoa não precisa digitar uma data que pode selecionar.
- Mensagens geralmente têm 1–3 frases. Informações longas usam resumo e expansão. No primeiro chat, mostrar a resposta depois da validação do backend; o plano não prevê streaming de texto ainda não validado.
- Exibir **Enviar**. No desktop, Enter envia e Shift+Enter quebra linha, com indicação discreta; não enviar durante composição de caracteres (`isComposing`). No teclado móvel, manter quebra de linha e envio por botão.
- Se a pessoa estiver lendo mensagens anteriores, chegada de mensagem não desloca a leitura: mostrar **Nova mensagem**. Rolagem automática só acompanha quem já estiver no fim da conversa. Anunciar mensagens completas ao leitor de tela, sem reler todo o histórico.
- Microfone só começa após ação explícita. Mostrar gravando, tempo e **Parar**. Áudio gravado pode ser ouvido e descartado antes de enviar. Na conversa Live, oferecer **Silenciar microfone**, **Encerrar** e **Continuar por texto**; exibir transcrição e estado de conexão.
- Antes de sair de uma gravação, parar a captura e preservar a opção de enviar ou descartar. Ao encerrar Live, parar também reprodução e captura. Não manter microfone funcionando após fechar a interação.
- Ao atingir limite de voz ou negar microfone, explicar brevemente e continuar por texto. Não pedir a mesma permissão repetidamente. Usar “Enviar áudio” para gravação e “Conversar ao vivo” somente para Live disponível.
- Widget fechado é um botão com nome acessível. Painel desktop tem aproximadamente 400 px, limitado à janela; celular usa tela completa. Sua abertura segue UX08; fechar conserva a sessão e devolve o foco. Iframe bloqueado oferece **Abrir sala em nova aba**.

## UX07 — Trabalho profissional e confiança

- Lista inicial usa responsável, fase, última interação e próximo passo. Mostrar o essencial antes das colunas adicionais; preservar cabeçalhos semânticos. Ordenação indica direção e estado acessível. No celular, apresentar linhas resumidas com acesso aos detalhes.
- Kanban é uma visualização opcional. Mover fase e reagendar sempre têm alternativa por botão/formulário; nenhuma tarefa depende exclusivamente de arrastar.
- Agenda oferece lista de compromissos, além da grade. Mostrar data, hora, fuso e estado real da reserva. “Sincronizando” não significa “Horário confirmado”; sem conector ativado, não exibir estado de sincronização desnecessário.
- Dossiê segue a ordem do documento 02. Distinguir **Relatado / Extraído / Confirmado / Contestado** com texto, além de cor. Campo desconhecido mostra **Não informado**; não preencher com uma suposição para deixar a tela completa.
- Clicar na fonte abre o documento e a página/trecho disponível, preservando o resumo. Se não houver localização precisa, indicar a limitação. Não fabricar destaque nem porcentagem de confiança.
- Ações de aprovação identificam objeto, versão e efeito: por exemplo, **Aprovar resumo**. Conteúdo novo exige nova revisão conforme a regra de negócio. Não transformar toda edição administrativa em confirmação extra.
- Confirmação adicional é para consequência relevante: envio ao cliente, exclusão ou alteração de cobrança. Mostrar destinatário, objeto e resultado antes de confirmar. Edições reversíveis usam histórico ou desfazer quando implementado.

## UX08 — Componentes, teclado e modais

Começar pelos componentes necessários à entrega: Button, FormField, Input, Select, Dialog, StatusBadge, EmptyState, ErrorState e tabelas/listas. Usar HTML semântico e a interação da biblioteca; não reconstruir controles complexos com `div` clicável. Link navega; botão executa uma ação. Botão só com ícone recebe nome acessível.

Modal tem título acessível, foco inicial adequado, navegação interna por Tab/Shift+Tab, botão de fechar e saída por Esc. Ao fechar, devolver foco ao acionador ou ao próximo elemento lógico. `aria-modal` só se aplica quando o fundo está realmente indisponível. [W3C — padrão de diálogo modal](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

No widget, o contêiner controla a sobreposição e o foco; a sala no iframe é nomeada e participa do teste de teclado. O canal de `postMessage` permanece restrito a eventos de tamanho/estado do cartão E16, com origem exata e esquema validado. Não criar dois modais aninhados para a mesma sala.

Painel lateral de consulta que permite usar o conteúdo ao lado é **não modal**: não prender o foco nem marcar o fundo como indisponível. Revisão longa usa página própria ou painéis, não uma pilha de modais. Fechar interrompe a captura de áudio, seguindo UX06.

Toda jornada funciona por teclado, tem foco visível e ordem lógica. Incluir atalho de navegação para o conteúdo principal, títulos hierárquicos e nomes de regiões. Elementos focados ficam inteiramente visíveis como padrão do produto. Em mudança de rota, atualizar o título da página e gerir o foco sem interferir na digitação.

## UX09 — Redação e notificações

Português brasileiro, verbos diretos e vocabulário do cliente. Usar consistentemente **atendimento**, **cliente**, **documento**, **pendência** e **agenda**. Detalhes de API, modelo, RAG e filas pertencem à operação técnica. Não expor respostas de erro brutas do fornecedor.

| Situação | Texto de referência |
| --- | --- |
| Arquivo persistido, análise pendente | “Documento recebido. Estamos verificando a leitura.” |
| Foto ilegível | “Não conseguimos ler esta foto. Envie outra com o documento inteiro e boa iluminação.” |
| Horário disputado | “Esse horário acabou de ficar indisponível. Escolha outra opção.” |
| Google desconectado | “Sua Agenda foi desconectada. Reconecte para atualizar os horários.” |
| Fonte faltante no dossiê | “Esta informação ainda não tem documento de apoio.” |
| Handoff confirmado | “A equipe vai continuar seu atendimento por aqui.” |

Notificar quando houver ação, mudança relevante ou confirmação solicitada. Agrupar pendências do mesmo atendimento. Mensagens externas seguem consentimentos e limites já definidos; a aparência da interface não cria autorização para enviar notificações.

## UX10 — Desempenho percebido

Metas de produção: **LCP ≤ 2,5 s, INP ≤ 200 ms e CLS ≤ 0,1**, no percentil 75, medindo celular e desktop separadamente. São metas para carregamento, interação e estabilidade visual; tempo de resposta da IA e voz tem métricas próprias. [Google/web.dev — Core Web Vitals](https://web.dev/articles/vitals).

Carregar visualizador de PDF, gráficos e recursos de voz quando necessários. Reservar espaço para elementos assíncronos e paginar listas; não baixar o acervo para preencher uma tela. O botão de chat carrega a sala ao abrir. Mostrar feedback local imediato de interação e confirmar persistência somente após resposta válida.

Antes de existir tráfego suficiente, registrar medição de laboratório e ambiente utilizado; não apresentar essa medição como percentil de usuários reais. Lighthouse sozinho não comprova INP em uso real. A telemetria de desempenho não inclui textos, arquivos nem identificadores pessoais nas URLs coletadas.

## UX11 — Aceite de tela pela supervisora

Cada entrega de interface registra em `docs/evidence/<subetapa>.md` o fluxo, regras UX aplicáveis e evidências sintéticas. Usar este checklist; marcar item inaplicável com motivo curto. Reutilizar evidência de componente/fluxo inalterado e verificar o trecho novo; não repetir uma auditoria completa por mudança de redação ou espaçamento. E19 consolida a jornada do núcleo; módulos opcionais passam pelo mesmo padrão ao serem ativados.

- [ ] A tarefa principal termina sem instruções orais do desenvolvedor; título, ação e resultado são claros.
- [ ] Componentes, cores e vocabulário seguem o padrão; não há uma segunda versão local do mesmo controle.
- [ ] Estados principal, vazio, carregando e erro recuperável aplicáveis foram demonstrados; entrada não se perde em erro de validação.
- [ ] Tela foi inspecionada em 390 px e 1440 px, com capturas; reflow também foi verificado em 320 px e zoom de 400% em janela de 1280 px.
- [ ] Percurso funciona só com teclado; ordem, abertura/fechamento de modal e retorno do foco foram conferidos.
- [ ] Contrastes, área de toque, rótulos, mensagens e zoom foram verificados no componente renderizado, incluindo erro e foco.
- [ ] Jornada alterada tem verificação automatizada relevante com Playwright e `@axe-core/playwright`; achados aplicáveis foram corrigidos. Não testar uma lista de classes CSS.
- [ ] Leitor de tela foi usado no fluxo alterado: NVDA/Chrome ou VoiceOver/Safari, registrando a combinação. Em E19, incluir leitura, formulário com erro, modal e estados do chat.
- [ ] Voz, widget, agendamento e revisão, quando envolvidos, mostram exatamente o estado do backend e conservam suas alternativas de acesso.
- [ ] Resultado e pendências são reais; uma tela bonita ou uma varredura automática sem achados não comprovam sozinhas acessibilidade.

Em E19, observar usuários representativos executando: publicar/copiar a sala, iniciar atendimento, enviar documento, marcar horário na agenda interna e localizar a fonte de um fato, sem conectar Google/Meta. Reutilizar achados da demonstração de E12 que continuarem válidos. Registrar obstáculos e corrigir os que impedem concluir a tarefa. É avaliação do fluxo implementado, não uma alegação estatística de usabilidade.

## Leitura por cartão

Toda tarefa de interface lê UX01–UX05, UX08–UX09 e UX11. Acrescentar apenas o trecho específico; a supervisora entrega o checklist pertinente, evitando um prompt com toda a documentação.

| Cartões / trabalho | Leitura adicional |
| --- | --- |
| E01, E03 — login e CRM | UX07 para listas e ações do profissional |
| E06, E09, E16, E17, E22 — sala, chat, widget e áudio | UX06; conferir também os estados específicos do modo liberado |
| E07, E10–E12 — documentos e revisão | UX07 e exemplos de redação de UX09 |
| E13–E15, E18 — Google, agenda, Drive e assinatura | UX07; confirmar estados reais da integração e efeitos das ações |
| E19–E20 — validação e piloto | UX10 e checklist completo de UX11 |
| E23–E30 — módulos posteriores | Padrão comum e regras do fluxo equivalente; WhatsApp mantém limites nativos do canal |

Se uma nova tela exigir comportamento ainda não definido, a supervisora decide e atualiza este contrato antes da implementação daquele detalhe. O executor não inventa outro sistema visual nem amplia confirmações por conta própria.
