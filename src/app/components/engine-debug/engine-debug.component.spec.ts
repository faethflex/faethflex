import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineDebugComponent } from './engine-debug.component';

describe('EngineDebugComponent', () => {
  let component: EngineDebugComponent;
  let fixture: ComponentFixture<EngineDebugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineDebugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
