export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  concluida: boolean;
}

export type PayloadTarefa = Omit<Tarefa, 'id'>;
