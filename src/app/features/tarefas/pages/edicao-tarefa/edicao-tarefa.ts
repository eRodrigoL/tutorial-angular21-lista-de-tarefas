import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edicao-tarefa',
  imports: [MatFormFieldModule, MatButtonModule, RouterLink],
  templateUrl: './edicao-tarefa.html',
  styleUrl: './edicao-tarefa.scss',
})
export class EdicaoTarefa {}
