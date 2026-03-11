# CHECKLIST

[➕ Checklist enxuto](./checklist-enxuto.md)
[➕ Checklist detalhado génerico](./checklist.md)

> Ordem pensada para otimizar o tempo: primeiro, a espinha dorsal da aplicação; depois, o CRUD; por fim, os refinamentos.

---

## 1. Preparação mínima do ambiente

> Ambiente quebrado impede tudo; mas depois disso não vale gastar tempo excessivo aqui.

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

> Angular 21 enfatiza componentes standalone e uma experiência moderna centrada em APIs como `provideRouter(...)`.

- [ ] Criar aplicação Angular 21 com Angular CLI

  ```bash
  npx @angular/cli@21 new nome-da-aplicação
  ```

- [ ] Confirmar `app.config.ts`, `app.routes.ts` e estrutura inicial do projeto

- [ ] Rodar a aplicação

  ```bash
  npm start
  ```

  > Que por padrão estará acessível em `http://localhost:4200/`

- [ ] Confirmar que a aplicação sobe no navegador

---

## 3. Definição da arquitetura inicial

> - Isso evita sair criando arquivo aleatório e depois mover tudo no meio
> - Alias tarde demais gera refatoração inútil.
> - Estrutura e nomes-base devem nascer cedo.

- [x] Definir (planejar) o objetivo da aplicação e suas funcionalidades principais:
  - Neste projeto:
    - Lista de tarefas

- [x] Definir (planejar) a estrutura de pastas inicial
  - Neste projeto:
    - `core/`
    - `shared/`
    - `features/`

- [x] Definir (planejar) as páginas:
  - Neste projeto:
    - listagem
    - criação
    - edição

- [x] Definir (planejar) interfaces principais
  - Neste projeto:
    - `tarefa`
    - `tarefaPayload`

- [x] Definir (planejar) componentes reutilizáveis previstos:
  - Neste projeto:
    - campo de busca
    - lista/cards
    - modal de confirmação

- [x] Definir (planejar) serviço principal da feature

---

## 4. Backend fake e base de dados cedo

> O Json Server simula uma API, permitindo codar o CRUD eficazmento tal como seria feito com os links de uma API verdadeira

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
  - Neste projeto:

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
  http://localhost:3000/nome-da-tabela
  ```

  No terminal:

  ```bash
  curl http://localhost:3000/nome-da-tabela
  ```

---

## 5 Configurações estruturais

> Padronizão de nomes agrega profissionalismo
> Aliases de importação aumentam a legibilidade do código e o quanto antes implementar, menos refatoração de código

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

> `ng generate component nome-do-componente` = `ng g c nome-do-componente`
> `npx ng g c nome-do-componente`, se o Angular não foi instalado globalmente

- [ ] Criar artefatos [🔎](./conteudo-teorico/artefatos.md) do tipo componente para servir de páginas
  - Neste projeto:
    - [ ] Criar página de listagem

      ```bash
      ng g c features/tarefas/pages/listagem-tarefas
      ```

    - [ ] Criar página de criação

      ```bash
      ng g c features/tarefas/pages/criacao-tarefa
      ```

    - [ ] Criar página de edição

      ```bash
      ng g c features/tarefas/pages/edicao-tarefa
      ```

    - [ ] Criar componente modal de confirmação

      ```bash
      ng g c shared/components/modal-confirmacao
      ```

- [ ] Confirmar que os arquivos foram gerados na estrutura correta

---

## 7. Configurar roteamento principal

Roteamento e navegação [🔎](./conteudo-teorico/navegacao.md)

- [ ] Configurar `provideRouter(...)`

  ```ts
  import { ApplicationConfig } from '@angular/core';
  import { provideRouter } from '@angular/router';

  import { routes } from './app.routes';

  export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)],
  };
  ```

- [ ] Criar rotas no `app.routes.ts`
  - Neste projeto:
    - [ ] Criar rota da listagem

      ```ts
      {
        path: 'tarefas',
        loadComponent: () =>
          import('./features/tarefas/pages/listagem-tarefas/listagem-tarefas')
            .then((m) => m.ListagemTarefas),
      }
      ```

    - [ ] Criar rota de criação

      ```ts
      {
        path: 'tarefas/criacao',
        loadComponent: () =>
          import('./features/tarefas/pages/criacao-tarefa/criacao-tarefa')
            .then((m) => m.CriacaoTarefa),
      }
      ```

    - [ ] Criar rota de edição

      ```ts
      {
        path: 'tarefas/edicao/:id',
        loadComponent: () =>
          import('./features/tarefas/pages/edicao-tarefa/edicao-tarefa')
            .then((m) => m.EdicaoTarefa),
      }
      ```

    - [ ] Definir redirect inicial

      ```ts
      {
        path: '',
        redirectTo: 'tarefas',
        pathMatch: 'full',
      }
      ```

    - [ ] Adicionar rota curinga para fallback

      ```ts
      {
        path: '**',
        redirectTo: 'tarefas',
      }
      ```

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
  - Neste projeto:
    - [ ] Criar toolbar

      ```bash
      npx ng g c shared/components/cabecalho
      ```

      ```html
      <!-- src/app/shared/components/cabecalho/cabecalho.html -->
      <mat-toolbar>
        <span>Lista de Tarefas</span>
      </mat-toolbar>
      ```

    - [ ] Adicionar `router-outlet`

      ```html
      <!-- src/app/app.html -->
      <router-outlet />
      ```

    - [ ] Adicionar toolbar

      ```html
      <!-- src/app/app.html -->
      <app-cabecalho />

      <main>
        <router-outlet />
      </main>
      ```

- [ ] Colocar conteúdo simples nas páginas
  - Neste projeto:
    - [ ] Página de listagem:

      ```html
      <!-- src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.html -->
      <section>
        <h2>Tarefas</h2>

        <mat-form-field>
          <mat-label>Pesquisar tarefa</mat-label>
          <input matInput placeholder="Ex.: estudar para prova" />
        </mat-form-field>

        <div>
          <button matButton="filled">Nova tarefa</button>
        </div>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Tarefa de exemplo</mat-card-title>
            <mat-card-subtitle>Pendente</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <p>Descrição da tarefa de exemplo.</p>
          </mat-card-content>

          <mat-card-actions>
            <button matButton="filled">Editar</button>
            <button matButton="outlined">Remover</button>
          </mat-card-actions>
        </mat-card>
      </section>
      ```

    - [ ] Página de criação:

      ```html
      <!-- src/app/features/tarefas/pages/criacao-tarefa/criacao-tarefa.html -->
      <section>
        <h2>Criacao de tarefa</h2>

        <form>
          <mat-form-field>
            <mat-label>Titulo</mat-label>
            <input matInput placeholder="Digite o titulo da tarefa" />
          </mat-form-field>

          <mat-form-field>
            <mat-label>Descricao</mat-label>
            <textarea matInput placeholder="Digite uma descricao para a tarefa"></textarea>
          </mat-form-field>

          <div>
            <button type="button" matButton="outlined">Cancelar</button>
            <button type="submit" matButton="filled">Salvar</button>
          </div>
        </form>
      </section>
      ```

    - [ ] Página de edição:

      ```html
      <!-- src/app/features/tarefas/pages/edicao-tarefa/edicao-tarefa.html -->
      <section>
        <h2>Edicao de tarefa</h2>

        <form>
          <mat-form-field>
            <mat-label>Titulo</mat-label>
            <input matInput value="Tarefa de exemplo" />
          </mat-form-field>

          <mat-form-field>
            <mat-label>Descricao</mat-label>
            <textarea matInput>Descricao da tarefa de exemplo.</textarea>
          </mat-form-field>

          <div>
            <button type="button" matButton="outlined">Cancelar</button>
            <button type="submit" matButton="filled">Salvar alteracoes</button>
          </div>
        </form>
      </section>
      ```

    - [ ] Modal de confirmação:

      ```html
      <h2 mat-dialog-title>Remover tarefa</h2>

      <mat-dialog-content>
        <p>Tem certeza que deseja remover esta tarefa?</p>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button matButton>Cancelar</button>
        <button matButton="filled">Remover</button>
      </mat-dialog-actions>
      ```

---

## 10. Implementar navegação entre páginas

- [ ] Importar `RouterLink` nos componentes de página

- [ ] Implementar `routerLink="rota-de-destino"` nos elementos de navegação do template
  - Neste projeto:
    - da listagem para criação
      - [ ] Adicionar link no botão **Nova tarefa**

        ```html
        <!-- src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.html -->
        <button matButton="filled" routerLink="/tarefas/criacao">Nova tarefa</button>
        ```

    - da listagem para edição
      - [ ] Adicionar link no botão **Editar**

        > O `1` ainda é fixo só para validar a navegação.
        > Depois, no CRUD real, ele se tornará o `id` dinâmico da tarefa.

        ```html
        <!-- src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.html -->
        <button matButton="filled" [routerLink]="['/tarefas/edicao', 1]">Editar</button>
        ```

    - de volta ao cancelar na página de criação
      - [ ] Adicionar link no botão **Cancelar**

        ```html
        <!-- src/app/features/tarefas/pages/criacao-tarefa/criacao-tarefa.html -->
        <button type="button" matButton="outlined" routerLink="/tarefas">Cancelar</button>
        ```

    - de volta ao cancelar na página de edição
      - [ ] Adicionar link no botão **Cancelar**

        ```html
        <!-- src/app/features/tarefas/pages/edicao-tarefa/edicao-tarefa.html -->
        <button type="button" matButton="outlined" routerLink="/tarefas">Cancelar</button>
        ```

    - de volta após salvar
      - [ ] Adicionar link no botão **Salvar**

        > Esse uso no botão de submit é apenas provisório para validar o fluxo visual.
        > Depois, o correto será navegar programaticamente com `Router` via TypeScript após o submit.

        ```html
        <!-- Exemplo temporário -->
        <button type="submit" matButton="filled" routerLink="/tarefas">Salvar</button>
        ```

- [ ] Confirmar fluxo básico completo entre páginas
  - Neste projeto:
    - [ ] Entrar em `/tarefas`
    - [ ] Ir para `/tarefas/criacao`
    - [ ] Voltar para `/tarefas`
    - [ ] Ir para `/tarefas/edicao/1`
    - [ ] Voltar para `/tarefas`
    - [ ] Acessar uma rota inexistente e confirmar redirecionamento para `/tarefas`

---

## 11. Criar o serviço HTTP da feature

> No Angular 21, o `HttpClient` é disponibilizado com `provideHttpClient()`.
> O service centraliza o acesso aos dados e evita espalhar chamadas HTTP pelos componentes.

- [ ] Criar interface principal da feature
  - Neste projeto:
    - [ ] Criar `tarefa.ts`

      ```ts
      // src/app/shared/interfaces/tarefa.ts
      export interface Tarefa {
        id: number;
        titulo: string;
        descricao: string;
        concluida: boolean;
      }

      export type PayloadTarefa = Omit<Tarefa, 'id'>;
      ```

- [ ] Configurar `provideHttpClient()` no `app.config.ts`

  ```ts
  // src/app/app.config.ts
  /*
  import { ApplicationConfig } from '@angular/core';
  import { provideRouter } from '@angular/router';
  import { routes } from './app.routes';
  import { provideHttpClient } from '@angular/common/http';
  */

  export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideHttpClient()],
  };
  ```

- [ ] Criar o serviço HTTP da feature
  - Neste projeto:

    ```bash
    npx ng g s core/services/tarefas.service
    ```

- [ ] Injetar `HttpClient` no service
  - Neste projeto:

    ```ts
    // src/app/core/services/tarefas.service.ts
    import { HttpClient, HttpParams } from '@angular/common/http';
    import { inject, Injectable } from '@angular/core';

    /*
    @Injectable({
      providedIn: 'root',
    })
    */

    export class TarefasService {
      private readonly http = inject(HttpClient);
    }
    ```

- [ ] Definir a URL base da API no service
  - Neste projeto:

    ```ts
    // src/app/core/services/tarefas.service.ts
    private readonly apiUrl = 'http://localhost:3000/tarefas';
    ```

- [ ] Implementar `getAll`
  - Neste projeto:

    ```ts
    // src/app/core/services/tarefas.service.ts
    import { Tarefa } from '@shared/interfaces/tarefa';

    [...]

    getAll(busca?: string) {
      let params = new HttpParams();

      if (busca) {
        params = params.set(`q`, busca);
      }

      return this.http.get<Tarefa[]>(this.apiUrl, { params });
    }
    ```

- [ ] Implementar `getById`
  - Neste projeto:

    ```ts
    // src/app/core/services/tarefas.service.ts
    getById(id: number | string) {
      return this.http.get<Tarefa>(`${this.apiUrl}/${id}`);
    }
    ```

- [ ] Implementar `create`
  - Neste projeto:

    ```ts
    // src/app/core/services/tarefas.service.ts
    import { PayloadTarefa } from '@shared/interfaces/tarefa';

    [...]

    create(payload: PayloadTarefa) {
      return this.http.post<Tarefa>(this.apiUrl, payload);
    }
    ```

- [ ] Implementar `update`
  - Neste projeto:

    ```ts
    // src/app/core/services/tarefas.service.ts
    update(id: number, payload: PayloadTarefa) {
      return this.http.put<Tarefa>(`${this.apiUrl}/${id}`, payload);
    }
    ```

- [ ] Implementar `remove`
  - Neste projeto:

    ```ts
    // src/app/core/services/tarefas.service.ts
    remove(id: number) {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    ```

- [ ] Validar chamadas básicas no backend fake via terminal
  - Neste projeto:
    - [ ] Listar todas as tarefas

      ```bash
      curl http://localhost:3000/tarefas
      ```

    - [ ] Buscar uma tarefa pelo `id`

      ```bash
      curl http://localhost:3000/tarefas/1
      ```

  - [ ] Confirmar que a rota responde corretamente antes de integrar com a aplicação Angular
    - Neste projeto:
      - [ ] rota `/tarefas`

---

## 12. Construir o CRUD

> Se o `json-server` já estiver com dados, pode ser mais vantajoso começar por `listar`, porque isso dá retorno visual mais rápido.

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

- Neste projeto:
  - Criar tarefa
    - [ ] Montar formulário com Reactive Forms
    - [ ] Fazer submit simples no front
    - [ ] Trocar dados fixos do formulário por envio real
    - [ ] Navegar de volta para a listagem após criar
    - [ ] Desabilitar o botão de salvar enquanto o envio estiver em andamento
    - [ ] Exibir mensagem simples se ocorrer erro ao criar

      ```ts
      // src/app/features/tarefas/pages/criacao-tarefa/criacao-tarefa.ts
      import { Component, inject, signal } from '@angular/core';
      import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
      import { Router, RouterLink } from '@angular/router';
      import { MatButtonModule } from '@angular/material/button';
      import { MatFormFieldModule } from '@angular/material/form-field';
      import { MatInputModule } from '@angular/material/input';

      import { TarefasService } from '@core/services/tarefas.service';

      @Component({
        selector: 'app-criacao-tarefa',
        imports: [
          ReactiveFormsModule,
          RouterLink,
          MatButtonModule,
          MatFormFieldModule,
          MatInputModule,
        ],
        templateUrl: './criacao-tarefa.html',
        styleUrl: './criacao-tarefa.scss',
      })
      export class CriacaoTarefa {
        private readonly router = inject(Router);
        private readonly tarefasService = inject(TarefasService);

        enviando = signal(false);
        erro = signal('');

        form = new FormGroup({
          titulo: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
          }),
          descricao: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
          }),
        });

        salvar() {
          if (this.form.invalid || this.enviando()) return;

          this.enviando.set(true);
          this.erro.set('');

          this.tarefasService
            .create({
              ...this.form.getRawValue(),
              concluida: false,
            })
            .subscribe({
              next: () => {
                this.router.navigateByUrl('/tarefas');
              },
              error: () => {
                this.erro.set('Nao foi possivel criar a tarefa.');
                this.enviando.set(false);
              },
            });
        }
      }
      ```

      ```html
      <!-- src/app/features/tarefas/pages/criacao-tarefa/criacao-tarefa.html -->
      <section>
        <h2>Criacao de tarefa</h2>

        <form [formGroup]="form" (ngSubmit)="salvar()">
          <mat-form-field>
            <mat-label>Titulo</mat-label>
            <input matInput formControlName="titulo" />
          </mat-form-field>

          <mat-form-field>
            <mat-label>Descricao</mat-label>
            <textarea matInput formControlName="descricao"></textarea>
          </mat-form-field>

          @if (erro()) {
          <p>{{ erro() }}</p>
          }

          <div>
            <button
              type="button"
              matButton="outlined"
              routerLink="/tarefas"
              [disabled]="enviando()"
            >
              Cancelar
            </button>
            <button type="submit" matButton="filled" [disabled]="form.invalid || enviando()">
              Salvar
            </button>
          </div>
        </form>
      </section>
      ```

  - Listar tarefas
    - [ ] Buscar lista no backend
    - [ ] Trocar itens estáticos da listagem por dados reais
    - [ ] Exibir carregamento simples
    - [ ] Exibir mensagem simples se ocorrer erro ao carregar

      ```ts
      // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.ts
      import { Component, inject, signal } from '@angular/core';
      import { MatButtonModule } from '@angular/material/button';
      import { MatCardModule } from '@angular/material/card';
      import { RouterLink } from '@angular/router';

      import { Tarefa } from '@shared/interfaces/tarefa';
      import { TarefasService } from '@core/services/tarefas.service';

      @Component({
        selector: 'app-listagem-tarefas',
        imports: [RouterLink, MatButtonModule, MatCardModule],
        templateUrl: './listagem-tarefas.html',
        styleUrl: './listagem-tarefas.scss',
      })
      export class ListagemTarefas {
        private readonly tarefasService = inject(TarefasService);

        tarefas = signal<Tarefa[]>([]);
        carregando = signal(true);
        erro = signal('');

        ngOnInit() {
          this.tarefasService.getAll().subscribe({
            next: (tarefas) => {
              this.tarefas.set(tarefas);
              this.carregando.set(false);
            },
            error: () => {
              this.erro.set('Nao foi possivel carregar as tarefas.');
              this.carregando.set(false);
            },
          });
        }
      }
      ```

      ```html
      <!-- src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.html -->
      <section>
        <h2>Tarefas</h2>

        <div>
          <button matButton="filled" routerLink="/tarefas/criacao">Nova tarefa</button>
        </div>

        @if (carregando()) {
        <p>Carregando tarefas...</p>
        } @else if (erro()) {
        <p>{{ erro() }}</p>
        } @else { @for (tarefa of tarefas(); track tarefa.id) {
        <mat-card>
          <mat-card-header>
            <mat-card-title>{{ tarefa.titulo }}</mat-card-title>
            <mat-card-subtitle>
              {{ tarefa.concluida ? 'Concluida' : 'Pendente' }}
            </mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <p>{{ tarefa.descricao }}</p>
          </mat-card-content>

          <mat-card-actions>
            <button matButton="filled" [routerLink]="['/tarefas/edicao', tarefa.id]">Editar</button>
            <button matButton="outlined">Remover</button>
          </mat-card-actions>
        </mat-card>
        } }
      </section>
      ```

  - Editar tarefa
    - [ ] Navegar para edição com `id`
    - [ ] Buscar tarefa por `id`
    - [ ] Preencher formulário com dados reais
    - [ ] Enviar atualização ao backend
    - [ ] Voltar para a listagem
    - [ ] Confirmar alteração refletida na lista
    - [ ] Desabilitar o botão de salvar enquanto a atualização estiver em andamento
    - [ ] Exibir mensagem simples se ocorrer erro ao editar

      ```ts
      // src/app/features/tarefas/pages/edicao-tarefa/edicao-tarefa.ts
      import { Component, inject, signal } from '@angular/core';
      import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
      import { ActivatedRoute, Router, RouterLink } from '@angular/router';
      import { MatButtonModule } from '@angular/material/button';
      import { MatFormFieldModule } from '@angular/material/form-field';
      import { MatInputModule } from '@angular/material/input';

      import { TarefasService } from '@core/services/tarefas.service';

      @Component({
        selector: 'app-edicao-tarefa',
        imports: [
          ReactiveFormsModule,
          RouterLink,
          MatButtonModule,
          MatFormFieldModule,
          MatInputModule,
        ],
        templateUrl: './edicao-tarefa.html',
        styleUrl: './edicao-tarefa.scss',
      })
      export class EdicaoTarefa {
        private readonly route = inject(ActivatedRoute);
        private readonly router = inject(Router);
        private readonly tarefasService = inject(TarefasService);

        readonly id = Number(this.route.snapshot.paramMap.get('id'));
        enviando = signal(false);
        erro = signal('');

        form = new FormGroup({
          titulo: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
          }),
          descricao: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
          }),
          concluida: new FormControl(false, {
            nonNullable: true,
          }),
        });

        ngOnInit() {
          this.tarefasService.getById(this.id).subscribe({
            next: (tarefa) => {
              this.form.patchValue({
                titulo: tarefa.titulo,
                descricao: tarefa.descricao,
                concluida: tarefa.concluida,
              });
            },
            error: () => {
              this.erro.set('Nao foi possivel carregar a tarefa.');
            },
          });
        }

        salvar() {
          if (this.form.invalid || this.enviando()) return;

          this.enviando.set(true);
          this.erro.set('');

          this.tarefasService.update(this.id, this.form.getRawValue()).subscribe({
            next: () => {
              this.router.navigateByUrl('/tarefas');
            },
            error: () => {
              this.erro.set('Nao foi possivel atualizar a tarefa.');
              this.enviando.set(false);
            },
          });
        }
      }
      ```

      ```html
      <!-- src/app/features/tarefas/pages/edicao-tarefa/edicao-tarefa.html -->
      <section>
        <h2>Edicao de tarefa</h2>

        <form [formGroup]="form" (ngSubmit)="salvar()">
          <mat-form-field>
            <mat-label>Titulo</mat-label>
            <input matInput formControlName="titulo" />
          </mat-form-field>

          <mat-form-field>
            <mat-label>Descricao</mat-label>
            <textarea matInput formControlName="descricao"></textarea>
          </mat-form-field>

          @if (erro()) {
          <p>{{ erro() }}</p>
          }

          <div>
            <button
              type="button"
              matButton="outlined"
              routerLink="/tarefas"
              [disabled]="enviando()"
            >
              Cancelar
            </button>
            <button type="submit" matButton="filled" [disabled]="form.invalid || enviando()">
              Salvar alteracoes
            </button>
          </div>
        </form>
      </section>
      ```

  - Deletar tarefa
    - [ ] Criar ação de remoção
    - [ ] Enviar `DELETE`
    - [ ] Atualizar a lista após remover
    - [ ] Exibir mensagem simples se ocorrer erro ao remover

      ```ts
      // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.ts
      erroRemocao = signal('');

      removerTarefa(id: number) {
        this.erroRemocao.set('');

        this.tarefasService.remove(id).subscribe({
          next: () => {
            this.tarefas.update((tarefas) =>
              tarefas.filter((tarefa) => tarefa.id !== id),
            );
          },
          error: () => {
            this.erroRemocao.set('Nao foi possivel remover a tarefa.');
          },
        });
      }
      ```

      ```html
      <!-- src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.html -->
      @if (erroRemocao()) {
      <p>{{ erroRemocao() }}</p>
      }

      <button matButton="outlined" (click)="removerTarefa(tarefa.id)">Remover</button>
      ```

  - Buscar tarefas
    - [ ] Criar campo de busca
    - [ ] Primeiro testar filtragem simples
    - [ ] Depois decidir entre filtro local ou consulta no backend
    - [ ] Refinar com Signals quando fizer sentido

      ```ts
      // opção 1: filtro local
      import { computed, signal } from '@angular/core';

      termoBusca = signal('');

      tarefasFiltradas = computed(() => {
        const termo = this.termoBusca().trim().toLowerCase();

        if (!termo) return this.tarefas();

        return this.tarefas().filter((tarefa) => tarefa.titulo.toLowerCase().includes(termo));
      });
      ```

      ```html
      <mat-form-field>
        <mat-label>Pesquisar tarefa</mat-label>
        <input
          matInput
          [value]="termoBusca()"
          (input)="termoBusca.set($any($event.target).value)"
        />
      </mat-form-field>
      ```

      ```html
      @for (tarefa of tarefasFiltradas(); track tarefa.id) {
      <mat-card>
        <mat-card-title>{{ tarefa.titulo }}</mat-card-title>
      </mat-card>
      }
      ```

      ```ts
      // opção 2: busca remota
      import { HttpClient, HttpParams } from '@angular/common/http';

      getAll(busca?: string) {
        let params = new HttpParams();

        if (busca) {
          params = params.set('q', busca);
        }

        return this.http.get<Tarefa[]>(this.apiUrl, { params });
      }
      ```

      ```ts
      // listagem reagindo ao termo de busca
      import { effect, signal } from '@angular/core';

      termoBusca = signal('');

      buscarTarefas = effect(() => {
        const termo = this.termoBusca();

        this.tarefasService.getAll(termo).subscribe((tarefas) => {
          this.tarefas.set(tarefas);
        });
      });
      ```

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

- Neste projeto:
  - Listagem de tarefas
    - [ ] Guardar lista em `signal()`
    - [ ] Guardar loading em `signal()`
    - [ ] Guardar termo de busca em `signal()`

      ```ts
      import { Component, inject, signal } from '@angular/core';

      import { Tarefa } from '@shared/interfaces/tarefa';
      import { TarefasService } from '@core/services/tarefas.service';

      @Component({
        selector: 'app-listagem-tarefas',
        templateUrl: './listagem-tarefas.html',
        styleUrl: './listagem-tarefas.scss',
      })
      export class ListagemTarefas {
        private readonly tarefasService = inject(TarefasService);

        tarefas = signal<Tarefa[]>([]);
        carregando = signal(true);
        termoBusca = signal('');
      }
      ```

  - Estado derivado da interface
    - [ ] Criar lista filtrada com `computed()`
    - [ ] Criar contagem de tarefas concluídas com `computed()`
    - [ ] Criar contagem total com `computed()`

      ```ts
      import { computed } from '@angular/core';

      tarefasFiltradas = computed(() => {
        const termo = this.termoBusca().trim().toLowerCase();

        if (!termo) return this.tarefas();

        return this.tarefas().filter((tarefa) => tarefa.titulo.toLowerCase().includes(termo));
      });

      totalTarefas = computed(() => this.tarefas().length);

      totalConcluidas = computed(() => this.tarefas().filter((tarefa) => tarefa.concluida).length);
      ```

  - Reatividade útil com `effect()`
    - [ ] Usar `effect()` quando o termo de busca precisar disparar nova busca remota
    - [ ] Evitar usar `effect()` para simples filtro local
    - [ ] Entender que, nessa estratégia, cada mudança relevante pode disparar nova ação

      ```ts
      import { effect } from '@angular/core';

      buscarTarefas = effect(() => {
        const termo = this.termoBusca();

        this.carregando.set(true);

        this.tarefasService.getAll(termo).subscribe((tarefas) => {
          this.tarefas.set(tarefas);
          this.carregando.set(false);
        });
      });
      ```

  - Template reagindo aos signals
    - [ ] Exibir lista usando o valor atual do signal
    - [ ] Exibir loading com base no signal
    - [ ] Exibir contadores derivados

      ```html
      <section>
        <h2>Tarefas</h2>

        <p>Total: {{ totalTarefas() }}</p>
        <p>Concluidas: {{ totalConcluidas() }}</p>

        @if (carregando()) {
        <p>Carregando tarefas...</p>
        } @else { @for (tarefa of tarefasFiltradas(); track tarefa.id) {
        <mat-card>
          <mat-card-title>{{ tarefa.titulo }}</mat-card-title>
        </mat-card>
        } }
      </section>
      ```

  - Melhorar a busca remota com mais controle
    - [ ] Considerar debounce na busca remota
    - [ ] Considerar interop com RxJS quando necessário
    - [ ] Evitar excesso de requisições a cada tecla digitada

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

- Neste projeto:
  - Buscar tarefas
    - [ ] Criar `termoBusca` como signal
    - [ ] Adicionar campo de busca na página de listagem
    - [ ] Primeiro testar busca local
    - [ ] Depois decidir se a busca ficará local ou remota
    - [ ] Garantir que a listagem responda corretamente ao termo digitado

      ```ts
      // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.ts
      import { Component, computed, inject, signal } from '@angular/core';

      import { Tarefa } from '@shared/interfaces/tarefa';
      import { TarefasService } from '@core/services/tarefas.service';

      @Component({
        selector: 'app-listagem-tarefas',
        templateUrl: './listagem-tarefas.html',
        styleUrl: './listagem-tarefas.scss',
      })
      export class ListagemTarefas {
        private readonly tarefasService = inject(TarefasService);

        tarefas = signal<Tarefa[]>([]);
        carregando = signal(true);
        termoBusca = signal('');

        tarefasFiltradas = computed(() => {
          const termo = this.termoBusca().trim().toLowerCase();

          if (!termo) return this.tarefas();

          return this.tarefas().filter((tarefa) => tarefa.titulo.toLowerCase().includes(termo));
        });

        ngOnInit() {
          this.tarefasService.getAll().subscribe((tarefas) => {
            this.tarefas.set(tarefas);
            this.carregando.set(false);
          });
        }
      }
      ```

      ```html
      <!-- src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.html -->
      <mat-form-field>
        <mat-label>Pesquisar tarefa</mat-label>
        <input
          matInput
          [value]="termoBusca()"
          (input)="termoBusca.set($any($event.target).value)"
          placeholder="Ex.: estudar angular"
        />
      </mat-form-field>
      ```

      ```html
      <!-- trecho da listagem -->
      @if (carregando()) {
      <p>Carregando tarefas...</p>
      } @else if (tarefasFiltradas().length === 0) {
      <p>Nenhuma tarefa encontrada.</p>
      } @else { @for (tarefa of tarefasFiltradas(); track tarefa.id) {
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ tarefa.titulo }}</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <p>{{ tarefa.descricao }}</p>
        </mat-card-content>
      </mat-card>
      } }
      ```

  - Busca remota, se necessário
    - [ ] Ajustar o `getAll(...)` para aceitar parâmetro de busca
    - [ ] Reagir ao termo digitado com `effect()`
    - [ ] Atualizar a lista a cada nova resposta do backend
    - [ ] Aplicar alguma estratégia para evitar requisição a cada tecla digitada

      ```ts
      // src/app/core/services/tarefas.service.ts
      getAll(busca?: string) {
        let params = new HttpParams();

        if (busca) {
          params = params.set('q', busca);
        }

        return this.http.get<Tarefa[]>(this.apiUrl, { params });
      }
      ```

      ```ts
      // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.ts
      import { effect } from '@angular/core';

      buscarTarefas = effect(() => {
        const termo = this.termoBusca();

        this.carregando.set(true);

        this.tarefasService.getAll(termo).subscribe((tarefas) => {
          this.tarefas.set(tarefas);
          this.carregando.set(false);
        });
      });
      ```

  - Melhorar experiência da busca
    - [ ] Melhorar feedback visual de “nenhum resultado”

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

- Neste projeto:
  - Campo de busca
    - [ ] Criar componente reutilizável de busca

      ```bash
      npx ng g c shared/components/campo-busca
      ```

    - [ ] Usar `model()` para two-way binding no valor de busca

      ```ts
      // src/app/shared/components/campo-busca/campo-busca.ts
      import { Component, model } from '@angular/core';
      import { FormsModule } from '@angular/forms';
      import { MatFormFieldModule } from '@angular/material/form-field';
      import { MatInputModule } from '@angular/material/input';

      @Component({
        selector: 'app-campo-busca',
        imports: [FormsModule, MatFormFieldModule, MatInputModule],
        templateUrl: './campo-busca.html',
        styleUrl: './campo-busca.scss',
      })
      export class CampoBusca {
        termoBusca = model('');
      }
      ```

      ```html
      <!-- src/app/shared/components/campo-busca/campo-busca.html -->
      <mat-form-field>
        <mat-label>Pesquisar tarefa</mat-label>
        <input matInput [(ngModel)]="termoBusca" placeholder="Ex.: estudar angular" />
      </mat-form-field>
      ```

    - [ ] Usar o componente de busca na página de listagem

      ```ts
      // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.ts
      import { Component, computed, inject, signal } from '@angular/core';
      import { MatButtonModule } from '@angular/material/button';
      import { MatCardModule } from '@angular/material/card';
      import { RouterLink } from '@angular/router';

      import { CampoBusca } from '@shared/components/campo-busca/campo-busca';
      import { Tarefa } from '@shared/interfaces/tarefa';
      import { TarefasService } from '@core/services/tarefas.service';

      @Component({
        selector: 'app-listagem-tarefas',
        imports: [RouterLink, MatButtonModule, MatCardModule, CampoBusca],
        templateUrl: './listagem-tarefas.html',
        styleUrl: './listagem-tarefas.scss',
      })
      export class ListagemTarefas {
        private readonly tarefasService = inject(TarefasService);

        tarefas = signal<Tarefa[]>([]);
        carregando = signal(true);
        termoBusca = signal('');

        tarefasFiltradas = computed(() => {
          const termo = this.termoBusca().trim().toLowerCase();

          if (!termo) return this.tarefas();

          return this.tarefas().filter((tarefa) => tarefa.titulo.toLowerCase().includes(termo));
        });
      }
      ```

      ```html
      <!-- src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.html -->
      <app-campo-busca [(termoBusca)]="termoBusca" />
      ```

  - Lista de tarefas
    - [ ] Criar componente para exibir a lista/cards

      ```bash
      npx ng g c features/tarefas/components/lista-tarefas
      ```

    - [ ] Receber a lista via `input()`

    - [ ] Emitir ação de editar via `output()`

    - [ ] Emitir ação de remover via `output()`

      ```ts
      // src/app/features/tarefas/components/lista-tarefas/lista-tarefas.ts
      import { Component, input, output } from '@angular/core';
      import { MatButtonModule } from '@angular/material/button';
      import { MatCardModule } from '@angular/material/card';

      import { Tarefa } from '@shared/interfaces/tarefa';

      @Component({
        selector: 'app-lista-tarefas',
        imports: [MatButtonModule, MatCardModule],
        templateUrl: './lista-tarefas.html',
        styleUrl: './lista-tarefas.scss',
      })
      export class ListaTarefas {
        tarefas = input.required<Tarefa[]>();

        editarTarefa = output<Tarefa>();
        removerTarefa = output<Tarefa>();

        editar(tarefa: Tarefa) {
          this.editarTarefa.emit(tarefa);
        }

        remover(tarefa: Tarefa) {
          this.removerTarefa.emit(tarefa);
        }
      }
      ```

      ```html
      <!-- src/app/features/tarefas/components/lista-tarefas/lista-tarefas.html -->
      @for (tarefa of tarefas(); track tarefa.id) {
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ tarefa.titulo }}</mat-card-title>
          <mat-card-subtitle> {{ tarefa.concluida ? 'Concluida' : 'Pendente' }} </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <p>{{ tarefa.descricao }}</p>
        </mat-card-content>

        <mat-card-actions>
          <button matButton="filled" (click)="editar(tarefa)">Editar</button>
          <button matButton="outlined" (click)="remover(tarefa)">Remover</button>
        </mat-card-actions>
      </mat-card>
      }
      ```

  - Integrar os componentes na página de listagem
    - [ ] Substituir o campo de busca inline pelo componente `app-campo-busca`
    - [ ] Substituir os cards inline pelo componente `app-lista-tarefas`
    - [ ] Manter a página responsável por navegação, loading e acesso ao service

      ```ts
      // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.ts
      import { Component, computed, inject, signal } from '@angular/core';
      import { Router, RouterLink } from '@angular/router';
      import { MatButtonModule } from '@angular/material/button';

      import { CampoBusca } from '@shared/components/campo-busca/campo-busca';
      import { ListaTarefas } from '@features/tarefas/components/lista-tarefas/lista-tarefas';
      import { Tarefa } from '@shared/interfaces/tarefa';
      import { TarefasService } from '@core/services/tarefas.service';

      @Component({
        selector: 'app-listagem-tarefas',
        imports: [RouterLink, MatButtonModule, CampoBusca, ListaTarefas],
        templateUrl: './listagem-tarefas.html',
        styleUrl: './listagem-tarefas.scss',
      })
      export class ListagemTarefas {
        private readonly router = inject(Router);
        private readonly tarefasService = inject(TarefasService);

        tarefas = signal<Tarefa[]>([]);
        carregando = signal(true);
        termoBusca = signal('');

        tarefasFiltradas = computed(() => {
          const termo = this.termoBusca().trim().toLowerCase();

          if (!termo) return this.tarefas();

          return this.tarefas().filter((tarefa) => tarefa.titulo.toLowerCase().includes(termo));
        });

        editarTarefa(tarefa: Tarefa) {
          this.router.navigate(['/tarefas/edicao', tarefa.id]);
        }

        removerTarefa(tarefa: Tarefa) {
          this.tarefasService.remove(tarefa.id).subscribe(() => {
            this.tarefas.update((tarefas) => tarefas.filter((item) => item.id !== tarefa.id));
          });
        }
      }
      ```

      ```html
      <!-- src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.html -->
      <section>
        <h2>Tarefas</h2>

        <app-campo-busca [(termoBusca)]="termoBusca" />

        <div>
          <button matButton="filled" routerLink="/tarefas/criacao">Nova tarefa</button>
        </div>

        @if (carregando()) {
        <p>Carregando tarefas...</p>
        } @else if (tarefasFiltradas().length === 0) {
        <p>Nenhuma tarefa encontrada.</p>
        } @else {
        <app-lista-tarefas
          [tarefas]="tarefasFiltradas()"
          (editarTarefa)="editarTarefa($event)"
          (removerTarefa)="removerTarefa($event)"
        />
        }
      </section>
      ```

  - Evoluir com critério
    - [ ] Extrair também o formulário de tarefa, se o reuso entre criação e edição ficar claro
    - [ ] Avaliar se o componente modal de confirmação também deve receber `input()` e emitir `output()`
    - [ ] Evitar quebrar a página em componentes pequenos demais sem benefício real

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

- Neste projeto:
  - Base reutilizável do formulário
    - [ ] Criar um arquivo de interface para centralizar a criação do formulário da tarefa

      ```bash
      npx ng g i features/tarefas/forms/tarefa-form
      ```

    - [ ] Ajustar manualmente o conteúdo do arquivo gerado para uma fábrica de formulário

      ```ts
      // src/app/features/tarefas/forms/tarefa-form.ts
      import { FormControl, FormGroup, Validators } from '@angular/forms';

      export type TarefaForm = FormGroup<{
        titulo: FormControl<string>;
        descricao: FormControl<string>;
        concluida: FormControl<boolean>;
      }>;

      export function criarTarefaForm(): TarefaForm {
        return new FormGroup({
          titulo: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
          }),
          descricao: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
          }),
          concluida: new FormControl(false, {
            nonNullable: true,
          }),
        });
      }
      ```

  - Criacao de tarefa
    - [ ] Reutilizar a base do formulário
    - [ ] Enviar o valor do formulário para o `create(...)`
    - [ ] Navegar após sucesso

      ```ts
      // src/app/features/tarefas/pages/criacao-tarefa/criacao-tarefa.ts
      import { Component, inject, signal } from '@angular/core';
      import { ReactiveFormsModule } from '@angular/forms';
      import { Router, RouterLink } from '@angular/router';
      import { MatButtonModule } from '@angular/material/button';
      import { MatCheckboxModule } from '@angular/material/checkbox';
      import { MatFormFieldModule } from '@angular/material/form-field';
      import { MatInputModule } from '@angular/material/input';

      import { TarefasService } from '@core/services/tarefas.service';
      import { criarTarefaForm } from '@features/tarefas/forms/tarefa-form';

      @Component({
        selector: 'app-criacao-tarefa',
        imports: [
          ReactiveFormsModule,
          RouterLink,
          MatButtonModule,
          MatCheckboxModule,
          MatFormFieldModule,
          MatInputModule,
        ],
        templateUrl: './criacao-tarefa.html',
        styleUrl: './criacao-tarefa.scss',
      })
      export class CriacaoTarefa {
        private readonly router = inject(Router);
        private readonly tarefasService = inject(TarefasService);

        form = criarTarefaForm();
        enviando = signal(false);
        erro = signal('');

        salvar() {
          if (this.form.invalid || this.enviando()) return;

          this.enviando.set(true);
          this.erro.set('');

          this.tarefasService.create(this.form.getRawValue()).subscribe({
            next: () => {
              this.router.navigateByUrl('/tarefas');
            },
            error: () => {
              this.erro.set('Nao foi possivel salvar a tarefa.');
              this.enviando.set(false);
            },
          });
        }
      }
      ```

  - Edicao de tarefa
    - [ ] Reutilizar a mesma base do formulário
    - [ ] Preencher os campos com `patchValue(...)`
    - [ ] Enviar atualização com o mesmo padrão de submit

      ```ts
      // src/app/features/tarefas/pages/edicao-tarefa/edicao-tarefa.ts
      import { Component, inject, signal } from '@angular/core';
      import { ReactiveFormsModule } from '@angular/forms';
      import { ActivatedRoute, Router, RouterLink } from '@angular/router';
      import { MatButtonModule } from '@angular/material/button';
      import { MatCheckboxModule } from '@angular/material/checkbox';
      import { MatFormFieldModule } from '@angular/material/form-field';
      import { MatInputModule } from '@angular/material/input';

      import { TarefasService } from '@core/services/tarefas.service';
      import { criarTarefaForm } from '@features/tarefas/forms/tarefa-form';

      @Component({
        selector: 'app-edicao-tarefa',
        imports: [
          ReactiveFormsModule,
          RouterLink,
          MatButtonModule,
          MatCheckboxModule,
          MatFormFieldModule,
          MatInputModule,
        ],
        templateUrl: './edicao-tarefa.html',
        styleUrl: './edicao-tarefa.scss',
      })
      export class EdicaoTarefa {
        private readonly route = inject(ActivatedRoute);
        private readonly router = inject(Router);
        private readonly tarefasService = inject(TarefasService);

        readonly id = Number(this.route.snapshot.paramMap.get('id'));
        form = criarTarefaForm();
        enviando = signal(false);
        erro = signal('');

        ngOnInit() {
          this.tarefasService.getById(this.id).subscribe({
            next: (tarefa) => {
              this.form.patchValue({
                titulo: tarefa.titulo,
                descricao: tarefa.descricao,
                concluida: tarefa.concluida,
              });
            },
            error: () => {
              this.erro.set('Nao foi possivel carregar a tarefa.');
            },
          });
        }

        salvar() {
          if (this.form.invalid || this.enviando()) return;

          this.enviando.set(true);
          this.erro.set('');

          this.tarefasService.update(this.id, this.form.getRawValue()).subscribe({
            next: () => {
              this.router.navigateByUrl('/tarefas');
            },
            error: () => {
              this.erro.set('Nao foi possivel atualizar a tarefa.');
              this.enviando.set(false);
            },
          });
        }
      }
      ```

  - Template padronizado
    - [ ] Manter os mesmos campos e validações nas duas páginas
    - [ ] Exibir mensagens de erro consistentes

      ```html
      <mat-form-field>
        <mat-label>Titulo</mat-label>
        <input matInput formControlName="titulo" />

        @if (form.controls.titulo.errors?.['required']) {
        <mat-error>O titulo é obrigatório.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Descricao</mat-label>
        <textarea matInput formControlName="descricao"></textarea>

        @if (form.controls.descricao.errors?.['required']) {
        <mat-error>A descricao é obrigatória.</mat-error>
        }
      </mat-form-field>

      <mat-checkbox formControlName="concluida"> Tarefa concluida </mat-checkbox>
      ```

  - Validar comportamento
    - [ ] Confirmar que criação e edição usam a mesma estrutura de formulário
    - [ ] Confirmar que os dois fluxos respeitam `form.invalid`
    - [ ] Confirmar que os erros aparecem do mesmo jeito
    - [ ] Confirmar que o payload final está consistente

  - Evoluir o formulário com critério
    - [ ] Avaliar extração do template do formulário para componente reutilizável
    - [ ] Avaliar uso de `FormBuilder` se a redução de código compensar
    - [ ] Adicionar validações extras, como tamanho mínimo
    - [ ] Melhorar feedback visual de envio em andamento

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

- Neste projeto:
  - Ajustar a rota de edição
    - [ ] Manter a rota com parâmetro dinâmico

      ```ts
      // src/app/app.routes.ts
      {
        path: 'tarefas/edicao/:id',
        loadComponent: () =>
          import('./features/tarefas/pages/edicao-tarefa/edicao-tarefa').then(
            (m) => m.EdicaoTarefa,
          ),
      }
      ```

  - Criar resolver funcional para a tarefa
    - [ ] Criar arquivo de resolver da feature

      ```ts
      // src/app/features/tarefas/resolvers/tarefa.resolver.ts
      import { inject } from '@angular/core';
      import { ResolveFn } from '@angular/router';

      import { Tarefa } from '@shared/interfaces/tarefa';
      import { TarefasService } from '@core/services/tarefas.service';

      export const tarefaResolver: ResolveFn<Tarefa> = (route) => {
        const tarefasService = inject(TarefasService);
        const id = route.paramMap.get('id')!;

        return tarefasService.getById(id);
      };
      ```

  - Associar o resolver à rota
    - [ ] Adicionar `resolve` na rota de edição

      ```ts
      // src/app/app.routes.ts
      import { Routes } from '@angular/router';
      import { tarefaResolver } from '@features/tarefas/resolvers/tarefa.resolver';

      export const routes: Routes = [
        {
          path: 'tarefas/edicao/:id',
          loadComponent: () =>
            import('./features/tarefas/pages/edicao-tarefa/edicao-tarefa').then(
              (m) => m.EdicaoTarefa,
            ),
          resolve: {
            tarefa: tarefaResolver,
          },
        },
      ];
      ```

  - Ativar `withComponentInputBinding()`
    - [ ] Ajustar `app.config.ts`

      ```ts
      // src/app/app.config.ts
      import { ApplicationConfig } from '@angular/core';
      import { provideRouter, withComponentInputBinding } from '@angular/router';

      import { routes } from './app.routes';

      export const appConfig: ApplicationConfig = {
        providers: [provideRouter(routes, withComponentInputBinding())],
      };
      ```

  - Receber a tarefa resolvida diretamente no componente
    - [ ] Trocar leitura manual da rota por `input()`

      ```ts
      // src/app/features/tarefas/pages/edicao-tarefa/edicao-tarefa.ts
      import { Component, input } from '@angular/core';
      import { ReactiveFormsModule } from '@angular/forms';
      import { Router, RouterLink } from '@angular/router';
      import { MatButtonModule } from '@angular/material/button';
      import { MatCheckboxModule } from '@angular/material/checkbox';
      import { MatFormFieldModule } from '@angular/material/form-field';
      import { MatInputModule } from '@angular/material/input';

      import { Tarefa } from '@shared/interfaces/tarefa';
      import { criarTarefaForm } from '@features/tarefas/forms/tarefa-form';

      @Component({
        selector: 'app-edicao-tarefa',
        imports: [
          ReactiveFormsModule,
          RouterLink,
          MatButtonModule,
          MatCheckboxModule,
          MatFormFieldModule,
          MatInputModule,
        ],
        templateUrl: './edicao-tarefa.html',
        styleUrl: './edicao-tarefa.scss',
      })
      export class EdicaoTarefa {
        tarefa = input.required<Tarefa>();

        form = criarTarefaForm();
      }
      ```

  - Preencher o formulário com o dado resolvido
    - [ ] Popular o formulário a partir do `input()` recebido

      ```ts
      // src/app/features/tarefas/pages/edicao-tarefa/edicao-tarefa.ts
      import { Component, effect, inject, input, signal } from '@angular/core';
      import { Router, RouterLink } from '@angular/router';

      import { Tarefa } from '@shared/interfaces/tarefa';
      import { TarefasService } from '@core/services/tarefas.service';
      import { criarTarefaForm } from '@features/tarefas/forms/tarefa-form';

      @Component({
        selector: 'app-edicao-tarefa',
        templateUrl: './edicao-tarefa.html',
        styleUrl: './edicao-tarefa.scss',
      })
      export class EdicaoTarefa {
        private readonly router = inject(Router);
        private readonly tarefasService = inject(TarefasService);

        tarefa = input.required<Tarefa>();
        form = criarTarefaForm();
        enviando = signal(false);
        erro = signal('');

        preencherFormulario = effect(() => {
          const tarefa = this.tarefa();

          this.form.patchValue({
            titulo: tarefa.titulo,
            descricao: tarefa.descricao,
            concluida: tarefa.concluida,
          });
        });

        salvar() {
          if (this.form.invalid || this.enviando()) return;

          this.enviando.set(true);
          this.erro.set('');

          this.tarefasService.update(this.tarefa().id, this.form.getRawValue()).subscribe({
            next: () => {
              this.router.navigateByUrl('/tarefas');
            },
            error: () => {
              this.erro.set('Nao foi possivel atualizar a tarefa.');
              this.enviando.set(false);
            },
          });
        }
      }
      ```

  - Validar comportamento
    - [ ] Confirmar que o componente não depende mais de `ActivatedRoute` para receber a tarefa
    - [ ] Confirmar que o formulário abre preenchido
    - [ ] Confirmar que o `id` usado no update vem da própria tarefa resolvida
    - [ ] Confirmar que a rota continua funcionando ao acessar `/tarefas/edicao/1`
    - [ ] Tratar cenário de `id` inexistente
    - [ ] Adicionar redirecionamento ou feedback de erro se a tarefa não existir
    - [ ] Avaliar se outras rotas da aplicação também se beneficiam de `withComponentInputBinding()`

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

- Neste projeto:
  - Listagem de tarefas
    - [ ] Aplicar `takeUntilDestroyed()` na leitura da lista quando a subscription estiver vinculada ao ciclo de vida do componente
    - [ ] Evitar manter ao mesmo tempo `ngOnInit()` e `effect()` carregando a mesma lista
    - [ ] Garantir que `carregando` volte para `false` ao final da resposta
    - [ ] Garantir que `carregando` também volte para `false` em caso de erro
    - [ ] Manter `tarefas` e `carregando` como signals da tela

      ```ts
      // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.ts
      import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
      import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

      import { Tarefa } from '@shared/interfaces/tarefa';
      import { TarefasService } from '@core/services/tarefas.service';

      @Component({
        selector: 'app-listagem-tarefas',
        templateUrl: './listagem-tarefas.html',
        styleUrl: './listagem-tarefas.scss',
      })
      export class ListagemTarefas implements OnInit {
        private readonly tarefasService = inject(TarefasService);
        private readonly destroyRef = inject(DestroyRef);

        tarefas = signal<Tarefa[]>([]);
        carregando = signal(true);
        erro = signal('');

        ngOnInit() {
          this.tarefasService
            .getAll()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: (tarefas) => {
                this.tarefas.set(tarefas);
                this.carregando.set(false);
              },
              error: () => {
                this.erro.set('Nao foi possivel carregar as tarefas.');
                this.carregando.set(false);
              },
            });
        }
      }
      ```

  - Busca remota com `effect()`
    - [ ] Usar `effect()` apenas se o termo de busca realmente precisar disparar nova busca HTTP
    - [ ] Evitar manter ao mesmo tempo filtro local com `computed()` e busca remota com `effect()` para o mesmo fluxo, sem critério claro
    - [ ] Garantir que cada mudança de estratégia tenha uma única fonte de verdade

      ```ts
      import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
      import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

      import { Tarefa } from '@shared/interfaces/tarefa';
      import { TarefasService } from '@core/services/tarefas.service';

      @Component({
        selector: 'app-listagem-tarefas',
        templateUrl: './listagem-tarefas.html',
        styleUrl: './listagem-tarefas.scss',
      })
      export class ListagemTarefas {
        private readonly tarefasService = inject(TarefasService);
        private readonly destroyRef = inject(DestroyRef);

        tarefas = signal<Tarefa[]>([]);
        carregando = signal(false);
        termoBusca = signal('');

        buscarTarefas = effect(() => {
          const termo = this.termoBusca();

          this.carregando.set(true);

          this.tarefasService
            .getAll(termo)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: (tarefas) => {
                this.tarefas.set(tarefas);
                this.carregando.set(false);
              },
              error: () => {
                this.carregando.set(false);
              },
            });
        });
      }
      ```

  - Create, update e delete
    - [ ] Manter navegação e atualização de estado apenas após sucesso da operação
    - [ ] Evitar duplicar regra de atualização da lista em múltiplos lugares sem necessidade
    - [ ] Garantir que o componente continue responsável só pelo fluxo da tela

      ```ts
      // exemplo de remoção mantendo consistência do estado local
      removerTarefa(id: number) {
        this.tarefasService.remove(id).subscribe(() => {
          this.tarefas.update((tarefas) =>
            tarefas.filter((tarefa) => tarefa.id !== id),
          );
        });
      }
      ```

  - Revisão do fluxo da edição
    - [ ] Se a tarefa já vier resolvida pela rota, evitar nova busca manual desnecessária
    - [ ] Se `withComponentInputBinding()` já estiver ativo, preferir `input()` ao invés de ler novamente de `ActivatedRoute`
    - [ ] Garantir que o formulário seja preenchido em um único ponto do fluxo

  - Evoluir com integração Angular + RxJS
    - [ ] Considerar `toSignal()` quando fizer sentido converter Observable em Signal
    - [ ] Considerar `toObservable()` quando um Signal precisar entrar em pipeline RxJS
    - [ ] Considerar debounce na busca remota para evitar requisições a cada tecla
    - [ ] Melhorar tratamento de erro e feedback visual

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

- Neste projeto:
  - Criar componente modal de confirmação
    - [ ] Confirmar se o componente `shared/components/modal-confirmacao` já foi criado
    - [ ] Importar os módulos do dialog no componente
    - [ ] Receber o título da tarefa via `MAT_DIALOG_DATA`
    - [ ] Definir botões de cancelar e remover

      ```ts
      // src/app/shared/components/modal-confirmacao/modal-confirmacao.ts
      import { Component, inject } from '@angular/core';
      import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
      import { MatButtonModule } from '@angular/material/button';

      @Component({
        selector: 'app-modal-confirmacao',
        imports: [MatDialogModule, MatButtonModule],
        templateUrl: './modal-confirmacao.html',
        styleUrl: './modal-confirmacao.scss',
      })
      export class ModalConfirmacao {
        readonly data = inject(MAT_DIALOG_DATA) as { titulo: string };
      }
      ```

      ```html
      <!-- src/app/shared/components/modal-confirmacao/modal-confirmacao.html -->
      <h2 mat-dialog-title>Remover tarefa</h2>

      <mat-dialog-content>
        <p>Tem certeza que deseja remover a tarefa "{{ data.titulo }}"?</p>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button matButton mat-dialog-close="false">Cancelar</button>
        <button matButton="filled" mat-dialog-close="true">Remover</button>
      </mat-dialog-actions>
      ```

  - Integrar o modal na página de listagem
    - [ ] Injetar `MatDialog` na página de listagem
    - [ ] Criar método para abrir o modal
    - [ ] Passar o título da tarefa como dado do dialog
    - [ ] Aguardar o fechamento com `afterClosed()`

      ```ts
      // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.ts
      import { Component, inject, signal } from '@angular/core';
      import { MatButtonModule } from '@angular/material/button';
      import { MatCardModule } from '@angular/material/card';
      import { MatDialog } from '@angular/material/dialog';
      import { Router, RouterLink } from '@angular/router';

      import { ModalConfirmacao } from '@shared/components/modal-confirmacao/modal-confirmacao';
      import { Tarefa } from '@shared/interfaces/tarefa';
      import { TarefasService } from '@core/services/tarefas.service';

      @Component({
        selector: 'app-listagem-tarefas',
        imports: [RouterLink, MatButtonModule, MatCardModule],
        templateUrl: './listagem-tarefas.html',
        styleUrl: './listagem-tarefas.scss',
      })
      export class ListagemTarefas {
        private readonly router = inject(Router);
        private readonly dialog = inject(MatDialog);
        private readonly tarefasService = inject(TarefasService);

        tarefas = signal<Tarefa[]>([]);
        carregando = signal(true);
        erroRemocao = signal('');

        abrirModalRemocao(tarefa: Tarefa) {
          const dialogRef = this.dialog.open(ModalConfirmacao, {
            data: { titulo: tarefa.titulo },
          });

          dialogRef.afterClosed().subscribe((confirmou) => {
            if (!confirmou) return;

            this.removerTarefa(tarefa.id);
          });
        }

        removerTarefa(id: number) {
          this.erroRemocao.set('');

          this.tarefasService.remove(id).subscribe({
            next: () => {
              this.tarefas.update((tarefas) => tarefas.filter((tarefa) => tarefa.id !== id));
            },
            error: () => {
              this.erroRemocao.set('Nao foi possivel remover a tarefa.');
            },
          });
        }
      }
      ```

  - Ligar o botão de remover ao modal
    - [ ] Trocar a remoção direta pela abertura do modal
    - [ ] Garantir que o item correto é enviado para confirmação

      ```html
      <!-- src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.html -->
      <button matButton="outlined" (click)="abrirModalRemocao(tarefa)">Remover</button>
      ```

  - Validar o comportamento
    - [ ] Confirmar que o modal mostra o título correto da tarefa
    - [ ] Confirmar que clicar em **Cancelar** não altera a lista
    - [ ] Confirmar que clicar em **Remover** exclui a tarefa
    - [ ] Confirmar que a lista é atualizada logo após a exclusão

  - Melhorar acabamento da ação destrutiva
    - [ ] Personalizar aparência do botão destrutivo
    - [ ] Tratar erro de remoção com feedback visual
    - [ ] Avaliar reuso do modal para outras ações destrutivas
    - [ ] Avaliar configurar foco inicial com `autoFocus` se houver necessidade específica de acessibilidade

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

- Neste projeto:
  - Tema global
    - [ ] Revisar `src/styles.scss`
    - [ ] Centralizar o tema global do Angular Material
    - [ ] Confirmar cor principal, tipografia e densidade
    - [ ] Manter a base visual da aplicação no arquivo global

      ```scss
      // src/styles.scss
      @use '@angular/material' as mat;
      @use './styles/theme/overrides/toolbar.scss';
      @use './styles/theme/overrides/button.scss';

      html {
        @include mat.theme(
          (
            color: (
              primary: mat.$azure-palette,
              tertiary: mat.$blue-palette,
            ),
            typography: Roboto,
            density: 0,
          )
        );
      }

      html,
      body {
        height: 100%;
      }

      body {
        margin: 0;
        background-color: var(--mat-sys-surface);
        color: var(--mat-sys-on-surface);
        font: var(--mat-sys-body-medium);
        font-family: Roboto, 'Helvetica Neue', sans-serif;
      }
      ```

  - Toolbar
    - [ ] Refinar visual da toolbar
    - [ ] Garantir contraste adequado
    - [ ] Garantir consistência com o restante da aplicação

      ```scss
      // src/styles/theme/overrides/toolbar.scss
      @use '@angular/material' as mat;

      :root {
        @include mat.toolbar-overrides(
          (
            container-background-color: rgb(0, 0, 0),
            container-text-color: rgb(255, 255, 255),
          )
        );
      }
      ```

      ```html
      <!-- src/app/shared/components/cabecalho/cabecalho.html -->
      <mat-toolbar>
        <span>Lista de Tarefas</span>
      </mat-toolbar>
      ```

  - Botões
    - [ ] Diferenciar visualmente ações comuns e ações destrutivas
    - [ ] Criar override global reutilizável para botão destrutivo
    - [ ] Aplicar classe específica apenas onde fizer sentido

      ```scss
      // src/styles/theme/overrides/button.scss
      @use '@angular/material' as mat;

      :root {
        .botao-perigo {
          @include mat.button-overrides(
            (
              filled-container-color: var(--mat-sys-error),
            )
          );
        }
      }
      ```

      ```html
      <button matButton="outlined" class="botao-perigo">Remover</button>
      ```

  - Shell da aplicação
    - [ ] Melhorar o layout geral da aplicação
    - [ ] Garantir área central de conteúdo
    - [ ] Separar visualmente cabeçalho e conteúdo principal

      ```scss
      // src/app/app.scss
      :host {
        display: block;
        min-height: 100dvh;
      }

      main {
        max-width: 960px;
        margin: 0 auto;
        padding: 1rem;
      }
      ```

      ```html
      <!-- src/app/app.html -->
      <app-cabecalho />

      <main>
        <router-outlet />
      </main>
      ```

  - Página de listagem
    - [ ] Melhorar espaçamento entre busca, ação principal e lista
    - [ ] Criar separação visual entre cards
    - [ ] Organizar melhor ações de cada item

      ```scss
      // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.scss
      :host {
        display: block;
      }

      section {
        display: grid;
        gap: 1rem;
      }

      .acoes-topo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
      }
      ```

      ```html
      <!-- trecho da listagem -->
      <section>
        <h2>Tarefas</h2>

        <div class="acoes-topo">
          <app-campo-busca [(termoBusca)]="termoBusca" />
          <button matButton="filled" routerLink="/tarefas/criacao">Nova tarefa</button>
        </div>

        @if (carregando()) {
        <p>Carregando tarefas...</p>
        } @else if (tarefasFiltradas().length === 0) {
        <p>Nenhuma tarefa encontrada.</p>
        } @else {
        <app-lista-tarefas
          [tarefas]="tarefasFiltradas()"
          (editarTarefa)="editarTarefa($event)"
          (removerTarefa)="removerTarefa($event)"
        />
        }
      </section>
      ```

  - Componente de lista/cards
    - [ ] Melhorar espaçamento interno dos cards
    - [ ] Melhorar hierarquia entre título, subtítulo e descrição
    - [ ] Alinhar ações do card de forma consistente

      ```scss
      // src/app/features/tarefas/components/lista-tarefas/lista-tarefas.scss
      :host {
        display: grid;
        gap: 1rem;
      }

      mat-card-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: flex-end;
      }
      ```

  - Página de criação e edição
    - [ ] Melhorar largura do formulário
    - [ ] Organizar campos em coluna
    - [ ] Garantir boa leitura dos botões de ação

      ```scss
      // pode ser usado tanto em criacao-tarefa.scss quanto em edicao-tarefa.scss
      :host {
        display: block;
      }

      form {
        display: grid;
        gap: 1rem;
        max-width: 640px;
      }

      .acoes-formulario {
        display: flex;
        gap: 0.75rem;
        justify-content: flex-end;
        flex-wrap: wrap;
      }
      ```

      ```html
      <form [formGroup]="form" (ngSubmit)="salvar()">
        <mat-form-field>
          <mat-label>Titulo</mat-label>
          <input matInput formControlName="titulo" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Descricao</mat-label>
          <textarea matInput formControlName="descricao"></textarea>
        </mat-form-field>

        <div class="acoes-formulario">
          <button type="button" matButton="outlined" routerLink="/tarefas">Cancelar</button>
          <button type="submit" matButton="filled" [disabled]="form.invalid">Salvar</button>
        </div>
      </form>
      ```

  - Responsividade básica
    - [ ] Garantir que a interface continue utilizável em telas menores
    - [ ] Evitar que ações quebrem de forma ruim
    - [ ] Permitir empilhamento de elementos quando necessário

      ```scss
      @media (max-width: 600px) {
        .acoes-topo,
        .acoes-formulario {
          flex-direction: column;
          align-items: stretch;
        }
      }
      ```

  - Validar resultado final
    - [ ] Confirmar que a toolbar está consistente
    - [ ] Confirmar que busca, cards e formulários estão bem espaçados
    - [ ] Confirmar que os botões de salvar, cancelar e remover estão visualmente claros
    - [ ] Confirmar que a aplicação continua funcional após os refinamentos

  - Evoluir acabamento visual
    - [ ] Melhorar tokens visuais de sucesso, aviso e erro
    - [ ] Avaliar uso de `mat-icon` para reforçar ações importantes
    - [ ] Avaliar estados visuais mais ricos para loading e vazio
    - [ ] Ajustar mais cuidadosamente breakpoint e largura máxima das páginas

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

- Neste projeto:
  - Pipe nativo
    - [ ] Aplicar `titlecase` no título da tarefa

      ```html
      <!-- src/app/features/tarefas/components/lista-tarefas/lista-tarefas.html -->
      <mat-card-title>{{ tarefa.titulo | titlecase }}</mat-card-title>
      ```

  - Pipe customizado
    - [ ] Criar pipe para resumir descrições longas

      ```bash
      npx ng g p shared/pipes/resumir-texto
      ```

    - [ ] Implementar o pipe customizado

      ```ts
      // src/app/shared/pipes/resumir-texto.ts
      import { Pipe, PipeTransform } from '@angular/core';

      @Pipe({
        name: 'resumirTexto',
      })
      export class ResumirTexto implements PipeTransform {
        transform(valor: string, limite: number = 40): string {
          if (!valor) return '';

          if (valor.length <= limite) {
            return valor;
          }

          return `${valor.slice(0, limite)}...`;
        }
      }
      ```

    - [ ] Importar o pipe no componente que renderiza os cards

      ```ts
      // src/app/features/tarefas/components/lista-tarefas/lista-tarefas.ts
      import { Component, input, output } from '@angular/core';
      import { TitleCasePipe } from '@angular/common';
      import { MatButtonModule } from '@angular/material/button';
      import { MatCardModule } from '@angular/material/card';

      import { ResumirTexto } from '@shared/pipes/resumir-texto';
      import { Tarefa } from '@shared/interfaces/tarefa';

      @Component({
        selector: 'app-lista-tarefas',
        imports: [MatButtonModule, MatCardModule, TitleCasePipe, ResumirTexto],
        templateUrl: './lista-tarefas.html',
        styleUrl: './lista-tarefas.scss',
      })
      export class ListaTarefas {
        tarefas = input.required<Tarefa[]>();

        editarTarefa = output<Tarefa>();
        removerTarefa = output<Tarefa>();

        editar(tarefa: Tarefa) {
          this.editarTarefa.emit(tarefa);
        }

        remover(tarefa: Tarefa) {
          this.removerTarefa.emit(tarefa);
        }
      }
      ```

    - [ ] Usar o pipe no template

      ```html
      <!-- src/app/features/tarefas/components/lista-tarefas/lista-tarefas.html -->
      @for (tarefa of tarefas(); track tarefa.id) {
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ tarefa.titulo | titlecase }}</mat-card-title>
          <mat-card-subtitle> {{ tarefa.concluida ? 'Concluida' : 'Pendente' }} </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <p>{{ tarefa.descricao | resumirTexto:50 }}</p>
        </mat-card-content>

        <mat-card-actions>
          <button matButton="filled" (click)="editar(tarefa)">Editar</button>
          <button matButton="outlined" (click)="remover(tarefa)">Remover</button>
        </mat-card-actions>
      </mat-card>
      }
      ```

  - Diretiva customizada
    - [ ] Criar diretiva para marcar botão destrutivo

      ```bash
      npx ng g d shared/directives/botao-perigo
      ```

    - [ ] Implementar a diretiva

      ```ts
      // src/app/shared/directives/botao-perigo.ts
      import { Directive, ElementRef, OnInit, inject } from '@angular/core';

      @Directive({
        selector: '[appBotaoPerigo]',
      })
      export class BotaoPerigo implements OnInit {
        private readonly hostEl = inject(ElementRef).nativeElement as HTMLElement;

        ngOnInit() {
          this.hostEl.classList.add('botao-perigo');
        }
      }
      ```

    - [ ] Importar a diretiva no componente que renderiza os cards

      ```ts
      // src/app/features/tarefas/components/lista-tarefas/lista-tarefas.ts
      import { BotaoPerigo } from '@shared/directives/botao-perigo';

      @Component({
        selector: 'app-lista-tarefas',
        imports: [MatButtonModule, MatCardModule, TitleCasePipe, ResumirTexto, BotaoPerigo],
        templateUrl: './lista-tarefas.html',
        styleUrl: './lista-tarefas.scss',
      })
      export class ListaTarefas {
        // ...
      }
      ```

    - [ ] Aplicar a diretiva no botão de remover

      ```html
      <!-- src/app/features/tarefas/components/lista-tarefas/lista-tarefas.html -->
      <button matButton="outlined" appBotaoPerigo (click)="remover(tarefa)">Remover</button>
      ```

  - Validar comportamento
    - [ ] Confirmar que o título da tarefa usa pipe nativo
    - [ ] Confirmar que a descrição longa é resumida pelo pipe customizado
    - [ ] Confirmar que o botão de remover recebe o estilo de ação destrutiva via diretiva
    - [ ] Confirmar que o componente continua compilando com todos os imports necessários

  - Evoluir reutilização com critério
    - [ ] Avaliar tornar o pipe customizado reutilizável em outras telas
    - [ ] Avaliar se a diretiva deve aceitar configuração por `input()`
    - [ ] Evitar criar pipes ou diretivas sem ganho real de reuso ou clareza

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
