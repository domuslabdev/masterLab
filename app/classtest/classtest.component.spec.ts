import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasstestComponent } from './classtest.component';

describe('ClasstestComponent', () => {
  let component: ClasstestComponent;
  let fixture: ComponentFixture<ClasstestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasstestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasstestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
