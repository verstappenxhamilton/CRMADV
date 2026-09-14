# Instrução para a IA executora

Copiar o bloco abaixo e preencher o cartão/subetapa. A supervisora acrescenta somente os contratos e trechos indicados no cartão. Não entregar uma tarefa vaga como “implemente toda a fase de IA”.

A supervisora segue o caminho crítico do documento 05, não a ordem numérica de todos os cartões. Cada evidência cabe normalmente em até 20 linhas, com links para resultados; reaproveitar verificações de componentes inalterados. E11, Google, Drive, widget, WhatsApp e Live são módulos opcionais com aceite próprio.

```text
Você implementará a subetapa <E00.1> do CRM deste repositório.

Objetivo desta subetapa:
<descrever um resultado observável em uma frase>

Leia primeiro:
- README.md.
- A seção <E00> de docs/05-cartoes-de-implementacao.md.
- <somente as seções dos documentos 02/03/04 necessárias>.
- Se houver interface: regras aplicáveis de docs/07-ui-ux-e-acessibilidade.md,
  conforme a tabela de leitura por cartão, e checklist UX11.
- As instruções locais aplicáveis e o código das dependências já aprovadas.

Decisões fixadas:
- Web Next.js, TypeScript strict, Supabase e worker Node.
- Regras de negócio em packages/domain; esquemas Zod em packages/contracts.
- SDKs e segredos somente em código de servidor.
- Banco/arquivos privados e acesso por escritório e caso.
- A IA propõe conteúdo/ações. O backend autoriza, valida e executa.
- O gateway de voz só é adicionado no cartão E22.
- Agenda interna e arquivos privados funcionam sem conectar Google ou Meta.
- E12 não exige E11; E14.1–E14.2 não exigem E13.
- Worker não instala ClamAV; arquivo pendente de scanner permanece em quarentena.
- Recursos opcionais ficam desativados até sua própria entrega ser aprovada.
- UI usa tokens e componentes de packages/ui; segue o contrato do documento 07.
- Rótulos claros, texto curto, estados reais e uso por celular/teclado fazem parte da entrega.

Arquivos/responsabilidades permitidos:
<listar os caminhos do cartão e no máximo uma responsabilidade por subetapa>

Contrato de entrada e saída:
<copiar schema, assinatura ou comportamento esperado já decidido>

Critérios de aceite:
1. <caminho principal>
2. <falha relevante>
3. <permissão, concorrência ou estado que não pode ser violado>
4. Se houver interface: <regras UX aplicáveis e evidências exigidas por UX11>.

Procedimento:
1. Confira git status. Preserve mudanças existentes.
2. Identifique o código a reutilizar. Não troque a stack nem duplique serviços.
3. Implemente apenas esta subetapa, incluindo o tratamento de falha descrito.
4. Rode lint, tipos e os testes relevantes. Para banco, teste RLS real;
   para integrações, teste repetição/falha; para tela, demonstre o fluxo e
   registre as verificações UX11 aplicáveis, incluindo estados e acessibilidade.
5. Não use mocks como evidência de provedor real. Modo mock é proibido em produção.
6. Se faltar credencial externa, conclua contratos, UI, simulação e testes locais.
   Registre exatamente a verificação externa pendente, sem inventar sucesso.
7. Registre evidência curta em docs/evidence/<subetapa>.md, sem dados pessoais:
   resultado, teste relevante, limitações e próximo passo. Não copie o plano inteiro.
8. Entregue o resultado à supervisora. Não declare outra subetapa concluída.

Restrições:
- Não desative RLS, autenticação, verificação de webhook ou limites para passar teste.
- Não coloque chaves, refresh tokens ou conversas reais em código, logs ou exemplos.
- Não crie aliases de modelo por adivinhação; desconhecido continua desabilitado.
- Não use confiança declarada pelo LLM como autorização ou prova de verdade.
- Não reescreva testes de aceite para acomodar uma implementação incorreta.
- Não acrescente bibliotecas/frameworks fora da decisão desta subetapa.
- Não faça migração destrutiva, cobrança ou publicação externa fora do escopo autorizado.

Formato de entrega, curto:
Resultado: <comportamento que agora funciona>.
Arquivos: <lista objetiva>.
Validação: <comandos executados e resultados reais>.
Pendências: <o que continua faltando; “nenhuma” somente se verdadeiro>.
```

## Como a supervisora decide

Ler o diff e executar/reproduzir o teste relevante. Verificar especialmente se tenant/ator vieram de fonte confiável, se houve validação antes do efeito externo, se a repetição é segura e se a interface explica falhas. Conferir também que o núcleo funciona com módulos opcionais desativados. Para conteúdo extraído, abrir a evidência original e comparar. Para UI, conferir o checklist UX11 do [documento 07](07-ui-ux-e-acessibilidade.md), capturas e interação: componentes consistentes, tarefa concluída, erro recuperável, celular e teclado. Reutilizar verificações válidas sem repetir toda a avaliação a cada ajuste pequeno. Uma imagem da tela sozinha não demonstra usabilidade ou acessibilidade.

Resposta de supervisão padronizada:

```text
Cartão/subetapa: E__._
Decisão: aprovado | corrigir
Evidência conferida: ...
Correções necessárias: ...
Próxima subetapa autorizada: ...
```

Não adicionar critérios subjetivos depois de a implementação atender ao contrato, salvo defeito material descoberto. Explicar qualquer ajuste de escopo e atualizar a especificação correspondente para evitar contradições. Detalhes de arquitetura são resolvidos pela supervisora; definições comerciais e jurídicas pertencem ao responsável pelo produto/profissional.

## Primeira tarefa pronta

Subetapa **E00.1**: preparar o workspace TypeScript/Next.js com a estrutura definida, versões exatas verificadas e página/health check mínimos. Não integrar IA, Google Drive, WhatsApp ou cobrança nessa subetapa. Entregar build reproduzível e registro de versões. Depois, a supervisora entrega E00.2.
