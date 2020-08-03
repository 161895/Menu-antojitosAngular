import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaPComponent } from './edita-p.component';

describe('EditaPComponent', () => {
  let component: EditaPComponent;
  let fixture: ComponentFixture<EditaPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
