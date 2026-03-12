import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoTarefa } from './edicao-tarefa';

describe('EdicaoTarefa', () => {
  let component: EdicaoTarefa;
  let fixture: ComponentFixture<EdicaoTarefa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicaoTarefa],
    }).compileComponents();

    fixture = TestBed.createComponent(EdicaoTarefa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
