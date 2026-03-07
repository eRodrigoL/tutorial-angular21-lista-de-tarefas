# CHECKLIST

[➖ Checklist enxuto](./checklist-enxuto.md)
[➕ Checklist detalhado com exemplo](./checklist.md)

---

## 1. Preparação mínima do ambiente

- [ ] Confirmar versões:

  ```bash
  node -v
  npm -v
  git --version
  ```

- [ ] Confirmar que Angular CLI pode ser executado:

  ```bash
  npx @angular/cli@latest version
  ```

- Só se necessário:
  - [ ] Instalar Node.js
  - [ ] Instalar Git
  - [ ] Instalar e configurar VSCode
  - [ ] Instalar extensões principais

---

## 2. Criação a aplicação Angular

- [ ] Criar aplicação Angular 21 com Angular CLI

  ```bash
  npx @angular/cli@21 new nome-da-aplicação
  ```

- [ ] Confirmar `app.config.ts`, `app.routes.ts` e estrutura inicial do projeto

- [ ] Rodar a aplicação

- [ ] Confirmar que a aplicação sobe no navegador

---

## 3. Definição da arquitetura inicial

- [ ] Definir (planejar) o objetivo da aplicação e suas funcionalidades principais:

- [ ] Definir (planejar) a estrutura de pastas inicial

- Sugestão:
  - `core/` → itens centrais da aplicação, geralmente únicos e compartilhados globalmente, como serviços principais, configuração base, interceptors e guards
  - `shared/` → elementos reutilizáveis entre diferentes partes da aplicação, como componentes, pipes, diretivas, interfaces e utilitários
  - `features/` → funcionalidades da aplicação organizadas por domínio ou caso de uso, normalmente contendo páginas, componentes e lógica específica de cada feature

- [ ] Definir (planejar) as páginas:

- [ ] Definir (planejar) interfaces principais

- [ ] Definir (planejar) componentes reutilizáveis previstos:

- [ ] Definir (planejar) serviço principal da feature

---

## 4. Backend fake e base de dados cedo

- [ ] Instalar `json-server`

  ```bash
  npm install -D json-server
  ```

- [ ] Instalar `concurrently`

  ```bash
  npm install -D concurrently
  ```

- [ ] Criar `db.json`

- [ ] Definir a coleção principal da aplicação no `db.json`
  - Ex:

  ```json
  {
    "nome-da-tabela": []
  }
  ```

- [ ] Adicionar script no `package.json`

  ```json
  {
    "scripts": {
      "start": "ng serve",
      "server": "json-server --watch db.json --port 3000",
      "dev": "concurrently \"npm:start\" \"npm:server\""
    }
  }
  ```

- [ ] Rodar backend fake

  ```bash
  npm run server
  ```

- [ ] Rodar frontend e backend juntos

  ```bash
  npm run dev
  ```

- [ ] Validar endpoint no navegador ou terminal

  No navegador:

  ```bash
  http://localhost:3000/tarefas
  ```

  No terminal:

  ```bash
  curl http://localhost:3000/tarefas
  ```

---

## 5 Configurações estruturais

[➕](./checklist-detalhado.md#5-configuracoes-estruturais)

- [x] Definir padrão de nomes [ℹ️](./conteudo-teorico/nomenclaturas.md)
- [x] Definir convenção de nomes das features [ℹ️](./conteudo-teorico/nomenclaturas.md#17-convencao-para-features)
- [ ] Criar aliases de importação no `tsconfig.json`

  ```json
  {
    "compilerOptions": {
      "baseUrl": "./src",
      "paths": {
        "@app/*": ["app/*"],
        "@core/*": ["app/core/*"],
        "@shared/*": ["app/shared/*"],
        "@features/*": ["app/features/*"]
      }
    }
  }
  ```

---

## 6. Criar páginas-base com Angular CLI

- [ ] Criar artefatos [🔎](./conteudo-teorico/artefatos.md) do tipo componente para servir de páginas

  ```bash
  ng g c nome-do-componente
  ```

- [ ] Confirmar que os arquivos foram gerados na estrutura correta

---

## 7. Configurar roteamento principal

Roteamento e navegação [🔎](./conteudo-teorico/navegacao.md)

- [ ] Criar rotas no `app.routes.ts`
  - [ ] Criar rota de criação

  - [ ] Criar rota de edição

  - [ ] Definir redirect inicial

  - [ ] Adicionar rota curinga para fallback

- [ ] Garantir que a aplicação continua compilando

---

## 8. Instalar Angular Material

- [ ] Instalar Angular Material

```bash
npx ng add @angular/material
```

---

## 9. Montar o desenho da aplicação sem foco em estilo

- [ ] Criar app shell

- [ ] Colocar conteúdo simples nas páginas

---

## 10. Implementar navegação entre páginas

- [ ] Importar `RouterLink` nos componentes de página

- [ ] Implementar `routerLink="rota-de-destino"` nos elementos de navegação do template

- [ ] Confirmar fluxo básico completo entre páginas

---

## 11. Criar o serviço HTTP da feature

- [ ] Criar interface principal da feature

- [ ] Configurar `provideHttpClient()` no `app.config.ts`

- [ ] Criar o serviço HTTP da feature

- [ ] Injetar `HttpClient` no service

- [ ] Definir a URL base da API no service

- [ ] Implementar `getAll`

- [ ] Implementar `getById`

- [ ] Implementar `create`

- [ ] Implementar `update`

- [ ] Implementar `remove`

- [ ] Validar chamadas básicas no backend fake via terminal

  > Provavelmente na porta 3000
  - [ ] Consultar banco completo

    ```bash
    curl http://localhost:3000/nome-do-banco
    ```

  - [ ] Buscar dado no banco pelo `id`

    ```bash
    curl http://localhost:3000/nome-do-banco/numero-de-um-id ex:"http://.../1"
    ```

- [ ] Confirmar que a rota responde corretamente antes de integrar com a aplicação Angular

---

## 12. Construir o CRUD

- Criar
  - Estruturar a tela de criação
    - [ ] Montar o formulário
    - [ ] Definir os campos necessários
    - [ ] Definir botão de cancelar
    - [ ] Definir botão de salvar

  - Preparar o submit
    - [ ] Capturar os valores do formulário
    - [ ] Validar se o formulário pode ser enviado
    - [ ] Montar o payload da requisição

  - Integrar com o backend
    - [ ] Chamar método de criação no service
    - [ ] Enviar requisição `POST`
    - [ ] Confirmar que o backend respondeu corretamente

  - Finalizar o fluxo
    - [ ] Navegar de volta para a listagem
    - [ ] Confirmar que o item criado aparece na aplicação

- Listar
  - Estruturar a tela de listagem
    - [ ] Definir área da lista
    - [ ] Definir ações visuais de cada item
    - [ ] Definir botão para criar novo item

  - Carregar os dados
    - [ ] Chamar método de listagem no service
    - [ ] Buscar todos os itens no backend
    - [ ] Receber a resposta da API

  - Renderizar no front
    - [ ] Substituir dados fixos por dados reais
    - [ ] Exibir cada item da lista
    - [ ] Exibir estado vazio se não houver registros

  - Tratar estados visuais
    - [ ] Exibir carregamento básico
    - [ ] Remover carregamento quando a resposta chegar
    - [ ] Confirmar que a listagem continua funcionando após mudanças

- Editar
  - Preparar a navegação
    - [ ] Navegar para a edição com `id`
    - [ ] Confirmar que a rota recebe o identificador corretamente

  - Carregar os dados do item
    - [ ] Buscar item por `id`
    - [ ] Receber os dados do backend
    - [ ] Preencher o formulário com os dados reais

  - Atualizar os dados
    - [ ] Capturar alterações no formulário
    - [ ] Montar payload de atualização
    - [ ] Enviar requisição `PUT` ou `PATCH`

  - Finalizar o fluxo
    - [ ] Navegar de volta para a listagem
    - [ ] Confirmar que a alteração refletiu no front

- Deletar
  - Preparar a ação de remoção
    - [ ] Definir botão de remover
    - [ ] Garantir que o item correto será removido

  - Integrar com o backend
    - [ ] Chamar método de remoção no service
    - [ ] Enviar requisição `DELETE`
    - [ ] Confirmar resposta do backend

  - Atualizar a interface
    - [ ] Remover o item da lista no front
    - [ ] Confirmar que a listagem foi atualizada

  - Melhorar experiência
    - [ ] Melhorar feedback visual da remoção

- Buscar
  - Estruturar a busca
    - [ ] Criar campo de busca
    - [ ] Definir onde o termo digitado será armazenado

  - Implementar a lógica inicial
    - [ ] Filtrar localmente ou consultar no backend
    - [ ] Confirmar que a lista responde ao termo digitado

  - Refinar a reatividade
    - [ ] Usar `signal()` para estado local quando fizer sentido
    - [ ] Usar `computed()` para derivar lista filtrada localmente
    - [ ] Usar `effect()` quando a busca precisar reagir a mudanças e disparar novos efeitos

  - Validar experiência
    - [ ] Confirmar busca com lista vazia
    - [ ] Confirmar busca com múltiplos resultados
    - [ ] Confirmar busca sem resultados

---

## 13. Introduzir estado local moderno com Signals

> No Angular 21, `signal()` é a base para estado local reativo, `computed()` serve para derivar valores e `effect()` serve para reagir a mudanças observadas.
>
> - Use `signal()` para guardar estado local da tela
> - Use `computed()` para tudo que puder ser derivado
> - Use `effect()` só quando houver reação com efeito colateral
> - Use `Observable` para HTTP

- Estado local com Signals
  - [ ] Criar estado local com `signal()`
  - [ ] Guardar valores simples da interface em signals
  - [ ] Evitar usar signal para substituir toda lógica assíncrona de HTTP
  - [ ] Entender que Signal representa estado local atual da interface

- Derivação de estado com `computed()`
  - [ ] Usar `computed()` quando um valor depender de outro
  - [ ] Evitar duplicar estado derivado manualmente
  - [ ] Preferir `computed()` para filtros, contadores e indicadores visuais

- Reação a mudanças com `effect()`
  - [ ] Usar `effect()` apenas quando houver um efeito colateral real
  - [ ] Evitar usar `effect()` para derivar valor que poderia ser `computed()`
  - [ ] Entender que `effect()` reage aos signals lidos dentro dele

- Consolidar entendimento
  - [ ] `signal()` = estado local da interface
  - [ ] `computed()` = valor derivado de outros signals
  - [ ] `effect()` = reação a mudanças
  - [ ] `Observable` = fluxo assíncrono, especialmente HTTP
  - [ ] `Signal` e `Observable` podem conviver no mesmo componente

---

## 14. Criar busca

- Estruturar a busca
  - [ ] Definir onde o termo digitado será armazenado
  - [ ] Criar o campo de busca no template
  - [ ] Garantir que a digitação atualiza o estado da tela

- Definir a estratégia da busca
  - [ ] Decidir entre filtro local e busca remota
  - [ ] Usar filtro local quando os dados já estiverem carregados na tela
  - [ ] Usar busca remota quando a consulta precisar ir ao backend

- Implementar busca local
  - [ ] Criar `computed()` para derivar a lista filtrada
  - [ ] Normalizar o termo digitado antes de comparar
  - [ ] Garantir que lista vazia continue funcionando
  - [ ] Garantir que termo vazio exiba a lista completa

- Implementar busca remota
  - [ ] Permitir parâmetro de busca no método `getAll(...)`
  - [ ] Enviar termo digitado para o backend
  - [ ] Atualizar a lista com a resposta da API
  - [ ] Exibir estado de carregamento durante a consulta

- Refinar a reatividade
  - [ ] Usar `signal()` para guardar o termo de busca
  - [ ] Usar `computed()` quando a filtragem for local
  - [ ] Usar `effect()` quando a busca remota reagir ao termo digitado
  - [ ] Evitar usar `effect()` quando um simples `computed()` resolver

- Validar experiência
  - [ ] Confirmar busca com lista vazia
  - [ ] Confirmar busca com um resultado
  - [ ] Confirmar busca com múltiplos resultados
  - [ ] Confirmar busca sem resultados
  - [ ] Confirmar que limpar o campo restaura a lista

---

## 15. Componentizar o que se provou útil

> No Angular 21, componentes são standalone por padrão, `input()` é a forma moderna de receber dados, `output()` é a forma de emitir eventos, e `model()` é útil quando o componente precisa expor two-way binding.
>
> - Página coordena fluxo, navegação e acesso a dados
> - Componente filho recebe dados com `input()`
> - Componente filho emite eventos com `output()`
> - Componente que edita valor do pai pode usar `model()`
> - Componentizar só o que realmente ficou útil de separar

- Identificar o que realmente merece extração
  - [ ] Separar trechos repetidos ou com responsabilidade própria
  - [ ] Evitar extrair componente cedo demais sem necessidade real
  - [ ] Garantir que a extração melhora leitura, reuso ou manutenção

- Extrair componente de campo de busca
  - [ ] Criar componente próprio para o campo de busca
  - [ ] Mover o template do campo para esse componente
  - [ ] Fazer o componente expor o valor digitado
  - [ ] Usar `model()` para suportar two-way binding entre componente pai e filho

- Extrair componente de lista/cards
  - [ ] Criar componente próprio para renderizar a coleção de itens
  - [ ] Receber a lista via `input()`
  - [ ] Manter no componente apenas a responsabilidade de exibir e emitir ações
  - [ ] Evitar colocar lógica de carregamento HTTP dentro do componente filho

- Comunicar componente filho com componente pai
  - [ ] Usar `input()` para entrada de dados
  - [ ] Usar `output()` para emitir ações do usuário
  - [ ] Garantir que o componente pai continue dono do fluxo principal

- Refinar a organização
  - [ ] Manter a página como orquestradora do fluxo
  - [ ] Manter componentes filhos focados em UI e interação
  - [ ] Garantir que service continue responsável por acesso a dados

---

## 16. Estruturar melhor os formulários

> No Angular 21, **Reactive Forms** continuam sendo a opção mais estável para formulários robustos, escaláveis e testáveis.
>
> Quando a estrutura de dados for comum entre criação, edição e outros fluxos, a melhor estratégia é **criar a base do formulário uma única vez e reutilizá-la**.

- Estruturar melhor o formulário
  - [ ] Criar uma base reutilizável para o formulário da feature
  - [ ] Garantir que criação e edição usem a mesma estrutura
  - [ ] Centralizar os controles em um único arquivo
  - [ ] Evitar duplicar `FormGroup` em múltiplos componentes

- Tipar corretamente os controles
  - [ ] Usar `FormControl` com `nonNullable: true` nos campos adequados
  - [ ] Garantir que o tipo do formulário seja explícito
  - [ ] Manter compatibilidade clara com `PayloadTarefa`

- Adicionar validações
  - [ ] Aplicar `Validators.required` nos campos obrigatórios
  - [ ] Garantir consistência entre criação e edição
  - [ ] Impedir envio com formulário inválido

- Exibir mensagens de erro
  - [ ] Mostrar mensagens de validação no template
  - [ ] Exibir mensagens claras e objetivas
  - [ ] Garantir coerência entre as páginas

- Padronizar submit
  - [ ] Validar formulário antes de enviar
  - [ ] Navegar somente após sucesso da operação
  - [ ] Manter o método de submit simples e previsível
  - [ ] Exibir feedback simples em caso de erro
  - [ ] Desabilitar ações enquanto o envio estiver em andamento

---

## 17. Melhorar rota dinâmica da edição

> No Angular 21, a abordagem moderna é:
>
> - manter a rota com parâmetro dinâmico `:id`
> - usar `ResolveFn` para pré-carregar dados quando fizer sentido
> - usar `withComponentInputBinding()` para entregar parâmetros e dados resolvidos diretamente em `input()` do componente

- Melhorar a rota dinâmica
  - [ ] Garantir que a rota da edição use `:id`
  - [ ] Confirmar que a navegação envia o identificador correto
  - [ ] Confirmar que a tela de edição abre com base no item clicado

- Carregar dados da rota de forma mais moderna
  - [ ] Evitar deixar toda a responsabilidade de leitura da rota dentro do componente
  - [ ] Usar resolver quando a tela depender do dado antes de renderizar
  - [ ] Preferir `ResolveFn` em vez de resolver baseado em classe
  - [ ] Manter o service responsável pelo acesso ao backend

- Integrar rota e componente
  - [ ] Ativar `withComponentInputBinding()` no `provideRouter(...)`
  - [ ] Receber o dado resolvido diretamente com `input()`
  - [ ] Reduzir dependência direta de `ActivatedRoute` quando isso simplificar a tela

- Validar o fluxo
  - [ ] Confirmar que `/tarefas/edicao/1` carrega a tarefa correta
  - [ ] Confirmar que mudar o `id` na URL muda o item carregado
  - [ ] Confirmar que a edição continua funcionando após salvar
  - [ ] Confirmar que a navegação volta para a listagem normalmente

---

## 18. Tratar subscriptions e consistência do fluxo

> No Angular 21:
>
> - `Observable` continua sendo a base natural para HTTP
> - `signal()` continua sendo a base do estado local da interface
> - `takeUntilDestroyed()` é a forma moderna de encerrar subscriptions ligadas ao ciclo de vida
> - `effect()` deve ser usado apenas quando houver efeito colateral real
> - quando for útil integrar RxJS e Signals, o pacote `@angular/core/rxjs-interop` oferece APIs próprias para isso

- Tratar subscriptions com segurança
  - [ ] Aplicar `takeUntilDestroyed()` onde houver subscription que precise acompanhar o ciclo de vida do componente
  - [ ] Evitar subscriptions “soltas” em componentes longos ou reativos
  - [ ] Entender que chamadas HTTP simples geralmente completam sozinhas, mas fluxos reativos contínuos precisam de mais atenção

- Evitar duplicidade de fluxo
  - [ ] Não repetir a mesma carga de dados em `ngOnInit()` e `effect()`
  - [ ] Garantir que cada responsabilidade tenha um único ponto principal de execução
  - [ ] Evitar buscar os mesmos dados duas vezes sem necessidade

- Garantir coerência entre Signals e HTTP
  - [ ] Usar service para buscar e persistir dados
  - [ ] Usar `signal()` para guardar o resultado que a tela consome
  - [ ] Evitar misturar regra de derivação com efeito colateral
  - [ ] Preferir `computed()` para valores derivados da interface
  - [ ] Preferir `effect()` apenas quando a mudança de um signal precisar disparar uma ação externa

- Revisar responsabilidades
  - [ ] Componente de página coordena fluxo, navegação e integração com service
  - [ ] Service continua responsável pelo acesso HTTP
  - [ ] Componentes filhos continuam focados em exibição e emissão de eventos
  - [ ] Signals representam estado local atual da tela
  - [ ] Observables representam fluxo assíncrono

- Validar consistência
  - [ ] Confirmar que a tela não dispara requisições duplicadas
  - [ ] Confirmar que subscriptions não ficam ativas sem necessidade
  - [ ] Confirmar que loading sempre volta ao estado correto
  - [ ] Confirmar que create, update e delete refletem corretamente na interface

---

## 19. Criar modal de confirmação

> No Angular 21, o caminho mais comum para modal de confirmação é usar `MatDialog` do Angular Material.
>
> Fluxo esperado:
>
> - a página abre o modal
> - o modal recebe os dados necessários
> - o usuário cancela ou confirma
> - a página reage ao resultado e decide se executa a remoção

- Estruturar o modal
  - [ ] Criar componente próprio para o modal de confirmação
  - [ ] Definir título, mensagem e ações
  - [ ] Manter o modal focado apenas em confirmar ou cancelar
  - [ ] Evitar colocar regra de negócio pesada dentro do componente do modal

- Integrar com Angular Material Dialog
  - [ ] Importar `MatDialog` na página que abrirá o modal
  - [ ] Abrir o modal com `dialog.open(...)`
  - [ ] Passar dados necessários para o modal
  - [ ] Definir o que será retornado ao fechar o diálogo

- Tratar o resultado do modal
  - [ ] Capturar o retorno com `afterClosed()`
  - [ ] Remover apenas se o usuário confirmar
  - [ ] Não executar remoção se o usuário cancelar
  - [ ] Confirmar que a interface continua consistente após o fechamento

- Validar o fluxo
  - [ ] Confirmar que o modal abre ao clicar em remover
  - [ ] Confirmar que cancelar fecha o modal sem apagar nada
  - [ ] Confirmar que remover fecha o modal e executa a exclusão
  - [ ] Confirmar que a lista é atualizada depois da remoção

---

## 20. Refinar interface com Angular Material e SCSS

> No Angular 21:
>
> - estilos globais ficam em `src/styles.scss`
> - estilos locais ficam no `styleUrl` de cada componente
> - Angular Material continua sendo a biblioteca oficial de componentes visuais para Angular
> - o ideal é manter tema e overrides globais separados da estilização específica de cada tela

- Refinar a base visual global
  - [ ] Configurar ou revisar o tema global da aplicação
  - [ ] Confirmar tipografia global
  - [ ] Confirmar ícones e fontes necessários
  - [ ] Garantir que a aplicação continua compilando após ajustes globais

- Refinar componentes de interface com Angular Material
  - [ ] Melhorar toolbar
  - [ ] Refinar campos com `mat-form-field`
  - [ ] Refinar botões Material
  - [ ] Refinar cards com `mat-card`
  - [ ] Garantir consistência visual entre páginas

- Organizar melhor os estilos
  - [ ] Manter `styles.scss` para tema, base global e regras compartilhadas
  - [ ] Separar overrides globais do Angular Material
  - [ ] Manter layout e detalhes visuais locais no SCSS do componente
  - [ ] Evitar colocar no global aquilo que pertence só a uma tela

- Refinar layout das telas
  - [ ] Melhorar espaçamento entre blocos
  - [ ] Melhorar alinhamento dos elementos
  - [ ] Melhorar largura útil de conteúdo
  - [ ] Melhorar responsividade básica
  - [ ] Garantir leitura confortável e boa hierarquia visual

- Validar consistência visual
  - [ ] Confirmar que listagem, criação e edição parecem partes da mesma aplicação
  - [ ] Confirmar que estados visuais importantes ficam claros
  - [ ] Confirmar que ações primárias e destrutivas estão distinguíveis
  - [ ] Confirmar que a interface continua simples de entender

---

## 21. Aplicar pipes e diretiva customizada

> No Angular 21, **pipes** e **diretivas** podem ser criados como artefatos standalone e importados diretamente nos componentes que os utilizam.

- Pipe nativo
  - [ ] Escolher um pipe nativo que faça sentido para a interface
  - [ ] Aplicar o pipe apenas na camada de apresentação
  - [ ] Confirmar que a transformação ocorre corretamente no template
  - [ ] Evitar usar pipe para regra de negócio pesada

- Pipe customizado
  - [ ] Identificar uma transformação repetida ou útil para exibição
  - [ ] Criar o pipe com Angular CLI
  - [ ] Implementar a transformação de forma simples e previsível
  - [ ] Importar o pipe no componente que o utilizará
  - [ ] Confirmar o resultado no template

- Diretiva customizada
  - [ ] Identificar um comportamento visual ou estrutural reutilizável
  - [ ] Criar a diretiva com Angular CLI
  - [ ] Implementar a lógica da diretiva de forma simples
  - [ ] Importar a diretiva no componente que a utilizará
  - [ ] Aplicar a diretiva no template e validar o comportamento

- Validar requisitos
  - [ ] Confirmar que há pelo menos um pipe nativo em uso
  - [ ] Confirmar que há pelo menos um pipe customizado em uso
  - [ ] Confirmar que há pelo menos uma diretiva customizada em uso
  - [ ] Confirmar que a aplicação continua compilando após os imports

---

## 22. Revisão final

- [ ] Validar fluxo completo:
  - [ ] criar
  - [ ] listar
  - [ ] buscar
  - [ ] editar
  - [ ] excluir

- [ ] Validar navegação
- [ ] Validar modal
- [ ] Validar pipes
- [ ] Validar diretiva
- [ ] Validar aliases
- [ ] Validar organização de pastas
- [ ] Remover duplicações
- [ ] Revisar nomes e consistência
- [ ] Validar rota curinga `**`
- [ ] Validar tratamento de erro nas operações principais
- [ ] Validar estados de envio em andamento
