import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listagem-tarefas',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './listagem-tarefas.html',
  styleUrl: './listagem-tarefas.scss',
})
export class ListagemTarefas {}
