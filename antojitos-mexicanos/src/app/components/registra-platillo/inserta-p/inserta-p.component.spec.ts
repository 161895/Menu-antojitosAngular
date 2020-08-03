import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertaPComponent } from './inserta-p.component';

describe('InsertaPComponent', () => {
  let component: InsertaPComponent;
  let fixture: ComponentFixture<InsertaPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertaPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertaPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
