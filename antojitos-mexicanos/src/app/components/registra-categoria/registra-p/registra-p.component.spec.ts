import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraPComponent } from './registra-p.component';

describe('RegistraPComponent', () => {
  let component: RegistraPComponent;
  let fixture: ComponentFixture<RegistraPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistraPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
