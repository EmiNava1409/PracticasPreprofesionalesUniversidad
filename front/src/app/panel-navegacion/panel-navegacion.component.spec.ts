import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelNavegacionComponent } from './panel-navegacion.component';

describe('PanelNavegacionComponent', () => {
  let component: PanelNavegacionComponent;
  let fixture: ComponentFixture<PanelNavegacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelNavegacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelNavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
