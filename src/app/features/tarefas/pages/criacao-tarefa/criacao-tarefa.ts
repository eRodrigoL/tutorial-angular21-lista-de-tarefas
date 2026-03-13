import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-criacao-tarefa',
  imports: [MatInputModule, MatFormFieldModule, RouterLink, MatButtonModule],
  templateUrl: './criacao-tarefa.html',
  styleUrl: './criacao-tarefa.scss',
})
export class CriacaoTarefa {}
