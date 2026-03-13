import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Tarefa } from '@app/shered/interfaces/tarefa';
import { PayloadTarefa } from '@app/shered/interfaces/tarefa';

@Injectable({
  providedIn: 'root',
})
export class TarefasService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/tarefas';

  buscarTodos(busca?: string) {
    let params = new HttpParams();

    if (busca) {
      params = params.set('q', busca);
    }

    return this.http.get<Tarefa[]>(this.apiUrl, { params });
  }

  buscarPorId(id: number) {
    return this.http.get<Tarefa>(`${this.apiUrl}/${id}`);
  }

  criar(payload: PayloadTarefa) {
    return this.http.post<Tarefa>(this.apiUrl, payload);
  }

  editar(id: number, payload: PayloadTarefa) {
    return this.http.put<Tarefa>(`${this.apiUrl}/${id}`, payload);
  }

  remover(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
