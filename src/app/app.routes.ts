import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tarefas',
    loadComponent: () =>
      import('@pages/listagem-tarefas/listagem-tarefas').then((m) => m.ListagemTarefas),
  },
  {
    path: 'tarefas/criacao',
    loadComponent: () =>
      import('@pages/criacao-tarefa/criacao-tarefa').then((m) => m.CriacaoTarefa),
  },
  {
    path: 'tarefas/edicao/:id',
    loadComponent: () => import('@pages/edicao-tarefa/edicao-tarefa').then((m) => m.EdicaoTarefa),
  },
  {
    path: '',
    redirectTo: 'tarefas',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'tarefas',
  },
];
