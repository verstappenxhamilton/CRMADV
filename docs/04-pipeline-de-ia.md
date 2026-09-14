# Pipeline de IA, cotas e voz

## Princípio de execução

O modelo interpreta e redige. O código identifica o escritório, consulta os dados permitidos, controla o estado, decide quais ferramentas existem e executa ações. Um modelo mais forte recebe tarefas mais difíceis; ele não ganha mais permissões.

Existem dois usos diferentes das chaves: desenvolvimento/avaliação com material sintético ou público e operação com dados reais. Cada credencial recebe classificação de ambiente e dados permitidos. Uma falha na produção não autoriza enviar o atendimento para uma credencial de teste.

## Catálogo proposto

Os IDs abaixo são candidatos documentados, sujeitos à disponibilidade real e ao teste por tarefa. Os limites diários da coluna final foram informados na conversa, não auditados nas contas. [Catálogo Gemini](https://ai.google.dev/gemini-api/docs/models).

| Modelo / ID | Uso inicial proposto | Cota diária informada |
| --- | --- | ---: |
| `gemini-3.1-flash-lite` | Extrair intenção/campos simples, normalizar textos e respostas administrativas curtas | 500 |
| `gemini-3.5-flash-lite` | Conversa estruturada e extração de documentos simples quando superar o 3.1 na avaliação | 500 |
| `gemini-3.5-flash` | Reserva para tarefas intermediárias em que demonstrar qualidade suficiente | 20 |
| `gemini-3.6-flash` | Extração difícil de layout/tabelas e documentos ambíguos | 20 |
| `gemini-3.7-flash` | Confrontar várias fontes e preparar dossiê complexo | 20 |
| `gemini-3.8-flash` | Exceções difíceis e revisão assistida de fatos/fontes | 20 |
| “Gemini 3.0” | Não ativar por esse rótulo. Verificar se corresponde a `gemini-3-flash-preview` ou outro ID | 20, pendente de identificação |
| `antigravity-preview-05-2026` | Pesquisa pública, avaliação de código e tarefas internas longas, em ambiente isolado | 100, pendente de confirmação |
| `gemini-embedding-2` | Busca semântica, indexação e consultas autorizadas | 1.000 |

Não usar um modelo apenas para consumir sua franquia. A habilitação exige tarefa compatível, qualidade mínima e custo aceitável. Os papéis são uma hipótese inicial a calibrar. Versão numérica não substitui avaliação, e um modelo recente pode custar menos que um antigo.

O cartão E08 valida os IDs no projeto e registra capacidades. Uma listagem de modelos confirma disponibilidade, não informa sozinha as cotas da conta. Embedding 2 possui página específica com ID estável; se algum catálogo ou projeto apresentar apenas uma variante preview, registrar a diferença e escolher explicitamente um espaço de embeddings, sem misturar versões. [Embedding 2](https://ai.google.dev/gemini-api/docs/models/gemini-embedding-2).

Antigravity é um agente com execução de ferramentas, não um substituto transparente para `generateContent`. Mantê-lo fora do caminho de atendimento síncrono. Não fornecer segredos de produção nem acesso de escrita ao CRM. Pesquisa jurídica pública por esse agente gera material pendente de curadoria, nunca jurisprudência automaticamente aprovada. [Agente Antigravity](https://ai.google.dev/gemini-api/docs/antigravity-agent).

## Como usar as quatro chaves

Registrar cada uma por referência a segredo, por exemplo `GEMINI_KEY_1`, sem gravar o valor no banco de negócio ou Git. Para cada referência: projeto Google, ambiente, faturamento, proprietário, dados permitidos, modelos disponíveis e evidência dos limites.

A unidade de reserva é `(projeto, grupo_de_cota, janela)`, nunca somente `api_key`. Dois IDs de chave do mesmo projeto apontam ao mesmo conjunto de contadores. Registrar também limites compartilhados entre modelos, quando existirem. O reset diário do provedor deve usar `America/Los_Angeles`, sem fixar um deslocamento UTC. [Cotas Gemini](https://ai.google.dev/gemini-api/docs/rate-limits).

Distribuição recomendada: manter afinidade entre escritório e projeto autorizado; distribuir trabalhos independentes entre projetos elegíveis, respeitando contrato, finalidade e limites. As chaves de um mesmo projeto podem ser rotacionadas por gestão de segredo, mas não ganham capacidade. Não criar projetos/contas ou alternar identidades para contornar uma restrição do fornecedor.

Concorrência ocorre entre conversas e documentos independentes. Os turnos da mesma conversa permanecem ordenados. A conferência final aguarda a versão concluída das extrações que utiliza. Quatro credenciais não significam quatro respostas concorrentes para cada visitante.

## Roteador determinístico

Ordem obrigatória:

1. Verificar sessão, escritório, acesso, finalidade e estado da conversa.
2. Tentar resolver a tarefa por código/configuração: horário, checklist, calendário, validação de formato ou consulta SQL.
3. Se precisar de IA, escolher tarefa explícita: `intake_turn`, `extract_document`, `reconcile_facts`, `build_dossier`, `embed` ou `voice_session`.
4. Filtrar modelos por modalidade, esquema, qualidade mínima validada, ambiente e dados permitidos.
5. Montar somente o contexto necessário: estado estruturado, mensagens recentes e fontes autorizadas. Começar com até 4 trechos e 6 mensagens recentes, ajustando apenas com avaliação.
6. Selecionar o candidato de menor custo esperado que atenda aos requisitos e disponha de capacidade. Para o gratuito, considerar a escassez da franquia, não só o preço monetário zero.
7. Reservar atomicamente chamada, tokens estimados, concorrência e orçamento do escritório antes de chamar a API.
8. Validar o resultado e suas referências. Saída inválida pode ter uma correção ou escalada, dentro do limite global de tentativas.
9. Persistir resultado, uso real e evento. Só depois publicar resposta ou disponibilizar proposta de ação.

No máximo **três tentativas de provedor por job de geração**, incluindo erros de transporte, reparo e escalada; no máximo **uma escalada de qualidade**. Job de documento grande pode ter partes independentes, mas cada parte tem orçamento próprio e o documento possui teto agregado. Não percorrer todos os modelos em sequência.

Não usar “confiança: 0,98” declarada pelo próprio modelo como autorização. Os sinais para escalada são verificáveis: campo obrigatório sem fonte, data ambígua, valores conflitantes, layout ilegível, resposta truncada ou falha na validação.

## Reserva de cotas e orçamento

Contrato interno ilustrativo:

```text
reserve(task, project, quotaGroups, tenantBudget, estimatedTokens):
  iniciar transação
  bloquear os buckets afetados em ordem fixa
  descontar consumo e reservas não expiradas de cada janela
  conferir RPM, TPM, RPD, concorrência e teto monetário aplicáveis
  se insuficiente: devolver blocked_until ou budget_exhausted
  gravar reservation_id e confirmar transação

finish(reservation_id, provider_usage, outcome):
  reconciliar tokens e custo observados
  conservar chamadas possivelmente consumidas em resultados incertos
  liberar somente capacidade cuja liberação seja comprovadamente segura
```

Não manter o controle apenas em memória: dois workers precisam disputar a mesma reserva no Postgres. Usar janela móvel conservadora para limites por minuto e relógio do servidor. Adquirir locks em ordem fixa para evitar deadlocks. Simular cem reservas simultâneas com limite dez; apenas dez podem ser concedidas.

Em 429, ler categoria e `Retry-After` quando disponível. Limite diário bloqueia o grupo até reset; falha temporária gera espera e jitter. Não trocar para outra chave do mesmo grupo para insistir. Repetidas falhas abrem circuito temporário; credencial inválida é desabilitada e sinalizada.

Reservar inicialmente 20% da capacidade verificada para imprevistos; aplicar justiça entre escritórios. Configurar limites por sessão/tenant e um teto financeiro da plataforma. Antes de estourar, manter formulário, recebimento de documentos e encaminhamento humano. Não perder um lead por falta de IA, nem anunciar que ele foi analisado quando está na fila.

Custo incerto de timeout mantém reserva conservadora. A conciliação usa metadados do provedor; não reduzir artificialmente consumo para aumentar a franquia restante. Registrar `queue_wait_ms`, duração, tokens de entrada/saída/pensamento quando informados, preço vigente, prompt/version, motivo da rota e resultado das validações, sem texto pessoal nos logs.

## Capacidade: simulação, não promessa

Somente a soma aritmética informada daria 1.000 chamadas Lite e 100 Flash por dia por conjunto de cotas. Embeddings e Antigravity são consumos distintos; não somar essas chamadas à capacidade de conversar. Dos 100 Flash, 20 dependem de esclarecer o rótulo “3.0”.

Exemplo de carga projetada: oito chamadas Lite por atendimento, já incluindo conversa e extrações simples; 25% dos atendimentos usam uma chamada forte adicional. Com reserva de 20%, 1.000 chamadas Lite comportariam **100 atendimentos/dia** por conjunto, antes de limites por minuto, tokens, duração, falhas e outras tarefas. Quatro conjuntos independentes e autorizados levariam a **400/dia nesse mesmo cenário**. Quatro chaves do mesmo projeto continuam no cenário de 100.

Se cada dossiê exigir obrigatoriamente uma revisão do 3.8, a cota informada de 20, com reserva, limita esse estágio a **16 revisões/dia por projeto**. Não faz sentido prometer centenas de auditorias fortes com essa configuração. Outros modelos só entram nessa função após passar pela mesma avaliação.

Os números calculados não validam as cotas. A produção deve ter capacidade paga e orçamento compatíveis com o serviço vendido; um plano gratuito não serve de garantia de disponibilidade.

## Documentos e evidências

Fluxo: recebimento privado → checagem de bytes/tipo/tamanho → quarentena e scanner HTTPS → liberação da versão verificada → extração de texto digital → identificação de páginas sem leitura suficiente → visão/OCR nessas páginas → JSON com fontes → validações → conferência entre relato e documento → dossiê versionado.

MIME válido não significa ausência de malware. Scanner indisponível ou resultado incerto mantém o arquivo pendente, sem OCR, IA, cópia externa ou visualização pelo usuário. O worker não instala ClamAV; o contrato e o primeiro adaptador remoto estão no documento 03. Áudios seguem a mesma liberação antes da transcrição.

Implementação inicial: `pdfjs-dist` para texto e localização por página em PDF digital, com versão fixada; imagens/PDFs difíceis pelo adaptador Gemini de extração visual. Não apresentar como OCR especializado aquilo que é extração por modelo. Document AI ou parser dedicado é uma evolução acionada se o conjunto de avaliação mostrar insuficiência. Não acrescentar um serviço Python por antecipação.

Comparar valores em código depois de normalizar unidade e significado. “Salário-base” não é necessariamente “remuneração total”. CPF/CNPJ com dígito verificador correto não prova identidade. Textos de arquivo são dados não confiáveis: uma instrução dentro de PDF nunca autoriza acessar outro caso ou enviar mensagem.

Contrato de fato mínimo:

```json
{
  "field": "employment.termination_date",
  "value": null,
  "rawText": "semana passada",
  "precision": "relative",
  "status": "reported",
  "sourceRefs": [{ "type": "message", "id": "uuid", "version": 1 }],
  "requiresConfirmation": true
}
```

Campos ausentes ficam `null`, nunca são completados por plausibilidade. Documento ilegível produz pendência. Evidência documental referencia arquivo, versão, página e trecho; coordenadas só quando o extrator as fornecer de modo verificável. A interface usa destaque textual ou navegação à página como alternativa, sem inventar caixas de destaque.

## Busca e RAG

Existem três acervos: informação pública aprovada do escritório, material interno da equipe e documentos privados de cada caso. O atendimento de um novo visitante usa apenas o primeiro e o que ele próprio entregou na sessão. Documentos de um caso não entram automaticamente no acervo público ou de outro cliente.

Extrair campos estruturados e indexar trechos resolvem necessidades diferentes; usar ambos quando houver benefício. Dividir por seção/página, inicialmente 350–650 tokens com sobreposição curta de até 80. Anexar título, versão e assunto comprovado, sem gerar contexto factual especulativo.

Busca inicial: FTS português e similaridade vetorial, filtradas por tenant, audiência e acesso ao caso; fundir rankings por RRF, sem chamar o modelo para cada ranqueamento. Começar com busca exata no conjunto autorizado; adotar índice ANN depois de medir volume e recall. Se for acrescentado BM25, identificá-lo como componente separado.

Usar Embedding 2 com 768 dimensões. Guardar `embedding_model`, dimensão e versão do processamento. A consulta usa o mesmo espaço dos documentos; trocar modelo exige reindexação paralela e validação antes da troca. Chamadas de indexação e consulta consomem orçamento; não vetorizar cada mensagem por rotina. [Documentação de embeddings](https://ai.google.dev/gemini-api/docs/embeddings).

E11 é módulo opcional. O primeiro dossiê de E12 usa fatos estruturados e referências diretas a mensagens/páginas, sem depender de embeddings ou acervo do escritório. Enquanto E11 estiver desabilitado, não executar recuperação semântica nem sugerir teses a partir de acervo inexistente. A referência documental do caso continua obrigatória.

O cache é restrito a tenant/caso/audiência e inclui hash da fonte, versão do prompt e do modelo. Nunca cachear disponibilidade de agenda como verdade duradoura, decisões de autorização ou informações privadas entre clientes. Resposta sem fonte suficiente vira pedido de informação ou encaminhamento, não um texto inventado.

## Voz: informação nova da conta

**Prioridade de entrega:** texto e áudio gravado de E17 no piloto; WhatsApp oficial como canal opcional seguinte; Live de E21–E22 permanece como evolução. As cotas abaixo continuam úteis para dimensionar essa evolução, mas não determinam sozinhas a prioridade. Medir adoção, conclusão de atendimento, correções e demanda por Live. A hipótese de áudio gravado ser mais conveniente não foi comprovada por pesquisa com este público.

A [captura fornecida](references/quota-voz-ai-studio.png), complementada pelos cabeçalhos informados na conversa, mostra estes valores. São evidências da conta exibida; falta associá-las a cada um dos projetos/credenciais.

| Rótulo no painel | Categoria | RPM | TPM | RPD |
| --- | --- | ---: | ---: | ---: |
| Gemini 2.5 Flash Native Audio Dialog | API Live | Ilimitado | 1.000.000 | Ilimitado |
| Gemini 3 Flash Live | API Live | Ilimitado | 65.000 | Ilimitado |
| Gemini 3.5 Live Translate | API Live | Ilimitado | 20.000 | Ilimitado |
| Gemini 3.5 Transcribe Live | API Live | Ilimitado | 20.000 | Ilimitado |

E21 registra projeto, tier, limites de sessão, regras efetivas de contagem e IDs reais. Não multiplicar a captura por quatro sem saber a quais projetos se aplica. “Ilimitado” em RPM/RPD não elimina TPM, limites de sessão, custos ou restrições de uso.

**Uso recomendado:** Gemini 2.5 Native Audio é o candidato principal para diálogo, pela capacidade TPM mostrada. Compará-lo ao Gemini 3 Flash Live em português brasileiro; promover o segundo se o ganho de qualidade justificar sua capacidade menor e o custo. Usar Transcribe Live quando for necessário separar reconhecimento de fala e geração. Live Translate só entra se existir demanda de tradução; não ajuda automaticamente um atendimento em português. Os modelos Flash de texto não se tornam modelos Live por aceitar áudio de entrada.

Para dimensionar concorrência, medir o consumo p95 de tokens por minuto por sessão e verificar limites adicionais do modelo. A estimativa é `min(limite_de_sessões, floor(0,8 × TPM_disponível / TPM_p95_por_sessão))`; usar somente após confirmar a regra de contagem do provedor. O número de minutos contratados pelo escritório é um orçamento separado. Não converter 1 milhão de TPM em uma quantidade fixa de pessoas sem essa medição.

ID candidato para a linha 2.5: `gemini-2.5-flash-native-audio-preview-12-2025`. Para o rótulo “3 Flash Live”, comparar o ID disponível na conta com o catálogo atual, que lista `gemini-3.1-flash-live-preview`; não assumir equivalência silenciosamente. O catálogo técnico é confirmado no cartão E21. [Modelos Gemini](https://ai.google.dev/gemini-api/docs/models), [Native Audio na tabela de preços](https://ai.google.dev/gemini-api/docs/pricing#gemini-2.5-flash-native-audio-live-api).

## Arquitetura da voz ao vivo

Na demonstração técnica, tokens efêmeros permitem conexão cliente–Google sem revelar a chave permanente. Na produção proposta, usar **gateway Node de voz** (`apps/voice-gateway`), uma terceira aplicação de transporte adicionada em E22. Ele permite validar sessão, medir consumo, limitar áudio, persistir transcrição confiável e encerrar a conexão do lado do servidor. Não duplicar nele as regras de negócio.

Fluxo: navegador → WebSocket autenticado do gateway → SDK Live. O gateway chama as mesmas funções de domínio/ações autorizadas do backend. Credenciais permanentes nunca são entregues ao navegador. O protocolo nativo é WSS; formatos e parâmetros devem seguir o modelo selecionado. [Live API](https://ai.google.dev/gemini-api/docs/live-api), [tokens efêmeros](https://ai.google.dev/gemini-api/docs/live-api/ephemeral-tokens).

Regras iniciais de produto: sessões de até 3 min, aviso 20 s antes do fim, extensão somente se houver franquia, uma sessão por visitante e limite configurado por escritório/projeto. Parar captura ao encerrar e esvaziar buffer de reprodução quando houver interrupção. Reservar orçamento antes de abrir, medir ao longo da sessão e fechar ao atingir o teto. Os limites de teste são conservadores e devem ser calibrados.

Ferramentas Live são de consulta e proposta. Agendamento, alterações e envios continuam passando pelo executor autenticado e pela confirmação necessária. A fala “está marcado” não vale como confirmação sem evento persistido; mostrar um recibo textual confiável depois do sucesso.

Uma FSM impede ações fora do fluxo, mas não garante o conteúdo de cada frase espontânea de áudio. Restringir o Live a recepção administrativa, avaliar respostas indevidas e oferecer texto/humano. Se o áudio nativo não passar no critério de qualidade, usar transcrição → resposta textual validada → TTS aprovado, aceitando a latência maior. Não publicar voz insegura só para cumprir uma meta de velocidade.

Medir p50/p95 do fim da fala ao início da resposta, interrupções, retomadas, quedas e erros em nomes/datas/valores. Meta inicial a validar: p95 até 2 s em rede de teste definida; não é SLA. Testar Safari iOS, Chrome Android, desktop e navegador embutido do Instagram. Oferecer nova aba quando o ambiente embutido bloquear microfone.

## Simulação de custo

Preços de texto Standard em USD por milhão de tokens observados na consulta: Lite 3.1, entrada 0,25 e saída 1,50; Lite 3.5, entrada 0,30 e saída 2,50; Flash 3.8, entrada 0,75 e saída 3,75 até 31/12/2026, subindo para 1,50 e 7,50 em 01/01/2027. Saída inclui pensamento conforme cobrança do fornecedor. [Preços Gemini](https://ai.google.dev/gemini-api/docs/pricing).

Exemplo hipotético mensal, sem áudio/OCR/embeddings/ferramentas:

| Parcela | Hipótese | Cálculo em USD |
| --- | --- | ---: |
| 1.000 atendimentos, oito chamadas Lite 3.1 cada | 3.000 tokens de entrada + 400 de saída por chamada | 8.000 × 0,00135 = 10,80 |
| 250 revisões Flash 3.8 | 8.000 de entrada + 1.200 de saída | 250 × 0,0105 = 2,625 |
| Total de geração no cenário | Preço promocional corrente do 3.8 | **13,43/mês** |
| Mesmo consumo após mudança anunciada do 3.8 | Lite mantido na tarifa observada | **16,05/mês** |

Esse exemplo demonstra a fórmula, não o custo real do produto. Contexto acumulado, pensamentos, documentos, tentativas, áudio e suporte podem mudar substancialmente a conta. Validar tokens reais por atendimento em E09/E19 e preço efetivo antes da venda.

Para orçar a voz 2.5 Native Audio, a tarifa consultada é USD3/milhão de tokens de áudio de entrada e USD12/milhão de saída; texto tem tarifa própria. Embedding 2 de texto: USD0,20/milhão. Medir tokens por minuto de sessão antes de precificar minutos de voz. [Preços Gemini](https://ai.google.dev/gemini-api/docs/pricing).

O Supabase Pro parte de USD25/mês na página consultada. Reservar, como orçamento preliminar de engenharia, **USD75–150/mês para infraestrutura base**, incluindo banco, web, worker e serviços auxiliares, antes do consumo variável. Acrescentar explicitamente **C_scanner**, conforme plano, número de varreduras e limites do fornecedor; essa parcela ainda não foi cotada e não está garantida dentro da faixa. Gateway de voz só acrescenta infraestrutura quando Live for ativado. A faixa é estimativa, não cotação do Render. [Supabase](https://supabase.com/pricing), [Render](https://render.com/pricing).

Fórmula comercial: custo por escritório = parcela da infraestrutura + scanner (plano/rateio e excedentes) + geração + embeddings habilitados + processamento documental + minutos de voz + mensagens + armazenamento/tráfego + taxas de pagamento + suporte. Contar reenvios e retries cobrados da varredura; aplicar limites por escritório e global. Simular margem também sem promoção e sem cotas gratuitas. Franquias e preço são definidos em E18 e confirmados no piloto; o exemplo textual não demonstra margem comercial superior a 80%.

## Avaliação antes de liberar

Construir gradualmente, durante os cartões, um conjunto sintético inicial de 120 cenários: 40 triagens, 30 extrações, 20 divergências, 15 fluxos de integração/concorrência do núcleo e 15 tentativas de abuso. Nos 15 fluxos, cobrir agenda interna, scanner, filas e cobrança; Google, Drive e WhatsApp têm testes adicionais apenas quando habilitados. Separar 80 para desenvolvimento e 40 para teste final; ampliar a parte de teste conforme o piloto. Casos difíceis precisam de revisão profissional, não apenas nota de outro LLM. E19 consolida o conjunto; não exigir os 120 cenários prontos antes de construir o primeiro fluxo.

Comparar três baselines nas tarefas que exigem geração, usando o mesmo conjunto: sempre Lite, sempre 3.8 e roteador. Regras determinísticas e testes de integração permanecem iguais nos três. Registrar correção por campo, pendências corretamente identificadas, fontes válidas, custo e tempo. Não calibrar e medir o resultado final sobre a mesma amostra.

Critérios propostos: nenhuma violação de acesso ou ação crítica indevida; 100% dos fatos críticos publicados com referência existente; pelo menos 95% de precisão dos campos críticos no conjunto revisado, com taxa de abstenção divulgada; nenhuma data crítica inferida como exata sem confirmação. Referência existente é diferente de referência que sustenta a conclusão — ambas precisam de avaliação.

Adicionar 30 cenários de voz em E21: sotaques, ruído, nomes, datas, interrupção, silêncio, queda e pedido de humano. Os percentuais iniciais são portas de liberação, não evidência de ausência de erro. Registrar resultados por modelo/tarefa e só habilitar combinações aprovadas.
