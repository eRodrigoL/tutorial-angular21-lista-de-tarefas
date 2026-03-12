import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriacaoTarefa } from './criacao-tarefa';

describe('CriacaoTarefa', () => {
  let component: CriacaoTarefa;
  let fixture: ComponentFixture<CriacaoTarefa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriacaoTarefa],
    }).compileComponents();

    fixture = TestBed.createComponent(CriacaoTarefa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
