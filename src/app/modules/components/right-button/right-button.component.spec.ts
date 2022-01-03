import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightButtonComponent } from './right-button.component';

describe('RightButtonComponent', () => {
  let component: RightButtonComponent;
  let fixture: ComponentFixture<RightButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
