import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-criacao-tarefa',
  imports: [MatInputModule, MatFormFieldModule],
  templateUrl: './criacao-tarefa.html',
  styleUrl: './criacao-tarefa.scss',
})
export class CriacaoTarefa {}
