# Produto e experiência

## Proposta de valor

“Seu escritório recebe clientes, organiza documentos e prepara o atendimento em um só lugar.”

A interface deve tornar evidente o próximo passo. A IA recolhe e organiza informações; o profissional vê fatos, dúvidas, documentos e ações. O produto não apresenta probabilidade de vitória, diagnóstico ou parecer automático ao visitante.

## Escopo e sequência

| Entrega | Inclui | Critério para liberar |
| --- | --- | --- |
| Demonstração | Sala por link, texto simulado, CRM manual, dois escritórios fictícios | Fluxo completo local e isolamento demonstrado |
| Piloto vendável | Link direto, texto real, áudios gravados com resposta em texto, documentos, extração, dossiê, agenda interna, assinatura e atendimento humano | E00–E10, E12, E17, E14.1–E14.2, E18–E20 aprovados; contas e operação configuradas |
| Complementos opcionais | Busca no acervo, Google Agenda, cópia no Drive e widget | E11, E13, E14.3, E15 e E16; cada recurso tem ativação e aceite próprios |
| WhatsApp | Mensagens, áudios, anexos e comandos do profissional; prioridade após o piloto | E23–E25; integração oficial e onboarding comercial validados |
| Voz ao vivo | Conversa bidirecional por áudio, interrupção, transcrição e passagem para texto; prioridade posterior | E21–E22; demanda observada e avaliação própria de voz, custos e compatibilidade |
| CRM ampliado | Propostas, contratos, recebíveis, portal, automações e conectores | E26–E30; cada módulo utilizável de ponta a ponta |

O piloto já entrega um CRM operacional de atendimento. A expressão “CRM completo” só deve ser usada comercialmente com a lista explícita dos módulos liberados. Captura de publicações judiciais, peticionamento e cálculo de prazos não fazem parte do piloto. A lista de evolução está especificada; não desaparece sob o nome de MVP.

## Pessoas e permissões

| Pessoa | Pode fazer |
| --- | --- |
| Visitante | Iniciar atendimento, enviar dados, consultar os próprios próximos passos e confirmar horário |
| Cliente autenticado | Acessar somente seus casos, documentos e informações publicadas pelo escritório |
| Assistente do escritório | Organizar os casos atribuídos, pedir documentos por modelos aprovados e gerenciar agenda autorizada |
| Advogado | Revisar e aprovar conteúdo jurídico dos casos a que tem acesso |
| Proprietário | Gerenciar equipe, acesso aos casos, cobrança, integrações e publicação da sala; aprovação jurídica exige papel profissional autorizado |
| Operação do SaaS | Ver saúde, uso e cobrança; acesso ao conteúdo por suporte somente temporário, justificado e auditado |

Ser assinante ou dono de uma conta não comprova habilitação profissional. Nome, OAB/UF e responsabilidade editorial são dados de onboarding; validação operacional deve seguir o procedimento definido para o piloto.

## Jornada do escritório

1. Entrar por e-mail; Google pode ser oferecido como alternativa de login quando configurado. O sistema cria escritório, agenda interna e sala em rascunho, com arquivos privados disponíveis.
2. Preencher nome de exibição, identificação profissional, área, horários, contato humano e endereço público desejado.
3. Ajustar o roteiro e testar uma conversa com dados fictícios. A tela mostra exatamente o que o visitante verá. O checklist inicial não inclui conectar Google ou WhatsApp.
4. Iniciar assinatura ou período de teste configurado, publicar e copiar link/QR code. O profissional já pode receber atendimentos e reservar horários na agenda interna.
5. Depois, em **Mais → Integrações**, oferecer separadamente **Conectar Google Agenda**, **Conectar Drive** e **Conectar WhatsApp**, somente quando o módulo estiver liberado. O widget aparece como opção de distribuição quando implementado. Nenhuma integração é requisito de publicação da sala.

Agenda interna e armazenamento privado são a experiência padrão. Integração não conectada é um estado normal, sem alerta de erro ou checklist incompleto. Login com Google não concede acesso a Agenda/Drive. Antes de pedir acesso externo, explicar finalidade e opção de continuar sem conectar.

Falha no Google não apaga informações. Se o escritório já ativou sincronização de agenda, uma queda não troca silenciosamente para reservas internas: mostrar pendência e permitir a decisão explícita prevista no documento 03. Domínio customizado é evolução; o endereço estável inicial é `/s/{slug}`.

**Meta de usabilidade a validar:** um profissional consegue configurar, testar e copiar o link em até dez minutos, descontado eventual processo externo de verificação. Essa é uma meta, não uma promessa já comprovada.

Demonstrar o dossiê após E12 a três advogados usando casos sintéticos; observar se entendem as pendências e encontram as fontes. Áudio gravado entra no primeiro piloto. Medir uso de texto/áudio, conclusão, tempo de revisão e pedidos por WhatsApp/Live antes de investir no canal seguinte. Não assumir que todo cliente prefere áudio ou que Live entrega um ganho já comprovado.

## Sala virtual do visitante

Primeira tela: nome do escritório, identificação profissional, “Como prefere conversar?”, botões **Escrever** e **Falar**, indicação curta de atendimento automatizado e acesso ao contato humano. Não incluir seções comerciais, depoimentos, carrossel ou pedido de cadastro antes de começar.

Na versão sem Live, “Falar” abre **Enviar áudio**, explicitamente identificado. Com Live habilitado, oferece **Conversar ao vivo** e **Enviar áudio**. Não pedir permissão de microfone antes da escolha. Negativa ou ausência de microfone mantém o texto acessível.

Exemplo de abertura: “Olá. Sou a assistente virtual do escritório. Vou organizar suas informações para o atendimento. Como posso ajudar?”

Depois da mensagem inicial, fazer uma pergunta de cada vez. Evitar repetir dados já informados. Permitir corrigir uma resposta, interromper a coleta, agendar com pendências e pedir atendimento humano em qualquer etapa apropriada.

Coletar apenas o necessário ao estágio. Contato e nome podem vir antes do agendamento; documentos de identificação não são requisito para uma dúvida administrativa. O fluxo de IA é destinado a adultos; solicitações envolvendo acesso direto por menores seguem o canal humano e a política de elegibilidade definida antes da publicação.

Os estados apresentados ao visitante são simples: “Organizando informações”, “Aguardando documento”, “Horário confirmado” ou “A equipe vai continuar seu atendimento”. Mensagens técnicas sobre modelos, tokens e filas ficam na operação.

## Telas do profissional

Navegação principal: **Hoje**, **Atendimentos**, **Clientes**, **Agenda** e **Mais**. Documentos, financeiro, relatórios e configurações ficam em Mais. Busca global no topo, limitada ao conteúdo autorizado.

| Tela | Conteúdo principal | Ação prioritária |
| --- | --- | --- |
| Hoje | Pendências de revisão, retornos e agenda do dia; no máximo três indicadores | Resolver a próxima pendência |
| Atendimentos | Lista com filtros e Kanban opcional; responsável, última interação e próximo passo | Abrir atendimento |
| Atendimento | Conversa e histórico, resumo, checklist, documentos e tarefas | Solicitar dado, assumir conversa ou revisar dossiê |
| Revisão | Resumo à esquerda e documento original à direita; trechos localizáveis por fonte | Aprovar versão ou pedir correção |
| Clientes | Cadastro, contatos, casos e histórico autorizado | Abrir caso |
| Agenda | Dia/semana e disponibilidade interna; estado da sincronização apenas quando ativada | Agendar ou reagendar |
| Configurações | Equipe, sala, assinatura, regras do escritório e integrações opcionais | Testar e publicar |

No celular, a revisão vira abas **Resumo / Fontes / Histórico**, sem duas colunas estreitas. A lista pode ser usada sem arrastar cartões. Ação “Assumir atendimento” pausa imediatamente respostas automáticas da conversa até liberação explícita.

## Dossiê que reduz trabalho de revisão

Ordem fixa:

1. **Resumo:** até cinco tópicos factuais, sem conclusões jurídicas disfarçadas.
2. **Pendências:** informação faltante, documento ilegível ou divergência; cada item tem ação.
3. **Fatos:** valor extraído, fonte e status — relatado, extraído, confirmado ou contestado.
4. **Documentos:** versão e acesso ao original; leitura automática não significa autenticação.
5. **Próximo passo:** ação administrativa configurada; sugestão jurídica fica claramente como rascunho.
6. **Histórico de revisão:** quem alterou e aprovou qual versão.

“Aprovar” deve dizer o objeto: **Aprovar resumo**, **Confirmar proposta** ou **Liberar documento**. Não criar um botão genérico que também envie mensagens, altere honorários e feche o caso sem mostrar essas consequências.

Se um documento novo alterar dados, a versão aprovada continua no histórico e uma nova versão volta para revisão. Uma aprovação antiga nunca autoriza um conteúdo novo.

## O que pode ser automático

| Ação | Regra |
| --- | --- |
| Responder horário/endereço/modalidade de atendimento | Usar configuração publicada e texto curto |
| Cadastrar contato e organizar arquivos | Automático com validação e histórico |
| Sugerir horários | Consultar disponibilidade real; não usar memória do modelo |
| Confirmar horário | Visitante confirma a opção; backend reserva e confirma a operação |
| Pedir documentos | Apenas checklist aprovado, com limite de lembretes |
| Resumir relato/extrair campos | Automático como rascunho com evidência |
| Apontar divergência | Automático como pendência, conservando as duas versões |
| Aprovar contratação, tese, parecer, honorários ou documento jurídico | Profissional autorizado revisa a versão e confirma |
| Acessar tribunal/peticionar | Fora da primeira versão; conector e autorização específicos |
| Excluir conta, exportar acervo ou trocar dados de recebimento | Acesso reforçado no painel e registro da operação |

“Revisão mínima” significa que o sistema apresenta informação verificável e destaca exceções. Não significa transferir responsabilidade profissional ao modelo. Automatizações rotineiras pré-configuradas não exigem uma nova confirmação humana a cada execução.

## Widget e instalação

Um script versionado cria um botão com nome acessível no canto inferior direito. Ao abrir, carrega um iframe da mesma sala. O script não lê o restante da página nem recebe documentos ou mensagens por `postMessage`.

O widget é um complemento do link, implementado em E16; sua instalação não bloqueia a primeira publicação da sala nem a assinatura do escritório.

No desktop: painel com aproximadamente 400 px de largura e altura limitada à janela. No celular: tela completa, teclado e área segura respeitados. Fechar conserva a sessão; voltar o foco ao botão. Esc fecha o painel, sem descartar gravação silenciosamente.

O site instalador precisa permitir o domínio do widget em sua política de conteúdo. O escritório configura os domínios permitidos; bloqueios de iframe ou microfone oferecem “Abrir sala em nova aba”. “Qualquer site” significa um componente incorporável em sites que aceitem script/iframe, não uma garantia contra restrições do navegador ou da plataforma.

## Direção visual e redação

O [contrato de UI/UX e acessibilidade](07-ui-ux-e-acessibilidade.md) detalha estas decisões e é parte obrigatória do aceite de cada tela. Inclui tokens, componentes, navegação, formulários, modais, chat/voz, estados de erro, testes no celular e critérios de revisão; a tabela abaixo é o resumo.

| Elemento | Especificação |
| --- | --- |
| Base | Fundo `#F8FAFC`, superfícies brancas, texto `#0F172A`, separadores decorativos `#E2E8F0`; contorno de campo `#64748B` |
| Ação principal | Azul `#1D4ED8`, texto branco; identidade do escritório em áreas controladas |
| Fonte | Fonte de sistema; texto de leitura a partir de 16 px, títulos curtos |
| Espaçamento | Escala 4/8/12/16/24/32; poucos elementos por bloco |
| Botões | Rótulo com verbo; área de toque mínima projetada de 44×44 px |
| Estados | Carregando, vazio, erro, offline e sucesso desenhados junto da tela |
| Acessibilidade | Contraste verificado, navegação por teclado, foco visível, rótulos e mensagens sem depender apenas de cor |
| Chat | Respostas usualmente de 1–3 frases; expandir somente quando o contexto exigir |
| Gravação | Indicador inequívoco, tempo decorrido e ação de parar; nunca iniciar escondido |

## Assinatura e CRM ampliado

Começar com um plano mensal de escritório e limites de usuários, armazenamento, atendimentos e minutos de voz. Os limites são configuráveis; preço e franquias definitivos dependem do piloto. Não anunciar IA ou voz ilimitadas. Falha de pagamento produz aviso e carência configurada; dados não são apagados automaticamente por inadimplência.

O módulo financeiro do SaaS cobra a assinatura do escritório. O financeiro dos clientes do advogado é outro domínio: propostas, honorários, parcelas, recebíveis e conciliação. Não misturar a cobrança do SaaS com custódia ou divisão de valores dos clientes.

A extensão do CRM inclui casos após contratação, tarefas recorrentes, propostas versionadas, assinatura eletrônica por conector, portal do cliente, recebíveis, importação/exportação e métricas do funil. Conectores para calendário Microsoft, outros CRMs e publicações entram sobre os contratos do documento 03.

## Métricas do piloto

| Métrica | Definição |
| --- | --- |
| Conclusão | Atendimentos iniciados que chegam a próximo passo registrado; medir também desistência por etapa |
| Revisão | Mediana e p90 do tempo ativo na revisão de um dossiê |
| Retrabalho | Dossiês em que o profissional corrige algum fato crítico / dossiês revisados |
| Comparecimento | Compromissos realizados / compromissos confirmados já vencidos |
| Automação útil | Ações administrativas concluídas sem correção posterior / ações automatizadas |
| Custo | Custo variável por atendimento concluído e por escritório |

Instrumentar eventos sem conteúdo de conversas. Comparar com o fluxo anterior do próprio escritório; não usar somente volume de mensagens como sinal de valor.
